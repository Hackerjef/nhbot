const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

//Get Auth data
const Authjson = require("./config/auth-config.json");
//Get Config data
const configjson = require("./config/config.json");
//sourcebans data
const sbdata = require("./config/sourcebans.json");

//debug
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, Authjson, configjson, ...args));
  });
});

//player commands
client.on("message", (message) => {
  // Set the prefix
  let prefix = configjson.prefix;

  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  // if bot is the sender (Botception)
  if (!message.content.startsWith(prefix) || message.author.bot) return;


  const args = message.content.split(" ");
  const command = args.shift().slice(configjson.prefix.length);
  try {
    let commandFile = require(`./commands/Playercommands/${command}.js`);
    commandFile.run(client, message, args, configjson, Authjson, sbdata);
  } catch (err) {
    //console.log(err);
    message.reply("Command not Found");
  }
});

//client.on("message", (message) => {
  // Set the prefix
//  let prefix = configjson.prefix;

  // Exit and stop if it's not there
//  if (!message.content.startsWith(prefix)) return;

  // if bot is the sender (Botception)
//  if (!message.content.startsWith(prefix) || message.author.bot) return;


//  const args = message.content.split(" ");
//  const command = args.shift().slice(configjson.prefix.length);
//  try {
//    let commandFile = require(`./commands/Admincommands/${command}.js`);
//    commandFile.run(client, message, args, configjson, Authjson, sbdata);
//  } catch (err) {
    //console.log(err);
//    message.reply("Command not Found");
//  }
//});




client.login(Authjson.Token);
