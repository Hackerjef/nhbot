exports.run = (client, message, Authjson, configjson, userrole, pluginconfigs, functions, args) => {
  if (userrole >= 4 && userrole <= 5) {
    if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
    if(!args || "reload") return message.reply("Cannot reload command `reload` Restart bot if reload command has issues");
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    return message.reply(`The command ${args[0]} has been reloaded`);
  } else {
    return message.reply("permission denied");
  }
};
