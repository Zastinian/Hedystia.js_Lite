import Client from "../client";
import User from "../types/user";

export default class clientUser {
  verified: boolean | undefined;
  name: string;
  mfa: boolean | undefined;
  id: string;
  flags: number | undefined;
  tag: string;
  avatar: string | null;
  createAt: Date;
  constructor(client: Client, data: User) {
    this.verified = data.verified;
    this.name = data.username;
    this.mfa = data.mfa_enabled;
    this.id = data.id;
    this.flags = data.flags;
    this.tag = "#" + data.discriminator;
    this.avatar = data.avatar;
    this.createAt = new Date(Math.floor(Number(this.id) / 4194304) + 1420070400000);
  }

  get username() {
    return this.name + this.tag;
  }
}
