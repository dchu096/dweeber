const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const EconomyDB = require("../../Schema/EconomySchema");

module.exports = {
    name: "balance",
    description: "Show your balance.",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user to get the balance of",
            type: 'USER',
            required: false,
        },
    ],

	async run(client, interaction) {

        const Target = interaction.options.getMember("user") || interaction.member;

        try {

            EconomyDB.findOne({ userID: Target.id}, async(err, data) => {
                if(err) throw err;
                if(data) {
                    const Balance = new MessageEmbed() // data.coins for coins, data.bank for bank 
                    .setColor('RANDOM')
                    .setTitle(`${Target.user.tag}'s balance`)
                    .setDescription(`Balance for ${Target.user.tag}`)
                    .addField(`Cash:`,`${data.coins} :money_with_wings:`)
                    .addField(`Bank:`,`${data.bank} / ${data.bankLimit} :bank:`)
                    .setFooter({ text: 'Dweeber >> balance'});


                    return interaction.reply({embeds: [Balance]})
                } else {
                    const None = new MessageEmbed() // If you or user dosent have Economy started.#
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('You or the user you specified does not have an economy started!')
                    .setFooter({ text: 'Dweeber >> balance'});


                    return interaction.reply({embeds: [None]})

                }
            })

        } catch (err) {
        interaction.reply(`There is an error. Please try again later.`);
        signale.fatal(err)
        }
        
	}
};

