exports.run = (client, message, Authjson, configjson, userrole) => {
  if (userrole == "1") return message.reply("perm system disabled");
  if (userrole == "2") return message.reply("you do not have a role");
  if (userrole == "3") return message.reply("You have the mod role");
  if (userrole == "4") return message.reply("You have the admin role");
  if (userrole == "5") return message.reply("you are the bot owner");
};
