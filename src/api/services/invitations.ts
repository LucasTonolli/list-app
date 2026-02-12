import api from "@/api/api";

export const invitationService = {
  async create(listId: string, useQuantity: number|null): Promise<{uuid: string, share_url: string, max_uses: number, token: string, expires_at: string}> {
    const {data} = await api.post(`/lists/${listId}/invitations`, { max_uses: useQuantity });

    return data.invitation
  },

  async getInvitation(listId: string, invitationId: string): Promise<{uuid: string,list_title: string, share_url: string, max_uses: number, token: string}> {
    const {data} = await api.get(`/lists/${listId}/invitations/${invitationId}`);
    return data.invitation
  },

  async accept(listsId: string, invitationId: string): Promise<void> {
    await api.post(`/lists/${listsId}/invitations/${invitationId}/accept`).catch((e) => {
      console.error('Erro ao aceitar convite', e);
      throw e;
    });

  }
}
