const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
var poll = require("./poll.js");


client.on("ready", () => {
  console.log(" Hello World!");
      // Hello
      //poll.sayHelloInEnglish();
});


client.on("message", (message) => {

// Abuse the rival bot
  if (message.author.id === config.Rival) {
    let i = 50; let incr = 500;
    setTimeout( function(){message.react('👎');}, i);
    i += incr;
    setTimeout( function(){message.react('🇮');}, i);
    i += incr;
    setTimeout( function(){message.react('🔪');}, i);
    i += incr;
    setTimeout( function(){message.react('🇺');}, i);
  }

// Prevent bot-ception
  if (message.author.bot) return;

// Anything after this requires the prefix to respond
  if (!message.content.startsWith(config.prefix)) return;

// Don't respond to James
  //if(message.author.id === config.James) {
    //message.channel.send(`go away <@${config.James}>. just kidding.`)
    //return
  //}

// Bot Commands
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

  if (command === "help") {
    var helptext = `HELP: The prefix is \" ${config.prefix} \" ` +
    "```\nValid Commands:\n\nping\ngoodbot\npurge @name (optional) n\n```";
    message.channel.send(helptext)
  }

  if (command === "ping") {
    message.channel.send("pong!");
  }

  if (command === "goodbot") {
    message.channel.send(`Thanks <@${message.author.id}>! 😇`);
    console.log(' Complimented!');
  }

  if (command === 'poll') {
    message.react(`👍`);
    message.react(`👎`);
    poll.run(message,config);
  }

// Start Purge
    if (command === "purge") {

      if(message.author.id === config.ownerID || message.author.id === config.James || message.author.id === config.Jesse) {

        var excessDeletion = false;
        const user = message.mentions.users.first();
        let amount = parseInt(args[args.length - 1],10);

        // Invalid input errors
        if (isNaN(amount) || amount < 2) return message.reply('Must specify an amount (2-50) to delete!');

        if (user && user.id === message.author.id) {amount = amount + 1;} else if (!user) {amount = amount + 1;}
        console.log(` Preparing to delete ${amount} messages (including sent message)`);

        // Prevent excess deletion
        if (amount > 51) {excessDeletion = true;}
        if (excessDeletion === true) {
          amount = 51;
          console.log(" Reduced to 51 (actually 50)");
        }

        // If User Specified
        if (user) {
            message.channel.fetchMessages({
              limit: 100,
            }).then((messages) => {
               const filterBy = user ? user.id : Client.user.id;
               messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
               if (messages.length >= 2) {
                 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                } else return message.reply(' not enough messages from specified user')
            });
          } else {
        // If No User Specified
            message.channel.fetchMessages({
              limit: amount,
            }).then((messages) => {
               message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            });
          }
        // Warning About Being Too Keen
          if (excessDeletion === true) {
            message.channel.send('Too big, reduced to 50.');
          }
          excessDeletion = false;
      } else return message.reply('Not Authorized To Purge!');
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
