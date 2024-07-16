import TextInterface from "../properties/Text";
import { ElementPanelInterface } from "./panel";

export interface ElementLabelInterface extends
    ElementPanelInterface,
    TextInterface { }