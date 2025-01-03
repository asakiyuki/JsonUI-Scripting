import { Types } from "../../types/enums/Types";
import { Image } from "../../types/objects/elements/Image";
import { Label } from "../../types/objects/elements/Label";
import { Class } from "../Class";
import { UI } from "../UI";

export class Text extends Class {
    private static background?: UI<Types.Image>;
    private static label?: UI<Types.Label>;

    private static get() {
        if (Text.background) return Text.background;

        Text.label = UI.label(
            {
                text: ["$text", "Label"],
                shadow: true,
            },
            {
                namespace: "API",
                name: "Text",
            }
        );

        Text.background = UI.image(
            {
                texture: "textures/ui/Black",
                size: ["100%cm + 12px", "100%cm 6px"],
                alpha: 0.8,
            },
            {
                namespace: "API",
                name: "TextWithBackground",
            }
        ).addChild(Text.label);

        return Text.background;
    }

    static setBackgroundProperties(properties: Image) {
        Text.get().setProperties(properties);
    }

    static setLabelProperties(properties: Label) {
        Text.get();
        Text.label?.setProperties(properties);
    }

    static create(content: string) {
        return UI.extend(Text.get(), {
            $text: content,
        });
    }
}
