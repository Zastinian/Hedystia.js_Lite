import User from "./user";

export default interface Sticker {
  id: string;
  pack_id?: string;
  name: string;
  description: string | null;
  tags: string;
  asset?: string;
  type: number;
  format_type: number;
  available?: boolean;
  guild_id?: string;
  user?: User;
  sort_value?: number;
}
