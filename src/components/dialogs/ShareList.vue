<script setup lang="ts">
import { ref} from 'vue'
const dialog = ref<HTMLDialogElement | null>(null)
const quantity = ref(1)
const emit = defineEmits<{
  (e: 'share-list', quantity: number): void
}>()
function open() {
  dialog.value?.showModal()
}

function close() {
  dialog.value?.close()
}

function submit() {
  emit('share-list', quantity.value)
}

defineExpose({ open, close })
</script>

<template>
  <dialog ref="dialog" class="dialog">
    <form method="dialog" class="sheet" @submit.prevent="submit">
      <header class="sheet-header">
        <h2 >Compartilhar lista</h2>
        <button type="button" class="icon-btn" @click="close">
          <i class="ri-close-line"></i>
        </button>
      </header>

      <div class="field">
        <input type="number" v-model="quantity" name="" id="use-quantity" inputmode="numeric" placeholder="Quantas pessoas podem acessar?">
      </div>

      <footer class="sheet-actions">

        <button type="submit" class="btn primary">
          Criar link de acesso
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
