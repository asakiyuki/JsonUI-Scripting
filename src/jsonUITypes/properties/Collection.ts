import { GlobalTypes } from "../..";
import { Collection } from "../Collection";

export default interface CollectionInterface {
    collection?: GlobalTypes | Collection,
}

export interface ChildCollectionInterface {
    collection_name?: GlobalTypes | Collection,
}