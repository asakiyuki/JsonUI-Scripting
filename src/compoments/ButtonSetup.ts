import { ButtonMapping } from "../jsonUITypes/ButtonMapping";
import { FromKeybind } from "../jsonUITypes/FromKeyBind";
import { MappingType } from "../jsonUITypes/MappingTypes";
import { ToKeybind } from "../jsonUITypes/ToKeyBind";

export class ButtonKeybindSetup {
    static pressed(onClickKey: ToKeybind | string): ButtonMapping[] {
        return [
            {
                from_button_id: FromKeybind.MenuOk,
                to_button_id: onClickKey,
                mapping_type: MappingType.Pressed
            },
            {
                from_button_id: FromKeybind.MenuSelect,
                to_button_id: onClickKey,
                mapping_type: MappingType.Pressed
            }
        ]
    }
    static doublePressed(onClickKey: ToKeybind | string): ButtonMapping[] {
        return [
            {
                from_button_id: FromKeybind.MenuOk,
                to_button_id: onClickKey,
                mapping_type: MappingType.DoublePressed
            },
            {
                from_button_id: FromKeybind.MenuSelect,
                to_button_id: onClickKey,
                mapping_type: MappingType.DoublePressed
            }
        ]
    }

    private static apply() { };
    private static arguments = '';
    private static bind() { };
    private static call() { };
    private static caller = '';
    private static length = '';
    private static name = '';
    private static toString() { };
}