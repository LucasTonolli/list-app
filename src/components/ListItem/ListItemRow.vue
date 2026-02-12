<script setup lang="ts">
import { ref } from 'vue'
import type { ListItem } from '@/types/ListItem'
import { useNotification } from '@/composable/useNotification';
import { useLists } from '@/composable/useLists';

defineProps<{
  item: ListItem
}>()

const { toggleItem, getListById, removeItem } = useLists()
const { showNotification } = useNotification()

const emit = defineEmits<{
  (e: 'edit', id: string): void
}>()

const expanded = ref(false)

function toggleExpand() {
  expanded.value = !expanded.value
}

async function handleToggle(item: ListItem): Promise<void> {
  await toggleItem(item.listId, item.id);
  const list = getListById(item.listId)
  const updatedItem = list?.items.find(i => i.id === item.id)

  if (!updatedItem) return

  showNotification(
    updatedItem.checked ? 'Item marcado como concluído' : 'Item marcado como pendente',
    'info'
  )
}

async function handleRemove(item: ListItem): Promise<void> {
  await removeItem(item.listId, item.id)

  showNotification('Item removido com sucesso', 'success')
}
</script>

<template>
  <div class="item-wrapper" :class="{ expanded }">
    <div class="item" :class="{ done: item.checked }">
      <button
        type="button"
        class="toggle"
        @click="handleToggle(item)"
        :aria-pressed="item.checked"
        :aria-label="item.checked ? 'Item concluido' : 'Item pendente'"
      >
        <i :class="item.checked ? 'ri-checkbox-circle-fill' : 'ri-checkbox-blank-circle-line'"></i>
      </button>

      <div class="content">
        <span class="name">{{ item.name }}</span>
      </div>

      <div class="actions">
        <button
          v-if="item.description || item.name.length > 15"
          type="button"
          class="icon-btn"
          :class="{ active: expanded }"
          :aria-expanded="expanded"
          aria-label="Expandir detalhes"
          @click="toggleExpand"
        >
          <i class="ri-arrow-down-s-line expand-icon"></i>
        </button>
        <button
          type="button"
          class="icon-btn"
          aria-label="Editar item"
          @click="emit('edit', item.id)"
        >
          <i class="ri-edit-line"></i>
        </button>
        <button
          type="button"
          class="icon-btn danger"
          aria-label="Remover item"
          @click="handleRemove(item)"
        >
          <i class="ri-delete-bin-line"></i>
        </button>
      </div>
    </div>

    <div v-if="item.description || item.name.length > 15" class="accordion-body">
      <div class="accordion-content">
        <p class="full-name">{{ item.name }}</p>
        <p class="description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-wrapper {
  background: #fff;
  border-radius: 8px;
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
}

.item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
}

.toggle {
  flex-shrink: 0;
  font-size: 1.4rem;
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
}

.content {
  flex: 1;
  min-width: 0;
}

.name {
  display: block;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Acordeão */
.accordion-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease-out;
}

.item-wrapper.expanded .accordion-body {
  grid-template-rows: 1fr;
}

.accordion-content {
  overflow: hidden;
  padding: 0 var(--space-sm);
}

.item-wrapper.expanded .accordion-content {
  padding: 0 var(--space-sm) var(--space-sm);
}

.full-name {
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0 0 var(--space-xs) 0;
  word-break: break-word;
}

.description {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.5;
  margin: 0;
  word-break: break-word;
}

.expand-icon {
  display: inline-block;
  transition: transform 0.25s ease-out;
}

.icon-btn.active .expand-icon {
  transform: rotate(180deg);
}

/* Actions */
.actions {
  display: flex;
  flex-shrink: 0;
}


.done .name {
  text-decoration: line-through;
  color: var(--color-muted);
}
</style>
