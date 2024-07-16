import InputInterface from "../properties/Input";
import SliderBoxInterface from "../properties/SliderBox";
import { ElementPanelInterface } from "./panel";

export interface ElementSliderBoxInterface extends
    ElementPanelInterface,
    InputInterface,
    SliderBoxInterface { }