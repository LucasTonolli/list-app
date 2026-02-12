<script setup lang="ts">
import type { ListItem } from '@/types/ListItem';
import { reactive, ref} from 'vue'

const dialog = ref<HTMLDialogElement | null>(null)

const item = ref<ListItem | null>(null)
const form = reactive({
  name:'',
  description: ''
})

const emit = defineEmits<{
  (e: 'save', payload: { name: string; description: string|null }): void
}>()


function close(): void {
  item.value = null
  form.name = ''
  form.description = ''
  dialog.value?.close()
}

function submit(): void {
  if (!form.name) return

  emit('save', {
    name: form.name,
    description: form.description
  })

  close()
}

function open(): void {
  form.name = item.value?.name ?? ''
  form.description = item.value?.description ?? ''

  dialog.value?.showModal()
}

defineExpose({ open, item })

</script>


<template>
  <dialog ref="dialog" class="dialog">
    <form method="dialog" class="sheet" @submit.prevent="submit">
      <header class="header">
        <h2>{{  item ? 'Editar item' : 'Adicionar item' }}</h2>
        <button type="button" class="icon-btn" @click="close">
          <i class="ri-close-line"></i>
        </button>
      </header>

      <div>
        <input
          class="field"
          v-model="form.name"
          placeholder="Item"
          autofocus
          required
        />

        <textarea
          class="field"
          v-model="form.description"
          placeholder="Descrição (opcional)"
          rows="3"
        ></textarea>
      </div>

      <button class="btn btn-full primary">{{ item ? 'Atualizar' : 'Adicionar' }}</button>
    </form>
  </dialog>
</template>
