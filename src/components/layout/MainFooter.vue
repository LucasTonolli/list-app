<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits<{
  (e: 'share-list'): void
  (e: 'create-list'): void
}>()

const route = useRoute()
const router = useRouter()

const isListDetail = computed(() => route.name === 'list')
</script>

<template>
  <nav class="bottom-nav">
    <button type="button" class="nav-item" @click="router.push({ name: 'lists-index' })" aria-label="Início">
      <i class="ri-home-5-line"></i>
      <span>Início</span>
    </button>

    <button
      v-if="isListDetail"
      type="button"
      class="nav-item"
      @click="emit('share-list')"
      aria-label="Compartilhar lista"
    >
      <i class="ri-user-add-line"></i>
      <span>Compartilhar</span>
    </button>

    <button type="button" class="nav-item" @click="emit('create-list')" aria-label="Nova lista">
      <i class="ri-add-circle-line"></i>
      <span>Nova lista</span>
    </button>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  padding-bottom: calc(var(--space-sm) + env(safe-area-inset-bottom));
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.7rem;
  color: var(--color-muted);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-sm);
  transition: color 0.15s;
}

.nav-item i {
  font-size: 1.4rem;
}

.nav-item:hover,
.nav-item:active {
  color: var(--color-primary);
}
</style>
