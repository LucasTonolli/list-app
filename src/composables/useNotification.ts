import { ref } from 'vue';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface ToastState {
  show: boolean;
  message: string;
  type: NotificationType;
}

const toast = ref<ToastState>({ show: false, message: '', type: 'success' });

const showNotification = (message: string, type: NotificationType = 'success') => {
  toast.value.show = true;
  toast.value.message = message;
  toast.value.type = type;

  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
}

export function useNotification() {
  return {
    toast,
    showNotification
  }
}
