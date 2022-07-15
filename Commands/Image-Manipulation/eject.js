require('module-alias/register')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "eject",
    description: "Generate a random ejection from amongus",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user to eject",
            type: 'USER',
            required: true,
        },
        {
            name: "impostor",
            description: "Is the user an impostor?",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Yes",
                    value: "true"
                },
                {
                    name: "No",
                    value: "false"
                }
                
            ]  
        },
    ],
    
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const Target = interaction.options.getMember("user") || interaction.member; 

        const defineimpostor = interaction.options.getString('impostor');

        try {
        
            let link = (`https://some-random-api.ml/premium/amongus?avatar=${Target.user.avatarURL({ format: "png" })}&username=${encodeURIComponent(Target.user.username)}&key=${SRAAPI}&impostor=${defineimpostor}`)

            const attachment = new MessageAttachment(link, 'amongus.gif');
            const greyscaleEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${Target.user.username} has been ejected`)
            .setImage('attachment://amongus.gif')
            .setFooter({ text: 'Dweeber >> eject'});    

             return interaction.followUp({ embeds: [greyscaleEmbed], files: [attachment] });

        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

