import StackPanelInterface from "../properties/StackPanel";
import { ElementCollectionPanelInterface } from "./CollectionPanel";

export interface ElementStackPanelInterface extends
    ElementCollectionPanelInterface,
    StackPanelInterface { }