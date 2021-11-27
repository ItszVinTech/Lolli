/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'rlgl',
	aliases: ['redlightgreenlight'],
	run: async (client, message) => {

		const grass = '<:gressxd:913522242174992464>'; // https://cdn.discordapp.com/emojis/897167292591394856.png
		const square = '<:squidgamesquare:913522135337664533>'; // https://cdn.discordapp.com/emojis/897165380873752576.png
		const greenGirl = '<:girlfromback:913522046254850059>'; // https://cdn.discordapp.com/emojis/897166943335874570.png
		const redGirl = '<:girlfromfront:913521943490207755>'; // https://cdn.discordapp.com/emojis/897166451125919754.png
		const greenLine = '<:greenline:913521821515669525>'; // https://cdn.discordapp.com/emojis/897168188721213481.png
		const redLine = '<:redline:913521714342797342>'; // https://cdn.discordapp.com/emojis/897168818634383370.png
		const you = '<:mainchar:913521602560405584>'; // https://cdn.discordapp.com/emojis/897167494018654230.png
		const triangle = '<:squidgametriangle:913521431621533757>'; // https://cdn.discordapp.com/emojis/897165507139076116.png
		const colors = ['red', 'green'];

		const positions = {
			green: [`${grass + square + grass + greenGirl + grass + triangle + grass}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				`${greenLine + grass.repeat(5) + greenLine}`,
				[greenLine, grass.repeat(2), you, grass.repeat(2), greenLine]],
			red: [`${grass + square + grass + redGirl + grass + triangle + grass}`,
				`${redLine + grass.repeat(5) + redLine}`,
				`${redLine + grass.repeat(5) + redLine}`,
				`${redLine + grass.repeat(5) + redLine}`,
				`${redLine + grass.repeat(5) + redLine}`,
				`${redLine + grass.repeat(5) + redLine}`,
				`${redLine + grass.repeat(5) + redLine}`,
				[redLine, grass.repeat(2), you, grass.repeat(2), redLine]],
		};

		const move = String(Math.random());
		const data = { left: 6, color: colors[Math.floor(Math.random() * 2) ] };
		let gameEnded = false;

		const componentsArray = [
			{
				type: 1,
				components: [
					{
						type: 2,
						style: 'SECONDARY',
						custom_id: 'xd',
						disabled: true,
						label: '\u200b',
					},
					{
						type: 2,
						style: 'PRIMARY',
						custom_id: move,
						label: 'Move',
					},
					{
						type: 2,
						style: 'SECONDARY',
						custom_id: 'dx',
						disabled: true,
						label: '\u200b',
					},
				],
			},
		];

		const msg = await message.channel.send({
			content: positions[data.color].join('\n').replace(/,/g, ''),
			components: componentsArray,
		});

		const filter = (button => { return button.user.id === message.author.id; });
		const game = message.channel.createMessageComponentCollector({
			filter,
			componentType: 'BUTTON',
		});

		function update(die, win) {
			if(win === true) {
				game.stop();
				gameEnded = true;
				componentsArray[0].components[1].disabled = true;

				message.reply('gg you win');
			}
			if(die === true) {
				game.stop();
				gameEnded = true;
				componentsArray[0].components[1].disabled = true;

				message.reply('you lost, be proud');
			}
			msg.edit({
			 	 content: positions[data.color].join('\n').replace(/,/g, ''),
				 components: componentsArray,
			 });
		}
		setInterval(() => {
			if(gameEnded === false) data.color = colors[Math.floor(Math.random() * 2) ];
			update();
		}, 2000);
		game.on('collect', async button => {
			button.deferUpdate();
			if(data.color === 'red') return update(true);
			if(data.left === 1) update(false, true);

			colors.forEach((color) => {
				const thearraytofind = positions[color].filter(x => Array.isArray(x));
				const i = positions[color].filter(x => Array.isArray(x)).map(x => positions[color].indexOf(x))[0];

				const dataBefore = positions[color][i - 1];
				positions[color][i - 1] = thearraytofind;
				positions[color][i] = dataBefore;
			});

			data.left--;
			update();
		});
	},
};