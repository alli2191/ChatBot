// poll.js
const Discord = require('discord.js')

var exports = module.exports = {};

//exports.sayHelloInEnglish = function() {
//  return console.log("Hello");
//};


// async (client, message, args) =>
exports.run = function(message,config) {

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  let timer = parseInt(args[1],10);
  // Invalid input errors
  if (isNaN(timer) || timer < 5 || timer > 1000) return message.reply('must be between 5 and 1000');
  console.log(' timer is ' + timer)

  // const command = args.shift().toLowerCase();

  //const pollTopic = message.content.slice(config.prefix.length).trim();


  thumbsUp = [message.reactions.find(reaction => reaction.emoji.name === '👍')].count;
  thumbsDown = [message.reactions.find(reaction => reaction.emoji.name === '👎')].count;

       message.channel.send(`${thumbsUp} people say yes, ${thumbsDown} people say no.`).then((msg)=>{

      msg.edit(`${thumbsUp} people say yes, ${thumbsDown} people say no.`)
  })
        //await message.react('👍');
      	//await message.react('👎');

        console.log(' ' + thumbsUp + ' thumbs up and ' + thumbsDown + ' thumbs down.');
};
