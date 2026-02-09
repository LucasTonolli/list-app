export interface ListItemResponse {
   item: {
    uuid: string;
    list_uuid: string;
    name: string;
    description: string | null;
    completed: boolean;
    version: number;
    created_at: string;
    updated_at: string;
    locked_at: string | null;
    locked_by: string | null;
  }
}
