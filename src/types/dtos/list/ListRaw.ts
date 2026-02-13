import type { ListItemRaw } from "../listItem/ListItemRaw";

export interface ListRaw {
  uuid: string;
  title: string;
  items_count: number;
  items?: ListItemRaw[];
  shared_with_count: number;
  created_at: string;
  updated_at: string;
}
