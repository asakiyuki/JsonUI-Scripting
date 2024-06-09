import { AnimationRegister, JsonUIElement, UIPackRegister } from "../Element";
import { Anchor, AnimTypes, EasingTypes, ElementTypes } from "../Types";
import { WriteTypesFromJsonUI } from "../vanillaModification/JsonUIElementTypesConverter";
import { Modify } from "../vanillaModification/VanillaModification";
import { StartScreen } from "../vanillaModification/screen/Start";

new UIPackRegister({
    pack_name: "Duck VIP vai lon",
    uuid: "dbd1f118-c495-fd17-d0af-faca9cb35b3d"
})

StartScreen.init("start_screen_content").insertBack(new JsonUIElement({
    name: 'duckvipvailon',
    namespace: 'a',
    type: ElementTypes.Label
}).setText({
    text: "Duck Qua VIP"
}).setLayout({
    anchor: {
        from: Anchor.Center,
        to: Anchor.Center
    },
}).setControl({
    layer: 999
}), 'controls').modifyProperty({
    anims: [new AnimationRegister({
        type: AnimTypes.Offset,
        start_value: [0, 0],
        name: "duckVipVaiLon",
        namespace: "a",
        loop: true,
        data: [
            {
                set_value: [50, 50],
                ease: EasingTypes.InBack,
                duration: 1
            },
            {
                ease: EasingTypes.OutBack,
                set_value: [-50, -50],
                duration: 1
            },
            {
                set_value: [0, 0],
                duration: 1
            }
        ]
    }).getAnimationPath()]
});