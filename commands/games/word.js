
module.exports = {
  name: "word",
  description: 'Play A Game Called Wordsnack In A VC !',

  run: async (client, message, args) => {

    try {
      
    client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'wordsnack').then(async invite => {
      return message.channel.send(`${invite.code}`);
    });
    } catch (error) {
       message.channel.send('Please Join A VC First !');
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
    
  
  }
}