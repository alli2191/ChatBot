const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
var helpFileLoc = 'helpfile.txt'
var poll = require("./poll.js");
var purge = require("./purge.js");


client.on("ready", () => {
  console.log(" Hello World!");
      // Hello
      //poll.sayHelloInEnglish();
});


client.on("message", (message) => {

//Abuse or befriend the rival bot
  if (message.author.id === config.Rival) {
    let i = 50; let incr = 500;
    setTimeout( function(){message.react('💖');}, i);
    /*
    i += incr;
    setTimeout( function(){message.react('🇮');}, i);
    i += incr;
    setTimeout( function(){message.react('🔪');}, i);
    i += incr;
    setTimeout( function(){message.react('🇺');}, i);
    */
  }


// Prevent bot-ception
  if (message.author.bot) return;

// Anything after this requires the prefix to respond
  if (!message.content.startsWith(config.prefix)) return;

// Don't respond to James
  /*if(message.author.id === config.James) {
    message.channel.send(`go away <@${config.James}>. just kidding.`)
    //return
  }*/

// Bot Commands
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

  if (command === "help") {
    fs.readFile(helpFileLoc, 'utf8', function (err,helpdata) {
    if (err) {
      return console.log(err);
    }
    message.channel.send(helpdata + `\n The prefix is currently \" ${config.prefix} \" `);
    });
  }

  if (command === "rules") {
    const embed = new Discord.RichEmbed()
    .setColor('#27ae60')
    .addField("Rules!", "Rule #1: Don't make fun of God or Jesus! \n" +
    `Rule #2: Respect @SkyRipper's wife!`, false)
    message.channel.send({embed})
  }

  if (command === "ping") {
    message.channel.send("pong!");
  }

  if (command === "goodbot") {
    message.channel.send(`Thanks <@${message.author.id}>! 😇`);
    console.log(' Complimented!');
  }

  if (command === 'poll') {

    poll.run(client,message,config,message.client);

  }

// Start Purge
    if (command === "purge") {
      purge.run(client, message, config, args);
    }
// End Purge

// Debug by oi'ing
  //if (message.author.id === config.ownerID) {
  //  message.channel.send(`oi <@${config.ownerID}>`)
  //}

});

// Push errors to console
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

//Log on
client.login(config.token);
