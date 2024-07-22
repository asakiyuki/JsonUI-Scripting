import { JsonUIElement } from "./jsonUI/JsonUIElement";
import { Modify } from "./vanillaModification/Modify";
import { Config } from "./cached/Config";
import { Anchor } from "./jsonUITypes/Anchor";

if (Config.data.debug_screen_content) {
    const bg = JsonUIElement.image({
        texture: 'textures/ui/Black',
        size: "100%cm + 4px",
        layer: 100,
        anchor: Anchor.BottomLeft,
        ignored: "(($screen_content = 'toast_screen.toast_screen_content') or ($screen_content = 'debug_screen.content_panel'))"
    }, { namespace: 'debugTools', name: 'debugger:screen_content' });

    const label = JsonUIElement.label({
        text: "$screen_content"
    }, { namespace: 'debugTools', name: 'debugger:screen_content_label' });

    bg.addElement(label);

    Modify.uiCommon('base_screen').modifications.controls.insertFront(bg);
}