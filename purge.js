// purge.js
const Discord = require('discord.js')

var exports = module.exports = {};

exports.run = function(client, message, config, args) {
    if(message.author.id === config.ownerID || message.author.id === config.James || message.author.id === config.Jesse) {

      var excessDeletion = false;
      var user = message.mentions.users.first();

      if (args[0] === 'botcall') {
        user = message.author;
      }

      let amount = parseInt(args[args.length - 1],10);

      // Invalid input errors
      if (isNaN(amount) || amount < 1 || (amount < 2 && !user)) return message.reply('Must specify an amount (2-50) to delete!');

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
             } else if (messages.length == 1) {
               messages.forEach(x => x.delete())
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
