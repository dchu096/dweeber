const signale = require('signale');
const { MessageEmbed } = require('discord.js');
const { TicTacToe } = require('discord-gamecord')

module.exports = {
    name: "tictactoe",
    description: "Play a game of Tic Tac Toe with a player",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user to play with",
            type: 'USER',
            required: true,
        },
    ],


	async run(client, interaction) {


        try {
                
            new TicTacToe({
                message: interaction,
                slash_command: true,
                opponent: interaction.options.getUser('user'),
                embed: {
                  title: 'Tic Tac Toe',
                  overTitle: 'Game Over',
                  color: '#5865F2',
                },
                oEmoji: '🔵',
                xEmoji: '❌',
                blankEmoji: '➖',
                oColor: 'PRIMARY',
                xColor: 'DANGER',
                waitMessage: 'Waiting for the opponent...',
                turnMessage: '{emoji} | Its now **{player}** turn!',
                askMessage: 'Hey {opponent}, {challenger} challenged you for a game of Tic Tac Toe!',
                cancelMessage: 'Looks like they refused to have a game of Tic Tac Toe. \:(',
                timeEndMessage: 'Since the opponent didnt answer, i dropped the game!',
                drawMessage: 'It was a draw!',
                winMessage: '{emoji} | **{winner}** won the game!',
                gameEndMessage: 'The game went unfinished :(',
              }).startGame();

     
            } catch (err) {
                signale.error(err)
                interaction.reply(`There is an error. Please try again later.`);

          } 

	}
};