import { OverrideInterface } from "../compoments/Modify";
import { Random } from "../compoments/Random";
import { UI } from "../compoments/UI";
import { BindingName } from "../types/enums/BindingName";
import { BindingType } from "../types/enums/BindingType";
import { BindingInterface } from "../types/objects/BindingInterface";
import { Binding } from "../types/values/Binding";
import { Var } from "../types/values/Variable";

export function ReadBinding(
    binding: BindingName | Var | BindingInterface,
    arg: UI | OverrideInterface
) {
    if (typeof binding === "string")
        return {
            binding_name: binding,
        };
    else {
        const bindingObject: BindingInterface = <any>binding;

        if (Array.isArray(bindingObject.binding_name))
            bindingObject.binding_name = <any>(
                BuildBinding(bindingObject.binding_name[0], arg)
            );

        if (bindingObject.source_property_name) {
            bindingObject.binding_type ||= BindingType.View;
            if (Array.isArray(bindingObject.source_property_name))
                bindingObject.source_property_name = <any>(
                    BuildBinding(bindingObject.source_property_name[0], arg)
                );
        } else if (bindingObject.binding_collection_name) {
            bindingObject.binding_type ||= BindingType.Collection;
        }

        return <BindingInterface>bindingObject;
    }
}

export function BuildBindingProperty(
    bindingName: string,
    propertyName: string,
    arg: UI | OverrideInterface,
    bindingCompile: boolean = false
) {
    if (bindingCompile) {
        arg.addBindings({
            source_property_name: propertyName,
            target_property_name: `#${bindingName}`,
        });
        return `#${bindingName}`;
    } else return propertyName;
}

export function GetBindingTokens(propertyName: string) {
    const tokens: Array<string> = [];

    let isString: boolean = false,
        templateStringCount: number = 0,
        parenthesesCount: number = 0,
        functionCount: number = 0,
        token: string = "";

    let skipIndex = 0;

    let index = 0;
    for (const char of propertyName) {
        index++;
        if (skipIndex === 0) {
            if (isString) {
                if (char === "{") {
                    templateStringCount++;
                    token += char;
                } else if (char === "}") {
                    templateStringCount--;
                    token += char;
                } else if (char === "'" && !templateStringCount) {
                    isString = false;
                    token += "'";
                } else token += char;
            } else {
                if (char === " " && !parenthesesCount && !functionCount) {
                    continue;
                } else if (
                    /[+*-/><=!&|]/.test(char) &&
                    !parenthesesCount &&
                    !functionCount
                ) {
                    if (
                        !/^-(\d+|(\d+\.\d+))/.test(
                            propertyName.slice(index - 1)
                        ) &&
                        token !== ""
                    ) {
                        if (/[!><]=/.test(`${char}${propertyName[index]}`)) {
                            tokens.push(token, `${char}${propertyName[index]}`);
                            token = "";
                        } else {
                            tokens.push(token, char);
                            token = "";
                        }
                    } else if (["!", "&", "|"].includes(char)) {
                        tokens.push(token, char);
                        token = "";
                    } else token = "";
                } else if (
                    /\d/.test(char) &&
                    !parenthesesCount &&
                    !functionCount
                ) {
                    if (token !== "") tokens.push(token);
                    token =
                        propertyName
                            .slice(index - 1)
                            .match(/((\d+\.\d+)|\d+)|((\d+\.\d+)|\d+)/)?.[0] ||
                        "";

                    skipIndex = token.length - 1;
                } else if (char === "(" && !functionCount) {
                    if (parenthesesCount++ === 0) {
                        if (token !== "") tokens.push(token);
                        token = char;
                    } else token += char;
                } else if (char === ")" && !functionCount) {
                    --parenthesesCount;
                    token += char;
                } else if (char === "'") {
                    isString = true;
                    if (!functionCount && !parenthesesCount) {
                        if (token !== "") tokens.push(token);
                        token = "'";
                    } else token += char;
                } else if (char === "[") {
                    functionCount++;
                    token += char;
                } else if (char === "]") {
                    functionCount--;
                    token += char;
                } else {
                    token += char;
                }
            }
        } else skipIndex--;
    }

    if (token !== "") tokens.push(token);

    return tokens;
}

export function BuildString(str: string, UIElement: UI | OverrideInterface) {
    const bindingName: Binding = `#${Random.getName()}`;
    const tokens: Array<string> = [];

    let templateStringCount = 0,
        token = "";

    for (const char of str.slice(1, str.length - 1)) {
        if (char === "{") {
            if (templateStringCount++ === 0) {
                if (token !== "") tokens.push(`'${token}'`);
                token = "";
            } else token += char;
        } else if (char === "}") {
            if (--templateStringCount === 0) {
                tokens.push(BuildBinding(`(${token})`, UIElement));
                token = "";
            } else token += char;
        } else token += char;
    }

    if (token !== "") tokens.push(`'${token}'`);

    UIElement.addBindings({
        source_property_name: `(${tokens.join(" + ")})`,
        target_property_name: bindingName,
    });

    return bindingName;
}

export function BuildFunction(
    propertyName: string,
    UIElement: UI | OverrideInterface
) {
    const bindingName: Binding = `#${Random.getName()}`;
    return bindingName;
}

export function BuildBindingBlock(
    propertyName: string,
    UIElement: UI | OverrideInterface
) {
    const bindingName: Binding = `#${Random.getName()}`;
    UIElement.addBindings({
        source_property_name: `(${BuildBinding(propertyName, UIElement)})`,
        target_property_name: bindingName,
    });
    return bindingName;
}

export function BuildFromTokens(
    tokens: Array<string>,
    UIElement: UI | OverrideInterface
) {
    let output = "";

    let index = 0;
    for (const token of tokens) {
        if (/^\(.+\)$/.test(token))
            output += `${BuildBindingBlock(
                token.slice(1, token.length - 1),
                UIElement
            )} `;
        else if (/^\w+\[.+\]$/.test(token))
            output += `${BuildFunction(token, UIElement)} `;
        else if (/^'.+'$/.test(token))
            output += `${BuildString(token, UIElement)} `;
        else {
            if (token === ">=")
                output += `> ${tokens[index + 1]} or ${tokens[index - 1]} = `;
            else if (token === "<=")
                output += `< ${tokens[index + 1]} or ${tokens[index - 1]} = `;
            else if (token === "!=") output += `= `;
            else if (token === "&") output += "and ";
            else if (token === "|") output += "or ";
            else if (token === "!") output += "not ";
            else if (
                [
                    "+",
                    "-",
                    "*",
                    "/",
                    "<",
                    ">",
                    "=",
                    "and",
                    "or",
                    "not",
                ].includes(token)
            )
                output += `${token} `;
            else {
                const next = tokens[index + 1];
                const back = tokens[index - 1];
                if (next === "!=") output += "not ( ";

                output += `${token} `;

                if (back === "!=") output += ") ";
            }
        }
        index++;
    }

    return output;
}

export function BuildBinding(
    propertyName: string,
    UIElement: UI | OverrideInterface
) {
    const result = BuildFromTokens(GetBindingTokens(propertyName), UIElement);
    return result.slice(0, result.length - 1);
}
