exports.run = (client, message, Authconfig) => {
  message.reply("heres the bot link: https://discordapp.com/oauth2/authorize?permissions=2146958591&scope=bot&client_id=" + Authconfig.Clientid).catch(console.error);
};
