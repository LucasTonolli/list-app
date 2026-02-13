<script setup lang="ts">
  const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="fab" @click="emit('click')">
    <i class="ri-add-line"></i>
  </button>
</template>



<style scoped>
.fab {
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.fab:active {
  transform: scale(0.96);
}
</style>
