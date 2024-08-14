import { Collections } from "../properties/Collections";
import { Focus } from "../properties/Focus";
import { Inputs } from "../properties/Inputs";
import { Sounds } from "../properties/Sounds";
import { Panel } from "./panel";

export interface InputPanel extends Panel, Collections, Inputs, Sounds, Focus { }