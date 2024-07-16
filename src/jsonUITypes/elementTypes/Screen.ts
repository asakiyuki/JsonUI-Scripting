import ScreenInterface from "../properties/Screen";
import { ElementPanelInterface } from "./panel";

export interface ElementScreenInterface extends
    ElementPanelInterface,
    ScreenInterface { }