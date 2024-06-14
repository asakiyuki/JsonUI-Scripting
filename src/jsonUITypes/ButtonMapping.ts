import { FromKeybind } from "./FromKeyBind";
import { InputModeCondition } from "./InputModeCondition";
import { MappingType } from "./MappingTypes";
import { Scope } from "./Scope";
import { ToKeybind } from "./ToKeyBind";
import { Bool } from "./Types";

export interface ButtonMapping {
    ignored?: Bool,
    from_button_id?: FromKeybind | string,
    to_button_id?: ToKeybind | string,
    mapping_type?: MappingType | string,
    scope?: Scope | string,
    input_mode_condition?: InputModeCondition | string,
    ignore_input_scope?: Bool,
    consume_event?: Bool,
    handle_select?: Bool,
    handle_deselect?: Bool,
    button_up_right_of_first_refusal?: Bool
}