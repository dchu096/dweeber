const signale = require('signale');
const { MessageEmbed } = require('discord.js');
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en' });

module.exports = {
    name: "tictactoeai",
    description: "Play a game of Tic Tac Toe with an AI",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

	async run(client, interaction) {

        try {
                
        game.handleInteraction(interaction);

     
            } catch (err) {
                signale.error(err)
                interaction.reply(`There is an error. Please try again later.`);

          } 

	}
};