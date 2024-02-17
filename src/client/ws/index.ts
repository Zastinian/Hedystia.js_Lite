import WebSocket from "ws";
import Client from "..";
import ActionsManager from "./actions";

export default class WebSocketManager {
  client: Client;
  intents: number;
  ws: WebSocket | undefined;
  url: string;
  ping: number;
  token: string | undefined;
  lastheat: number | undefined;
  seq: number | undefined;
  interval: NodeJS.Timeout | undefined;
  lastheatSent: number | undefined;
  constructor(client: Client, intents: number) {
    this.client = client;
    this.intents = intents;
    this.ws;
    this.url = "wss://gateway.discord.gg/?v=10&encoding=json";
    this.ping = 0;
  }
  async connect(token: string) {
    if (!token) return new Error("You forgot to specify the token");
    if (typeof token !== "string") return new Error("This is not a string");
    this.token = token;
    this.ws = new WebSocket(this.url);
    this.ws.on("open", async () => {
      this.ws?.send(
        JSON.stringify({
          op: 2,
          d: {
            token: token,
            intents: this.intents.toString(),
            properties: {
              $os: process.platform,
              $browser: "hedystia.js",
              $device: "hedystia.js",
            },
          },
        }),
      );
    });
    this.ws.on("error", async (err: string) => {
      console.log(err);
    });
    this.ws.on("message", async (msg: string) => {
      const payload = JSON.parse(msg.toString());
      const {op, d, s} = payload;
      switch (op) {
        case 10:
          this.lastheat = Date.now();
          this.seq = s;
          this.interval = this.heartbeat(d.heartbeat_interval);
          break;
        case 11:
          this.lastheat = Date.now();
          this.ping = this.lastheat - Number(this.lastheatSent);
          break;
        case 0:
          this.seq = s;
          new ActionsManager(this.client, payload);
          break;
        case 9:
          throw new Error("Invalid Sesion!");
      }
    });
  }
  heartbeat(ms: number) {
    return setInterval(() => {
      this.lastheatSent = Date.now();
      this.ws?.send(
        JSON.stringify({
          op: 1,
          d: this.seq,
        }),
      );
    }, ms);
  }
}
