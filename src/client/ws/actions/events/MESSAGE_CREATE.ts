import Client from "../../..";

interface User {
  verified: boolean;
  username: string;
  mfa_enabled: boolean;
  id: string;
  flags: number;
  discriminator: string;
  avatar: string | null;
}

export default async (
  client: Client,
  payload: {
    d: {
      user: User;
    };
  }
) => {
  client.emit("messageCreate");
};
