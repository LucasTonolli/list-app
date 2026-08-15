<script setup lang="ts">
import { computed, onMounted, type DeepReadonly } from 'vue';
import type { List } from './types/models/List';
import { useRoute, useRouter } from 'vue-router';


//Components
import MainFooter from './components/layout/MainFooter.vue';
import MainHeader from './components/layout/MainHeader.vue';
import ListSelector from './components/dialogs/ListSelector.vue';
import SaveList from './components/dialogs/SaveList.vue';
import SimpleToast from './components/ui/SimpleToast.vue';
import LoadingOverlay from './components/ui/LoadingOverlay.vue';
import ShareList from './components/dialogs/ShareList.vue';
import CopyInvitation from './components/dialogs/CopyInvitation.vue';

//Composables
import { useLists } from './composables/useLists';
import { useAuth } from './composables/useAuth';
import { useNotification } from './composables/useNotification';
import { useAppDialogs } from './composables/useAppDialogs';

import { invitationService } from './api/services/invitations';
import { getApiErrorMessage } from './api/client.ts';


const route = useRoute()
const router = useRouter()

//Composables init
const { toast, showNotification } = useNotification()
const { isAuthenticated, ensureIdentity, loading: authLoading } = useAuth()
const { lists, getListById, createList,updateList, removeList, fetchLists, isLoading: listsLoading} = useLists()
const dialogs = useAppDialogs();
const {
  listSelect,
  saveListDialog,
  shareListDialog,
  invitationDialog,
} = dialogs;
//Computed State
const isAppBusy = computed(() => authLoading.value || listsLoading.value);
const listId = computed(() => String(route.params.id))
const currentList = computed(() => getListById(listId.value))

function handleSelectList(list: DeepReadonly<List>): void {
  router.push({ name: 'list', params: { id: list.id } })
  dialogs.closeListSelect();
}

async function handleSaveList({ title, listId }: { title: string; listId: string | null }): Promise<void> {
  try {
    if (listId) {
      await updateList(listId, title)
      showNotification('Lista atualizada com sucesso', 'success')
    } else {
      const newList = await createList(title)
      router.push({ name: 'list', params: { id: newList.id } })
      showNotification('Lista criada com sucesso', 'success')
    }
  } catch (error) {
    showNotification('Erro ao salvar lista: ' + getApiErrorMessage(error), 'error')
  }
}

async function handleRemoveList(id: string): Promise<void> {
 try {
    await removeList(id)
    if (id == listId.value) router.push({ name: 'lists-index' })
    dialogs.closeListSelect()
    showNotification('Lista removida com sucesso', 'success')
  } catch (error) {
    showNotification('Erro ao remover lista: ' + getApiErrorMessage(error), 'error')
  }
}

function handleEdit(id: string): void {
  const listToEdit = getListById(id)

  if(!listToEdit) return

  dialogs.closeListSelect();

  dialogs.openSaveListForEdit(listToEdit)
}

async function handleShareList({ quantity, expiresInMinutes }: { quantity: number; expiresInMinutes: number }) {
  try {
    const response = await invitationService.create(listId.value, quantity, expiresInMinutes)
    const url = import.meta.env.VITE_BASE_URL + `/lists/${listId.value}/invitations/${response.token}`
    const expirationTime = new Date(response.expires_at)
    dialogs.closeShareList()
    showNotification('Convite criado com sucesso', 'success')
    dialogs.openInvitation(url, expirationTime)
  } catch (error) {
    console.error('Erro ao criar convite', error)
    const message = getApiErrorMessage(error)
    showNotification('Falha ao criar convite: ' + message, 'error')
    return
  }

}


onMounted(async () => {
 try {
    await ensureIdentity()

    if (isAuthenticated.value) {
      await fetchLists()
    }
  } catch (error) {
    showNotification('Falha ao inicializar aplicação:' + error, 'error')
  }
})
</script>

<template>
  <MainHeader
    :current-list="currentList"
    @select-list="dialogs.openListSelect"
   />

  <main class="container">
    <LoadingOverlay v-if="isAppBusy" message="Sincronizando dados..."/>
    <RouterView @create-list="dialogs.openSaveList" />
  </main>

  <MainFooter
    @share-list="dialogs.openShareList"
    @create-list="dialogs.openSaveList"
  />

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

