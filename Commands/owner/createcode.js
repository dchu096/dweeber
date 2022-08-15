require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const OverrideDB = require("../../Schema/OverrideSchema");
const { OwnerID } = require('@root/config.json');


module.exports = {
    name: "createcode",
    description: "Create an opt in code",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "code",
            description: "The code to create",
            type: 'STRING',
            required: true,
        },
        {
            name: "user",
            description: "The user to get the avatar of",
            type: 'USER',
            required: true,
        },

    ],
	async run(client, interaction) {

        await interaction.deferReply({ ephemeral: true });

        const overrideinputcode = interaction.options.getString('code');

        const Target = interaction.options.getMember("user") || interaction.member; 

        if (interaction.member.user.id !== OwnerID) {
            interaction.followUp(`Only the owner of me can create the opt-in codes!`);
            return;
        }

        try {

            OverrideDB.findOne({ Authorization: overrideinputcode }, async(err, data) => {
                if(err) throw err;
                if(data) {
                 
                    const dataexistEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Opt-in Code already exists!")
                    .setDescription(`The opt-in code ${overrideinputcode} already exists.`)
                    .setFooter({ text: 'Dweeber >> createcode'});

                    interaction.followUp({embeds: [dataexistEmbed]});

                    return interaction.followUp({embeds: [dataexistEmbed]});
                } else {
                    new OverrideDB({
                        userID: Target.id,
                        Authorization: overrideinputcode,
                        Allowed: "0",
                    }).save();

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




    
