import type { ListItem } from "./ListItem"

export interface List{
  id: number,
  title: string
  // description: null|string
  // hash: string
  items: ListItem[]
  createdAt: null|string
  updatedAt: null|string
}

