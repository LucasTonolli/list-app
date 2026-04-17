<!-- List Detail -->

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

//Composables
import { useLists } from '@/composables/useLists';

//Components
import FloatingAddButton from '@/components/ui/FloatingAddButton.vue';
import SaveListItem from '@/components/dialogs/SaveListItem.vue';
import BulkAddItems from '@/components/dialogs/BulkAddItems.vue';
import ListItemRow from '@/components/lists/ListItemRow.vue';

//Types
import type { ListItem } from '@/types/models/ListItem';
import { useNotification } from '@/composables/useNotification';

const { showNotification } = useNotification()
const { getListById, fetchListById, addItem, updateItem } = useLists()
const route = useRoute()
const router = useRouter()

const listId = computed(() => String( route.params.id))
const list = computed(() => getListById(listId.value))
const items = computed(() => list.value?.items ?? [])

const dialog = ref<InstanceType<typeof SaveListItem> | null>(null)
const bulkDialog = ref<InstanceType<typeof BulkAddItems> | null>(null)
const showMenu = ref(false)

let pollingInterval: number | undefined;

function openDialog(itemToEdit: ListItem|null): void {
  if(itemToEdit) {
    dialog.value!.item = itemToEdit
  }
  dialog.value?.open()
}

function openSingleDialog(): void {
  showMenu.value = false
  openDialog(null)
}

function openBulkDialog(): void {
  showMenu.value = false
  bulkDialog.value?.open()
}

function handleSaveItem(payload: { name: string, description: string | null }): void {
  const itemToEdit = dialog.value?.item

  if (itemToEdit) {
    updateItem(listId.value, itemToEdit.id, payload.name, payload.description)
    showNotification('Item atualizado com sucesso', 'success');
  } else {
    addItem(listId.value, payload.name, payload.description)
    showNotification('Item adicionado com sucesso', 'success');
  }
}


async function loadData() {
  try {
    await fetchListById(listId.value);
  } catch (error: unknown) {
    console.error('Erro ao buscar detalhes da lista', error);
    router.replace({ name: 'not-found' });
  } finally {
    // Só agenda a próxima busca DEPOIS que a atual terminou
    scheduleNextPoll();
  }
}

function scheduleNextPoll() {
  // Limpa qualquer timer existente para evitar duplicatas
  if (pollingInterval) clearTimeout(pollingInterval);

  pollingInterval = setTimeout(() => {
    loadData();
  }, 10000);
}

watch(
  listId,
  () =>  loadData(),
  { immediate: true }
)

onMounted(() => {
  loadData(); // Primeira execução
});

onUnmounted(() => {
  if (pollingInterval) clearTimeout(pollingInterval);
});

</script>

<template>
  <section class="">
    <div class="list-container">
      <ListItemRow
        v-for="item in items"
        :key="item.id"
        :item="item"
        @edit="openDialog(item)"
      />
    </div>

    <p v-if="items.length === 0" class="empty">
      Sem itens na lista
    </p>

    <!-- Speed-dial overlay -->
    <Transition name="fade">
      <div v-if="showMenu" class="fab-backdrop" @click="showMenu = false" />
    </Transition>

    <div class="fab-container">
      <Transition name="slide-up">
        <div v-if="showMenu" class="fab-options">
          <button class="fab-option" @click="openBulkDialog">
            <span class="fab-option-label">Vários itens</span>
            <div class="fab-option-btn"><i class="ri-list-check-3"></i></div>
          </button>
          <button class="fab-option" @click="openSingleDialog">
            <span class="fab-option-label">Um item</span>
            <div class="fab-option-btn"><i class="ri-file-add-line"></i></div>
          </button>
        </div>
      </Transition>

      <FloatingAddButton @click="showMenu = !showMenu" />
    </div>

    <SaveListItem ref="dialog" :listId="listId" @save="handleSaveItem($event)"/>
    <BulkAddItems ref="bulkDialog" :listId="listId" />
  </section>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.fab-backdrop {
  position: fixed;
  inset: 0;
  z-index: 90;
}

.fab-container {
  position: fixed;
  bottom: 7rem;
  right: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-sm);
  z-index: 95;
}

.fab-options {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.fab-option {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.fab-option-label {
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  white-space: nowrap;
}

.fab-option-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  flex-shrink: 0;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-up-enter-active, .slide-up-leave-active { transition: opacity 0.2s, transform 0.2s; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(8px); }
</style>
