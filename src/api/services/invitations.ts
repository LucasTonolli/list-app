import api from "@/api/api";
import type { CreateInvitation } from "@/types/CreateInvitation";
import type { CreateInvitationRaw } from "@/types/CreateInvitationRaw";
import type { CreateInvitationResponse } from "@/types/CreateInvitationResponse";
import type { GetInvitation } from "@/types/GetInvitation";
import type { GetInvitationRaw } from "@/types/GetInvitationRaw";


export const invitationService = {
  async create(listId: string, useQuantity: number|null): Promise<CreateInvitation> {
    const {data} = await api.post<CreateInvitationResponse>(`/lists/${listId}/invitations`, { max_uses: useQuantity });
    return this.transformCreateInvitationRaw(data.invitation)
  },

  async getInvitation(listId: string, invitationId: string): Promise<GetInvitation> {
    const {data} = await api.get<GetInvitationRaw>(`/lists/${listId}/invitations/${invitationId}`);
    return this.transformGetInvitationRaw(data);
  },

  async accept(listsId: string, invitationId: string): Promise<void> {
    await api.post(`/lists/${listsId}/invitations/${invitationId}/accept`).catch((e) => {
      console.error('Erro ao aceitar convite', e);
      throw e;
    });
  },

  transformCreateInvitationRaw(raw: CreateInvitationRaw): CreateInvitation {
    return {
      uuid: raw.uuid,
      share_url: raw.share_url,
      max_uses: raw.max_uses,
      token: raw.token,
      list_uuid: raw.list_uuid,
      created_at: raw.created_at,
      expires_at: raw.expires_at
    }
  },

  transformGetInvitationRaw(raw: GetInvitationRaw): GetInvitation {
    return {
      uuid: raw.uuid,
      max_uses: raw.max_uses,
      list_title: raw.list_title,
      created_at: raw.created_at,
      expires_at: raw.expires_at,
      accept_url: raw.accept_url
    }
  }
}
