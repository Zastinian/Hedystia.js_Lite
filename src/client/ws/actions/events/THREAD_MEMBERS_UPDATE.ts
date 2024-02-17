import Client from "../../..";

export default async (client: Client, payload: any) => {
  client.emit("threadMemberUpdate", payload.d);
};
