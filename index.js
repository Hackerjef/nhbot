const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
var isJSON = require("is-valid-json");

// if configs are good, get data);
//auth
const Authjson = require("./config/auth-config.json", "utf8");
//config
const configjson = require("./config/config.json", "utf8");
//perm
const permsjson = require("./config/perms.json", "utf8");

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
    client.on(eventName, (...args) => eventFunction.run(client, configjson, Authjson, ...args));
  });
});

// if disabled set usr role as disabled and stops permmision system from continuing.
let userrole = "norole";
if (permsjson.perms == "disabled") {
  userrole = "disabled";
  console.log("Note: Perm settings are disabled, no admin/mod commands will work");
}

//commands
client.on("message", (message) => {
  // Set the prefix
  let prefix = configjson.prefix;

  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  // if bot is the sender (Botception)
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //set admin role const
  const adminRole = message.guild.roles.find("name", permsjson.Admingroup);

  //set mod role const
  const modRole = message.guild.roles.find("name", permsjson.modgroup);

  //set userrole to role if admin has role
  //if ((!permsjson.perms == "disabled") || (modRole !== "null") || (adminRole !== "null")) {
  //  if (message.member.roles.has(adminRole.id) || (message.member.roles.has(modRole.id))) {
  //    if (message.member.roles.has(modRole.id)) userrole = "modrole";
  //    if (message.member.roles.has(adminRole.id)) userrole = "adminrole";
  //  }
  //}
  if (permsjson.perms == "enabled") {
    if( isJSON(adminRole) ){
      if (message.member.roles.has(adminRole.id)) userrole = "adminrole";

    }
    if( isJSON(modRole) ){
      if (message.member.roles.has(modRole.id)) userrole = "modrole";
    }
  }
  const args = message.content.split(" ");
  const command = args.shift().slice(configjson.prefix.length);
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, Authjson, configjson, userrole, args);
  } catch (err) {
    //console.warn(err);
    message.reply("Command not Found").catch(console.info);
  }
  userrole = "norole";
});
//use token to
client.login(Authjson.Token);
