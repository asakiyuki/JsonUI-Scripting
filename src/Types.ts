import { JsonUIElement } from "./Element"
import { DefaultGlobalVariableTypes } from "./GlobalVariablesTypes"

export enum ElementTypes {
    Panel = "panel",
    StackPanel = "stack_panel",
    CollectionPanel = "collection_panel",
    InputPanel = "input_panel",
    Grid = "grid",
    Button = "button",
    Toggle = "toggle",
    Label = "label",
    Image = "image",
    Dropdown = "dropdown",
    Slider = "slider",
    SliderBox = "slider_box",
    EditBox = "edit_box",
    ScrollView = "scroll_view",
    ScrollbarTrack = "scrollbar_track",
    ScrollbarBox = "scrollbar_box",
    Factory = "factory",
    Screen = "screen",
    Custom = "custom",
    SelectionWheel = "selection_wheel"
}

export enum AnimTypes {
    Alpha = "alpha",
    Clip = "clip",
    Color = "color",
    FlipBook = "flip_book",
    Offset = "offset",
    Size = "size",
    Uv = "uv",
    Wait = "wait",
    AsepriteFlipBook = "aseprite_flip_book"
}

export enum Anchor {
    TopLeft = "top_left",
    TopMiddle = "top_middle",
    TopRight = "top_right",
    LeftMiddle = "left_middle",
    Center = "center",
    RightMiddle = "right_middle",
    BottomLeft = "bottom_left",
    BottomMiddle = "bottom_middle",
    BottomRight = "bottom_right"
}

export enum EasingTypes {
    Linear = "linear",
    Spring = "spring",
    InQuad = "in_quad",
    OutQuad = "out_quad",
    InOutQuad = "in_out_quad",
    InCuic = "in_cubic",
    OutCubic = "out_cubic",
    InOutCubic = "in_out_cubic",
    InQuart = "in_quart",
    OutQuart = "out_quart",
    InOutQuart = "in_out_quart",
    InQuint = "in_quint",
    OutQuint = "out_quint",
    InOutQuint = "in_out_quint",
    InSine = "in_sine",
    OutSine = "out_sine",
    InOutSine = "in_out_sine",
    InExpo = "in_expo",
    OutExpo = "out_expo",
    InOutExpo = "in_out_expo",
    InCirc = "in_circ",
    OutCirc = "out_circ",
    InOutCirc = "in_out_circ",
    InBounce = "in_bounce",
    OutBounce = "out_bounce",
    InOutBounce = "in_out_bounce",
    InBack = "in_back",
    OutBack = "out_back",
    InOutBack = "in_out_back",
    InElastic = "in_elastic",
    OutElastic = "out_elastic",
    InOutElastic = "in_out_elastic"
}

export interface AnimationData {
    duration: number | DefaultGlobalVariableTypes,
    destroy_at_end?: string | DefaultGlobalVariableTypes,
    ease?: EasingTypes,
    set_value: any | DefaultGlobalVariableTypes,
    initial_uv?: [number, number],
    fps?: number,
    frame_count?: number,
    frame_step?: number,
    reversible?: boolean,
    resettable?: boolean,
    scale_from_starting_alpha?: boolean,
    activated?: boolean
}

export interface AnimationInterface {
    type: AnimTypes,
    name: string,
    namespace: string,
    start_value: any,
    loop?: boolean,
    play_event?: string,
    end_event?: string,
    start_event?: string,
    reset_event?: string,
    data: AnimationData[]
}

export interface ElementInterface {
    type?: ElementTypes,
    name: string,
    namespace: string,
    extend?: JsonUIElement
}

export interface ElementCachedInterface {
    name: string,
    namespace: string,
    type: string | ElementTypes,
    extend?: {
        name: string,
        namespace: string,
    }
}

export interface ElementVariables {
    require: string | boolean,
    value: any
}

export interface BindingInterface {
    ignored?: boolean | string,
    binding_type?: 'global' | 'view' | 'collection' | 'collection_details' | 'none',
    binding_name?: string,
    binding_name_override?: string,
    binding_collection_name?: string,
    binding_collection_prefix?: string,
    binding_condition?: 'always' | 'always_when_visible' | 'visible' | 'once' | 'none' | 'visibility_changed',
    source_control_name?: JsonUIElement | string,
    source_property_name?: string,
    target_property_name?: string,
    resolve_sibling_scope?: boolean | string
}

export interface ChildrenID {
    [key: string]: number
}

export interface RegisterResourcePack {
    version?: [number, number, number],
    uuid?: string,
    pack_name: string,
    description?: string,
    min_version?: [number, number, number]
}

export interface ControlInterface {
    visible?: boolean | string,
    enabled?: boolean | string,
    layer?: number | string,
    alpha?: number | string,
    propagate_alpha?: boolean | string,
    clips_children?: boolean | string,
    allow_clipping?: boolean | string,
    clip_offset?: [number | string, number | string] | string,
    clip_state_change_event?: string,
    enable_scissor_test?: boolean | string,
    property_bag?: object | string,
    selected?: boolean | string,
    use_child_anchors?: boolean | string,
    disable_anim_fast_forward?: boolean | string,
    animation_reset_name?: string,
    ignored?: boolean | string,
    grid_position?: [number, number],
    collection_index?: boolean | string
}

export interface LayoutInterface {
    size?: [number | string, number | string] | string,
    min_size?: [number | string, number | string] | string,
    man_size?: [number | string, number | string] | string,
    offset?: [number | string, number | string] | string,
    anchor?: {
        from?: Anchor | string,
        to?: Anchor | string
    },
    inherit_max_sibling_width?: boolean | string,
    inherit_max_sibling_height?: boolean | string,
    use_anchored_offset?: boolean | string,
    contained?: boolean | string,
    draggable?: "vertical" | "horizontal" | "both" | string,
    follows_cursor?: boolean | string
}

export interface LabelInterface {
    text?: string,
    shadow?: boolean | string,
    hide_hyphen?: boolean | string,
    notify_on_ellipses?: string[] | string,
    enable_profanity_filter?: boolean | string,
    font_size?: "small" | "normal" | "large" | "extra_large" | string,
    font_scale_factor?: number | string,
    localize?: boolean | string,
    line_padding?: number | string,
    font_type?: "default" | "rune" | "unicode" | "smooth" | "MinecraftTen" | string,
    backup_font_type?: "default" | "rune" | "unicode" | "smooth" | "MinecraftTen" | string,
    text_alignment?: "left" | "center" | "right" | string
}