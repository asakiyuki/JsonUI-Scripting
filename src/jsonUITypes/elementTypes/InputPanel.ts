import CollectionInterface from "../properties/Collection";
import FocusInterface from "../properties/Focus";
import InputInterface from "../properties/Input";
import SoundInterface from "../properties/Sound";
import { ElementPanelInterface } from "./panel";

export interface ElementInputPanelInterface extends
    ElementPanelInterface,
    CollectionInterface,
    InputInterface,
    SoundInterface,
    FocusInterface { }