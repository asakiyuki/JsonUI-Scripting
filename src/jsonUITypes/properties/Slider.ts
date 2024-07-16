import { GlobalTypes } from "../JsonUIProperty";
import { Orientation } from "../Orientation";
import { Num, Bool } from "../Types";

export default interface SliderInterface {
    slider_track_button?: GlobalTypes,
    slider_small_decrease_button?: GlobalTypes,
    slider_small_increase_button?: GlobalTypes,
    slider_steps?: GlobalTypes | Num,
    slider_direction?: GlobalTypes | Orientation,
    slider_timeout?: GlobalTypes | Num,
    slider_collection_name?: GlobalTypes,
    slider_name?: GlobalTypes,
    slider_select_on_hover?: GlobalTypes | Bool,
    slider_selected_button?: GlobalTypes,
    slider_deselected_button?: GlobalTypes,
    slider_box_control?: GlobalTypes,
    background_control?: GlobalTypes,
    background_hover_control?: GlobalTypes,
    progress_control?: GlobalTypes,
    progress_hover_control?: GlobalTypes,
}