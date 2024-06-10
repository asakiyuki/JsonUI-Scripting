import { AnimationRegister, JsonUIElement, UIPackRegister } from "../Element";
import { Anchor, AnimTypes, AnimationData, AnimationInterface, Collection, EasingTypes, ElementTypes, FromKeybind, MappingType, ToKeybind } from "../Types";
import { JsonUILib } from "../lib/JsonUILibarry";
import { Modify } from "../vanillaModification/VanillaModification";
import { StartScreen } from "../vanillaModification/screen/Start";

new UIPackRegister({ pack_name: "testUI", uuid: "dbd1f118-c495-fd17-d0af-faca9cb35b3d" });

const text = new JsonUIElement({ type: ElementTypes.Label }).setProperty({ text: "Test", anchor_from: Anchor.LeftMiddle, anchor_to: Anchor.LeftMiddle });
const animation = new AnimationRegister({
    type: AnimTypes.Offset,
    start_value: [0, 0],
    loop: true,
    play_event: "test",
    data: Array.from({ length: 2 }, (v, i): AnimationData | number => {
        return (i % 2 === 1) ? 0.5 : {
            set_value: [i * 5, 0],
            override_from_value: [i * 5, 0],
            duration: 0.5
        }
    })
});
text.setAnimation(animation);
StartScreen.init("start_screen_content").insertBack(text, 'controls');