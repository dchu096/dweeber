require('module-alias/register')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "glass",
    description: "Glass out a user's profile picture",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The user profile you want to make more glass of",
            type: 'USER',
            required: false,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();

        const Target = interaction.options.getMember("user") || interaction.member;

        try {
        
            let link = (`https://some-random-api.ml/canvas/glass?avatar=${Target.user.avatarURL({ format: "png" })}&key=${SRAAPI}`)

                const attachment = new MessageAttachment(link, 'image.png');
                const glassEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Glassed out profile picture`)
                .setDescription(`Greyed out profile picture for ${Target.user.tag}`)
                .setImage('attachment://image.png')
                .setFooter({ text: 'Dweeber >> glass'});    

                 return interaction.followUp({ embeds: [glassEmbed], files: [attachment] });

        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

