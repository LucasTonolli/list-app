import client from "@/api/client";
import type { Identity } from "@/types/models/Identity";

export const identityService = {
  async create(): Promise<Identity> {
    const { data } = await client.post<Identity>("/identities");
    return data;
  }
}
