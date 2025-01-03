import { MappingTo } from "../../types/enums/MappingTo";
import { Types } from "../../types/enums/Types";
import { Properties } from "../../types/objects/properties/Properties";
import { Class } from "../Class";
import { Files } from "../Modify/Files";
import { UI } from "../UI";

export class CustomScreen extends Class {
    private static screen?: UI<Types.Screen>;
    private static onCall() {
        if (CustomScreen.screen) return CustomScreen.screen;
        else {
            CustomScreen.screen = UI.screen(
                {
                    size: "100%",
                },
                {
                    namespace: "API",
                    name: "CustomScreen",
                }
            );

            Files.TabbedUpsellScreen(
                "tabbed_upsell_screen",
                undefined,
                "win10_trial_conversion.win10_trial_conversion_screen"
            );

            Files.Win10TrialConversionScreen("win10_trial_conversion_screen", {
                $screen_content: CustomScreen.screen.getPath(),
                $is_full_screen_layout: false,
                $screen_animations: [],
                size: "100%",
            });

            return CustomScreen.screen;
        }
    }

    static buttomCustomScreen = MappingTo.MenuBuyGame;

    static setScreenProperties(properties: Properties) {
        Files.Win10TrialConversionScreen(
            "win10_trial_conversion_screen",
            properties
        );
        return CustomScreen;
    }

    static get() {
        return CustomScreen.onCall();
    }
}
