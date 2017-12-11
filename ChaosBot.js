const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log("Hello World!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.startsWith(config.prefix + "ping")) {
    message.channel.send("pong!");
  } else

  if (message.content.startsWith(config.prefix + "foo")) {
    message.channel.send("bar!");
  }
  if(message.author.id == "376906570296197123") {
    message.react("❤");
  }
});

client.login(config.token);
