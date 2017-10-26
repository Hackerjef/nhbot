const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

// if configs are good, get data.
// check.run(typeofencoding, name, file direcory, typeofconfig);
let check = require("./nodeEvents/check.js");
//auth
check.auth("utf8", "Authjson", "./config/auth-config.json", "auth");
//config
check.config("utf8", "configjson", "./config/config.json", "main");
//perm
check.perms("utf8", "permsjson", "./config/perms.json", "perm");

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

  // set def group (w/o role)
  let userrole = "norole";

  // if disabled set usr role as disabled and stops permmision system from continuing.
  if (permsjson.perms == "disabled") userrole = "disabled" break nopermgroups;

  // get id of admin role (if set up), if not disable admin group and skip to config modrole.
  const adminRole = message.guild.roles.find("name", permsjson.Admingroup);
  if (adminRole.id == "null") console.error("admin group not found, admin commands disabled") break noadmingroup;
  if (message.member.roles.has(adminRole.id).catch(console.warn)) userrole = "adminrole";
  continue noadmingroup;

  // get id of mod role (if set up), if not disable mod group and skip to end of perm codeblock.
  const modRole = message.guild.roles.find("name", permsjson.modgroup);
  if (modRole.id == "null") console.error("mod group not found, mod commands disabled") break nomodgroup;
  if (message.member.roles.has(modRole.id).catch(console.warn)) userrole = "modrole";
  continue nomodgroup;
  continue nopermgroups;

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
//use token to
client.login(Authjson.Token);
