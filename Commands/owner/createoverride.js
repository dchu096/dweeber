require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const OverrideDB = require("../../Schema/OverrideSchema");
const { OwnerID } = require('@root/config.json');


module.exports = {
    name: "createoverride",
    description: "Create an override",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "code",
            description: "The code to create",
            type: 'STRING',
            required: true,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply({ ephemeral: true });

        const overrideinputcode = interaction.options.getString('code');

        if (interaction.member.user.id !== OwnerID) {
            interaction.followUp(`Only the owner of me can create the override!`);
            return;
        }

        try {

            OverrideDB.findOne({ Authorization: overrideinputcode }, async(err, data) => {
                if(err) throw err;
                if(data) {
                 
                    const dataexistEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Override Code for this user already exists!")
                    .setDescription(`Hello ${interaction.user}, the override code already exists.`)
                    .setFooter({ text: 'Dweeber >> createoverride'});

                    interaction.followUp({embeds: [dataexistEmbed]});



                    return interaction.followUp({embeds: [dataexistEmbed]});
                } else {
                        await OverrideDB.findOneAndUpdate(
                            {
                                Authorization: overrideinputcode
                            },
                            {
                                $inc: {
                                    maxuse: 1,
                                },
                            }

                    );

                    const overrideEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Override Created")
                    .setDescription(`The override code has been created!`)
                    .setFooter({ text: 'Dweeber >> createoverride'});
    
                interaction.followUp({embeds: [overrideEmbed]});

                }
            })



       
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};



