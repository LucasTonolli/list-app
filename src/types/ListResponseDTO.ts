import type { ListItem } from "./ListItem";

export interface ListResponse {
  lists: Array<{
    uuid: string;
    title: string;
    items_count: number;
    items: Array<ListItem>;
    shared_with_count: number;
    created_at: string;
    updated_at: string;
  }>
}
