import {  ref } from "vue"
import type { List } from "@/types/List"
import type { ListItem } from "@/types/ListItem"

const lists = ref<List[]>([])

const mockLists: List[] =  [
    {
      id: 1,
      title: 'List 1',
      items: [
        {
          id: 1,
          name: 'Item 1',
          description: null,
          checked: false,
          position: 1,
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01'
        }
      ],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: 2,
      title: 'List 2',
      items: [
        {
          id: 2,
          name: 'Item 2',
          description: null,
          checked: false,
          position: 1,
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01'
        }
      ],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: 3,
      title: 'List 3',
      items: [
        {
          id: 3,
          name: 'Item 3',
          description: null,
          checked: false,
          position: 1,
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01'
        }
      ],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    }
  ]
const getLists = () => {
  return lists.value
}

const getListById = (id: number) => {
  return lists.value.find(list => list.id === id)
}

const addItem = (listId: number, itemName: string) => {
  const list = lists.value.find(list => list.id === listId)
  if (list) {
    const item: ListItem = {
      id: list.items.length + 1,
      name: itemName,
      description: null,
      checked: false,
      position: 1,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    }
    list.items.push(item)
  }
}

const toggleItem = (listId: number, itemId: number) => {
  const list = lists.value.find(list => list.id === listId)
  if (list) {
    const item = list.items.find(item => item.id === itemId)
    if (item) {
      alert("Toggle item " + item.name)
      item.checked = !item.checked
    }
  }
}

lists.value = mockLists

export function useLists() {

  return {
    lists,
    getLists,
    getListById,
    addItem,
    toggleItem
  }
}
