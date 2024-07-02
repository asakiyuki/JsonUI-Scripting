import { BindingInterface } from "../jsonUITypes/BindingInterface";

export class JsonUILib {
    static floatToIntBindingsBuild(binding_name: string, binding_name_override: string, max_int: number, checkNegative: boolean = false): BindingInterface[] | undefined {
        try {
            if (max_int >= 10000000000) throw "Max int should lower 10000000000";
            const l = `${max_int}`.length, _: BindingInterface[] = [];
            let i = l, $: any[] = [], e = binding_name;
            if (checkNegative) {
                _.push({
                    binding_type: "view",
                    source_property_name: `(#${binding_name} * ( 1 - ((#${binding_name} < 0) * 2)))`,
                    target_property_name: `#${binding_name}_negative`
                });
                binding_name = `${binding_name}_negative`;
            }
            binding_name = binding_name.slice(1);
            while (i-- > 1) {
                const nine = Array.from({ length: i - 1 }, () => '9').join('');
                _.push({
                    binding_type: "view",
                    source_property_name: (i === l - 1)
                        ? `(${Array.from({ length: 10 }, (v, a) => `(#${binding_name} > ${!a ? '' : a}${nine}) * ${eval(`1e${i - 1}`)}`).join(' + ')})`
                        : `(${Array.from({ length: 10 }, (v, a) => `((#${binding_name}${i === l - 2 ? '' : `_${l - i - 2}`} - #${binding_name}_${l - i - 1}) > ${!a ? (i === 1) ? 0 : '' : a}${nine})${i === 1 ? '' : ` * ${eval(`1e${i - 1}`)}`}`).join(' + ')
                        })`,
                    target_property_name: `#${binding_name}_${l - i}`
                })
                $.push(`#${binding_name}_${l - i}`);
            }

            _.push({
                binding_type: "view",
                source_property_name: (() => {
                    const _ = `(${checkNegative ? `(1 - ((#${e} < 0) * 2)) * ` : ''}(${$.join(' + ')}))`;
                    return checkNegative ? _ : `(${_.replace(/(\)\))|(\(\()/g, '')})`
                })(),
                target_property_name: `#${binding_name_override}`
            });

            return _;
        } catch (error) {
            console.error(error);
        }
    }
}