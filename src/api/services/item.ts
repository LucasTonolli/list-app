import api from "@/api/api";
import type { ListItem } from "@/types/ListItem";
import type { ListItemResponse } from "@/types/ListItemResponseDTO";

export const itemService = {
  async addItem(listId: string, payload: { name: string; description: string | null }): Promise<ListItem> {
    const { data } = await api.post<ListItemResponse>(`/lists/${listId}/items`, payload);
    return this.transform(data);
  },

  async toggleItem(listId: string, itemId: string): Promise<ListItem> {
    const { data } = await api.patch<ListItemResponse>(`/lists/${listId}/items/${itemId}/toggle`);
    return this.transform(data);
  },

  async  updateItem(listId: string, itemId: string, payload: { name: string; description: string | null , version: number}): Promise<ListItem> {
    const { data } = await api.put<ListItemResponse>(`/lists/${listId}/items/${itemId}`, payload);
    return this.transform(data);
  },

  async deleteItem(listId: string, itemId: string): Promise<void> {
    await api.delete(`/lists/${listId}/items/${itemId}`);
  },

  transform(response: ListItemResponse): ListItem {
    const item = response.item ?? response
    return {
      id: item.uuid,
      listId: item.list_uuid,
      name: item.name,
      description: item.description,
      checked: item.completed,
      version: item.version,
      lockedAt: item.locked_at,
      lockedBy: item.locked_by,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    };
  }
}
