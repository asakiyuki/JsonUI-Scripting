import AnyPropertyInterface from "../properties/AnyProperty";
import ControlInterface from "../properties/Control";
import LayoutInterface from "../properties/Layout";

export default interface ElementPanelInterface extends
    AnyPropertyInterface,
    ControlInterface,
    LayoutInterface { }