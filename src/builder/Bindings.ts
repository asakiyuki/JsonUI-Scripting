import { generateRandomName } from "../jsonUI/GenerateRandomName";
import { BindingInterface } from "../jsonUITypes/BindingInterface";

/**
 * Lexer function to tokenize the input string into an array of tokens.
 *
 * @param data - The input string to tokenize.
 * @returns An array of tokens.
 */
function lexer(data: string) {
    const xlrq: string[] = [];
    let index = -1;

    let openCount = 0;
    let strHandler = '';
    let onString = false;
    let onIdk = false;
    while (index++ < (data.length - 1)) {
        switch (data[index]) {
            case " ":
                if (onString) strHandler += " ";
                break;
            case "'":
                if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(onString ? `'${strHandler}'` : strHandler);
                    onString = !onString;
                    strHandler = "";
                } else strHandler += data[index];
                break;
            case '(':
                if (strHandler !== '') xlrq.push(strHandler);
                if (onIdk && !onString) {
                    onIdk = false;
                    strHandler = '';
                };
                if (onString) {
                    strHandler += data[index];
                } else if (++openCount === 1) {
                    xlrq.push('(');
                    strHandler = '';
                }
                if (openCount > 1) {
                    strHandler += data[index];
                };
                break;
            case ')':
                if (onString) {
                    strHandler += data[index];
                } else if (--openCount === 0) {
                    xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push(')');
                }
                if (openCount >= 1) {
                    strHandler += data[index];
                };
                break;
            case '+':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('+');
                } else strHandler += data[index];
                break;
            case '?':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('?');
                } else strHandler += data[index];
                break;
            case '-':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('-');
                } else strHandler += data[index];
                break;
            case '*':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('*');
                } else strHandler += data[index];
                break;
            case '/':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('/');
                } else strHandler += data[index];
                break;
            case '>':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('>');
                } else strHandler += data[index];
                break;
            case '<':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('<');
                } else strHandler += data[index];
                break;
            case '^':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('^');
                } else strHandler += data[index];
                break;
            case '~':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('~');
                } else strHandler += data[index];
                break;
            case '%':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('%');
                } else strHandler += data[index];
                break;
            case '@':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('@');
                } else strHandler += data[index];
                break;
            case '&':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('&');
                } else strHandler += data[index];
                break;
            case '|':
                if (onString) {
                    strHandler += data[index];
                } else if (openCount <= 1) {
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    xlrq.push('|');
                } else strHandler += data[index];
                break;
            case '=':
                if (onString) strHandler += data[index];
                else {
                    if (onIdk) strHandler += (strHandler == '!') ? '=' : '==';
                    if (strHandler !== '') xlrq.push(strHandler);
                    strHandler = '';
                    if (!onIdk) strHandler = '';
                    onIdk = !onIdk;
                }
                break;
            case '!':
                if (onString) strHandler += data[index];
                else {
                    if (strHandler !== '') xlrq.push(strHandler);
                    if (onIdk) xlrq.push('');
                    strHandler = '!';
                    onIdk = true;
                }
                break;
            default:
                if (onIdk) {
                    xlrq.push(strHandler);
                    onIdk = false;
                    strHandler = '';
                }
                strHandler += data[index];
                break;
        }
    }

    if (strHandler !== '') xlrq.push(strHandler);

    return xlrq;
}

/**
 * Parser function to transform the array of tokens into a structured format.
 *
 * @param data - The array of tokens to parse.
 * @returns An array of parsed tokens.
 */
function parser(data: string[]): string[] {
    const bak = Array.from(data);
    let index = 0;

    for (const value of data) {
        if (['+', '-', '*', '/', '>', '<'].includes(value)) {
            data[index] = `${bak[index - 1]} ${bak[index]} ${bak[index + 1]}`;
            data = data.filter((v, i) => (i !== (index - 1)) && (i !== (index + 1)));
            break;
        } else if (value === '&') {
            data[index] = `${bak[index - 1]} and ${bak[index + 1]}`;
            data = data.filter((v, i) => (i !== (index - 1)) && (i !== (index + 1)));
            break;
        } else if (value === '|') {
            data[index] = `${bak[index - 1]} or ${bak[index + 1]}`;
            data = data.filter((v, i) => (i !== (index - 1)) && (i !== (index + 1)));
            break;
        } else if (value === '==') {
            data[index] = `${bak[index - 1]} = ${bak[index + 1]}`;
            data = data.filter((v, i) => (i !== (index - 1)) && (i !== (index + 1)));
            break;
        } else if (value === '!=') {
            data[index] = `not (${bak[index - 1]} = ${bak[index + 1]})`;
            data = data.filter((v, i) => (i !== (index - 1)) && (i !== (index + 1)));
            break;
        } else if (value === '!') {
            data[index] = `not ${bak[index + 1]}`;
            data = data.filter((v, i) => (i !== (index + 1)));
            break;
        } else if (value === '%') {
            data[index] = `${bak[index - 1]} - (${bak[index - 1]} / ${bak[index + 1]} * ${bak[index + 1]})`;
            data = data.filter((v, i) => (i !== (index - 1)) && (i !== (index + 1)));
            break;
        } else if (value === '?') {
            data[index] = `not ((${data[index - 1]} - ${data[index + 1]}) = ${data[index - 1]})`;
            data = data.filter((v, i) => (i !== (index - 1)) && (i !== (index + 1)));
            break;
        } else if (value === '@') {
            data[index] = `'%.${data[index + 1]}s' * ${data[index - 1]}`;
            data = data.filter((v, i) => (i !== (index - 1)) && (i !== (index + 1)));
            break;
        } else if (value === '^') {
            const $0 = data[index - 1];
            const $1 = data[index + 1];

            const $1Length = $1.includes("'") ? ($1.length - 2) : $1.length;

            data[index] = `'%.${$1Length}s' * ${$0} = ${$1}`;
            data = data.filter((v, i) => (i !== (index - 1)) && (i !== (index + 1)));
            break;
        } else if (value === '~') {
            const $0 = data[index - 1];
            const $1 = data[index + 1].includes("'") ? data[index + 1].slice(1, data[index + 1].length - 1) : data[index + 1];
            const rnd = generateRandomName();
            data[index] = `not (((${$0} + '${rnd}') - (${$1} + '${rnd}')) = ${$0})`;
            data = data.filter((v, i) => (i !== (index - 1)) && (i !== (index + 1)));
            break;
        }

        index++;
    }
    if (JSON.stringify(data) !== JSON.stringify(bak)) data = parser(data);
    return data;
}

/**
 * Binding Syntax Handler function to handle the syntax of binding expressions.
 *
 * @param data - The input binding expression string.
 * @returns The parsed and formatted binding expression string.
 */
function bindingSyntaxHandler(data: string): string {
    let arr: string[] = [];
    const strLexer = lexer(data);

    for (const value of strLexer) {
        const $ = lexer(value);
        if ($.length > 1) arr.push(bindingSyntaxHandler(value));
        else arr.push(value);
    };

    arr = parser(arr);

    return arr.join('');
}

/**
 * Bindings Handle function to process and format the binding expressions.
 *
 * @param bindings - The array of binding expressions to process.
 * @returns An array of formatted binding expressions.
 */
export function BindingsHandle(bindings: (BindingInterface | string | string[])[]): BindingInterface[] {
    const jsonUIBindings: BindingInterface[] = [];
    for (const binding of bindings) {
        if (typeof binding === 'string')
            jsonUIBindings.push({ binding_name: binding });
        else if (Array.isArray(binding))
            jsonUIBindings.push({ binding_name: bindingSyntaxHandler(binding[0]) });
        else {
            const { binding_name, source_property_name } = binding;
            if (Array.isArray(binding_name))
                binding.binding_name = bindingSyntaxHandler(<string>binding_name[0]);
            if (Array.isArray(source_property_name))
                binding.source_property_name = bindingSyntaxHandler(<string>source_property_name[0]);
            jsonUIBindings.push(binding);
        }
    }
    return jsonUIBindings;
}