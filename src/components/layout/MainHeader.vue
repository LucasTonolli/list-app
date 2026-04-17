<script setup lang="ts">
import type { List } from '@/types/models/List';

defineProps<{
  currentList: List|undefined
}>()

const emit = defineEmits<{
  (e: 'select-list'): void
}>()
</script>


<template>
  <header class="header">
    <button type="button" class="list-select" @click="emit('select-list')" aria-label="Selecionar lista">
      <span class="name">{{ currentList?.title ?? 'Selecionar lista' }}</span>
      <i class="ri-arrow-down-s-line"></i>
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
