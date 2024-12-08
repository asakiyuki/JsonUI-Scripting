import { InputModeCondition, Scope } from "../..";
import { MappingFrom } from "../enums/MappingFrom";
import { MappingTo } from "../enums/MappingTo";
import { MappingType } from "../enums/MappingTypes";
import { Bool } from "../values/Bool";

export interface ButtonMapping {
	ignored?: Bool;
	from_button_id?: string | MappingFrom;
	to_button_id?: string | MappingTo;
	mapping_type?: MappingType;
	scope?: Scope;
	input_mode_condition?: InputModeCondition;
	ignore_input_scope?: Bool;
	consume_event?: Bool;
	handle_select?: Bool;
	handle_deselect?: Bool;
	button_up_right_of_first_refusal?: Bool;
}
