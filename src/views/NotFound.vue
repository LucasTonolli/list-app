<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push({ name: 'lists-index' })
}
</script>

<template>
  <section class="not-found">
    <h1>404</h1>
    <p>Página não encontrada</p>

    <button type="button" class="btn primary" @click="goHome">
      Voltar para listas
    </button>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  text-align: center;
}
</style>
