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

      <div class="fields">
        <input
          v-model="form.name"
          placeholder="Item"
          autofocus
          required
        />

        <textarea
          v-model="form.description"
          placeholder="Descrição (opcional)"
          rows="3"
        ></textarea>
      </div>

      <button class="submit">{{ item ? 'Atualizar' : 'Adicionar' }}</button>
    </form>
  </dialog>
</template>


<style scoped>
.dialog {
  padding: 0;
  border: none;
  width: 100%;
  max-width: 100%;
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

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.fields {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

textarea {
  resize: none;
}

.submit {
  width: 100%;
  padding: 0.6rem;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: white;
}
</style>
