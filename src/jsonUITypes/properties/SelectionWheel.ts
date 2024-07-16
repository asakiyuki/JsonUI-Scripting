import { GlobalTypes } from "../..";
import { Num, ArrString } from "../Types";

export default interface SelectionWheelInterface {
    inner_radius?: GlobalTypes | Num,
    outer_radius?: GlobalTypes | Num,
    state_controls?: GlobalTypes | ArrString,
    slice_count?: GlobalTypes | Num,
    button_name?: GlobalTypes,
    iterate_left_button_name?: GlobalTypes,
    iterate_right_button_name?: GlobalTypes,
    initial_button_slice?: GlobalTypes | Num,
}