import api from "@/api/api";
import type { ListItem } from "@/types/ListItem";
import type { ListItemRaw } from "@/types/ListItemRaw";
import type { ListItemResponse } from "@/types/ListItemResponseDTO";

export const itemService = {
  async addItem(listId: string, payload: { name: string; description: string | null }): Promise<ListItem> {
    const { data } = await api.post<ListItemResponse>(`/lists/${listId}/items`, payload);
    return this.transform(data.item);
  },

  async toggleItem(listId: string, itemId: string): Promise<ListItem> {
    const { data } = await api.patch<ListItemResponse>(`/lists/${listId}/items/${itemId}/toggle`);
    return this.transform(data.item);
  },

  async  updateItem(listId: string, itemId: string, payload: { name: string; description: string | null , version: number}): Promise<ListItem> {
    const { data } = await api.put<ListItemResponse>(`/lists/${listId}/items/${itemId}`, payload);
    return this.transform(data.item);
  },

  async deleteItem(listId: string, itemId: string): Promise<void> {
    await api.delete(`/lists/${listId}/items/${itemId}`);
  },

  transform(raw: ListItemRaw): ListItem {

    return {
      id: raw.uuid,
      listId: raw.list_uuid,
      name: raw.name,
      description: raw.description,
      checked: raw.completed,
      version: raw.version,
      lockedAt: raw.locked_at,
      lockedBy: raw.locked_by,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at
    };
  }
}
