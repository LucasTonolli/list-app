import type { SaveListDTO } from "@/types/SaveListDTO";
import api from "@/api/api";
import type { List } from "@/types/List";
import type { ListResponse } from "@/types/ListResponseDTO";


export const listService = {
  async getLists(): Promise<List[]> {
    const { data } = await api.get<ListResponse>("/lists");

    return data.lists.map(item => ({
      id: item.uuid,
      title: item.title,
      itemsCount: item.items_count,
      sharedWith: item.shared_with_count,
      items: [],
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
  },

  async getById(id: string): Promise<List> {
    const { data } = await api.get<List>(`/lists/${id}`);
    return data.lists;
  },

  async create(payload: SaveListDTO): Promise<List> {
    const { data } = await api.post<List>("/lists", payload);
    return data;
  },

  async update(id: string, payload: SaveListDTO): Promise<List> {
    const { data } = await api.patch<List>(`/lists/${id}`, payload);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/lists/${id}`);
  },
}
