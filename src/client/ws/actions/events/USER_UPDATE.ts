import Client from "../../..";

export default async (client: Client, payload: any) => {
  client.emit("userUpdate", payload.d);
};
