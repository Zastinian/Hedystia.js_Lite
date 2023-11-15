import Client from "../../..";
import Guild from "../../../../types/guild";

export default async (
  client: Client,
  payload: {
    d: Guild;
  }
) => {
  client.emit("guildCreate", client.guilds._add(payload.d));
};
