const randomPuppy = require('random-puppy');
const discord = require('discord.js');
module.exports = {
  name: "dog",
  description: 'get an image of a dog 🐶',
  run: async (client, message, args) => {
    const img = await randomPuppy('puppy')
    message.channel.send({files:[img]});
    const lyricsFinder = require('@sujalgoel/lyrics-finder');

lyricsFinder.LyricsFinder('industry baby').then(data => {
	message.channel.send(data)
});
  }
}
