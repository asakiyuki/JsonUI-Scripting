import { HudTypes } from "../Types";
import { ScreenCommon } from "./_ScreenCommon";

export class HUDScreen extends ScreenCommon {
    static init(modifyElement: HudTypes): ScreenCommon {
        return new ScreenCommon(modifyElement, "hud_screen");
    }
}