<script setup lang="ts">
import type { List } from '@/types/List'

defineProps<{
  list: List
}>()

const emit = defineEmits<{
  (e: 'open', id: string): void
}>()
</script>

<template>
  <article class="card" @click="emit('open', list.id)">
    <div class="card-header">
      <h3>{{ list.title }}</h3>
      <i class="ri-arrow-right-s-line"></i>
    </div>

    <p class="meta">
      {{ list.items.length }} itens
    </p>
  </article>
</template>

<style scoped>
.card {
  background: var(--color-bg);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.card:active {
  transform: scale(0.98);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  font-size: 1rem;
}

.meta {
  margin-top: var(--space-xs);
  color: var(--color-muted);
  font-size: 0.875rem;
}
</style>
