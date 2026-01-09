<script setup lang="ts">
import type { List } from '@/types/List';

defineProps<{
  currentList: List
}>()

const emit = defineEmits<{
  (e: 'selectList'): void
  (e: 'createList'): void
}>()
</script>


<template>
  <header class="header">
    <button class="list-select" @click="emit('selectList')">
      <span>{{ currentList.title }}</span>
      <i class="ri-arrow-down-s-line"></i>
    </button>

    <button class="icon-btn primary" @click="emit('createList')">
      <i class="ri-add-line"></i>
    </button>
  </header>
</template>


<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.list-select {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1rem;
  font-weight: 500;
}

.name {
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
