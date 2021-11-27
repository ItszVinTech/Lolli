const Discord = require("discord.js");
module.exports = {
    name: "screenshot",
    aliases: ["ss"],
    run: async (client, message, args) => {
        const webargs = args.join();
        const webpage = `https://image.thum.io/get/width/1920/crop/1080/animate/https://${webargs}`

        const Embed = new Discord.MessageEmbed()
            .setTitle(`Here is a screenshot of ${webargs}`)
            .setImage(webpage);

        message.channel.send({embeds: [Embed]})
    }
}