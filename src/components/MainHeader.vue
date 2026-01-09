<script setup lang="ts">
defineEmits(['add'])
</script>


<template>
  <header class="header">
    <h1 class="title">My Lists</h1>

    <button class="icon-btn primary" @click="$emit('add')">
      <i class="ri-add-line"></i>
    </button>
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

.title {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
