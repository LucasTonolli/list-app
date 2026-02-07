import { ref, computed } from "vue"
import type { List } from "@/types/List"
import type { ListItem } from "@/types/ListItem"
import { listService } from "@/api/services/lists"

const lists = ref<List[]>([])
const isLoading = ref(false)
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

const updateList = (id: string, newTitle: string) => {
  const list = lists.value.find(l => l.id === id)

  if(!list) return;

  list.title = newTitle
}

const removeList = (id: string) => {
  lists.value = lists.value.filter(list => list.id !== id)
}

const fetchLists = async () => {
  isLoading.value = true

  try {
    const response = await listService.getLists()
    lists.value = response
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const getListById = (id: string) => {
  return lists.value.find(list => list.id === id)
}

const fetchListById = async (id: string) => {
  isLoading.value = true;
  try {
    const enrichedList = await listService.getById(id);
    console.log('enrichedList', enrichedList)
    const index = lists.value.findIndex(l => l.id === id);
    if (index !== -1) {
      // Atualiza a lista existente com os itens detalhados
      lists.value[index] = enrichedList;
    } else {
      // Se por algum motivo a lista não estava no cache, adiciona
      lists.value.push(enrichedList);
    }
  } catch (error) {
    console.error("Erro ao buscar detalhes da lista", error);
    throw error;
  } finally {
    isLoading.value = false;
  }
}


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

const updateItem = (listId: string, itemId: string, name: string, description: string|null) => {
  const list = lists.value.find(list => list.id === listId)

  if(!list) return

  const item = list.items.find(item => item.id === itemId)

  if(!item) return

  item.name = name
  item.description = description
  item.updatedAt = now()

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

export function useLists() {

  return {
    lists: computed(() => lists.value),
    isLoading,
    fetchLists,
    createList,
    updateList,
    removeList,
    getListById,
    fetchListById,
    addItem,
    updateItem,
    toggleItem,
    removeItem
  }
}
