<script setup lang="ts">
  const now = new Date()
</script>

<template>
  <footer class="footer">
    <p>© {{ now.getFullYear() }} · List App</p>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: var(--space-md);
  font-size: 0.8rem;
  color: var(--color-muted);
}
</style>
