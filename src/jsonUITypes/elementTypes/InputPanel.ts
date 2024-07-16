import FocusInterface from "../properties/Focus";
import InputInterface from "../properties/Input";
import SoundInterface from "../properties/Sound";
import { ElementPanelInterface } from "./panel";

export interface ElementInputPanelInterface extends
    ElementPanelInterface,
    InputInterface,
    SoundInterface,
    FocusInterface { }