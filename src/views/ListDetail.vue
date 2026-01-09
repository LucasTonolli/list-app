<!-- List Detail -->

<script setup lang="ts">
import { useLists } from '@/composable/useLists';
import { useRoute } from 'vue-router';
import FloatingAddButton from '@/components/FloatingAddButton.vue';
import AddListItem from '@/components/dialogs/AddListItem.vue';
import { ref } from 'vue';
import ListItemRow from '@/components/ListItem/ListItemRow.vue';


const { getListById, toggleItem, removeItem } = useLists()
const listId = Number(useRoute().params.id)
const list = getListById(listId)
const dialog = ref<InstanceType<typeof AddListItem> | null>(null)

function openDialog(): void {
  dialog.value?.open()
}

</script>

<template>
  <section class="container">
    <div class="list-container">
      <ListItemRow
        v-for="item in list?.items"
        :key="item.id"
        :item="item"
        :list-id="listId"
        @toggle="toggleItem(listId, item.id)"
        @remove="removeItem(listId, item.id)"
      />
    </div>

    <p v-if="list?.items.length === 0" class="empty">
      Sem itens na lista
    </p>

    <FloatingAddButton @click="openDialog" />
    <AddListItem ref="dialog" :listId="listId"/>
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
