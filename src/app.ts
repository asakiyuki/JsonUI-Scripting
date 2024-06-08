import { JsonUIElement, UIPackRegister, GlobalVariables, AnimationRegister } from "./Element";
import { ElementTypes, AnimTypes, EasingTypes, Anchor } from "./Types";

new UIPackRegister({
    pack_name: "Asa' Sora UI",
    description: "The first Json UI made by TypeScript!",
    version: [0, 0, 1],
    uuid: "95e85053-234f-2ac0-1c84-f2f94d3334ac"
})


const global: any = {
    namespace: "testtesttest"
}

new JsonUIElement({
    type: ElementTypes.StackPanel,
    ...global
})

GlobalVariables.registerObject({
    test: "#FFFFFF",
})