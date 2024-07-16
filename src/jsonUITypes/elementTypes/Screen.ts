import ScreenInterface from "../properties/Screen";
import ElementPanelInterface from "./panel";

export default interface ElementScreenInterface extends
    ElementPanelInterface,
    ScreenInterface { }