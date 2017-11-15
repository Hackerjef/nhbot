exports.run = (client, message, Authjson, configjson, userrole) => {
  if (userrole == "5") {
    return message.reply("heres the bot link: https://discordapp.com/oauth2/authorize?permissions=" + Authjson.permissions +"&scope=bot&client_id=" + Authjson.Clientid).catch(console.error);
  } else {
    message.reply("no permmision");
  }
};
