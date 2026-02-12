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

      <div>
        <input class="field" type="number" v-model="quantity" name="" id="use-quantity" inputmode="numeric" placeholder="Quantas pessoas podem acessar?">
      </div>

      <footer class="sheet-actions">

        <button type="submit" class="btn btn-full primary">
          Criar link de acesso
        </button>
      </footer>
    </form>
  </dialog>
</template>

