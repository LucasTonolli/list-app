<!-- List Detail -->

<script setup lang="ts">
import { useLists } from '@/composable/useLists';
import { useRoute } from 'vue-router';
import FloatingAddButton from '@/components/FloatingAddButton.vue';
import AddListItem from '@/components/dialogs/AddListItem.vue';
import { computed, ref } from 'vue';
import ListItemRow from '@/components/ListItem/ListItemRow.vue';
import type { ListItem } from '@/types/ListItem';


const { getListById, toggleItem, removeItem, addItem } = useLists()
const route = useRoute()
const listId = computed(() => String( route.params.id))
const list = computed(() => getListById(listId.value))
const items = computed(() => list.value?.items ?? [])
const dialog = ref<InstanceType<typeof AddListItem> | null>(null)
const emit = defineEmits<{
  (e: 'toggle-item', isChecked: boolean): void
  (e: 'remove-item'): void
  (e: 'create-item'): void
}>()

function openDialog(): void {
  dialog.value?.open()
}

function handleCreateItem(payload: { name: string; description: string|null }): void {
  addItem(listId.value, payload.name, payload.description)
  emit('create-item')
}

function handleToggleItem(item: ListItem): void {
  toggleItem(listId.value, item.id);
  emit('toggle-item', item.checked)
}

function handleRemoveItem(item: ListItem): void {
  removeItem(listId.value, item.id)
  emit('remove-item')
}

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
      />
    </div>

    <p v-if="items.length === 0" class="empty">
      Sem itens na lista
    </p>

    <FloatingAddButton @click="openDialog" />
    <AddListItem ref="dialog" :listId="listId" @create="handleCreateItem($event)"/>
  </section>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

</style>
