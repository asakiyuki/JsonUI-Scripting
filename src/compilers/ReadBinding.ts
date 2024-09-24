import { OverrideInterface } from "../compoments/Modify";
import { UI } from "../compoments/UI";
import { BindingName } from "../types/enums/BindingName";
import { BindingType } from "../types/enums/BindingType";
import { BindingInterface } from "../types/objects/BindingInterface";
import { Var } from "../types/values/Variable";
import { BindingCompiler } from "./BindingCompiler";

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
                BindingCompiler.compile(bindingObject.binding_name[0], arg)
            );

        if (bindingObject.source_property_name) {
            bindingObject.binding_type ||= BindingType.View;
            if (Array.isArray(bindingObject.source_property_name))
                bindingObject.source_property_name = <any>(
                    BindingCompiler.compile(
                        bindingObject.source_property_name[0],
                        arg
                    )
                );
        } else if (bindingObject.binding_collection_name) {
            bindingObject.binding_type ||= BindingType.Collection;
        }

        return <BindingInterface>bindingObject;
    }
}
