import { JsonUIElement } from "./Element";
import { ElementTypes } from "./Types";

const testElement = new JsonUIElement({
    name: "duck",
    namespace: "aduckdeptrai",
    type: ElementTypes.Image
}).setColor("AAAAAA", "colorVar");

new JsonUIElement({
    name: "vip",
    namespace: "aduckdeptrai",
    extend: testElement
}).insertElement(testElement, 'test').createVariable({
    colorVar: "#FFFFFF"
}).setBindings([
    {
        binding_type: 'view',
        binding_condition: 'visibility_changed',
        source_control_name: 'duck',
        resolve_sibling_scope: true
    }
])