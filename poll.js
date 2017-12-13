// poll.js
const Discord = require('discord.js')

var exports = module.exports = {};

exports.run = function(client, msg, config) {

  let i = 0; let I = 500;
  var defaultTime = 5; // minutes to wait if not declared
  let pollCreator = msg.author.username;
  let messageContent = msg.content.slice(config.prefix.length + 4);

  //Check input
  let questionMarks = (messageContent.match(/\?/g)||[]).length;
  console.log("Poll attempted. " + questionMarks + " question marks.");
  if (questionMarks !== 1) {
    return msg.reply(' please include one, and only one, question mark in your poll.')
  }

  let msgQuestion = messageContent.split('?').shift()+"?";
  let getTime = messageContent.split('?').pop();
  if (!(getTime>0)) {getTime = defaultTime};
  let voteTime = getTime * 60000; // convert from minutes to ms

  const embed = new Discord.RichEmbed()
  .setColor('#27ae60')
  .addField("Poll Posted by: " + pollCreator, msgQuestion, false)
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
      const embed = new Discord.RichEmbed()
      .setColor('#c0392b')
      .addField("Poll is now over!", msgQuestion)
      .addField("Yes Votes: ", collecterYesUsers.length -1, true)
      .addField("No Votes: ", collecterNoUsers.length -1, true)
      .setFooter("Poll is now over")
      msg.channel.send({embed})
    }, voteTime);
  })

};
