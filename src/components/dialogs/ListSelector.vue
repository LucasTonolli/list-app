
<script setup lang="ts">
import type { List } from '@/types/models/List';
import { ref } from 'vue'


defineProps<{
  lists: List[]
  currentListId: string|undefined
}>()
const emit = defineEmits<{
  (e: 'select', list: List): void
  (e: 'remove', id: string): void
  (e: 'edit', id: string): void
}>()


const dialog = ref<HTMLDialogElement | null>(null)
const listToRemove = ref<List | null>(null)

function open(): void {
  dialog.value?.showModal()
}

function close(): void {
  dialog.value?.close()
}


function confirmRemove() {
  if (!listToRemove.value) return
  emit('remove', listToRemove.value.id)
  listToRemove.value = null
}


defineExpose({ open, close })
</script>


<template>
  <dialog ref="dialog" class="dialog">
    <div class="sheet">
      <header class="header">
        <h2>Selecionar lista</h2>
        <button class="icon-btn" @click="close">
          <i class="ri-close-line"></i>
        </button>
      </header>

       <RouterLink to="/" class="global-link">
        <i class="ri-list-check"></i>
        Acessar todas as listas
      </RouterLink>

      <hr />
      <ul class="list">
        <li
          v-for="list in lists"
          :key="list.id"
          class="list-item-container"
        >
          <button
            class="list-item"
            :class="{ active: list.id === currentListId }"
            @click="emit('select', list)"
          >
            <span>{{ list.title }}</span>

            <i
              v-if="list.id === currentListId"
              class="ri-check-line"
            ></i>
          </button>
          <div class="btn-actions">
            <button type="button" class="icon-btn edit" @click="emit('edit', list.id)">
              <i class="ri-pencil-line"></i>
            </button>
            <button @click.stop="listToRemove = list" class="icon-btn danger"  aria-label="Remover lista">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>

        </li>
        <p v-if="lists.length === 0" class="empty">
          Nenhuma lista criada
        </p>
      </ul>
      <div v-if="listToRemove" class="confirm">
        <p>
          Excluir <strong>{{ listToRemove.title }}</strong>?
        </p>
        <div class="confirm-actions">
          <button class="btn ghost" @click="listToRemove = null">
            Cancelar
          </button>
          <button class="btn danger" @click="confirmRemove">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>


.global-link {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  color: var(--color-muted);
}

hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--space-sm) 0;
}

.list {
  list-style: none;
  height: 30dvh;
  overflow-y: scroll;
  overscroll-behavior: contain;
}

.list-item-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
}

.list {
  flex: 1;
  overflow-y: auto;
}

.list-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-btn.subtle {
  opacity: 0.5;
}

.icon-btn.subtle:active {
  opacity: 1;
}

.confirm {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-sm);
  background-color: #eee;
  border-radius:  var(--radius-md);
  padding: var(--space-sm);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}

</style>
