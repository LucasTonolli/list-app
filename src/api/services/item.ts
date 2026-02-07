import api from "@/api/api";
import type { ListItem } from "@/types/ListItem";
import type { ListItemResponse } from "@/types/ListItemResponseDTO";

export const itemService = {
  async addItem(listId: string, payload: ListItem): Promise<ListItem> {
    const { data } = await api.post<ListItemResponse>(`/lists/${listId}/items`, payload);
    return this.transform(data);
  },

  async toggleItem(listId: string, itemId: string): Promise<ListItem> {
    const { data } = await api.patch<ListItemResponse>(`/lists/${listId}/items/${itemId}`);
    return this.transform(data);
  },

  async  updateItem(listId: string, itemId: string, payload: ListItem): Promise<ListItem> {
    const { data } = await api.put<ListItemResponse>(`/lists/${listId}/items/${itemId}`, payload);
    return this.transform(data);
  },

  async deleteItem(listId: string, itemId: string): Promise<void> {
    await api.delete(`/lists/${listId}/items/${itemId}`);
  },

  transform(response: ListItemResponse): ListItem {

    return {
      id: response.uuid,
      listId: response.list_uuid,
      name: response.name,
      description: response.description,
      checked: response.completed,
      version: response.version,
      lockedAt: response.locked_at,
      lockedBy: response.locked_by,
      createdAt: response.created_at,
      updatedAt: response.updated_at
    };
  }
}
