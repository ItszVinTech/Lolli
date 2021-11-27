const axios = require('axios')
const { MessageActionRow, MessageButton, MessageEmbed, } = require('discord.js');

module.exports = {
    name: "meme",
    description: 'get a meme !',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let res = await axios.default.get(`https://reddit.com/r/memes/random/.json`);

        if (!res || !res.data || !res.data.length) return message.channel.send('Oops Something Went Wrong ! Try Again !');

        res = res.data[0].data.children[0].data;

        const Embed = new MessageEmbed()
            .setTitle(res.title)
            .setImage(res.url)
            .setURL(`https://reddit.com${res.pemalink}`)
            .setFooter(`👍 ${res.ups}|💬 ${res.num_comments}`);


        await message.channel.send({ content: '**Memes Coming Your Way**', ephemeral: true, embeds: [Embed]});
    }
};
