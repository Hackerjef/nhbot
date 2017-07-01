const Discord = require("discord.js");
const client = new Discord.Client();

//Get Auth data
const Authjson = require("./config/auth-config.json");
//Get Config data
const configjson = require("./config/config.json");

client.login(Authjson.Token);

//debug
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));



client.on("ready", () => {
  console.log("botname: " + configjson.botname + ".");
  console.log("follow this link to add this bot to a server:");
  console.log(configjson.invitelink);
});

client.on("message", (message) => {
  // Set the prefix
  let prefix = configjson.prefix;

  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  // if bot is the sender (Botception)
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
  } else
  if (message.content.startsWith(prefix + "invitelink")) {
    message.channel.send(configjson.invitelink);
  }

});
