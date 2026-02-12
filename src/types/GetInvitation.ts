export interface GetInvitation {
  uuid: string,
  max_uses: number,
  created_at: string,
  expires_at: string,
  accept_url: string,
}
