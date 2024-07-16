import { JsonUIElement } from "../jsonUI/JsonUIElement"
import { Anchor } from "./Anchor"
import { ClipDirection } from "./ClipDirecion"
import { Collection } from "./Collection"
import { Direction } from "./Direction"
import { FocusContainerCustom } from "./FocusContainerCustom"
import { FocusNavigationMode } from "./FocusNavigationMode"
import { FontSize } from "./FontSize"
import { FontType } from "./FontType"
import { ArrayProperty } from "./LanguageInterface"
import { Orientation } from "./Orientation"
import { PropertyBagKey } from "./PropertyBagKeys"
import { Renderer } from "./Renderer"
import { RotationAuto } from "./RotationAuto"
import { SoundObject } from "./SoundObject"
import { TextType } from "./TextTypes"
import { TextureFileSystem } from "./TextureFileSystem"
import { Bool, Num, Vector2, Obj, Vector2_str, Vector3, ArrString, Vector4 } from "./Types"
import { Animation } from "../jsonUI/Animation"

import ControlInterface from "./properties/Control"
import LayoutInterface from "./properties/Layout"
import GirdInterface from "./properties/Gird"
import TextInterface from "./properties/Text"
import InputInterface from "./properties/Input"
import SpriteInterface from "./properties/Sprite"
import FocusInterface from "./properties/Focus"
import ButtonInterface from "./properties/Button"
import ToggleInterface from "./properties/Toggle"
import AnyPropertyInterface from "./properties/AnyProperty"
import CollectionInterface, { ChildCollectionInterface } from "./properties/Collection"
import DropdownInterface from "./properties/Dropdown"
import RendererInterface from "./properties/Renderer"
import ScreenInterface from "./properties/Screen"
import ScrollViewInterface from "./properties/ScrollView"
import SelectionWheelInterface from "./properties/SelectionWheel"
import SliderBoxInterface from "./properties/SliderBox"
import SliderInterface from "./properties/Slider"
import SoundInterface from "./properties/Sound"
import SpecialInterface from "./properties/Special"
import TTSInterface from "./properties/TTS"
import StackPanelInterface from "./properties/StackPanel"
import TextEditInterface from "./properties/TextEdit"

export type GlobalTypes = string | JsonUIElement | Animation | ArrayProperty;

export interface JsonUIProperty extends
    AnyPropertyInterface,
    ButtonInterface,
    CollectionInterface,
    ChildCollectionInterface,
    DropdownInterface,
    FocusInterface,
    GirdInterface,
    InputInterface,
    LayoutInterface,
    RendererInterface,
    ScreenInterface,
    ScrollViewInterface,
    SelectionWheelInterface,
    ScreenInterface,
    SliderInterface,
    SliderBoxInterface,
    SoundInterface,
    SpecialInterface,
    SpriteInterface,
    StackPanelInterface,
    TextInterface,
    TextEditInterface,
    ToggleInterface,
    TTSInterface {
}