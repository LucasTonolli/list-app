export interface ListItem{
  id: string,
  listId: string
  name: string,
  description: null|string,
  checked: boolean,
  version: number,
  createdAt: string
  updatedAt: string,
  lockedAt: null|string,
  lockedBy: null|string
}
