const signale = require('signale');
const { MessageEmbed } = require('discord.js');
const { Snake } = require('discord-gamecord')

module.exports = {
    name: "snake",
    description: "Play a game of Snake",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],


	async run(client, interaction) {

        try {
                
            new Snake({
                message: interaction,
                slash_command: true,
                embed: {
                  title: 'Snake',
                  color: '#5865F2',
                  OverTitle: 'Game Over',
                },
                snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
                emojis: {
                  board: '⬛', 
                  food: '🍎',
                  up: '⬆️', 
                  right: '➡️',
                  down: '⬇️',
                  left: '⬅️',
                },
                foods: ['🍎', '🍇', '🍊'],
                stopButton: 'Stop',
                othersMessage: 'You are not allowed to use buttons for this message!',
              }).startGame();
     
            } catch (err) {
                signale.error(err)
                interaction.reply(`There is an error. Please try again later.`);

          } 

	}
};