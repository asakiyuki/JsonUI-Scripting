import { Str } from "../../values/Str";
import { Collections } from "../properties/Collections";
import { StackPanels } from "../properties/StackPanels";
import { Panel } from "./panel";

export interface StackPanel extends Panel, StackPanels, Collections {
    control_name?: Str;
}
