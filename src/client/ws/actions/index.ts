import Client from "../..";
import GUILD_CREATE from "./events/GUILD_CREATE";
import MESSAGE_CREATE from "./events/MESSAGE_CREATE";
import READY from "./events/READY";

export default class ActionsManager {
  client: Client;
  constructor(
    client: Client,
    message: {
      t: string;
      d: any;
    }
  ) {
    this.client = client;
    this._patch(message);
  }

  _patch(message: {t: string; d: any}) {
    switch (message.t) {
      case "GUILD_CREATE":
        return GUILD_CREATE(this.client, message);
      case "MESSAGE_CREATE":
        return MESSAGE_CREATE(this.client, message);
      case "READY":
        return READY(this.client, message);
    }
  }
}
