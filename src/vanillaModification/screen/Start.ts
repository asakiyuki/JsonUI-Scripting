import { StartTypes } from "../Types";
import { ScreenCommon } from "./_ScreenCommon";

export class StartScreen extends ScreenCommon {
    static init(modifyElement: StartTypes): ScreenCommon {
        return new ScreenCommon(modifyElement, "start_screen");
    }
}