<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { List } from './types/List';
import { useRoute, useRouter } from 'vue-router';


//Components
import MainFooter from './components/MainFooter.vue';
import MainHeader from './components/MainHeader.vue';
import ListSelector from './components/dialogs/ListSelector.vue';
import SaveList from './components/dialogs/SaveList.vue';
import SimpleToast from './components/notifications/SimpleToast.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import ShareList from './components/dialogs/ShareList.vue';

//Composables
import { useLists } from './composable/useLists';
import { useAuth } from './composable/useAuth';
import { useNotification } from './composable/useNotification';
import { invitationService } from './api/services/invitations';
import CopyInvitation from './components/dialogs/CopyInvitation.vue';


const route = useRoute()
const router = useRouter()

//Composables init
const { toast, showNotification } = useNotification()
const { isAuthenticaded, ensureIdentity, loading: authLoading } = useAuth()
const { lists, getListById, createList,updateList, removeList, fetchLists, isLoading: listsLoading} = useLists()

//UI Refs
const listSelect = ref<InstanceType<typeof ListSelector> | null>(null)
const saveListDialog = ref<InstanceType<typeof SaveList> | null>(null)
const shareListDialog = ref<InstanceType<typeof ShareList> | null>(null)
const invitationDialog = ref<InstanceType<typeof CopyInvitation> | null>(null)
//Computed State
const isAppBusy = computed(() => authLoading.value || listsLoading.value);
const listId = computed(() => String(route.params.id))
const currentList = computed(() => getListById(listId.value))


function openListSelect(): void {
  listSelect.value?.open()
}

function openSaveList(): void {
  saveListDialog.value?.open()
}

function openShareList(): void {
  shareListDialog.value?.open()
}

function closeShareList(): void {
  shareListDialog.value?.close()
}

function openInvitation(link: string): void {
  invitationDialog.value?.open(link)
}

function handleSelectList(list: List): void {
  router.push({ name: 'list', params: { id: list.id } })
  listSelect.value?.close()
}

async function handleSaveList({ title, listId }: { title: string; listId: string | null }): void {
  if (listId) {
    await updateList(listId, title)
    showNotification('Lista atualizada com sucesso', 'success')
  } else {
    const newList = await createList(title)
    router.push({ name: 'list', params: { id: newList.id } })
    showNotification('Lista criada com sucesso', 'success')
  }
}

async function handleRemoveList(id: string): Promise<void> {
  await removeList(id)
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
  showNotification('Item adicionado com sucesso', 'success')
}

function handleEditItem(): void {
  showNotification('Item atualizado com sucesso', 'success')
}

function handleEdit(id: string): void {
  const listToEdit = getListById(id)

  if(!listToEdit) return

  listSelect.value?.close()

  saveListDialog.value?.openForEdit(listToEdit)

}

async function handleShareList(quantity: number) {
  const response = await invitationService.create(listId.value, quantity)
  const url = window.location.origin + `/lists/${listId.value}/invitations/${response.token}`
  closeShareList()
  showNotification('Convite criado com sucesso', 'success')
  openInvitation(url)
}


onMounted(async () => {
 try {
    await ensureIdentity()

    if (isAuthenticaded.value) {
      await fetchLists()
      console.log('Listas carregadas com sucesso:', lists.value)
    }
  } catch (error) {
    showNotification('Falha ao inicializar aplicação:' + error, 'error')
  }
})
</script>

<template>
  <MainHeader
    :current-list="currentList"
    @select-list="openListSelect"
    @create-list="openSaveList"
    @share-list="openShareList"
   />

  <main class="container">
    <LoadingOverlay v-if="isAppBusy" message="Sincronizando dados..."/>
    <RouterView @remove-item="handleRemoveItem" @toggle-item="handleToggleItem($event)" @create-item="handleCreateItem" @edit-item="handleEditItem" @create-list="openSaveList" />
  </main>

  <MainFooter />

  <ListSelector
    ref="listSelect"
    :lists="lists"
    :current-list-id="currentList?.id"
    @select="handleSelectList"
    @remove="handleRemoveList($event)"
    @edit="handleEdit($event)"
  />
  <SaveList ref="saveListDialog" @save="handleSaveList" />
  <ShareList ref="shareListDialog" @share-list="handleShareList($event)"/>
  <CopyInvitation ref="invitationDialog" />
  <SimpleToast  v-if="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false" />
</template>

<style scoped></style>
