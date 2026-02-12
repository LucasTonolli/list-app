import type { ListItemResponse } from "./ListItemResponseDTO";

export interface ListResponse {
    uuid: string;
    title: string;
    items_count: number;
    items: ListItemResponse[];
    shared_with_count: number;
    created_at: string;
    updated_at: string;
}
