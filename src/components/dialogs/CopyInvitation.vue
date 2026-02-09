<script setup lang="ts">
import { ref} from 'vue'
 const props = defineProps<{
  link?: string
 }>()

const dialog = ref<HTMLDialogElement | null>(null)
const internalLink = ref('')
const copied = ref(false)

 function open(LinkFromAction?: string) {
  internalLink.value = LinkFromAction || props.link  || '#'
  copied.value = false
  dialog.value?.showModal()
}
function close() {
  dialog.value?.close()
}

async function copyLink() {
 try {
    await navigator.clipboard.writeText(internalLink.value)
    copied.value = true
    // Feedback rápido de sucesso no botão
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Erro ao copiar', err)
  }
}

defineExpose({ open })

</script>


<template>
  <dialog ref="dialog" class="dialog">
    <form method="dialog" class="sheet">
      <header class="sheet-header">
        <h2>Compartilhar lista</h2>
        <button type="button" class="icon-btn" @click="close">
          <i class="ri-close-line"></i>
        </button>
      </header>

      <div class="field">
       <div class="link-display">
          <code>{{ internalLink }}</code>
        </div>
      </div>

      <footer class="sheet-actions">

        <button type="button" class="btn primary" @click="copyLink">
          <span v-if="!copied">Copiar link <i class="ri-file-copy-line"></i></span>
          <span v-else>Link copiado <i class="ri-check-line"></i></span>
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

.link-display {
  background: var(--color-bg-alt, #f4f4f4);
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  border: 1px dashed var(--color-border);
  word-break: break-all;
  margin: var(--space-sm) 0;
}

code { font-family: monospace; color: var(--color-primary); }

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
