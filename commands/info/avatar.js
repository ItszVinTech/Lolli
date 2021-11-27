const Discord = require("discord.js");
module.exports = {
    name: "avatar",
    description: 'take a look at anyones avatar !',
    aliases: ['av'],
  
    run: async (client, message, args) => {
        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size: 4096})


        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}'s avatar`)
        .setImage(avatar)
        .setColor("RANDOM")

        message.channel.send({ embeds: [embed] });
    }
  }