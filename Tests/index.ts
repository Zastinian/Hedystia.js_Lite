import {Activity, Client, Intents, Status} from "../index";

const client = new Client({
  token: "",
  intents: [Intents.Guilds, Intents.Guild_Members, Intents.Guild_Messages, Intents.Direct_Messages, Intents.Message_Content],
  presence: {
    status: Status.Idle,
    activities: [
      {
        name: "Hedystia",
        type: Activity.Watching,
        url: undefined,
      },
    ],
    afk: false,
  },
});

client.once("ready", () => {
  console.log("On!");
});

client.on("messageCreate", (msg) => {
  console.log(msg);
});
