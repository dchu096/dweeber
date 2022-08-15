const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const OverrideDB = require("../../Schema/OverrideSchema");

module.exports = {
    name: "opt-in",
    description: "Opt-in for developer commands",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "code",
            description: "The authorization code",
            type: 'STRING',
            required: true,
        },
    ],

	async run(client, interaction) {

        const overrideinputcode = interaction.options.getString('code');

        await interaction.deferReply();

        if (interaction.guild.id != "958317326585987112") {
            interaction.followUp(`This command is not available in this server.`);
        }

        try {


            OverrideDB.findOne({Authorization: overrideinputcode}, async(err, data) => {
                if(err) throw err;
                if(data) {

                    if (data.Allowed === "1") {
                        return interaction.followUp(`You are already opted in!`);
                    }

                    if (data.Authorization === overrideinputcode && data.userID === interaction.member.id) {

                        await OverrideDB.findOneAndUpdate(
                            {
                                userID: interaction.user.id,
                            },
                            {
                                Allowed: "1",
                            },
                           
                        );


                        const overrideEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Welcome!")
                        .setDescription(`Greetings ${interaction.user}, I have processed the opt in code you entered and you are now able to use developer commands which will come in the next few weeks.\n\n Happy testing! \n\nPlease note that abusing developer commands will result in a ban from this bot.`)
                        .setFooter({ text: 'Dweeber >> opt-in'});

                        interaction.followUp({embeds: [overrideEmbed]});

                    } else {
                        const overridefailedEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Code denied")
                        .setDescription(`Hello ${interaction.user}, your authorization code is incorrect.`)
                        .setFooter({ text: 'Dweeber >> opt-in'});

                        interaction.followUp({embeds: [overridefailedEmbed]});
                    }
 
                    }
                })
           

        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
        }
        
	}
};

