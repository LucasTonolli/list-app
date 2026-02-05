import type { ListItem } from "./ListItem"

export interface List{
  id: string,
  title: string
  items: ListItem[]
  createdAt: null|string
  updatedAt: null|string
}

