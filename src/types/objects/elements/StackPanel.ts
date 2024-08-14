import { Str } from "../../values/Str";
import { StackPanels } from "../properties/StackPanels";
import { Panel } from "./panel";

export interface StackPanel extends Panel, StackPanels {
    control_name?: Str
};