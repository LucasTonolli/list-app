import type { SaveListDTO } from "@/types/SaveListDTO";
import api from "@/api/api";
import type { List } from "@/types/List";
import type { ListResponse } from "@/types/ListResponseDTO";
import { itemService } from "./item";
import type { ListRaw } from "@/types/ListRaw";
import type { ListsResponse } from "@/types/ListsResponse";


export const listService = {
  async getLists(): Promise<List[]> {
    const { data } = await api.get<ListsResponse>("/lists");
    return data.lists.map(list => (this.transform(list)));
  },

  async getById(id: string): Promise<List> {
    const { data } = await api.get<ListResponse>(`/lists/${id}`);
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

  transform(raw: ListRaw): List {
    const list = raw;
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
