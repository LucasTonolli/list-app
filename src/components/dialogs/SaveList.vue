<script setup lang="ts">
import type { List } from '@/types/List';
import { ref, toRaw } from 'vue'

const list = ref<List | null>(null)

const emit = defineEmits<{
  (e: 'save',  payload: { title: string; listId: string | null }): void
}>()

const dialog = ref<HTMLDialogElement | null>(null)
const title = ref('')

function open() {
  dialog.value?.showModal()
}

function close() {
  dialog.value?.close()
  title.value = ''
  list.value = null
}

function submit() {
  if (!title.value.trim()) return
  emit('save', {
    title: title.value.trim(),
    listId: list.value?.id ?? null
  })
  close()
}

function openForEdit(listToEdit: List) {

  if(!listToEdit) return
  list.value = { ...toRaw(listToEdit) }
  title.value = list.value.title
  open()
}


defineExpose({ open, openForEdit })
</script>

<template>
  <dialog ref="dialog" class="dialog">
    <form method="dialog" class="sheet" @submit.prevent="submit">
      <header class="sheet-header">
        <h2 >{{ list ? 'Editar lista' : 'Criar nova lista' }}</h2>
        <button type="button" class="icon-btn" @click="close">
          <i class="ri-close-line"></i>
        </button>
      </header>

      <div class="field">
        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="Ex: Compras do mês"
          autofocus
        />
      </div>

      <footer class="sheet-actions">

        <button type="submit" class="btn primary">
          {{ list ? 'Salvar' : 'Criar' }}
        </button>
      </footer>
    </form>
  </dialog>
</template>

<style scoped>
.dialog {
  padding: 0;
  border: none;
  width: 100%;
  max-width: none;
  background: transparent;
}

.dialog::backdrop {
  background: rgba(0, 0, 0, 0.4);
}

.sheet {
 position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--color-bg);
  border-radius: 16px 16px 0 0;
  padding: var(--space-md);
  animation: slideUp 0.25s ease;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.field input {
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.sheet-actions {
  display: flex;
  gap: var(--space-sm);
  justify-content: flex-end;
  margin-top: var(--space-md);
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
}

.btn {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  border: none;
  width: 100%;
}

.btn.primary {
  background: var(--color-primary);
  color: #fff;
}

</style>
