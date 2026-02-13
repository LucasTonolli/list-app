<script setup lang="ts">
  const now = new Date()
</script>

<template>
  <footer class="footer">
    <p>© {{ now.getFullYear() }} · List App</p> - Desenvolvido por <a href="https://lucas-tonolli.com.br/?referrer=list-app" target="_blank">Lucas Tonolli</a>
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
