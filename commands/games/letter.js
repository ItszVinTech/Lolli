
module.exports = {
  name: "letter",
  description: 'Play A Game Called Lettertile In A VC !',

  run: async (client, message, args) => {

    try {
      
    client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'lettertile').then(async invite => {
      return message.channel.send(`${invite.code}`);
    });
    } catch (error) {
       message.channel.send('Please Join A VC First !');
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
    
  
  }
}