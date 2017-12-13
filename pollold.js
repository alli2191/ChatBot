// pollold.js
const Discord = require('discord.js')

var exports = module.exports = {};

//exports.sayHelloInEnglish = function() {
//  return console.log("Hello");
//};

exports.run = function(message,config) {

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  let timer = parseInt(args[1],10);
  //let thumbsUp = 0;
  //let thumbsDown = 0;

  // Invalid input errors
  if (isNaN(timer) || timer < 1 || timer > 1000) return message.reply('must be between 1 and 1000 minutes');
  console.log(' timer is ' + timer + ' minutes.')

  //Convert timer from minutes to ms
  timer = timer * 60000;


  const thumbsUp = await message2.awaitReactions(reaction => reaction.name === "👍", (time: timer));
  console.log('thumbsUp ' + thumbsUp);

  //findUp = [message.reactions.find(reaction => reaction.emoji.name === '👍')];
  //findDown = [message.reactions.find(reaction => reaction.emoji.name === '👎')];
  //thumbsUp = findUp.count;
  //thumbsDown = findDown.count;

  //console.log('Find Up: ' + findUp);
  //console.log('Find Down: ' + findDown);
  //console.log('Thumbsup: ' + thumbsUp);
  //console.log('Thumbsdown:' + thumbsDown);


  message.channel.send(`${thumbsUp} people say yes, ${thumbsDown} people say no.`).then((msg)=>{

    var start = Date.now();

    setInterval(function() {
      var timeElapsed = Date.now() - start;
      // timeElapsed in ms
    }, 1000);

    var currentCount = message.reactions.count;
    var i = 0;

    while (i < timer) {

      if (message.reactions.count > currentCount) {

        thumbsUp = [message.reactions.find(reaction => reaction.emoji.name === '👍')].count;
        thumbsDown = [message.reactions.find(reaction => reaction.emoji.name === '👎')].count;

        msg.edit(`${thumbsUp} people say yes, ${thumbsDown} people say no.`)
        console.log(' ' + thumbsUp + ' thumbs up and ' + thumbsDown + ' thumbs down.');
        currentCount = message.reactions.count;

      }

      i = timeElapsed;
    }

  })
        //await message.react('👍');
      	//await message.react('👎');
};
