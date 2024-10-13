import { Items } from "../compoments/ItemDatas";
import { Random } from "../compoments/Random";
import { BindingFunctionObject } from "./BindingCompiler";

export const funcObj: BindingFunctionObject = {
    mod: (arg, [a, b]) => {
        const bindingName = `#${Random.getName()}`;

        arg.addBindings({
            source_property_name: [`${a} % ${b}`],
            target_property_name: <any>bindingName,
        });

        return bindingName;
    },

    sum: (arg, params) => {
        const bindingName = `#${Random.getName()}`;
        arg.addBindings({
            source_property_name: `(${params.join(" + ")})`,
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
                    source_property_name: [`mod(${binding}, 2) == 0`],
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
                source_property_name: [`mod(${params[0]}, 2) == 0`],
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
                    source_property_name: [`mod(${binding}, 2) == 0`],
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
                source_property_name: [`mod(${params[0]}, 2) == 1`],
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
};
