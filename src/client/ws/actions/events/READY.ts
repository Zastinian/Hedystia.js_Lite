import Client from "../../..";
import clientUser from "../../../../structures/clientUser";
import User from "../../../../types/user";

interface Guilds {
  id: string;
}

export default async (
  client: Client,
  payload: {
    d: {
      user: User;
      guilds: Guilds[];
    };
  }
) => {
  client.user = new clientUser(client, payload.d.user);
  client.emit("ready");
};
