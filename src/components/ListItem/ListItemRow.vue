<script setup lang="ts">
import type { ListItem } from '@/types/ListItem';


defineProps<{
  item: ListItem,
}>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'remove', id: number): void
}>()


</script>

<template>
  <div class="item" :class="{ done: item.checked }">
    <button class="toggle" @click="emit('toggle', item.id)">
      <i
        :class="item.checked ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'"
      ></i>
    </button>

    <div class="content">
      <p class="name">{{ item.name }}</p>
      <p v-if="item.description" class="description">
        {{ item.description }}
      </p>
    </div>

    <div class="actions">
      <button class="icon-btn" @click="emit('edit', item)">
        <i class="ri-pencil-line"></i>
      </button>

      <button class="icon-btn danger" @click="emit('remove', item.id)">
        <i class="ri-delete-bin-line"></i>
      </button>
    </div>
  </div>
</template>



<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  border-bottom: 1px solid var(--color-border);
  background-color: #fff;
}

.toggle {
  font-size: 1.4rem;
  color: var(--color-primary);
}

.content {
  flex: 1;
}

.name {
  font-size: 0.95rem;
}

.description {
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-top: 2px;
}

.actions {
  display: flex;
  gap: 4px;
}

.done .name {
  text-decoration: line-through;
  color: var(--color-muted);
}
</style>
