export interface CreateInvitation{
  uuid: string,
  share_url: string,
  list_uuid: string,
  max_uses: number,
  token: string,
  created_at: string,
  expires_at: string
}
