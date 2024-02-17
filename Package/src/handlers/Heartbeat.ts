import Base from "../base";
import Client from "../client";
import {Opcodes} from "../util/constants";

export default class Heartbeat extends Base {
  constructor(client: Client) {
    super(client);
    this._patch();
  }

  _patch() {
    this.client.debug(`[Websocket]: Discord asked for heartbeat therefore sending one`);
    this.client.ws.send({
      op: Opcodes.Heartbeat,
      d: this.client.seq,
    });
    return this.client.debug(`[Websocket]: Successfully sent a heartbeat`);
  }
}
