const googleTTS = require('google-tts-api');
const Discord = require("discord.js");

module.exports = {
    name: "tts",
    description: 'tect to speech lol',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            const ttsspeech = args.join();
            const url = await googleTTS.getAudioUrl(`${ttsspeech}`, {
                lang: 'en',
                slow: false,
                host: 'https://translate.google.com',
            });
    
            const Embed = new Discord.MessageEmbed()
            .setTitle(`Here Is Your Text-To-Speech audio`)
            .setDescription(`Your Text Has Been Converted To Audio ⬇`)
            .addField('TTS:', `**[Click here!](${url})**`, false)
            .setColor('RANDOM')
            .setImage('https://distok.top/stickers/755240383084232756/755243281054695514.gif');

            message.channel.send({embeds: [Embed] });
        } catch (error) {
       console.log(error)
        }

    }
};
