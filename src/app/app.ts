import { AnimationRegister, JsonUIElement, UIPackRegister } from "../Element";
import { Anchor, AnimTypes, EasingTypes, ElementTypes } from "../Types";
import { JsonUILib } from "../lib/JsonUILibarry";
import { Modify } from "../vanillaModification/VanillaModification";
import { StartScreen } from "../vanillaModification/screen/Start";

new UIPackRegister({
    pack_name: ";-;",
    uuid: "dbd1f118-c495-fd17-d0af-faca9cb35b3d"
});
StartScreen.init("start_screen_content/skin_panel").modifyProperty({
    ignored: true
});