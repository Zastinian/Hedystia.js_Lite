import EventEmitter from "node:events";
import WebSocketManager from "./ws";
import Rest from "../rest";

export default class Client extends EventEmitter {
  ws: WebSocketManager;
  version: number;
  root: string;
  api: Rest;
  websocketURL: string;
  intents: number;
  token: string;
  seq: any;
  heartbeatInterval: undefined | number;
  closeSequence: number;
  presence: {status: string; activities: {name: string | undefined; type: number; url: string | undefined}[]; since: number; afk: boolean};
  constructor(options: {
    presence: {
      status: string | undefined;
      activities: [{name: string | undefined; type: number | undefined; url: string | undefined}];
      afk: boolean | undefined;
    };
    token: string;
    intents: number[];
  }) {
    super();
    this.intents = options.intents.reduce((f, i) => f | i, 0);
    this.token = options.token;
    this.presence = Client.transformPresence(options.presence);
    this.websocketURL = "wss://gateway.discord.gg/?v=10&encoding=json";
    this.version = 10;
    this.root = `https://discord.com/api/v${this.version}`;
    this.seq = null;
    this.heartbeatInterval = undefined;
    this.closeSequence = 0;
    this.ws = new WebSocketManager(this, undefined);
    this.api = new Rest(this);
  }
  debug(message: string) {
    return this.emit("debug", message);
  }
  static transformPresence(presence: {
    status: string | undefined;
    activities: [{name: string | undefined; type: number | undefined; url: string | undefined}];
    afk: boolean | undefined;
  }) {
    return {
      status: presence.status ?? "online",
      activities: presence.activities?.map((o) => this.transformActivities(o)) ?? [],
      since: Date.now() * 1000,
      afk: presence.afk ?? false,
    };
  }
  static transformActivities(activities: {name: string | undefined; type: number | undefined; url: string | undefined}) {
    return {
      name: activities.name ?? undefined,
      type: activities.type ?? 0,
      url: activities.url ?? undefined,
    };
  }
}
