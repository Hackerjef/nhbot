const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

//Get Auth data
var Authjson = JSON.parse(fs.readFileSync("./config/auth-config.json", "utf8"));
//Get Config data
var configjson = JSON.parse(fs.readFileSync("./config/config.json", "utf8"));
//Get perm data
var permsjson = JSON.parse(fs.readFileSync("./config/staff.json", "utf8"));


//debug
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, configjson, Authjson, ...args));
  });
});

//commands
client.on("message", (message) => {
  // Set the prefix
  let prefix = configjson.prefix;

  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  // if bot is the sender (Botception)
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const adminRole = message.guild.roles.find("name", permsjson.Admingroup);
  const modRole = message.guild.roles.find("name", permsjson.modgroup);
  let userrole = "norole";
  if (message.member.roles.has(modRole.id).catch(console.warn)) userrole = "modrole";
  if (message.member.roles.has(adminRole.id).catch(console.warn)) userrole = "adminrole";

  const args = message.content.split(" ");
  const command = args.shift().slice(configjson.prefix.length);
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, Authjson, configjson, userrole, args);
  } catch (err) {
    //console.warn(err);
    message.reply("Command not Found").catch(console.info);
  }
});
client.login(Authjson.Token);
