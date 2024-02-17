import Client from "../client";
import Base from "../base";
import {WebsocketReadyState} from "../util/constants";

export default class InvalidSession extends Base {
  constructor(data: any, client: Client) {
    super(client);
    this._patch(data);
  }

  _patch(data: any) {
    const packet = data.d;
    if (packet === true) {
      this.client.debug(`[Websocket]: Received an Invalid Session. Can reconnect so reconnecting.`);
      return this.client.ws.handleReconnect();
    }
    this.client.debug(
      `[Websocket]: Received an Invalid Session. Cannot reconnect ceasing process ${
        this.client.ws.readyState !== WebsocketReadyState.Closed ? `and Websocket connection` : ""
      }`,
    );
    if (this.client.ws.readyState !== WebsocketReadyState.Closed) this.client.ws.destroy(1000);
    return process.exit();
  }
}
