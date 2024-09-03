import { BindingName } from "../types/enums/BindingName";
import { BindingInterface } from "../types/objects/BindingInterface";
import { Var } from "../types/values/Variable";

export function ReadBinding(binding: BindingName | Var | BindingInterface) {
    if (typeof binding === "string")
        return {
            binding_name: binding,
        };
    else {
        return <BindingInterface>binding;
    }
}
