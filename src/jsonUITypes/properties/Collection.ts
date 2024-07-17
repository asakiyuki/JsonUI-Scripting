import { GlobalTypes, Num } from "../..";
import { Collection } from "../Collection";

export default interface CollectionInterface {
    collection?: GlobalTypes | Collection,
    collection_name?: GlobalTypes | Collection,
}

export interface ChildCollectionInterface {
    collection_index?: GlobalTypes | Num
}