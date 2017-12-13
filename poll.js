// poll.js
const Discord = require('discord.js')

var exports = module.exports = {};

exports.run = function(client, message, config) {

  let i = 0; let I = 500;
  var defaultVoteTime = 60000;
  let pollCreator = message.author.username;
  let messageContent = message.content.slice(config.prefix.length + 4);
  let getTime = message.content.slice(-1)[0];
  let voteTime = getTime * defaultVoteTime;
  const embed = new Discord.RichEmbed()
  .setColor('#27ae60')
  .addField("Poll Posted by: " + pollCreator, messageContent, false)
  .setFooter("You have " + getTime + " minute(s) to vote. Hurry!")
  message.channel.send({embed}).then(function (reply) {
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
      .addField("Poll is now over!", messageContent)
      .addField("Yes Votes: ", collecterYesUsers.length -1, true)
      .addField("No Votes: ", collecterNoUsers.length -1, true)
      .setFooter("Poll is now over")
      message.channel.send({embed})
    }, voteTime);
  })

};
