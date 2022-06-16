require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');

module.exports = {
    name: "beg",
    description: "Beg for coins.",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        await interaction.deferReply();

        const Target = interaction.member;

        const guild = interaction.guild

        try {

            

            EconomyDB.findOne({ userID: Target.id}, async(err, data) => {
                if(err) throw err;
                if(data) {
                    let amount = Math.floor(Math.random() * 50) + 10;
                    let coins = data.coins;
                    let Total = coins + amount;

                    const begEmbed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Beg result`)
                    .setDescription(`${target.user.tag} begged for ${amount} coins!`)
                    .addField(`Total:`,`${Total} :money_with_wings:`)
                    .setFooter({ text: 'Dweeber >> beg'});


                    return interaction.reply({embeds: [begEmbed]})
                } else {
                    const None = new MessageEmbed() // If you or user dosent have Economy started.#
                    .setColor('#ff0000')
                    .setTitle('Error')
                    .setDescription('You do not have an economy started!')
                    .setFooter({ text: 'Dweeber >> beg'});


                    return interaction.reply({embeds: [None]})

                }
            })
           
            
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

