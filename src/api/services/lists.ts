import type { SaveListDTO } from "@/types/SaveListDTO";
import api from "@/api/api";
import type { List } from "@/types/List";
import type { ListResponse } from "@/types/ListResponseDTO";
import { itemService } from "./item";


export const listService = {
  async getLists(): Promise<List[]> {
    const { data } = await api.get("/lists");
    return data.lists.map(item => (this.transform(item)));
  },

  async getById(id: string): Promise<List> {
    const { data } = await api.get(`/lists/${id}`);
    return this.transform(data.list);
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

  transform(response: ListResponse): List {

    return {
      id: response.uuid,
      title: response.title,
      itemsCount: response.items_count,
      sharedWith: response.shared_with_count,
      items: response.items ? response.items.map(item => (itemService.transform(item))) : [],
      createdAt: response.created_at,
      updatedAt: response.updated_at
    };
  }
}
