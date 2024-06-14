import { JsonUIElement } from "../../jsonUI/JsonUIElement";
import { HudTypes } from "../Types";
import { ScreenCommon } from "./_ScreenCommon";

export class HUDScreen extends ScreenCommon {
    static init(modifyElement: HudTypes, extend?: JsonUIElement | string): ScreenCommon {
        return new ScreenCommon(modifyElement, "hud_screen", extend);
    }
}