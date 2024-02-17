import Client from "../client";

export default class Resume {
  client: Client;
  constructor(client: Client) {
    this.client = client;
    this._patch();
  }

  _patch() {
    const replayedEvents = this.client.seq - this.client.closeSequence;
    return this.client.debug(
      `[Websocket]: Successfully resumed gateway connection. Replayed ${replayedEvents} event${replayedEvents > 1 ? "s" : ""}`
    );
  }
}
