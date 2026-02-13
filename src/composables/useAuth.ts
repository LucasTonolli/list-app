import { identityService } from "@/api/services/identity";
import { ref, computed } from "vue";

const token = ref<string | null>(localStorage.getItem('token'));
const loading = ref(false);

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value);

  async function ensureIdentity() {
    if (!isAuthenticated.value) {
      loading.value = true;
      try {
        const identity = await identityService.create();
        token.value = identity.token;
        localStorage.setItem('token', identity.token);
      } catch (error) {
        console.error("Error creating identity", error);
      } finally {
        loading.value = false;
      }
    }
  }
  return {
    token,
    loading,
    isAuthenticated,
    ensureIdentity
  }
}
