exports.run = (client, message, Authjson, configjson, userrole) => {
  if (userrole == "disabled") message.reply("perm system disabled");
  if (userrole == "norole") message.reply("you do not have a role");
  if (userrole == "adminrole") message.reply("You have the admin role");
  if (userrole == "modrole") message.reply("You have the mod role");
};
