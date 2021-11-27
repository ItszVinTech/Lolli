
module.exports = {
  name: "fishing",
  description: 'Play A Game Called Fishington In A VC !',

  run: async (client, message, args) => {

    try {
      
    client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'fishing').then(async invite => {
      return message.channel.send(`${invite.code}`);
    });
    } catch (error) {
       message.channel.send('Please Join A VC First !');
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
    
  
  }
}