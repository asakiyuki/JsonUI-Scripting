import { UI } from "../compoments/UI";
import { OverrideInterface } from "../compoments/Modify";
import { Random } from "../compoments/Random";

interface BindingFunctionObject {
    [key: string]: (
        arg: UI | OverrideInterface,
        params: Array<string>
    ) => string;
}
const funcObj: BindingFunctionObject = {
    log: (arg, params) => {
        console.log(...params);
        return `${params.join(" ")}`;
    },
};

export class BindingCompiler {
    static compile(propetyName: string, arg: UI | OverrideInterface) {
        return this.build(propetyName, arg);
    }

    static build(propertyName: string, arg: UI | OverrideInterface) {
        const tokens = this.readTokens(
            this.getTokens(this.splitString(propertyName))
        ).map((token) => {
            if (this.isCodeBlock(token))
                return <string>(
                    this.buildNewBinding(token.slice(1, token.length - 1), arg)
                );
            else if (this.isFunction(token)) {
                return <string>this.functionHandler(token, arg);
            } else return token;
        });

        let build = "(";

        for (let index = 0; index < tokens.length; index++) {
            const token = tokens[index];
            const lastToken = tokens[index - 1];
            const nextToken = tokens[index + 1];

            if (token === "==") build += "= ";
            else if (token === "&") build += "and ";
            else if (token === "|") build += "or ";
            else if (token === "!") build += "not ";
            else if (token === ">=")
                build += `> ${nextToken} or ${lastToken} = `;
            else if (token === "<=")
                build += `< ${nextToken} or ${lastToken} = `;
            else if (token === "%") {
                build += `(${lastToken} / ${nextToken} * ${nextToken} - ${nextToken}) `;
            } else if (token === "!=") build += "= ";
            else {
                if (nextToken === "!=") build += `not (${token} `;
                else if (lastToken === "!=") build += `${token}) `;
                else if (nextToken === "%" || lastToken === "%") {
                } else {
                    if (
                        this.isNegativeNumber(token) &&
                        !this.isOperator(lastToken)
                    ) {
                        build += `- ${token.slice(1)} `;
                    } else build += `${token} `;
                }
            }
        }
        build = `${build.slice(0, build.length - 1)})`;

        return build;
    }

    static splitString(propertyName: string) {
        const tokens: Array<string> = [];
        let token = "",
            openFormatCount = 0,
            isString: boolean = false;

        for (const char of propertyName) {
            if (char === "'" && openFormatCount === 0) {
                isString = !isString;
                if (token !== "") {
                    tokens.push(isString ? token : `'${token}'`);
                }
                token = "";
            } else if (char === "{" && isString) {
                openFormatCount++;
                token += "{";
            } else if (char === "}" && isString) {
                openFormatCount--;
                token += "}";
            } else if (char !== " " || isString) {
                token += char;
            }
        }

        if (token !== "") tokens.push(token);

        return tokens;
    }

    static functionHandler(token: string, arg: UI | OverrideInterface) {
        const func = this.readFunctionFromToken(
            this.getTokens(this.splitString(token)),
            arg
        );

        let str = "";

        if (funcObj[func.name]) {
            str = funcObj[func.name](arg, func.params);
        } else {
            console.warn(
                `[Compile error] Function ${func.name} is not available!`
            );
        }

        return str;
    }

    static readFunctionFromToken(
        tokens: Array<string>,
        arg: UI | OverrideInterface
    ) {
        const name = tokens[0];
        tokens = tokens.slice(2, tokens.length - 1);

        const params: Array<string> = [];
        let param = "";

        for (const token of tokens) {
            if (token === ",") {
                params.push(param);
                param = "";
            } else param += token;
        }
        if (param !== "") params.push(param);

        return {
            name,
            params: params.map((token) => {
                if (this.isFunction(token))
                    return this.functionHandler(token, arg);
                else if (this.isCodeBlock(token))
                    return this.buildNewBinding(
                        token.slice(1, token.length - 1),
                        arg
                    );
                else return token;
            }),
        };
    }

    static readTokens(strTokens: Array<string>) {
        const tokens: Array<string> = [];
        let strToken = "";
        let functionName: string | null = null,
            brackets = 0;

        for (const token of strTokens) {
            if (this.maybeFunctionName(token) && !brackets) {
                if (functionName) tokens.push(functionName);
                functionName = token;
            } else if (["(", ")"].includes(token)) {
                if (functionName) {
                    strToken += functionName;
                    functionName = null;
                }
                if (token === "(") brackets++;
                else brackets--;
                strToken += token;
                if (brackets === 0) {
                    tokens.push(strToken);
                    strToken = "";
                }
            } else {
                if (brackets) strToken += token;
                else if (functionName) {
                    tokens.push(functionName);
                    functionName = null;
                    tokens.push(token);
                } else tokens.push(token);
            }
        }

        if (functionName) tokens.push(functionName);
        return tokens;
    }

    static getTokens(strTokens: Array<string>) {
        const tokens: Array<string> = [];
        for (const token of strTokens) {
            if (this.isString(token)) tokens.push(token);
            else
                tokens.push(
                    ...(token.match(
                        /-?\d+\.\d+|-\d+|\d+|[#$]?\w+|[><=!]?=|[\[\]()+\-*\/=><!,&%|]/gm
                    ) ?? [])
                );
        }
        return tokens;
    }

    static buildNewBinding(token: string, arg: UI | OverrideInterface) {
        const rndName: `#${string}` = `#${Random.getName()}`;
        arg.addBindings({
            source_property_name: [token],
            target_property_name: rndName,
        });
        return rndName;
    }

    static isString(token: string) {
        return /^'.+'$/.test(token);
    }

    static isNegativeNumber(token: string) {
        return /^-\d+\.\d+$|^-\d+$/.test(token);
    }

    static isFunction(token: string) {
        return /^\w+\(.*\)$/.test(token);
    }

    static isArray(token: string) {
        return /^\[.*\]$/.test(token);
    }

    static isCodeBlock(token: string) {
        return /^\(.+\)$/.test(token);
    }

    static maybeFunctionName(token: string) {
        return /^\w+$/.test(token);
    }

    static isBindingOrVariable(token: string) {
        return /^[#$]\w+$/.test(token);
    }

    static isOperator(token: string) {
        return /^[+\-*\/%><=!&|]$|^[><=!]=$/.test(token);
    }

    static isHasBinding(token: string) {
        return /#\w+/.test(token);
    }
}
