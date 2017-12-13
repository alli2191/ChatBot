const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log("Hello World!");
});

client.on("message", (message) => {
  if(msg.content.startsWith(prefix + "poll")) {
      let i = 0; let I = 500;
      var defaultVoteTime = 60000;
      let pollCreator = msg.author.username;
      let messageContent = msg.content.slice(5);
      let getTime = msg.content.slice(-1)[0];
      let voteTime = getTime * defaultVoteTime;
      const embed = new Discord.MessageEmbed()
      .setColor('#27ae60')
      .addField("Poll Posted by: " + pollCreator,
      messageContent, false)
      .setFooter("You have " + getTime + " minute(s) to vote. Hurry!")
      msg.channel.send({embed}).then(function (reply) {
        // Adds the reactions the the message
        setTimeout( function() { reply.react('👍'); }, i, i+=I);
        setTimeout( function() { reply.react('👎'); }, i, i+=I);

        // The Yes vote.
        var collecterYesUsers;
        const collectorYes = reply.createReactionCollector(
          (reaction, user) => reaction.emoji.name === '👍', { time: voteTime }
        );
        collectorYes.on('collect', r => console.log(r.emoji.name));
        collectorYes.on('end', collected => collecterYesUsers = collectorYes.users.array());

        // The No vote.
        var collecterNoUsers;
        const collectorNo = reply.createReactionCollector(
          (reaction, user) => reaction.emoji.name === '👎', { time: voteTime }
        );
        collectorNo.on('collect', r => console.log(r.emoji.name));
        collectorNo.on('end', collected => collecterNoUsers = collectorNo.users.array());

        // The final Poll Results
        setTimeout( function() {
          const embed = new Discord.MessageEmbed()
          .setColor('#c0392b')
          .addField("Poll is now over!",
          messageContent)
          .addField("Yes Votes: ", collecterYesUsers.length -1, true)
          .addField("No Votes: ", collecterNoUsers.length -1, true)
          .setFooter("Poll is now over")
          msg.channel.send({embed})
        }, voteTime);
      })
    }
});

client.login(config.token);
