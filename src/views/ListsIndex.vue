<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLists } from '@/composable/useLists'
import ListCard from '@/components/List/ListCard.vue'

const router = useRouter()
const { lists } = useLists()

const hasLists = computed(() => lists.value.length > 0)

function openList(id: string) {
  router.push({ name: 'list', params: { id } })
}
</script>

<template>
  <section class="lists-index">
    <!-- EMPTY STATE -->
    <div v-if="!hasLists" class="empty-state">
      <h1>✨ Bem-vindo</h1>
      <p>
        Crie listas para organizar tarefas,
        compras e ideias em um só lugar.
      </p>

      <button class="btn primary">
        <i class="ri-add-line"></i>
        Criar primeira lista
      </button>
    </div>

    <!-- LISTS OVERVIEW -->
    <div v-else>
      <header class="intro">
        <h1>📋 Minhas listas</h1>
        <p>Organize tudo em um lugar</p>
      </header>

      <div class="lists-grid">
        <ListCard
          v-for="list in lists"
          :key="list.id"
          :list="list"
          @open="openList"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.lists-index {
  padding: var(--space-md);
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  padding: var(--space-lg) var(--space-md);
}

.empty-state h1 {
  margin-bottom: var(--space-sm);
}

.empty-state p {
  color: var(--color-muted);
  margin-bottom: var(--space-lg);
}

.empty-state .btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

/* INTRO */
.intro {
  margin-bottom: var(--space-md);
}

.intro p {
  color: var(--color-muted);
}

/* GRID */
.lists-grid {
  display: grid;
  gap: var(--space-md);
}
</style>
