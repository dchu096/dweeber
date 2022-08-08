require('module-alias/register')
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "ytcomment",
    description: "Generate a fake YT comment",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "user",
            description: "The profile of the commenter",
            type: 'USER',
            required: true,
        },
        {
            name: "comment",
            description: "The comment",
            type: 'STRING',
            required: true,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const Target = interaction.options.getMember("user"); 

        const commentinput = interaction.options.getString('comment');

        try {
        
            let link =(`https://some-random-api.ml/canvas/youtube-comment?username=${encodeURIComponent(Target.user.username)}&comment=${encodeURIComponent(commentinput)}&key=${SRAAPI}&avatar=${Target.user.avatarURL({ format: "png" })}`)
                const attachment = new MessageAttachment(link, 'ytcomment.png');
            
                const ytEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage('attachment://ytcomment.png')
                .setFooter({ text: 'Dweeber >> ytcomment'});
                 return interaction.followUp({ embeds: [ytEmbed], files: [attachment] });

        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

