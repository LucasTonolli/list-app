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
const isAccepting = ref(false);


onMounted(async () => {
  try {
    const details = await invitationService.getInvitation(listId, token);
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
    isAccepting.value = true;
    await invitationService.accept(listId, token);
    showNotification('Agora você faz parte desta lista!', 'success');
    router.push({ name: 'list', params: { id: listId } });
  } catch (e) {
    showNotification('Erro ao aceitar: ' + e.response?.data.message, 'error');
  } finally {
    isAccepting.value = false;
  }
}
</script>

<template>
  <div class="invite-card">
  <div class="icon-wrapper">
    <i class="ri-user-add-line"></i>
  </div>

  <h1>Você foi convidado!</h1>
  <p class="subtitle">Seu amigo quer compartilhar uma lista com você</p>

  <div class="list-badge">
    {{ listName }}
  </div>

  <div class="actions">
    <button class="btn primary" @click="handleAccept" :disabled="isAccepting">
      Aceitar e Entrar
    </button>
    <button class="btn secondary" @click="router.push('/')">
      Agora não
    </button>
  </div>

  <footer class="footer-info">
    © 2026 · List App
  </footer>
</div>
</template>
<style scoped>
.invite-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh; /* Aumentado para centralizar melhor visualmente */
  padding: var(--space-md);
  background: linear-gradient(to bottom, transparent, var(--color-bg-alt, #f9f9f9));
}

.invite-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg, 24px); /* Bordas mais arredondadas para um ar moderno */
  padding: var(--space-xl, 40px);
  width: 100%;
  max-width: 420px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--color-primary-light, #f0f7ff);
  color: var(--color-primary);
  border-radius: 50%;
  margin-bottom: var(--space-md);
  font-size: 2.5rem;
}

.invite-card h1 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: var(--space-xs);
  color: var(--color-text);
  letter-spacing: -0.025em;
}

.subtitle {
  color: var(--color-text-light);
  font-size: 0.95rem;
  margin-bottom: var(--space-lg);
}

/* Badge estilizado para o nome da lista */
.list-badge {
  display: inline-block;
  background: var(--color-primary-light, #f0f7ff);
  color: var(--color-primary);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-pill, 100px);
  font-weight: 700;
  font-size: 1.1rem;
  margin: var(--space-sm) 0 var(--space-xl);
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-md);
  border-radius: var(--radius-md, 12px);
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
}

/* Ajuste para o Footer no card */
.footer-info {
  margin-top: var(--space-xl);
  font-size: 0.8rem;
  color: var(--color-text-light);
  opacity: 0.7;
}
</style>
