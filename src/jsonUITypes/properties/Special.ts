import { GlobalTypes } from "../..";
import { Orientation } from "../Orientation";
import { RotationAuto } from "../RotationAuto";
import { Vector4, Num, Bool } from "../Types";

export default interface SpecialInterface {
    gradient_direction?: GlobalTypes | Orientation,
    color1?: GlobalTypes | Vector4,
    color2?: GlobalTypes | Vector4,
    text_color?: GlobalTypes | Vector4,
    background_color?: GlobalTypes | Vector4,
    primary_color?: GlobalTypes | Vector4,
    secondary_color?: GlobalTypes | Vector4,
    camera_tilt_degrees?: GlobalTypes | Num,
    starting_rotation?: GlobalTypes | Num,
    use_selected_skin?: GlobalTypes | Bool,
    use_uuid?: GlobalTypes | Bool,
    use_skin_gui_scale?: GlobalTypes | Bool,
    use_player_paperdoll?: GlobalTypes | Bool,
    rotation?: GlobalTypes | RotationAuto,
    end_event?: GlobalTypes
}