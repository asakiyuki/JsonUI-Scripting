import { JsonUIElement } from "../jsonUI/JsonUIElement";
import { BindingInterface } from "./BindingInterface";

export type Bool = boolean | string;
export type Num = number | string;
export type LanguageFile = "bg_BG" | "cs_CZ" | "da_DK" | "de_DE" | "el_GR" | "en_GB" | "en_US" | "es_ES" | "es_MX" | "fi_FI" | "fr_CA" | "fr_FR" | "hu_HU" | "id_ID" | "it_IT" | "ja_JP" | "ko_KR" | "nb_NO" | "nl_NL" | "pl_PL" | "pt_BR" | "pt_PT" | "ru_RU" | "sk_SK" | "sv_SE" | "tr_TR" | "uk_UA" | "zh_CN" | "zh_TW";
export type Vector2 = [number, number] | string;
export type Vector2_str = [number | string, number | string] | string;
export type Vector3 = [number, number, number] | string;
export type Vector4 = [number, number, number, number] | string;
export type ArrString = string[] | string;
export type Obj = Object | string;
export type ModifyObjectType = string | JsonUIElement | BindingInterface;