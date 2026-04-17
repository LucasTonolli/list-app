<script setup lang="ts">
import { ref } from 'vue'

const EXPIRATION_OPTIONS = [
  { label: '1 hora',  minutes: 60 },
  { label: '6 horas', minutes: 60 * 6 },
  { label: '1 dia',   minutes: 60 * 24 },
  { label: '7 dias',  minutes: 60 * 24 * 7 },
  { label: '30 dias', minutes: 60 * 24 * 30 },
]

const dialog = ref<HTMLDialogElement | null>(null)
const quantity = ref(1)
const expiresInMinutes = ref(60 * 24)

const emit = defineEmits<{
  (e: 'share-list', payload: { quantity: number; expiresInMinutes: number }): void
}>()

function open() {
  quantity.value = 1
  expiresInMinutes.value = 60 * 24
  dialog.value?.showModal()
}

function close() {
  dialog.value?.close()
}

function submit() {
  emit('share-list', { quantity: quantity.value, expiresInMinutes: expiresInMinutes.value })
}

defineExpose({ open, close })
</script>

<template>
  <dialog ref="dialog" class="dialog">
    <form method="dialog" class="sheet" @submit.prevent="submit">
      <header class="sheet-header">
        <h2>Compartilhar lista</h2>
        <button type="button" class="icon-btn" @click="close">
          <i class="ri-close-line"></i>
        </button>
      </header>

      <div class="fields">
        <div class="field-group">
          <label class="label" for="use-quantity">Número de acessos</label>
          <input
            class="field"
            type="number"
            id="use-quantity"
            v-model="quantity"
            inputmode="numeric"
            min="1"
            placeholder="Quantas pessoas podem acessar?"
          />
        </div>

        <div class="field-group">
          <label class="label" for="expiration">Expiração do link</label>
          <select class="field" id="expiration" v-model="expiresInMinutes">
            <option v-for="opt in EXPIRATION_OPTIONS" :key="opt.minutes" :value="opt.minutes">
              {{ opt.label }}
            </option>
          </select>
        </div>
      </div>

      <footer class="sheet-actions">
        <button type="submit" class="btn btn-full primary">
          Criar link de acesso
        </button>
      </footer>
    </form>
  </dialog>
</template>

<style scoped>
.fields {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.label {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-muted);
}
</style>
