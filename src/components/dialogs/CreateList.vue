<script setup lang="ts">
import { useLists } from '@/composable/useLists';
import router from '@/router';
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'create', title: string): void
}>()

const {getLists} = useLists()

const dialogRef = ref<HTMLDialogElement | null>(null)
const title = ref('')

function open() {
  dialogRef.value?.showModal()
}

function close() {
  dialogRef.value?.close()
  title.value = ''
}

function submit() {
  if (!title.value.trim()) return
  emit('create', title.value.trim())
  const lists =  getLists();
  const lastList = lists[lists.length - 1];
  router.push({ name: 'list', params: { id: lastList.id } })
  close()
}

defineExpose({ open })
</script>

<template>
  <dialog ref="dialogRef" class="dialog">
    <form method="dialog" class="sheet" @submit.prevent="submit">
      <header class="sheet-header">
        <h2>Nova lista</h2>
        <button type="button" class="icon-btn" @click="close">
          <i class="ri-close-line"></i>
        </button>
      </header>

      <div class="field">
        <label for="title">Nome da lista</label>
        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="Ex: Compras do mês"
          autofocus
        />
      </div>

      <footer class="sheet-actions">
        <button type="button" class="btn ghost" @click="close">
          Cancelar
        </button>
        <button type="submit" class="btn primary">
          Criar
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
}

.btn.primary {
  background: var(--color-primary);
  color: #fff;
}

.btn.ghost {
  background: transparent;
  color: var(--color-muted);
}
</style>
