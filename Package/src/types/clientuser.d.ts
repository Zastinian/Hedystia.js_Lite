export default interface ClientUser {
  verified: boolean | undefined;
  name: string;
  mfa: boolean | undefined;
  id: string;
  flags: number | undefined;
  tag: string;
  avatar: string | null;
  createAt: Date;
}
