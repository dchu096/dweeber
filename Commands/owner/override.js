const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const OverrideDB = require("../../Schema/OverrideSchema");

module.exports = {
    name: "override",
    description: "Override a command",
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

        try {

            OverrideDB.findOne({overrideCode: overrideinputcode}, async(err, data) => {
                if(err) throw err;
                if(data) {
                    
                    if (data.overrideCode === overrideinputcode) {
                        const overrideEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Override accepted")
                        .setDescription(`Hello ${interaction.user}, your authourization code is correct!`)
                        .setFooter({ text: 'Dweeber >> override'});

                        interaction.reply({embeds: [overrideEmbed]});

                    } else {
                        const overridefailedEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Override denied")
                        .setDescription(`Hello ${interaction.user}, your authorization code is incorrect.`)
                        .setFooter({ text: 'Dweeber >> override'});

                        interaction.reply({embeds: [overridefailedEmbed]});
                    }
 
                    }
                })
           

        } catch (err) {
        interaction.reply(`There is an error. Please try again later.`);
        signale.fatal(err)
        }
        
	}
};

