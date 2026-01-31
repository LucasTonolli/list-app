<!-- List Detail -->

<script setup lang="ts">
import { useLists } from '@/composable/useLists';
import { useRoute, useRouter } from 'vue-router';
import FloatingAddButton from '@/components/FloatingAddButton.vue';
import SaveListItem from '@/components/dialogs/SaveListItem.vue';
import { computed, ref, watch } from 'vue';
import ListItemRow from '@/components/ListItem/ListItemRow.vue';
import type { ListItem } from '@/types/ListItem';


const { getListById, toggleItem, removeItem, addItem, updateItem } = useLists()
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
function handleToggleItem(item: ListItem): void {
  toggleItem(listId.value, item.id);
  emit('toggle-item', item.checked)
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

watch(
  list,
  (value) => {
    if (!value) {
      router.replace({ name: 'not-found' })
    }
  },
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
