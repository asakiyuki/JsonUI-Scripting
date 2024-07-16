import RendererInterface from "../properties/Renderer";
import SpecialInterface from "../properties/Special";
import ElementPanelInterface from "./panel";

export default interface ElementCustomInterface extends
    ElementPanelInterface,
    RendererInterface,
    SpecialInterface { }