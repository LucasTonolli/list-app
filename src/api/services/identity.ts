import api from "@/api/api";
import type { Identity } from "@/types/Identity";

export const identityService = {
  async create(): Promise<Identity> {
    const { data } = await api.post<Identity>("/identities");
    return data;
  }
}
