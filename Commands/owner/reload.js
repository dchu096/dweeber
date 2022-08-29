require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const { inspect } = require(`util`);
const { OwnerID } = require('@root/config.json');


module.exports = {
    name: "reload",
    description: "Reload a command",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "folder",
            description: "The folder the command is in",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Anime",
                    value: "Anime"
                },
                {
                    name: "Chat",
                    value: "chat"
                },
                {
                    name: "Economy",
                    value: "econmomy"
                },
                {
                    name: "Game",
                    value: "game"
                },
                {
                    name: "General",
                    value: "general"
                },
                {
                    name: "Giveaways",
                    value: "giveaways"
                },
                {
                    name: "Image",
                    value: "Image-Manipulation"
                },
                {
                    name: "Miscellaneous",
                    value: "miscellaneous"
                },
                {
                    name: "Moderation",
                    value: "moderation"
                },
                {
                    name: "Music",
                    value: "music"
                },
                {
                    name: "Owner",
                    value: "owner"
                },
                {
                    name: "Productivity",
                    value: "productivity"
                },
                {
                    name: "Stats",
                    value: "stats"
                },
                {
                    name: "Tickets",
                    value: "tickets"
                }
            ]  
        },
        {
            name: "command",
            description: "The command you want to reload",
            type: 'STRING',
            required: true,
        },
    ],
	async run(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const iCommand = interaction.options.getString('command');

        const iFolder = interaction.options.getString('folder');

        if (interaction.member.user.id !== OwnerID) {
            interaction.followUp(`You dont own me!`);
            return;
        }

        try {

                delete require.cache[require.resolve(`../${iFolder}/${iCommand}.js`)] 
                client.commands.delete(iCommand);
                const pull = require(`../${iFolder}/${iCommand}.js`)
                client.commands.set(iCommand, pull)

            interaction.followUp(`The command \`${iCommand}\` has been reloaded!`)

        }   catch (err) {
                signale.fatal("[RELOAD] " + err)
                interaction.followUp(`Command ${iCommand} failed to reload!`);
          } 


	
	}
};