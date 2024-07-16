import InputInterface from "../properties/Input";
import ScrollViewInterface from "../properties/ScrollView";
import ElementPanelInterface from "./panel";

export default interface ElementScrollViewInterface extends
    ElementPanelInterface,
    InputInterface,
    ScrollViewInterface { }