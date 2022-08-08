const signale = require('signale');
const { MessageEmbed } = require('discord.js');
const { Slots } = require('discord-gamecord')

module.exports = {
    name: "slots",
    description: "Play a game of Slots",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],


	async run(client, interaction) {

        try {
                
            new Slots({
                message: interaction,
                slash_command: true,
                embed: {
                    title: '🎰 Slot Machine',
                    color: '#5865F2'
                }
            }).startGame();
     
            } catch (err) {
                signale.error(err)
                interaction.reply(`There is an error. Please try again later.`);

          } 

	}
};