export interface CreateInvitationRaw {
  uuid: string,
  share_url: string,
  max_uses: number,
  token: string,
  expires_at: string,
  list_uuid: string,
  created_at: string
}
