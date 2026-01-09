<script setup lang="ts">
import { ref } from 'vue'
import ItemRow from './ItemRow.vue'
import AddItemDialog from './AddItemDialog.vue'
import FloatingAddButton from './FloatingAddButton.vue'

const items = ref([])

const dialog = ref(null)

function openDialog() {
  dialog.value.open()
}

function addItem(item) {
  items.value.push(item)
}

function toggle(id) {
  const item = items.value.find(i => i.id === id)
  item.done = !item.done
}

function remove(id) {
  items.value = items.value.filter(i => i.id !== id)
}
</script>

<template>
  <section class="card">
    <ItemRow
      v-for="item in items"
      :key="item.id"
      :item="item"
      @toggle="toggle"
      @remove="remove"
    />

    <p v-if="items.length === 0" class="empty">
      No items yet
    </p>

    <FloatingAddButton @click="openDialog" />
    <AddItemDialog ref="dialog" @add="addItem" />
  </section>
</template>



<style scoped>
.empty {
  text-align: center;
  color: var(--color-muted);
  padding: var(--space-md);
}
</style>
