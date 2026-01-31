<script setup lang="ts">
import { ref } from 'vue'
import type { ListItem } from '@/types/ListItem';


defineProps<{
  item: ListItem,
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'remove', id: string): void
  (e: 'edit', id: string): void
}>()

const expanded = ref(false)
</script>

<template>
  <div class="item" :class="{ done: item.checked }">
    <button type="button" class="toggle" @click="emit('toggle', item.id)"
        :aria-pressed="item.checked"
        aria-label="Marcar item como concluído">
      <i
        :class="item.checked ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'"
      ></i>
    </button>

    <button
      type="button"
      class="content"
      @click="expanded = !expanded"
      :aria-expanded="expanded"
    >
      <p class="name">{{ item.name }} <i v-if="item.description" class="ri-file-add-line"></i></p>

      <p
        v-if="item.description && expanded"
        class="description"
      >
        {{ item.description }}
      </p>
    </button>

    <div class="actions">
      <button type="button">
        <i class="ri-edit-line" @click="emit('edit', item.id)" aria-label="Editar item"></i>
      </button>
      <button type="button" class="icon-btn danger" @click="emit('remove', item.id)"   aria-label="Remover item">
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
  background: #fff;
  border-radius: 8px;
}

.toggle {
  font-size: 1.4rem;
  color: var(--color-primary);
  background: none;
  border: none;
}

.content {
  flex: 1;
  background: none;
  border: none;
  padding: 0;
  text-align: left;

  display: flex;
  flex-direction: column;
  gap: 2px;
}

.name {
  font-size: 0.95rem;
}

.description {
  font-size: 0.8rem;
  color: var(--color-muted);
  line-height: 1.4;
}

.actions {
  display: flex;
}

.done .name {
  text-decoration: line-through;
  color: var(--color-muted);
}
</style>

