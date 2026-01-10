<!-- List Detail -->

<script setup lang="ts">
import { useLists } from '@/composable/useLists';
import { useRoute } from 'vue-router';
import FloatingAddButton from '@/components/FloatingAddButton.vue';
import AddListItem from '@/components/dialogs/AddListItem.vue';
import { computed, ref } from 'vue';
import ListItemRow from '@/components/ListItem/ListItemRow.vue';


const { getListById, toggleItem, removeItem } = useLists()
const route = useRoute()
const listId = computed(() => String( route.params.id))
const list = computed(() => getListById(listId.value))
const dialog = ref<InstanceType<typeof AddListItem> | null>(null)
const emit = defineEmits<{
  (e: 'toggle-item', isChecked: boolean): void
  (e: 'remove-item'): void
  (e: 'create-item'): void
}>()

function openDialog(): void {
  dialog.value?.open()
}

</script>

<template>
  <section class="">
    <div class="list-container">
      <ListItemRow
        v-for="item in list?.items"
        :key="item.id"
        :item="item"
        :list-id="listId"
        @toggle="toggleItem(listId, item.id); emit('toggle-item', item.checked)"
        @remove="removeItem(listId, item.id); emit('remove-item')"
      />
    </div>

    <p v-if="list?.items.length === 0" class="empty">
      Sem itens na lista
    </p>

    <FloatingAddButton @click="openDialog" />
    <AddListItem ref="dialog" :listId="listId" @create="emit('create-item')"/>
  </section>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.empty {
  text-align: center;
  color: var(--color-muted);
  padding: var(--space-md);
  background-color: #ddd;
  border-radius: var(--radius-md);
}
</style>
