<script setup lang="ts">
import { computed } from 'vue';
import type { List } from '@/types/models/List';
import {  useRoute } from 'vue-router';

defineProps<{
  currentList: List|undefined
}>()

const emit = defineEmits<{
  (e: 'select-list'): void
  (e: 'create-list'): void
  (e: 'share-list'): void
}>()

const router = useRoute()

const currentRouteName = computed(() => router.name);
</script>


<template>
  <header class="header">
    <button type="button" class="list-select" @click="emit('select-list')" aria-label="Selecionar lista">
      <span class="name">{{ currentList?.title ?? 'Selecionar lista' }}</span>
      <i class="ri-arrow-down-s-line"></i>
    </button>

    <div class="actions">
      <button v-if="currentRouteName === 'list'" type="button" class="icon-btn primary" @click="emit('share-list')" aria-label="Compartilhar lista">
        <i class="ri-user-add-line"></i>
      </button>
      <button type="button" class="icon-btn primary" @click="emit('create-list')"  aria-label="Criar nova lista">
        <i class="ri-add-line"></i>
      </button>
    </div>
  </header>
</template>


<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.list-select {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1rem;
  font-weight: 500;
}

.name {
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions{
  display: flex;
  gap: var(--space-sm);
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
</style>
