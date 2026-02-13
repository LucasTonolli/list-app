import client from "@/api/client";
import type { Identity } from "@/types/Identity";

export const identityService = {
  async create(): Promise<Identity> {
    const { data } = await client.post<Identity>("/identities");
    return data;
  }
}
