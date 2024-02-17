import Client from "../client";
import Base from "../base";
import {Opcodes} from "../util/constants";

export default class Hello extends Base {
  constructor(data: any, client: Client) {
    super(client);
    this._patch(data);
  }

  _patch(data: any) {
    const packet = data.d;
    this.client.debug(`[Websocket]: Received HELLO, now setting the HELLO timeout of 2000`);
    this.client.heartbeatInterval = packet?.heartbeat_interval;
    this.client.debug(`[Heartbeat]: Setting the heartbeat interval to ${this.client.heartbeatInterval}ms`);
    setTimeout(() => {
      this.handleheartBeat();
    }, 2_000).unref();

    if (this.client.ws.reconnected) {
      this.client.ws.reconnected = false;
      this.client.ws.handleResume();
    } else this.client.ws.connect();
  }

  handleheartBeat() {
    if (this.client.ws.isHeartbeatAcked === false) {
      this.client.debug(`[Websocket]: Zombified connection. Reconnecting`);
      return this.client.ws.handleReconnect();
    }
    this.client.ws.interval = setInterval(() => {
      this.client.heartbeatInterval = Math.floor(Math.random() * (25_230 - 17_120 + 1) + 17_120);
      this.client.ws.send({op: Opcodes.Heartbeat, d: this.client.seq ?? null});
      this.client.debug(`[Heartbeat]: Successfully sent a heartbeat`);
      clearInterval(this.client.ws.interval);
      this.handleheartBeat();
      this.client.ws.isHeartbeatAcked = false;
    }, this.client.heartbeatInterval).unref();
  }
}
