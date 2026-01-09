
<script setup lang="ts">
import type { List } from '@/types/List';
import { ref } from 'vue'


defineProps<{
  lists: List[]
  currentListId: number
}>()

const dialog = ref<HTMLDialogElement | null>(null)

function open(): void {
  dialog.value?.showModal()
}

function close(): void {
  dialog.value?.close()
}


defineExpose({ open, close })
</script>


<template>
  <dialog ref="dialog" class="dialog">
    <div class="sheet">
      <header class="header">
        <h2>Selecionar lista</h2>
        <button class="icon-btn" @click="close">
          <i class="ri-close-line"></i>
        </button>
      </header>

      <ul class="list">
        <li
          v-for="list in lists"
          :key="list.id"
        >
          <RouterLink
            class="list-item"
            :class="{ active: list.id === currentListId }"
            :to="{
              name: 'list',
              params: { id: list.id }
            }"
          >
            <span>{{ list.title }}</span>

            <i
              v-if="list.id === currentListId"
              class="ri-check-line"
            ></i>
          </RouterLink>
        </li>
      </ul>
    </div>
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

.list {
  list-style: none;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
}

.list-item:active {
  background: #f3f4f6;
}

.list-item.active {
  font-weight: 600;
  color: var(--color-primary);
}

</style>
