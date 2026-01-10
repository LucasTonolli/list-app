<script setup lang="ts">
import { onMounted, computed } from 'vue'

type ToastType = 'success' | 'error' | 'warning' | 'info'

const props = defineProps<{
  message: string
  type?: ToastType
  icon?: ''
}>()

const emit = defineEmits(['close'])

const iconClass = computed(() => {
  switch (props.type) {
    case 'error':
      return 'ri-error-warning-line'
    case 'warning':
      return 'ri-alert-line'
    case 'info':
      return 'ri-information-line'
    case 'success':
    default:
      return 'ri-checkbox-circle-line'
  }
})

onMounted(() => {
  const duration = props.type === 'error' ? 5000 : 3000
  setTimeout(() => {
    emit('close')
  }, duration)
})
</script>

<template>
  <div class="toast" :class="type || 'success'">
    <i :class="iconClass" class="toastIcon"></i>
    <span>{{ message }}</span>
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 50px; /* Estilo 'Pill' */
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  color: white;
  font-weight: 500;
  cursor: pointer;
  min-width: 300px;
  justify-content: center;

  /* Animação de entrada */
  animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-icon {
  font-size: 1.2rem;
}

/* --- Variações de Cores --- */

/* Sucesso: Verde Vue */
.toast.success {
  background-color: #42b883;
}

/* Erro: Vermelho */
.toast.error {
  background-color: #ff4d4d;
}

/* Aviso: Laranja/Amarelo Queimado */
.toast.warning {
  background-color: #f39c12;
}

/* Info: Azul */
.toast.info {
  background-color: #3498db;
}

@keyframes slideIn {
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}
</style>
