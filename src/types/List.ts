import type { ListItem } from "./ListItem"

export interface List{
  id: string,
  title: string
  itemsCount: number,
  sharedWith: number,
  items: ListItem[],
  createdAt: null|string
  updatedAt: null|string
}

