import AnyPropertyInterface from "../properties/AnyProperty";
import ControlInterface from "../properties/Control";
import LayoutInterface from "../properties/Layout";

export interface ElementPanelInterface extends
    AnyPropertyInterface,
    ControlInterface,
    LayoutInterface { }