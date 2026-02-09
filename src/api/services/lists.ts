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
    const { data } = await api.post("/lists", payload);
    return this.transform(data);
  },

  async update(id: string, payload: SaveListDTO): Promise<List> {
    const { data } = await api.patch(`/lists/${id}`, payload);
    return this.transform(data);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/lists/${id}`);
  },

  transform(response: ListResponse): List {
    const list = response.list ?? response
    return {
      id: list.uuid,
      title: list.title,
      itemsCount: list.items_count,
      sharedWith: list.shared_with_count,
      items: list.items && list.items?.length > 0 ? list.items.map(item => (itemService.transform(item))) : [],
      createdAt: list.created_at,
      updatedAt: list.updated_at
    };
  }
}
