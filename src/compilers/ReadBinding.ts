import { BindingName } from "../types/enums/BindingName";
import { BindingType } from "../types/enums/BindingType";
import { BindingInterface } from "../types/objects/BindingInterface";
import { Var } from "../types/values/Variable";

export function ReadBinding(binding: BindingName | Var | BindingInterface) {
    if (typeof binding === "string")
        return {
            binding_name: binding,
        };
    else {
        const bindingObject: BindingInterface = <any>binding;

        if (Array.isArray(bindingObject.binding_name))
            bindingObject.binding_name = <any>(
                BuildBinding(bindingObject.binding_name[0])
            );

        if (bindingObject.source_property_name) {
            bindingObject.binding_type ||= BindingType.View;
            if (Array.isArray(bindingObject.source_property_name))
                bindingObject.source_property_name = <any>(
                    BuildBinding(bindingObject.source_property_name[0])
                );
        } else if (bindingObject.binding_collection_name) {
            bindingObject.binding_type ||= BindingType.Collection;
        }

        return <BindingInterface>bindingObject;
    }
}

export function BindingTokens(binding: string) {
    const reg =
        /(\w+\[.+\])|(\w+|(\-\d+))|((\<|\>|\!|\=)\=)|([+\-*\/&|!=><%])|(\'.+?\')|([#$]\w+)/g;
    const bracketsTokens = [];
    const tokens: Array<string> = [];

    let str = "";
    let isString = false;
    let bracketsCount = 0;

    for (const word of Array.from(binding)) {
        if (word === "(" && !isString) {
            if (bracketsCount++ === 0) {
                bracketsTokens.push(str);
                str = word;
            } else str += word;
        } else if (word === ")" && !isString) {
            if (--bracketsCount === 0) {
                bracketsTokens.push(`${str})`);
                str = "";
            } else str += word;
        } else if (word === "'") {
            isString = !isString;
            str += "'";
        } else str += word;
    }
    if (str.replaceAll(" ", "") !== "") bracketsTokens.push(str);

    for (const token of bracketsTokens) {
        if (token.startsWith("(")) tokens.push(token);
        else tokens.push(...(token.match(reg) || []));
    }

    return tokens;
}

export function BuildBinding(binding: string) {
    let output: string = "";
    const matches = <Array<string>>BindingTokens(binding).map((token) => {
        if (token.startsWith("(")) {
            return `( ${BuildBinding(token.slice(1, token.length - 1))} )`;
        } else if (/(\w+\[.+\])/.test(token)) {
            const funcTokens = token.match(/([#$]|\w)+|('.+?')|(-\d+)/g) || [
                "",
            ];

            const params = funcTokens.slice(1).map((value) => {
                if (value.startsWith("0x"))
                    return Number.parseInt(value.slice(2), 16);
                else return value;
            }) as Array<string>;

            switch (funcTokens[0]) {
                case "slice": {
                    {
                        if (Number.isNaN(+params[1])) {
                            console.error(
                                `[Binding Compile Error] start must be a number.`
                            );
                        } else {
                            if (params[2]) {
                                if (Number.isNaN(+params[2]))
                                    console.error(
                                        `[Binding Compile Error] end must be a number.`
                                    );
                                else {
                                    if (params[1] === "0") {
                                        return `(${params[0]} * '%.${params[2]}s')`;
                                    } else {
                                        return `(('compile:' + ${
                                            params[0]
                                        }) - ('compile:' + ${params[0]} * '%.${
                                            params[1]
                                        }s') * '%.${
                                            Number(params[2]) -
                                            Number(params[1])
                                        }s')`;
                                    }
                                }
                            } else
                                return `(('compile:' + ${params[0]}) - ('compile:' + ${params[0]} * '%.${params[1]}s')) `;
                        }
                    }
                    break;
                }
                case "includes":
                    return `(not (${params[0]} = (${params.join(" - ")})))`;
                case "excludes":
                    return `(${params[0]} = (${params.join(" - ")}))`;
                default:
                    console.error(
                        `[Binding compile error] ${funcTokens[0]} is not a function.`
                    );
                    return token;
            }
        } else if (token.startsWith("0x")) {
            return Number.parseInt(token.slice(2), 16);
        } else return token;
    });

    for (let index = 0; index < matches?.length || 0; index++) {
        const token = matches[index];
        if (token === "<=")
            output += `< ${matches[index + 1]} or ${matches[index - 1]} = `;
        else if (token === ">=")
            output += `> ${matches[index + 1]} or ${matches[index - 1]} = `;
        else if (token === "!=") output += `= `;
        else if (token === "==") output += `= `;
        else if (token === "&") output += "and ";
        else if (token === "|") output += "or ";
        else if (token === "!") output += "not ";
        else if (token === "%")
            output += `- ((${matches[index - 1]} / ${matches[index + 1]}) * `;
        else if (
            ["+", "-", "*", "/", "=", "<", ">", "and", "or", "not"].includes(
                token
            )
        )
            output += `${token} `;
        else {
            if (matches[index + 1] === "!=") output += `not (${token} `;
            else if (matches[index - 1] === "!=") output += `${token}) `;
            else if (matches[index + 1] === "%") output += `(${token} `;
            else if (matches[index - 1] === "%") output += `${token})) `;
            else output += `${token} `;
        }
    }

    return output.slice(0, output.length - 1);
}
