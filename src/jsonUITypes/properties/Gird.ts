import { Direction } from "readline";
import { GlobalTypes } from "../..";
import { Vector2, Num } from "../Types";

export default interface GirdInterface {
    grid_dimensions?: GlobalTypes | Vector2,
    maximum_grid_items?: GlobalTypes | Num,
    grid_dimension_binding?: GlobalTypes,
    grid_rescaling_type?: GlobalTypes | Direction,
    grid_fill_direction?: GlobalTypes | Direction,
    grid_item_template?: GlobalTypes,
    precached_grid_item_count?: GlobalTypes | Num,
}