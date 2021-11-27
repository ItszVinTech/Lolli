

const Discord = require("discord.js");

module.exports = {
    name: "warn",
    description: 'warn a person !',
    authorPermission: ["ADMINISTRATOR"],
    run: async (client, message, args) => {

        const user = message.mentions.members.first()
        if (!user) return message.channel.send("Please Mention the person to who you want to warn --warn @mention <reaosn>--")
        //if (message.mentions.users.first().bot) return message.channel.send("You can not warn bots")
        if (message.author.id === user.id) return message.channel.send("You can not warn yourself")

        const reason = args.slice(1).join(" ")
        if (!reason) return message.channel.send("Please provide reason to warn --warn @mention <reason>--")

        const Embed = new Discord.MessageEmbed()
            .setTitle(`Warned ${user.tag}`)
            .setDescription(`**${message.author}** has warned ${user}`)
            .addField('Reason:', `**${reason}**`, false)
            .setColor('RANDOM')
            .setImage('https://distok.top/stickers/755240383084232756/755244095957500025.gif');

        user.send({ embeds: [Embed] }).catch(err => { })
        await message.channel.send({ embeds: [Embed] })

    },
};
