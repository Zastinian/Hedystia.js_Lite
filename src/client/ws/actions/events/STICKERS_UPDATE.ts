import Client from "../../..";

export default async (client: Client, payload: any) => {
  client.emit("stickersUpdate", payload.d);
};
