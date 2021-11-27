const randomPuppy = require('random-puppy');
const discord = require('discord.js');
module.exports = {
  name: "cat",
  description: 'get an image of a cat 🐱',
  run: async (client, message, args) => {
    const img = await randomPuppy('cats')
    message.channel.send({files:[img]});
  }
}
