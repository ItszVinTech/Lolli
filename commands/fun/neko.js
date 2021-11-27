const { Random } = require("something-random-on-discord")
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "neko",
    description: 'get some images',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {


        let data = await Random.getNeko()
        message.channel.send({embeds: [data.embed]})

    }
};
