const { Client, Interaction, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Some Help To User",
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  // just for telling that u can also add options
  run: async (client, interaction) => {
    try {
      if (!interaction.isCommand()) return;

      await interaction.deferReply().catch((_) => {});

      const dirs = [...new Set(client.commands.map((c) => c.directory))];

      const helpArray = dirs.map((d) => {
        const getCmd = client.commands
          .filter((c) => c.directory === d)
          .map((c) => {
            return {
              name: c.name || "No Name",
              description: c.description || "No Description",
            };
          });
        return {
          name: d,
          commands: getCmd,
        };
      });

      // default Page No.
      let pageNo = 1;

      const embed = new MessageEmbed()
        .setColor("WHITE")
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setAuthor(`Help Command!`)
        .setTimestamp()
        .setFooter(`Page ${pageNo}/${helpArray.length}`);

      const getButtons = (pageNo) => {
        return new MessageActionRow().addComponents(
          new MessageButton()
            .setLabel("⟸")
            .setCustomId("prev")
            .setStyle("PRIMARY")
            .setDisabled(pageNo <= 1),
          new MessageButton()
            .setLabel("⟹")
            .setCustomId("next")
            .setStyle("PRIMARY")
            .setDisabled(!(pageNo < helpArray.length)),
        );
      };

      embed.setDescription(`**${helpArray[pageNo - 1].name.toUpperCase()}**`).addFields(
        helpArray[pageNo - 1].commands.map(({ name, description }) => {
          return {
            name: `\`${name.toUpperCase()}\``,
            value: `**${description}**`,
            inline: false,
          };
        }),
      );

      const intrMsg = await interaction.editReply({ embeds: [embed], components: [getButtons(pageNo)], fetchReply: true });

      const collector = intrMsg.createMessageComponentCollector({ time: 600000, componentType: "BUTTON" });

      collector.on("collect", async (i) => {
        if (i.customId === "next") {
          pageNo++;
        } else if (i.customId === "prev") {
          pageNo--;
        }

        const categ = helpArray[pageNo - 1];

        embed.fields = [];
        embed.setDescription(`**${categ.name.toUpperCase()}**`).addFields(
          categ.commands.map(({ name, description }) => {
            return {
              name: `\`${name.toUpperCase()}\``,
              value: `**${description}**`,
              inline: true,
            };
          }),
        ).setFooter(`Page ${pageNo}/${helpArray.length}`);

        await i.update({ embeds: [embed], components: [getButtons(pageNo)], fetchReply: true });
      });
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};