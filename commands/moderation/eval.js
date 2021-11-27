const { default: Discord, MessageActionRow, MessageButton, Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  description: "Evaluates The Code!",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {Sring} PREFIX
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed().setColor("WHITE");
    try {
      if (message.author.id !== client.application?.owner?.id) return;

      const code = message.content.split(" ").slice(1).join(" ");
      const result = new Promise((res) => res(eval(code)));
      result
        .then(async (output) => {
          if (typeof output != "string") {
            output = require("util").inspect(output, { depth: 0 });
          }

          output.includes(client.token) ? (output = output.replace(client.token, "")) : null;

          embed.setTitle("COMPILED CODE RESULT").setDescription(`\`\`\`js\n${output}\`\`\``);
          await message.channel.send({ embeds: [embed] });
        })
        .catch(async (err) => {
          const error = err.toString();
          error.includes(client.token) ? (error = error.replace(client.token, "")) : null;
          embed.setTitle("ERROR WHILE COMPILING").setDescription(`\`\`\`js\n${err}\`\`\``);
          await message.channel.send({ embeds: [embed] });
        });
    } catch (err) {
      const error = err.toString();
      console.log(`[ERROR] Something Went Wrong, `, err);
      error.includes(client.token) ? (error = error.replace(client.token, "")) : null;
      embed.setTitle("ERROR WHILE COMPILING").setDescription(`\`\`\`js\n${error}\`\`\``);
      await message.channel.send({ embeds: [embed] });
    }
  },
};