import api from "@/api/api";

export const invitationService = {
  async create(listId: string, useQuantity: number|null): Promise<{uuuid: string, share_url: string, max_uses: number}> {
    const {data} = await api.post(`/lists/${listId}/invitations`, { max_uses: useQuantity });

    return data.invitation
  },

  async getInvitation(listId: string, invitationId: string): Promise<void> {
    await api.get(`/lists/${listId}/invitations/${invitationId}`);
  },

  async accept(listsId: string, invitationId: string): Promise<void> {
    await api.post(`/lists/${listsId}/invitations/${invitationId}/accept`);
  }
}
