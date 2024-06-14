import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { ScreenCommon } from "../vanillaModification/screen/_ScreenCommon";

export type GetJsonUIGenerateName = (thisArg: JsonUIElement, name: string) => void;
export type GetJsonUIGenerateNameScreenCommon = (thisArg: ScreenCommon, name: string) => void;
export type GetJsonUIGenerateNames = (thisArg: JsonUIElement, name: string[]) => void;