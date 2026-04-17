<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref<HTMLDialogElement | null>(null)
const text = ref('')

const emit = defineEmits<{
  (e: 'save', names: string[]): void
}>()

function open(): void {
  text.value = ''
  dialog.value?.showModal()
}

function close(): void {
  text.value = ''
  dialog.value?.close()
}

function submit(): void {
  const names = text.value
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  if (names.length === 0) return

  emit('save', names)
  close()
}

defineExpose({ open })
</script>

<template>
  <dialog ref="dialog" class="dialog">
    <form method="dialog" class="sheet" @submit.prevent="submit">
      <header class="header">
        <h2>Adicionar vários itens</h2>
        <button type="button" class="icon-btn" @click="close">
          <i class="ri-close-line"></i>
        </button>
      </header>

      <div>
        <textarea
          class="field"
          v-model="text"
          placeholder="Um item por linha"
          rows="8"
          autofocus
          required
        ></textarea>
        <p class="hint">Cada linha vira um item separado.</p>
      </div>

      <button class="btn btn-full primary">Adicionar itens</button>
    </form>
  </dialog>
</template>

<style scoped>
.hint {
  font-size: 0.78rem;
  color: var(--color-muted);
  margin: var(--space-xs) 0 0;
}
</style>
