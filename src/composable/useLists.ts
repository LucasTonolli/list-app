import { ref, watch } from "vue"
import type { List } from "@/types/List"
import type { ListItem } from "@/types/ListItem"

const lists = ref<List[]>([])
const STORAGE_KEY = 'lists'

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
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01'
        }
      ],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    }
  ]
const createList = (title: string) => {
  const list: List = {
    id: lists.value.length + 1,
    title,
    items: [],
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  }
  lists.value.push(list)
}

const deleteList = (id: number) => {
  lists.value = lists.value.filter(list => list.id !== id)
}
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
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    }
    list.items.push(item)
  }
}

const toggleItem = (listId: number, itemId: number) => {
  const item = getListById(listId)?.items.find(i => i.id === itemId)
  if (item) item.checked = !item.checked

}

const removeItem = (listId: number, itemId: number) => {
  const list = lists.value.find(list => list.id === listId)
  if (list) {
    list.items = list.items.filter(item => item.id !== itemId)
  }
}

const init = () => {
  if (lists.value.length) return

  const stored = localStorage.getItem(STORAGE_KEY)
  lists.value = stored ? JSON.parse(stored) : mockLists
}


export function useLists() {
  init()

  watch(lists, () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists.value))
  }, { deep: true })

  return {
    createList,
    deleteList,
    getLists,
    getListById,
    addItem,
    toggleItem,
    removeItem
  }
}
