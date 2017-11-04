exports.run = (client, configjson, Authjson) => {
  console.log(`Ready to server in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  console.log("botname: " + configjson.botname + ".");
  console.log("follow this link to add this bot to a server:");
  console.log("https://discordapp.com/oauth2/authorize?permissions=" + Authjson.permissions +"&scope=bot&client_id=" + Authjson.Clientid);
};
