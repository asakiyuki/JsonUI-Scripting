import { JsonUIElement } from "../../jsonUI/JsonUIElement";
import { StartTypes } from "../Types";
import { ScreenCommon } from "./_ScreenCommon";

/**
 * Represents the StartScreen class, which extends ScreenCommon.
 * This class is responsible for managing the start screen of the application.
 */
export class StartScreen extends ScreenCommon {
    /**
     * Initializes a new instance of the StartScreen class.
     *
     * @param modifyElement - The modifyElement parameter is used to specify the type of modification to be applied to the start screen.
     * @param extend - The extend parameter is an optional parameter that can be used to extend the start screen with additional JSON UI elements or a string.
     * @returns - Returns an instance of the ScreenCommon class, which represents the start screen.
     */
    static init(modifyElement: StartTypes, extend?: JsonUIElement | string): ScreenCommon {
        return new ScreenCommon(modifyElement, "start_screen", extend);
    }
}