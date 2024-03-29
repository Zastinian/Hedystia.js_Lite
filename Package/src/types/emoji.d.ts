import User from "./user";

export default interface Emoji {
  id: string | null;
  name: string | null;
  roles?: Role[];
  user?: User;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}
