
const discord = require('discord.js');
module.exports = {
  name: "ttm",
  description: 'text to image',
  run: async (client, message, args) => {
    const textToImage = new UltimateTextToImage("Hello World").render();

    message.channel.send({files:[textToImage]});
  }
}
