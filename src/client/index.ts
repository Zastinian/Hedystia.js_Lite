import EventEmitter from "node:events";
import WebSocketManager from "./ws";
import Options from "../types/options";
import ClientUser from "../types/clientuser";
import GuildManager from "../managers/guild";
import Rest from "../rest";

export default class Client extends EventEmitter {
  options: Options;
  ws: WebSocketManager;
  user: ClientUser | undefined;
  version: number;
  root: string;
  guilds: GuildManager;
  api: Rest;
  constructor(options: {intents: number[]; messagesCache: number}) {
    super();
    this.options = Object.assign(
      {
        intents: options.intents.reduce((f, i) => f | i, 0),
        messagesCache: 100,
      },
      options
    );
    this.version = 10;
    this.root = `https://discord.com/api/v${this.version}`;
    this.ws = new WebSocketManager(this, this.options.intents);
    this.api = new Rest(this);
    this.user;
    this.guilds = new GuildManager(this);
  }
  async login(token: string) {
    if (!token) return new Error("You forgot to specify the token");
    if (typeof token !== "string") return new Error("This is not a string");
    await this.ws.connect(token);
  }
  get token() {
    return this.ws.token;
  }
}
