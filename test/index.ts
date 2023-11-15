import {Client, Intents} from "../index";

const client = new Client({
  intents: [Intents.Guilds, Intents.Guild_Members, Intents.Guild_Messages, Intents.Direct_Messages, Intents.Message_Content],
  messagesCache: 100,
});

client.once("ready", () => {
  console.log("On!");
});

client.on("messageCreate", (msg) => {
  client.guilds.cache.get("")?.setName("Test");
});

client.login("");
