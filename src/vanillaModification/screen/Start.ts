import { StartScreenType } from "../Types";
import { ScreenCommon } from "./_ScreenCommon";

export class StartScreen extends ScreenCommon {
    static init(modifyElement: StartScreenType): ScreenCommon {
        return new ScreenCommon(modifyElement, "start_screen");
    }
}