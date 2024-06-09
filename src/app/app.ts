import { AnimationRegister, JsonUIElement, UIPackRegister } from "../Element";
import { Anchor, AnimTypes, EasingTypes, ElementTypes } from "../Types";
import { WriteTypesFromJsonUI } from "../vanillaModification/JsonUIElementTypesConverter";
import { Modify } from "../vanillaModification/VanillaModification";
import { StartScreen } from "../vanillaModification/screen/Start";

new UIPackRegister({
    pack_name: "Duck VIP vai lon",
    uuid: "dbd1f118-c495-fd17-d0af-faca9cb35b3d"
})

const helloWorldLabel = new JsonUIElement({ name: "helloWorld", namespace: "hello", type: ElementTypes.Label });
const labelAnimation = new AnimationRegister({
    name: "helloWorld", namespace: "helloWorld", type: AnimTypes.Offset, start_value: [0, 0], loop: true,
    data: [
        { duration: 1, set_value: [50, 0], easing: EasingTypes.InBack }, 1,
        { duration: 1, set_value: [-50, 0] }, 1,
        { duration: 1, set_value: [0, 0], easing: EasingTypes.InBack }, 1
    ]
})

helloWorldLabel.setText({
    text: "Hello World!",
    font_type: "MinecraftTen",
    shadow: true
}).setAnimation(labelAnimation);

StartScreen.init("start_screen_content").insertBack(helloWorldLabel, 'controls');