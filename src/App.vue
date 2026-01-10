<script setup lang="ts">
import { ref, computed } from 'vue';
import MainFooter from './components/MainFooter.vue';
import MainHeader from './components/MainHeader.vue';
import { useLists } from './composable/useLists';
import type { List } from './types/List';
import { useRoute, useRouter } from 'vue-router';
import ListSelector from './components/dialogs/ListSelector.vue';
import CreateList from './components/dialogs/CreateList.vue';
import SimpleToast from './components/notifications/SimpleToast.vue';


const route = useRoute()
const router = useRouter()

const {lists, getListById, createList, removeList} = useLists()

const listId = computed(() => String(route.params.id))
const currentList = computed(() => getListById(listId.value))

const listSelect = ref<InstanceType<typeof ListSelector> | null>(null)
const createListDialog = ref<InstanceType<typeof CreateList> | null>(null)
function openListSelect(): void {
  listSelect.value?.open()
}

function openCreateList(): void {
  createListDialog.value?.open()
}

function handleSelectList(list: List): void {
  router.push({ name: 'list', params: { id: list.id } })
  listSelect.value?.close()
}

function handleCreateList(title: string): void {
  const list = createList(title)

  router.push({ name: 'list', params: { id: list.id } })
  showNotification('Lista criada com sucesso', 'success')
}

function handleRemoveList(id: string): void {
  removeList(id)
  if(id == listId.value) {
    router.push({ name: 'lists-index' })
  }
  listSelect.value?.close()
  showNotification('Lista removida com sucesso', 'success')
}

function handleRemoveItem(): void {
  showNotification('Item removido com sucesso', 'success')
}

function handleToggleItem(isChecked: boolean): void {
  const message = isChecked ? 'Item marcado como concluído' : 'Item desmarcado'
  showNotification(message, 'success')
}

function handleCreateItem(): void {
  showNotification('Item criado com sucesso', 'success')
}


const toast = ref({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error' | 'warning' | 'info',
})

const showNotification = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'success',
) => {
  toast.value = {
    show: true,
    message,
    type,
  }

}
</script>

<template>
  <MainHeader
    :current-list="currentList"
    @select-list="openListSelect"
    @create-list="openCreateList"
   />

  <main class="container">
    <RouterView @remove-item="handleRemoveItem" @toggle-item="handleToggleItem($event)" @create-item="handleCreateItem" />
  </main>

  <MainFooter />

  <ListSelector
    ref="listSelect"
    :lists="lists"
    :current-list-id="currentList?.id"
    @select="handleSelectList"
    @remove="handleRemoveList($event)"
  />
  <CreateList ref="createListDialog" @create="handleCreateList" />
  <SimpleToast  v-if="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false" />
</template>

<style scoped></style>
