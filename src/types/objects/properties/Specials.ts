import { Orientation } from "../../enums/Orientation";
import { Renderer } from "../../enums/Renderer";
import { Rotation } from "../../enums/Rotation";
import { Bool } from "../../values/Bool";
import { Float } from "../../values/Number";
import { Var } from "../../values/Variable";
import { Vector4 } from "../../values/Vector";

export interface Special {
    gradient_direction?: Var | Orientation,
    color1?: Vector4,
    color2?: Vector4,
    text_color?: Vector4,
    background_color?: Vector4,
    primary_color?: Vector4,
    secondary_color?: Vector4,
    camera_tilt_degrees?: Float,
    starting_rotation?: Bool,
    use_uuid?: Bool,
    use_skin_gui_scale?: Bool,
    use_player_paperdoll?: Bool,
    rotation?: Var | Rotation,
    end_event?: string
};

interface Gradient {
    gradient_direction?: Var | Orientation,
    color1?: Vector4,
    color2?: Vector4
}

interface Nametag {
    text_color?: Vector4,
    background_color?: Vector4
};

interface ProgessBar {
    primary_color?: Vector4,
    secondary_color?: Vector4
};

interface PaperDoll {
    camera_tilt_degrees?: Float,
    starting_rotation?: Bool,
    use_uuid?: Bool,
    use_skin_gui_scale?: Bool,
    use_player_paperdoll?: Bool,
    rotation?: Var | Rotation
};

interface Panorama {
    rotation?: Var | Rotation
};

interface Credits {
    end_event?: string
};

export type Specials = {
    [Renderer.Gradient]: Gradient,
    [Renderer.NameTag]: Nametag,
    [Renderer.ProgressBar]: ProgessBar,
    [Renderer.PaperDoll]: PaperDoll,
    [Renderer.Panorama]: Panorama,
    [Renderer.Credits]: Credits,
    [key: string]: object
};