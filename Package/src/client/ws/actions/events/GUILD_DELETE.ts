import Client from "../../..";

export default async (client: Client, payload: any) => {
  if (payload.d.packet.unavailable) return client.emit("guildUnavailable", payload.d);
  client.emit("guildDelete", payload.d);
};
