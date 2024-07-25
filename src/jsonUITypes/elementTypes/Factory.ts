import { GlobalTypes } from "../JsonUIProperty";
import { ElementPanelInterface } from "./panel";

export interface ElementFactoryInterface extends ElementPanelInterface {
    control_name?: GlobalTypes
}