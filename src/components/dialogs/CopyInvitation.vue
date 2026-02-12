<script setup lang="ts">
import { ref} from 'vue'
 const props = defineProps<{
  link?: string
 }>()

const dialog = ref<HTMLDialogElement | null>(null)
const internalLink = ref('')
const expirationTime = ref<Date | null>(null)
const copied = ref(false)

 function open(LinkFromAction?: string, expiresAt?: Date) {
  console.log(expiresAt);
  internalLink.value = LinkFromAction || props.link  || '#'
  expirationTime.value = expiresAt
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


      <div class="expiration-time">
        <i class="ri-timer-2-line"></i> Expiração: {{ expirationTime ? expirationTime.toLocaleString() : 'Nunca' }}
      </div>
      <div class="link-display">
        <code>{{ internalLink }}</code>
      </div>


      <footer class="sheet-actions">
        <button type="button" class="btn primary btn-full" @click="copyLink">
          <span v-if="!copied">Copiar link <i class="ri-file-copy-line"></i></span>
          <span v-else>Link copiado <i class="ri-check-line"></i></span>
        </button>
      </footer>
    </form>
  </dialog>
</template>

<style scoped>

.expiration-time {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.85rem;
  color: var(--color-text-light);
  background: var(--color-bg-alt, #f8f9fa);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  width: 100%;
  border: 1px solid var(--color-border-light, #eee);
  margin-bottom: var(--space-xs);
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
</style>
