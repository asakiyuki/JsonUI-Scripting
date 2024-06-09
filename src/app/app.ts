import { JsonUIElement, AnimationRegister, UIPackRegister } from "../Element";
import { AnimTypes } from "../Types";
new UIPackRegister({ pack_name: "Sora UI" });
new JsonUIElement({
    name: 'hagay',
    namespace: 'hagay'
})
new AnimationRegister({
    name: 'hagay',
    namespace: 'hagay',
    type: AnimTypes.Offset,
    start_value: [0, 0],
    loop: true,
    data: [
        {
            duration: 1,
            set_value: [0, 0]
        },
        {
            duration: 1,
            set_value: [0, 0]
        },
        {
            duration: 1,
            set_value: [0, 0]
        },
        {
            duration: 1,
            set_value: [0, 0]
        },
        {
            duration: 1,
            set_value: [0, 0]
        }
    ]
})