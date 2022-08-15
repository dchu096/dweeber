const signale = require('signale');
const { MessageEmbed } = require('discord.js');



module.exports = {
    name: "typerace",
    description: "Play a game of Type",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

	async run(client, interaction) {

        

        try {
                
           
     
            } catch (err) {
                signale.error(err)
                interaction.reply(`There is an error. Please try again later.`);

          } 

	}
};