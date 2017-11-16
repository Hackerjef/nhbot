//check for updates
const updater = require("./src/functions/update.js");
const updaterconfig = require("./config/updater.json", "utf8");
if (updaterconfig.enabled == "True") {
  let path = __dirname;
  if (updater.check(path, updaterconfig)) {
    if (updaterconfig.startupautoupdate == "true") updater.Doupdate(path);
    if (updaterconfig.startupasktoupdate == "true") updater.ask();
  }
}

//bot start
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
//show where plugin configs are
const pluginconfigs = "./configs/pluginconfigs";
//show where fuctions are
const functions = "./src/functions/";


//debug
client.on("error", (e) => console.error(e));
//enable debug if enabled
if (configjson.debug == "true") {
  console.log("!Debuging enabled!");
  client.on("warn", (e) => console.warn(e));
  client.on("debug", (e) => console.info(e));
}

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./src/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./src/events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, configjson, Authjson, ...args));
  });
});

// if disabled set usr role as disabled and stops permmision system from continuing.
let userrole = "2";
if (permsjson.perms == "disabled") {
  userrole = "1";
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

  //set userrole to role of user if user has both roles, the admin role is top.
  if (permsjson.perms == "enabled") {
    // check if mod role is valid(so the bot doesnt crash if it doesnt exist)
    if( isJSON(modRole) ){
      if (message.member.roles.has(modRole.id)) userrole = "3";
    }
    // check if admin role is valid(so the bot doesnt crash if it doesnt exist)
    if( isJSON(adminRole) ){
      if (message.member.roles.has(adminRole.id)) userrole = "4";
    }
  }

  //check if command was made by bot owner
  if (message.author.id == permsjson.botowner) {
    userrole = "5";
  }

  const args = message.content.split(" ");
  const command = args.shift().slice(configjson.prefix.length);
  try {
    let commandFile = require(`./src/commands/${command}.js`);
    commandFile.run(client, message, Authjson, configjson, userrole, pluginconfigs, functions, args);
  } catch (err) {
    //console.warn(err);
    message.reply("Command not Found").catch(console.info);
  }
  userrole = "norole";
});
//use token to  start bot
client.login(Authjson.Token);
