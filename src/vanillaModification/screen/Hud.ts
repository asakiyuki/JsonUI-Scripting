import { JsonUIElement } from "../../jsonUI/JsonUIElement";
import { HudTypes } from "../Types";
import { JsonUIObject } from "./_ScreenCommon";

/**
 * Represents a HUD screen in the game.
 * Extends the functionality of {@link JsonUIObject}.
 */
class HUDScreen extends JsonUIObject {
    /**
     * Initializes a new instance of the {@link HUDScreen} class.
     *
     * @param modifyElement - The type of HUD element to modify.
     * @param extend - An optional parameter to extend the JSON UI element or provide a string.
     * @returns A new instance of {@link JsonUIObject}.
     */
    static init(modifyElement: HudTypes, extend?: JsonUIElement | string): JsonUIObject {
        return new JsonUIObject(modifyElement, "hud_screen", extend);
    }
}