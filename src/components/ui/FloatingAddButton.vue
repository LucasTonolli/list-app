<script setup lang="ts">
  import { computed } from 'vue';
  import { useFabPosition } from '@/composables/useFabPosition';

  const emit = defineEmits<{
  (e: 'click'): void
}>()

  const { position, isDragging, startDrag } = useFabPosition()

  const style = computed(() => ({
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
  }))
</script>

<template>
  <button
    class="fab"
    :class="{ dragging: isDragging }"
    :style="style"
    @pointerdown="startDrag($event, () => emit('click'))"
  >
    <i class="ri-add-line"></i>
  </button>
</template>



<style scoped>
.fab {
  position: fixed;
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
  touch-action: none;
  cursor: grab;
  z-index: 95;
  transition: box-shadow 0.15s;
}

.fab:active {
  transform: scale(0.96);
}

.fab.dragging {
  cursor: grabbing;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
  transition: none;
}
</style>
