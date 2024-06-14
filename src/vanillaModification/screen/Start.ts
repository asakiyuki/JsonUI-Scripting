import { JsonUIElement } from "../../jsonUI/JsonUIElement";
import { StartTypes } from "../Types";
import { ScreenCommon } from "./_ScreenCommon";

export class StartScreen extends ScreenCommon {
    static init(modifyElement: StartTypes, extend?: JsonUIElement | string): ScreenCommon {
        return new ScreenCommon(modifyElement, "start_screen", extend);
    }
}