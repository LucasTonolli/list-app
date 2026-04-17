<script setup lang="ts">
import { ref, nextTick } from 'vue'

const dialog = ref<HTMLDialogElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const inputValue = ref('')
const tags = ref<string[]>([])

const emit = defineEmits<{
  (e: 'save', names: string[]): void
}>()

function open(): void {
  tags.value = []
  inputValue.value = ''
  dialog.value?.showModal()
  nextTick(() => input.value?.focus())
}

function close(): void {
  tags.value = []
  inputValue.value = ''
  dialog.value?.close()
}

function addTag(): void {
  const name = inputValue.value.trim().replace(/,$/, '')
  if (name && !tags.value.includes(name)) {
    tags.value.push(name)
  }
  inputValue.value = ''
}

function removeTag(index: number): void {
  tags.value.splice(index, 1)
}

function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    addTag()
  } else if (e.key === 'Backspace' && inputValue.value === '' && tags.value.length > 0) {
    tags.value.pop()
  }
}

function submit(): void {
  addTag()
  if (tags.value.length === 0) return
  emit('save', [...tags.value])
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
        <div class="tag-input" @click="input?.focus()">
          <span
            v-for="(tag, i) in tags"
            :key="i"
            class="tag"
          >
            {{ tag }}
            <button type="button" class="tag-remove" @click.stop="removeTag(i)" :aria-label="`Remover ${tag}`">
              <i class="ri-close-line"></i>
            </button>
          </span>

          <input
            ref="input"
            class="tag-text-input"
            v-model="inputValue"
            placeholder="Digite e pressione Enter"
            @keydown="handleKeydown"
            @blur="addTag"
          />
        </div>
        <p class="hint">Enter ou vírgula para adicionar · Backspace para remover</p>
      </div>

      <button class="btn btn-full primary" :disabled="tags.length === 0 && !inputValue.trim()">
        Adicionar {{ tags.length > 0 ? tags.length : '' }} {{ tags.length === 1 ? 'item' : tags.length > 1 ? 'itens' : 'itens' }}
      </button>
    </form>
  </dialog>
</template>

<style scoped>
.tag-input {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  min-height: 80px;
  cursor: text;
  align-content: flex-start;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--color-primary);
  color: white;
  font-size: 0.82rem;
  padding: 3px 6px 3px 10px;
  border-radius: 999px;
  line-height: 1.4;
}

.tag-remove {
  display: flex;
  align-items: center;
  color: white;
  opacity: 0.8;
  font-size: 0.85rem;
  padding: 0;
  line-height: 1;
}

.tag-remove:hover {
  opacity: 1;
}

.tag-text-input {
  flex: 1;
  min-width: 140px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.9rem;
  color: var(--color-text);
  padding: 2px 0;
}

.tag-text-input::placeholder {
  color: var(--color-muted);
}

.hint {
  font-size: 0.75rem;
  color: var(--color-muted);
  margin: var(--space-xs) 0 0;
}
</style>
