import type { ListItem } from "./ListItem"

export interface List{
  id: number,
  name: string
  description: null|string
  hash: string
  items: ListItem[]
  created_at: string
  updated_at: string
}

