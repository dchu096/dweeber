require('module-alias/register')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "imgfilter",
    description: "Image filter for a user image you define",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "filter",
            description: "The platform to get the stats from",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "grey",
                    value: "grey"
                },
                {
                    name: "invert",
                    value: "invert"
                },
                {
                    name: "grey + invert",
                    value: "invertgrey"
                },
                {
                    name: "brighten",
                    value: "brighten"
                },
                {
                    name: "sepia",
                    value: "sepia"

                },
                {
                    name: "red",
                    value: "red"

                },
                {
                    name: "green",
                    value: "green"

                },
                {
                    name: "bloo",
                    value: "bloo"

                },
                {
                    name: "blurple",
                    value: "blurple"

                },
            ]  
        },
        {
            name: "user",
            description: "The user profile you want to apply the image filter",
            type: 'USER',
            required: false,
        },

    ],
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const filter = interaction.options.getString("filter");

        const Target = interaction.options.getMember("user") || interaction.member;

        try {
        
            let link = (`https://some-random-api.ml/canvas/${filter}?avatar=${Target.user.avatarURL({ format: "png" })}&key=${SRAAPI}`)

                const attachment = new MessageAttachment(link, 'filter.png');
                const filterEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage('attachment://image.png')
                .setFooter({ text: 'Dweeber >> imgfilter'});    
                 return interaction.followUp({ embeds: [filterEmbed], files: [attachment] });     
            

        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

