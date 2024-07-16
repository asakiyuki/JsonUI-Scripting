import { GlobalTypes } from "../JsonUIProperty";
import SliderBoxInterface from "./SliderBox";

export default interface ButtonInterface extends SliderBoxInterface {
    pressed_control?: GlobalTypes,
}