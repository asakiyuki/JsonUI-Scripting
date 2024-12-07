import { Anchor } from "../../types/enums/Anchor";
import { Class } from "../Class";
import { Files } from "../Modify/Files";
import { UI } from "../UI";

const database = {
	screenContent: false,
};

export class DebugTools extends Class {
	static screenContent() {
		if (!database.screenContent) {
			database.screenContent = true;

			const screenContentBackground = UI.image(
				{
					texture: "textures/ui/Black",
					size: "100%cm + 4px",
					layer: 100,
					anchor: Anchor.BottomLeft,
					alpha: 0.75,
					ignored:
						"(($screen_content = 'toast_screen.toast_screen_content') or ($screen_content = 'debug_screen.content_panel'))",
				},
				{
					namespace: "API",
					name: "debug_tools:screen_content_background",
				}
			);

			const screenContentLabel = UI.label(
				{
					text: "$screen_content",
				},
				{ namespace: "API", name: "debug_tools:screen_content_label" }
			);

			screenContentBackground.addChild(screenContentLabel);

			Files.UiCommon("base_screen").addChild(screenContentBackground);
		}
	}
}
