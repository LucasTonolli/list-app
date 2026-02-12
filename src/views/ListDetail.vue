<!-- List Detail -->

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';

//Composables
import { useLists } from '@/composable/useLists';

//Components
import FloatingAddButton from '@/components/FloatingAddButton.vue';
import SaveListItem from '@/components/dialogs/SaveListItem.vue';
import ListItemRow from '@/components/ListItem/ListItemRow.vue';

//Types
import type { ListItem } from '@/types/ListItem';


const { getListById, fetchListById, toggleItem, removeItem, addItem, updateItem } = useLists()
const route = useRoute()
const router = useRouter()

const listId = computed(() => String( route.params.id))
const list = computed(() => getListById(listId.value))
const items = computed(() => list.value?.items ?? [])

const dialog = ref<InstanceType<typeof SaveListItem> | null>(null)
const emit = defineEmits<{
  (e: 'toggle-item', isChecked: boolean): void
  (e: 'remove-item'): void
  (e: 'create-item'): void
  (e: 'edit-item'): void
}>()

function openDialog(itemToEdit: ListItem|null): void {
  if(itemToEdit) {
    dialog.value!.item = itemToEdit
  }
  dialog.value?.open()
}
async function handleToggleItem(item: ListItem): Promise<void> {
  await toggleItem(listId.value, item.id);
  const updatedItem = list.value?.items.find(i => i.id === item.id)

  if(!updatedItem) return

  emit('toggle-item', updatedItem.checked)
}

function handleRemoveItem(item: ListItem): void {
  removeItem(listId.value, item.id)
  emit('remove-item')
}

function handleSaveItem(payload: { name: string, description: string | null }): void {
  const itemToEdit = dialog.value?.item

  if (itemToEdit) {
    updateItem(listId.value, itemToEdit.id, payload.name, payload.description)
    emit('edit-item')
  } else {
    addItem(listId.value, payload.name, payload.description)
    emit('create-item')
  }
}

async function loadData() {
  try {
    await fetchListById(listId.value);
  } catch (error) {
    console.error(error)
    router.replace({ name: 'not-found' });
  }
}

watch(
  listId,
  () =>  loadData(),
  { immediate: true }
)

</script>

<template>
  <section class="">
    <div class="list-container">
      <ListItemRow
        v-for="item in items"
        :key="item.id"
        :item="item"
        @toggle="handleToggleItem(item)"
        @remove="handleRemoveItem(item)"
        @edit="openDialog(item)"
      />
    </div>

    <p v-if="items.length === 0" class="empty">
      Sem itens na lista
    </p>

    <FloatingAddButton @click="openDialog(null)" />
    <SaveListItem ref="dialog" :listId="listId" @save="handleSaveItem($event)"/>
  </section>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

</style>
