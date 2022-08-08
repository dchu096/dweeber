const signale = require('signale');
const { MessageEmbed } = require('discord.js');
const { Sudo } = require('weky')

module.exports = {
  name: "sudo",
  description: "Force a message to run as another user",
  clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
  options: [
    {
        name: "user",
        description: "The user to run the command as",
        type: 'USER',
        required: true,
    },
    {
      name: "messages",
      description: "The message you want the user to run",
      type: 'STRING',
      required: true,
  },

],
	async run(client, interaction) {

        await interaction.deferReply();

        const userinput = interaction.options.getMember('user');

        const messageinput = interaction.options.getString('messages');

        try {

        interaction.followUp(`** **`).then(message => {
        Sudo({
          message: message,
          member: userinput,
          text: messageinput,
          deleteMessage: true
        });
      })

          } catch (err) {
            signale.error(err)
          }




	}
};