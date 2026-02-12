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

      <div>
        <input
          class="field"
          id="title"
          v-model="title"
          type="text"
          placeholder="Ex: Compras do mês"
          autofocus
        />
      </div>

      <footer class="sheet-actions">

        <button type="submit" class="btn-full btn primary">
          {{ list ? 'Salvar' : 'Criar' }}
        </button>
      </footer>
    </form>
  </dialog>
</template>

