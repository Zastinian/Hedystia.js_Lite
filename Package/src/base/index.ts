import Client from "../client";

export default class Base {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }
}
