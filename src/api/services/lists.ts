import type { SaveListDTO } from "@/types/dtos/list/SaveListDTO";
import client from "@/api/client";
import type { List } from "@/types/models/List";
import type { ListResponse } from "@/types/dtos/list/ListResponseDTO";
import { itemService } from "./item";
import type { ListRaw } from "@/types/dtos/list/ListRaw";
import type { ListsResponse } from "@/types/dtos/list/ListsResponse";


export const listService = {
  async getLists(): Promise<List[]> {
    const { data } = await client.get<ListsResponse>("/lists");
    return data.lists.map(list => (this.transform(list)));
  },

  async getById(id: string): Promise<List> {
    const { data } = await client.get<ListResponse>(`/lists/${id}`);
    return this.transform(data.list);
  },

  async create(payload: SaveListDTO): Promise<List> {
    const { data } = await client.post<ListResponse>("/lists", payload);
    return this.transform(data.list);
  },

  async update(id: string, payload: SaveListDTO): Promise<List> {
    const { data } = await client.patch<ListResponse>(`/lists/${id}`, payload);
    return this.transform(data.list);
  },

  async delete(id: string): Promise<void> {
    await client.delete(`/lists/${id}`);
  },

  transform(raw: ListRaw): List {
    return {
      id: raw.uuid,
      title: raw.title,
      itemsCount: raw.items_count,
      sharedWith: raw.shared_with_count,
      items: raw.items && raw.items?.length > 0 ? raw.items.map(item => (itemService.transform(item))) : [],
      createdAt: raw.created_at,
      updatedAt: raw.updated_at
    };
  }
}
