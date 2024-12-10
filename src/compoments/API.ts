import { SinTable } from "./API/SinTable";
import { CustomScreen } from "./API/CustomScreen";
import { DebugTools } from "./API/DebugTools";
import { Text } from "./API/Text";
import { Class } from "./Class";

export class API extends Class {
	static customScreen = CustomScreen;
	static text = Text;
	static debugTool = DebugTools;
	static sinTable = SinTable;
}
