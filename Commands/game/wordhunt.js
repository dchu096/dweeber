const signale = require('signale');
const { ChaosWords } = require('weky')
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');


module.exports = {
    name: "wordhunt",
    description: "Play a game of Word Hunt.",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

	async run(client, interaction) {

        await interaction.deferReply();


        try {

            var randomWords = require('random-words');
            const words = randomWords({ exactly: 3 }) // generating 3 words

            interaction.followUp(`Generating a random string...`).then(message => {

                 ChaosWords({
                  message: message,
                  embed: {
                      title: 'Word hunt',
                      footer: 'Dweeber >> wordhunt',
                      description: 'You have **{{time}}** to find the hidden words in the below sentence.',
                      color: 'RANDOM',
                      field1: 'Sentence:',
                      field2: 'Words Found/Remaining Words:',
                      field3: 'Words found:',
                      field4: 'Words:',
                      timestamp: false
                  },
                  winMessage: 'GG, You won! You made it in **{{time}}**.',
                  loseMessage: 'Better luck next time!',
                  wrongWordMessage: 'Wrong Guess! You have **{{remaining_tries}}** tries left.',
                  correctWordMessage: 'GG, You found **{{word}}** ! You have to find **{{remaining}}** more word(s).',
                  time: 60000,
                  words: words,
                  charGenerated: 17,
                  maxTries: 10,
                  buttonText: 'Cancel',
                  othersMessage: 'Only <@{{author}}> can use the buttons!'
              });



            })

           
            } catch (err) {
                signale.error(err)

          } 

	}
};