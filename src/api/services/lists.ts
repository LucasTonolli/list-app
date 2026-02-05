import type { SaveListDTO } from "@/types/SaveListDTO";
import api from "@/api/api";
import type { List } from "@/types/List";


export const listService = {
  async getLists(): Promise<List[]> {
    const { data } = await api.get<List[]>("/lists");
    return data;
  },

  async getById(id: string): Promise<List> {
    const { data } = await api.get<List>(`/lists/${id}`);
    return data;
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
