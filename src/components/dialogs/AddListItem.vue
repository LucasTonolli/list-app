<script setup lang="ts">
import { reactive, ref} from 'vue'
import { useLists } from '@/composable/useLists';

const props = defineProps<{
  listId: number
}>()
const dialog = ref<HTMLDialogElement | null>(null)
const {addItem} = useLists()

const form = reactive({
  name: '',
  description: ''
})


function close(): void {
  dialog.value?.close()
}

function submit(): void {
  if (!form.name) return

 addItem(props.listId, form.name)

  form.name = ''
  form.description = ''
  close()
}

function open(): void {
  dialog.value?.showModal()
}

defineExpose({ open })

</script>


<template>
  <dialog ref="dialog" class="dialog">
    <form method="dialog" class="sheet" @submit.prevent="submit">
      <header class="header">
        <h2>Novo item</h2>
        <button class="icon-btn" @click="close">
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

      <button class="submit">Adicionar item</button>
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
