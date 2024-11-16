import { Items } from "../compoments/ItemDatas";
import { Random } from "../compoments/Random";
import { BindingCompiler, BindingFunctionObject } from "./BindingCompiler";

export const funcObj: BindingFunctionObject = {
	sum: (arg, params) => {
		const bindingName = `#${Random.getName()}`;
		arg.addBindings({
			source_property_name: `(${params.join(" + ")})`,
			target_property_name: <any>bindingName,
		});
		return bindingName;
	},

	sumAvg: (arg, params) => {
		const bindingName = `#${Random.getName()}`;

		arg.addBindings({
			source_property_name: `((${params.join(" + ")}) / ${
				params.length
			})`,
			target_property_name: <any>bindingName,
		});

		return bindingName;
	},

	max: (arg, params) => {
		let current = params[0];

		for (const nextBinding of params.slice(1)) {
			arg.addBindings({
				source_property_name: [
					`(${current} >= ${nextBinding}) * ${current} + (${current} < ${nextBinding}) * ${nextBinding}`,
				],
				target_property_name: <any>(current = `#${Random.getName()}`),
			});
		}

		return current;
	},

	min: (arg, params) => {
		let current = params[0];

		for (const nextBinding of params.slice(1)) {
			arg.addBindings({
				source_property_name: [
					`(${current} <= ${nextBinding}) * ${current} + (${current} > ${nextBinding}) * ${nextBinding}`,
				],
				target_property_name: <any>(current = `#${Random.getName()}`),
			});
		}

		return current;
	},

	abs: (arg, [binding]) => {
		const bindingName = `#${Random.getName()}`;
		arg.addBindings({
			source_property_name: `((-1 + (${binding} > 0) * 2) * ${binding})`,
			target_property_name: <any>bindingName,
		});
		return bindingName;
	},

	isEven: (arg, params) => {
		const bindingName = `#${Random.getName()}`;
		if (params.length > 1) {
			params.map((binding) => {
				const bindingName = `#${Random.getName()}`;
				arg.addBindings({
					source_property_name: [`(${binding} % 2) == 0`],
					target_property_name: <any>bindingName,
				});
				return bindingName;
			});
			arg.addBindings({
				source_property_name: `(${params.join(" and ")})`,
				target_property_name: <any>bindingName,
			});
		} else {
			arg.addBindings({
				source_property_name: [`(${params[0]} % 2) == 0`],
				target_property_name: <any>bindingName,
			});
		}

		return bindingName;
	},

	isOdd: (arg, params) => {
		const bindingName = `#${Random.getName()}`;
		if (params.length > 1) {
			params.map((binding) => {
				const bindingName = `#${Random.getName()}`;
				arg.addBindings({
					source_property_name: [`(${binding} % 2) == 1`],
					target_property_name: <any>bindingName,
				});
				return bindingName;
			});
			arg.addBindings({
				source_property_name: `(${params.join(" and ")})`,
				target_property_name: <any>bindingName,
			});
		} else {
			arg.addBindings({
				source_property_name: [`(${params[0]} % 2) == 1`],
				target_property_name: <any>bindingName,
			});
		}

		return bindingName;
	},

	getItemID: (arg, [identification]) => {
		const bindingName: any = `#${Random.getName()}`;

		arg.setProperties({
			property_bag: {
				[bindingName]: Items.getID(identification),
			},
		});

		return bindingName;
	},

	getItemAuxID: (arg, [identification]) => {
		const bindingName: any = `#${Random.getName()}`;

		arg.setProperties({
			property_bag: {
				[bindingName]: Items.getAuxID(identification),
			},
		});

		return bindingName;
	},

	int: (arg, [float, intLength]) => {
		const sumBnd: Array<string> = [];
		const _intLength = Number.isNaN(+intLength) ? 9 : +intLength;
		let bindingName: any = `#${Random.getName()}`;
		let calcBindingName: any = `#${Random.getName()}`;

		arg.addBindings({
			source_property_name: [`abs(${float})`],
			target_property_name: <any>(
				(calcBindingName = `#${Random.getName()}`)
			),
		});

		for (let i = Math.max(_intLength - 1, 0); i >= 0; i--) {
			arg.addBindings({
				source_property_name: `(${eval(`1e${i}`)} * (${Array.from(
					{
						length: 10,
					},
					(v, c) =>
						`(${calcBindingName} > ${eval(`${c + 1}e${i}`) - 1})`
				).join(" + ")}))`,
				target_property_name: <any>(
					(bindingName = `#${Random.getName()}`)
				),
			});
			sumBnd.push(bindingName);
			if (i !== 0)
				arg.addBindings({
					source_property_name: `(${calcBindingName} - ${bindingName})`,
					target_property_name: <any>(
						(calcBindingName = `#${Random.getName()}`)
					),
				});
		}

		arg.addBindings([
			{
				source_property_name: `(${sumBnd.join(" + ")})`,
				target_property_name: <any>(
					(bindingName = `#${Random.getName()}`)
				),
			},
			{
				source_property_name: `(${bindingName} * (1 - (${float} < 0) * 2))`,
				target_property_name: <any>(
					(bindingName = `#${Random.getName()}`)
				),
			},
		]);

		return bindingName;
	},

	array: (arg, params) => {
		const bindingName: any = `#${Random.getName()}`,
			arrayBindingName: any = `#${Random.getName()}`;

		const accessIndex = params[0];
		const arrayItems = params.slice(1);

		arg.addBindings([
			...arrayItems.map((v, i) => ({
				source_property_name: BindingCompiler.checkAndBuild(v, arg),
				target_property_name: <any>`${arrayBindingName}${i}`,
			})),
			{
				source_property_name: [
					`'${arrayBindingName}{${BindingCompiler.checkAndBuild(
						accessIndex,
						arg
					)}}'`,
				],
				target_property_name: bindingName,
			},
		]);

		return bindingName;
	},

	getPrefix: (arg, [str, strLength]) => {
		const bindingName: any = `#${Random.getName()}`;

		if (
			!(
				BindingCompiler.isString(str) ||
				BindingCompiler.isHasBinding(str)
			)
		)
			str = `'${str}'`;

		arg.addBindings({
			source_property_name: [
				Number.isNaN(+strLength)
					? `(${str}) * ('%.{'{${strLength}}s'}')`
					: `(${str}) * ('%.{'${strLength}s'}')`,
			],
			target_property_name: bindingName,
		});

		return bindingName;
	},

	slice: (arg, [str, start, end]) => {
		const bindingName: any = `#${Random.getName()}`;

		if (
			!(
				BindingCompiler.isString(str) ||
				BindingCompiler.isHasBinding(str)
			)
		)
			str = `'${str}'`;

		if (end) {
			arg.addBindings({
				source_property_name: [
					`getPrefix(slice(${str}, ${start}), ${end} - ${start})`,
				],
				target_property_name: bindingName,
			});
		} else {
			arg.addBindings({
				source_property_name: [
					`'asa39921728{${str}}' - 'asa39921728{getPrefix(${str}, ${start})}'`,
				],
				target_property_name: bindingName,
			});
		}

		return bindingName;
	},
};
