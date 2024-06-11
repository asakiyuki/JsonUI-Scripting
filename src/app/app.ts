import { AnimationRegister, JsonUIElement, UIPackRegister } from "../Element";
import { Anchor, AnimTypes, AnimationData, AnimationInterface, Collection, EasingTypes, ElementTypes, FromKeybind, MappingType, ToKeybind } from "../Types";
import { JsonUILib } from "../lib/JsonUILibarry";
import { Modify } from "../vanillaModification/VanillaModification";
import { StartScreen } from "../vanillaModification/screen/Start";

new UIPackRegister({ pack_name: "testUI", uuid: "dbd1f118-c495-fd17-d0af-faca9cb35b3d" });

const text = new JsonUIElement({ type: ElementTypes.Label })
    .setProperty({
        text: "$global_variable_test",
        anchor_from: Anchor.TopLeft,
        anchor_to: Anchor.TopLeft,
        layer: 100,
        color: "-000",
        shadow: true,
    }).registerGlobalVariable({
        global_variable_test: "Hello World"
    });

new JsonUIElement({ extend: text });

const animation = new AnimationRegister({
    type: AnimTypes.Offset,
    start_value: [0, 0],
    loop: true,
    data: Array.from({ length: 50 }, (v, i): AnimationData | number => {
        return (i % 2 === 0) ? 0.25 : {
            set_value: [i * 10, i * 5],
            override_from_value: [i * 10, i * 5],
            duration: 0.25
        }
    })
});

text.setAnimation(animation);
StartScreen.init("start_screen_content").insertBack(text, 'controls');