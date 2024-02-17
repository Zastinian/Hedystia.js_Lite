import Client from "../client";
import Base from "../base";

export default class HeartbeatAck extends Base {
  constructor(client: Client) {
    super(client);
    this._patch();
  }

  _patch() {
    this.client.ws.lastHeartbeatAck = new Date();
    this.client.ws.isHeartbeatAcked = true;
    return this.client.debug(`[Heartbeat]: Heartbeat acknowledged. Sending next heartbeat in ${this.client.heartbeatInterval}ms`);
  }
}
