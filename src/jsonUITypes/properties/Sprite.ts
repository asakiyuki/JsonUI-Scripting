import { GlobalTypes } from "../..";
import { ClipDirection } from "../ClipDirecion";
import { FontType } from "../FontType";
import { TextureFileSystem } from "../TextureFileSystem";
import { Bool, Vector2, Vector4, Num, Vector3 } from "../Types";

export default interface SpriteInterface {
    texture?: GlobalTypes,
    allow_debug_missing_texture?: GlobalTypes | Bool,
    color?: GlobalTypes | Vector3,
    locked_color?: GlobalTypes | Vector3,
    uv?: GlobalTypes | Vector2,
    uv_size?: GlobalTypes | Vector2,
    texture_file_system?: GlobalTypes | TextureFileSystem,
    nineslice_size?: GlobalTypes | Vector2 | Vector4 | Num,
    tiled?: GlobalTypes | Bool | Vector2,
    tiled_scale?: GlobalTypes | Vector2,
    clip_direction?: GlobalTypes | ClipDirection,
    clip_ratio?: GlobalTypes | Num,
    clip_pixelperfect?: GlobalTypes | Bool,
    keep_ratio?: GlobalTypes | Bool,
    bilinear?: GlobalTypes | Bool,
    fill?: GlobalTypes | Bool,
    font_type?: GlobalTypes | FontType,
    "$fit_to_width"?: GlobalTypes | Bool,
    zip_folder?: GlobalTypes,
    grayscale?: GlobalTypes | Bool,
    force_texture_reload?: GlobalTypes | Bool,
    base_size?: GlobalTypes | Vector2,
}