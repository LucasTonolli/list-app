<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { invitationService } from '@/api/services/invitations';
import { useNotification } from '@/composable/useNotification';

const route = useRoute();
const router = useRouter();
const { showNotification } = useNotification();

const listId = String(route.params.listId);
const token = String(route.params.token);
const listName = ref('');
const isValidating = ref(true);

console.log(route.params);

onMounted(async () => {
  try {
    const details = await invitationService.getInvitation(listId, token);
    console.log('Details', details);
    listName.value = details.list_title;
  } catch (e) {
    showNotification('Convite inválido ou expirado', 'error');
    router.push('/');
  } finally {
    isValidating.value = false;
  }
});

async function handleAccept() {
  try {
    await invitationService.accept(listId, token);
    showNotification('Agora você faz parte desta lista!', 'success');
    router.push({ name: 'list', params: { id: listId } });
  } catch (e) {
    showNotification('Erro ao aceitar convite', 'error');
  }
}
</script>

<template>
  <div class="invite-container">
    <div v-if="isValidating">Validando seu convite...</div>
    <div v-else class="invite-card">
      <h1>Você foi convidado!</h1>
      <h2> {{ listName }}</h2>
      <button class="btn primary" @click="handleAccept">Aceitar e Entrar</button>
    </div>
  </div>
</template>
<style scoped>
.invite-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: var(--space-md);
}

.invite-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.invite-card h1 {
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
  color: var(--color-text);
}

.invite-card strong {
  color: var(--color-primary);
  display: block;
  font-size: 1.2rem;
  margin-top: var(--space-xs);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.btn {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  border: none;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.primary {
  background: var(--color-primary);
  color: #fff;
}

.btn.secondary {
  background: transparent;
  color: var(--color-text-light);
  border: 1px solid var(--color-border);
}

/* Loading state animation */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  color: var(--color-text-light);
}
</style>
