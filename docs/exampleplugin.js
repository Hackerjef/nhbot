/* eslint-disable */
// ignore above (tells eslinter to shadap)

exports.run = (client, message, Authjson, configjson, userrole, pluginconfigs, functions, args) => {
  if (userrole >= 2 && userrole <= 5) {

  } else {
    return message.reply("permission denied");
  }
};
