import { ref } from 'vue';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
  show: boolean;
  message: string;
  type: NotificationType;
}

const toast = ref<ToastState>({ show: false, message: '', type: 'success' });
let timeoutId: number | undefined
const showNotification = (message: string, type: NotificationType = 'success') => {
  if(timeoutId) clearTimeout(timeoutId)
  toast.value = { show: true, message, type };
}

export function useNotification() {
  return {
    toast,
    showNotification
  }
}
