require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const EconomyDB = require("../../Schema/EconomySchema");


module.exports = {
    name: "daily",
    description: "Daily balance",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    timeout: 86400000,
	async run(client, interaction) {

        await interaction.deferReply();

        const Target = interaction.member; 

        const guild = interaction.guild

        try {


            EconomyDB.findOne({ userID: Target.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                let amount = 100
                const response = await EconomyDB.findOneAndUpdate(
                    {
                        userID: interaction.user.id,
                    },
                    {
                        $inc: {
                            coins: amount,
                        },
                    }
                );

                const totalAmount = data.coins + amount;



                const begEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Daily`)
                .setDescription(`You have received ${amount} coins for today!`)
                .addField(`Total: `, `${totalAmount} <:dcoin:992585021720363128>  | ${data.bank} :bank:`)
                .setFooter({ text: 'Dweeber >> daily'});


                return interaction.followUp({embeds: [begEmbed]})
            } else {
                const None = new MessageEmbed() // If you or user dosent have Economy started.#
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('You do not have an economy started!')
                .setFooter({ text: 'Dweeber >> beg'});


                return interaction.followUp({embeds: [None]})

            }
        })

       
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

