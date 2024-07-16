import InputInterface from "../properties/Input";
import SliderBoxInterface from "../properties/SliderBox";
import ElementPanelInterface from "./panel";

export default interface ElementSliderBoxInterface extends
    ElementPanelInterface,
    InputInterface,
    SliderBoxInterface { }