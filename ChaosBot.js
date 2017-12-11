const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log("Hello World!");
});

client.on("message", (message) => {

  if (message.author.id === config.Rival) {
    var rivalReact = ['👎','🇮','🔪','🇺'];
      for (i = 0; i < rivalReact.length; i++){
          message.react(rivalReact[i])
      }

  }

  if (message.author.bot) return;

// Anything after this requires the prefix to respond
  if (!message.content.startsWith(config.prefix)) return;

// Don't respond to James
  if(message.author.id === config.James) {
    message.channel.send(`go away <@${config.James}>`)
    return
  }

// Bot Commands
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

  if (command === "help") {
    var helptext = `HELP: The prefix is \" ${config.prefix} \" ` +
    "```\nValid Commands:\n\nping\nidk haven't got this far yet```";
    message.channel.send(helptext)
  }

  if (command === "ping") {
    message.channel.send("pong!");
  }

  if (message.author.id === config.ownerID) {
    message.channel.send(`oi <@${config.ownerID}>`)
  }

});

// Push errors to console
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

//Log on
client.login(config.token);
