import {ref} from 'vue';
import type ListSelector from '@/components/dialogs/ListSelector.vue';
import type SaveList from '@/components/dialogs/SaveList.vue';
import type ShareList from '@/components/dialogs/ShareList.vue';
import type CopyInvitation from '@/components/dialogs/CopyInvitation.vue';
import type { List } from '@/types/models/List';

export function useAppDialogs() {
  // 1. Isolamos as Refs
  const listSelect = ref<InstanceType<typeof ListSelector> | null>(null);
  const saveListDialog = ref<InstanceType<typeof SaveList> | null>(null);
  const shareListDialog = ref<InstanceType<typeof ShareList> | null>(null);
  const invitationDialog = ref<InstanceType<typeof CopyInvitation> | null>(null);

  return {
    listSelect,
    saveListDialog,
    shareListDialog,
    invitationDialog,
   openListSelect: () => listSelect.value?.open(),
    closeListSelect: () => listSelect.value?.close(),

    // Controles Save List
    openSaveList: () => saveListDialog.value?.open(),
    closeSaveList: () => saveListDialog.value?.close(),
    openSaveListForEdit: (listToEdit: List) => {
      listSelect.value?.close(); // Aqui vemos a vantagem da abstração!
      saveListDialog.value?.openForEdit(listToEdit);
    },

    // Controles Share List
    openShareList: () => shareListDialog.value?.open(),
    closeShareList: () => shareListDialog.value?.close(),

    // Controles Invitation
    openInvitation: (link: string, exp?: Date) => invitationDialog.value?.open(link, exp),
    closeInvitation: () => invitationDialog.value?.close(),
  }
}
