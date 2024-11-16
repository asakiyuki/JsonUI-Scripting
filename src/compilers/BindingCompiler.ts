import { UI } from "../compoments/UI";
import { OverrideInterface } from "../compoments/Modify";
import { Random } from "../compoments/Random";
import { funcObj } from "./BindingFunctions";

export interface BindingFunctionObject {
	[key: string]: (
		arg: UI | OverrideInterface,
		params: Array<string>
	) => string;
}

export class BindingCompiler {
	static compile(propetyName: string, arg: UI | OverrideInterface) {
		return this.build(propetyName, arg);
	}

	static build(propertyName: string, arg: UI | OverrideInterface) {
		const tokens = this.lexer(propertyName, arg);

		let build = "(";

		for (let index = 0; index < tokens.length; index++) {
			const token = tokens[index];

			if (token === "==") build += "= ";
			else if (token === "&") build += "and ";
			else if (token === "|") build += "or ";
			else if (token === "!") build += "not ";
			else {
				if (
					this.isNegativeNumber(token) &&
					!this.isOperator(tokens[index - 1]) &&
					tokens[index - 1] !== undefined
				) {
					build += `- ${token.slice(1)} `;
				} else build += `${token} `;
			}
		}

		build = `${build.slice(0, build.length - 1)})`;

		return build;
	}

	static buildNewPropertyBag(token: string, arg: UI | OverrideInterface) {
		const bindingName: any = `#${Random.getName()}`;
		arg.setProperties({
			property_bag: {
				[bindingName]: BindingCompiler.build(token, arg),
			},
		});
		return bindingName;
	}

	static checkAndBuild(token: string, arg: UI | OverrideInterface) {
		return this.isHasBinding(token)
			? this.build(token, arg)
			: this.buildNewPropertyBag(token, arg);
	}

	static compileSpecialOperator(
		tokens: Array<string>,
		arg: UI | OverrideInterface
	) {
		const firstTokens: Array<string> = [];

		if (tokens.includes("?")) {
			const startIndex = tokens.indexOf("?");
			firstTokens.push(...tokens.slice(0, startIndex));

			const secondTokens: Array<string> = [];
			const thirdTokens: Array<string> = [];

			let questionCount = 1;
			let endIndex = -1;

			for (let index = startIndex + 1; index < tokens.length; index++) {
				const token = tokens[index];

				if (token === "?") questionCount++;
				else if (token === ":" && --questionCount == 0) {
					endIndex = index;
					break;
				}

				secondTokens.push(token);
			}

			thirdTokens.push(...tokens.slice(endIndex + 1));

			const generateBindingName = `#${Random.getName()}`;
			const firstBinding = this.checkAndBuild(firstTokens.join(""), arg);
			const secondBinding = `${generateBindingName}true`;
			const thirdBinding = `${generateBindingName}false`;

			arg.addBindings([
				{
					source_property_name: this.checkAndBuild(
						secondTokens.join(""),
						arg
					),
					target_property_name: <any>secondBinding,
				},
				{
					source_property_name: this.checkAndBuild(
						thirdTokens.join(""),
						arg
					),
					target_property_name: <any>thirdBinding,
				},
				{
					source_property_name: [
						`'${generateBindingName}{${firstBinding}}'`,
					],
					target_property_name: <any>generateBindingName,
				},
			]);

			return [generateBindingName];
		} else {
			for (let index = 0; index < tokens.length; index++) {
				const token = tokens[index];
				if (["%", ">=", "<=", "!="].includes(token)) {
					const secondTokens = tokens.slice(index + 1);

					const firstBinding =
						firstTokens.length === 1
							? firstTokens[0]
							: this.buildNewBinding(firstTokens.join(""), arg);

					const secondBinding =
						secondTokens.length === 1
							? secondTokens[0]
							: this.buildNewBinding(
									tokens.slice(index + 1).join(""),
									arg
							  );

					switch (token) {
						case ">=": {
							return [
								firstBinding,
								">",
								secondBinding,
								"|",
								firstBinding,
								"==",
								secondBinding,
							];
						}
						case "<=": {
							return [
								firstBinding,
								"<",
								secondBinding,
								"|",
								firstBinding,
								"==",
								secondBinding,
							];
						}
						case "!=": {
							return [
								"not",
								this.buildNewBinding(
									`${firstBinding} == ${secondBinding}`,
									arg
								),
							];
						}
						case "%": {
							return [
								firstBinding,
								"-",
								firstBinding,
								"/",
								secondBinding,
								"*",
								secondBinding,
							];
						}
					}
				} else firstTokens.push(token);
			}
		}

		return firstTokens;
	}

	static lexer(propertyName: string, arg: UI | OverrideInterface) {
		const getTokens = this.compileSpecialOperator(
			this.readTokens(this.getTokens(this.splitString(propertyName))).map(
				(token) => {
					if (this.isCodeBlock(token))
						return <string>(
							this.buildNewBinding(
								token.slice(1, token.length - 1),
								arg
							)
						);
					else if (this.isFunction(token)) {
						return <string>this.functionHandler(token, arg);
					} else if (this.isString(token)) {
						return <string>this.stringHandler(token, arg);
					} else return token;
				}
			),
			arg
		);

		return getTokens;
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

	static stringHandler(token: string, arg: UI | OverrideInterface) {
		const tokens = this.getStringTokens(
			token.slice(1, token.length - 1)
		).map((token) => {
			if (this.isStringCode(token))
				return BindingCompiler.build(
					token.slice(1, token.length - 1),
					arg
				);
			else return `'${token}'`;
		});
		return tokens.length > 1 ? `(${tokens.join(" + ")})` : tokens[0];
	}

	static getStringTokens(token: string) {
		const tokens: Array<string> = [];
		let bracketsCount = 0,
			strToken = "";

		for (const char of token) {
			if (char === "{") {
				if (bracketsCount++ === 0 && strToken !== "") {
					tokens.push(strToken);
					strToken = "";
				}
				strToken += char;
			} else if (char === "}") {
				strToken += char;
				if (--bracketsCount === 0 && strToken !== "") {
					tokens.push(strToken);
					strToken = "";
				}
			} else strToken += char;
		}

		if (strToken !== "") tokens.push(strToken);

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
				`[Compile error] Cannot found '${func.name}' function!`
			);
			str = `'[Compile Error]: function >>${func.name}<< not found!'`;
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
		let param = "",
			$ = 0;

		for (const token of tokens) {
			if (token === "," && !$) {
				params.push(param);
				param = "";
			} else if (token === "(") {
				$++;
				param += token;
			} else if (token === ")") {
				$--;
				param += token;
			} else param += token;
		}
		if (param !== "") params.push(param);

		return {
			name,
			params: params.map((token) => {
				if (this.getTokens(this.splitString(token)).length > 1)
					return this.build(
						this.isCodeBlock(token) ? token : `(${token})`,
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
						/-?\d+\.\d+|-\d+|\d+|[#$]?\w+|[><=!]?=|[\[\]()+\-*\/=><!,&%|?:]/gm
					) ?? [])
				);
		}
		return tokens;
	}

	static buildNewBinding(token: string, arg: UI | OverrideInterface) {
		const rndName: `#${string}` = `#${Random.getName()}`;

		if (this.isHasBinding(token)) {
			arg.addBindings({
				source_property_name: [token],
				target_property_name: rndName,
			});
		} else {
			arg.setProperties({
				property_bag: {
					[rndName]: this.compile(token, arg),
				},
			});
		}

		return rndName;
	}

	static isString(token: string) {
		return /^'.+'$/.test(token);
	}

	static isStringCode(token: string) {
		return /^{.+}$/.test(token);
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

	static isNumber(value: string) {
		return !Number.isNaN(+value);
	}
}
