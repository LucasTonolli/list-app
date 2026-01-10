import { ref, watch, computed } from "vue"
import type { List } from "@/types/List"
import type { ListItem } from "@/types/ListItem"

const lists = ref<List[]>([])
const STORAGE_KEY = 'lists'

const mockLists: List[] =  [
    {
      id: '1',
      title: 'List 1',
      items: [
        {
          id: '1',
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
      id: '2',
      title: 'List 2',
      items: [
        {
          id:' 2',
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
      id: '3',
      title: 'List 3',
      items: [
        {
          id: '3',
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

const now = () => new Date().toISOString()

const createList = (title: string): List => {
  const list: List = {
    id: crypto.randomUUID(),
    title,
    items: [],
    createdAt: now(),
    updatedAt: now()
  }
  lists.value.push(list)

  return list
}

const removeList = (id: string) => {
  lists.value = lists.value.filter(list => list.id !== id)
}
const getLists = computed(() => lists.value)

const getListById = (id: string) =>
  lists.value.find(list => list.id === id)

const addItem = (listId: string, itemName: string, itemDescription: string|null) => {
  const list = lists.value.find(list => list.id === listId)
  if (list) {
    const item: ListItem = {
      id: crypto.randomUUID(),
      name: itemName,
      description: itemDescription,
      checked: false,
      createdAt: now(),
      updatedAt: now()
    }
    list.items.push(item)
  }
}

const toggleItem = (listId: string, itemId: string) => {
  const item = getListById(listId)?.items.find(i => i.id === itemId)
  if (item) item.checked = !item.checked

}

const removeItem = (listId: string, itemId: string) => {
  const list = lists.value.find(list => list.id === listId)
  if (list) {
    list.items = list.items.filter(item => item.id !== itemId)
  }
}

const init = () => {
  if (lists.value.length) return

  const stored = localStorage.getItem(STORAGE_KEY)
  lists.value = stored ? JSON.parse(stored) : []
}


export function useLists() {
  init()

  watch(() => lists.value, value => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }, { deep: true })

  return {
    lists: getLists,
    createList,
    removeList,
    getListById,
    addItem,
    toggleItem,
    removeItem
  }
}
