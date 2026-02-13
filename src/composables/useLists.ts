import { ref, computed } from "vue"
import type { List } from "@/types/List"
import type { ListItem } from "@/types/ListItem"
import { listService } from "@/api/services/lists"
import { itemService } from "@/api/services/item"

const lists = ref<List[]>([])
const isLoading = ref(false)


const createList = async (title: string): Promise<List> => {
  const list: List = await listService.create({
    title
  });

  lists.value.push(list)
  return list
}

const updateList = async (id: string, newTitle: string) => {
  const list = getListById(id)

  if(!list) return;

  await listService.update(id, {
    title: newTitle
  })

  list.title = newTitle
}

const removeList = async (id: string) => {
  await listService.delete(id)
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


const addItem = async (listId: string, itemName: string, itemDescription: string|null) => {
  const list = getListById(listId)
  if (list) {
    const item: ListItem = await itemService.addItem(listId, {
      name: itemName,
      description: itemDescription
    })
    list.items.push(item)
  }
}

const updateItem = async (listId: string, itemId: string, name: string, description: string|null) => {
  const list = getListById(listId)

  if(!list) return

  const index = list.items.findIndex(item => item.id === itemId)

  if(index === -1) return

  const item = list.items[index]
  const version = item?.version || 1
  const updatedItem = await itemService.updateItem(listId, itemId, {
    name,
    description,
    version
  });

  list.items.splice(index, 1, updatedItem)
}

const toggleItem = async (listId: string, itemId: string) => {
  const list = getListById(listId)
  if(!list) return

  const index = list.items.findIndex(l => l.id === itemId);

  if (index !== -1) {
    try {
      const updatedItem = await itemService.toggleItem(listId, itemId)

      list.items.splice(index, 1, updatedItem)

    } catch (error) {
      console.error("Erro ao alternar status do item:", error)
    }
  }

}

const removeItem = async (listId: string, itemId: string) => {
  const list = getListById(listId)
  if (list) {
    await itemService.deleteItem(listId, itemId)
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
