import { JsonUIElement } from "../jsonUI/JsonUIElement"
import { ArrayProperty } from "./LanguageInterface"
import { Animation } from "../jsonUI/Animation"

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
import ControlInterface from "./properties/Control"
import { ElementTypes } from "./ElementTypes"
import { GlobalVariable } from "./GlobalVariable"

export type GlobalTypes = string | JsonUIElement | Animation | ArrayProperty | GlobalVariable;

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
    TTSInterface,
    ChildCollectionInterface,
    ControlInterface {
    type?: GlobalTypes | ElementTypes
}