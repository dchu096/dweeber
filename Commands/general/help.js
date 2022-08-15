const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Get help on a command",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    run: async(client, interaction) => {

        const HelpButtons = new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId("helpselect")
            .setPlaceholder("Categories")
            .addOptions([
                {
                    label: "Anime",
                    value: "anime",
                    description: "Shows all Fun commands"
                },
                {
                    label: "Economy",
                    value: "economy",
                    description: "Shows all Economy commands",
                },
                {
                    label: "Games",
                    value: "games",
                    description: "Shows all Games commands",
                },
                {
                    label: "General",
                    value: "general",
                    description: "Shows all General commands",
                },
                {
                    label: "Miscellaneous",
                    value: "miscellaneous",
                    description: "Shows all Miscellaneous commands",
                },
                {
                    label: "Moderation",
                    value: "moderation",
                    description: "Shows all Moderation commands",
                },
                {
                    label: "Music",
                    value: "music",
                    description: "Shows all Music commands",
                },
                {
                    label: "Productivity",
                    value: "utility",
                    description: "Shows all Productivity commands",
                },
                {
                    label: "Stats",
                    value: "stats",
                    description: "Shows all Stats commands",
                },
                {
                    label: "Image Manipulation",
                    value: "image",
                    description: "Shows all Image Manipulation commands",
                },
                {
                    label: "Owner",
                    value: "owner",
                    description: "Shows all Owner commands",
                },

            ])
        )

        const helpChoose = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Help commands")
        .setDescription(`Please select a category to view the commands related!`)
        .setFooter({ text: 'Dweeber >> help'});

        const AnimeHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Anime commands")
        .setDescription(`\`animequote\``)
        .setFooter({ text: 'Dweeber >> help'});

        const EcoHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Economy commands")
        .setDescription(`\`balance\`, \`beg\`, \`buy [WIP]\`, \`daily\`, \`shop [WIP]\``)
        .setFooter({ text: 'Dweeber >> help'});

        const GamesHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Games commands")
        .setDescription(`\`connect4\`, \`guessthenumber\`, \`guessthepokemon\`, \`rockpaperscissors\`, \`slots\`, \`snake\`, \`tictactoe\`, \`tictactoeai\`, \`trivia\`, \`wouldyourather\``)
        .setFooter({ text: 'Dweeber >> help'});

        const GeneralHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("General commands")
        .setDescription(`\`about\`, \`avatar\`, \`botinfo\`, \`help\`, \`ping\`, \`serverinfo\`, \`userinfo\``)
        .setFooter({ text: 'Dweeber >> help'});

        const MiscHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Miscellaneous commands")
        .setDescription(`\`8ball\`, \`dog\`, \`emojify\`, \`getid\`, \`hack\`, \`meme\`, \`playstoresearch\`, \`sudo [WIP]\``)
        .setFooter({ text: 'Dweeber >> help'});

        const ModHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Moderation commands")
        .setDescription(`\`ban\`, \`clear\`, \`kick\`, \`mute\`, \`unmute\``)
        .setFooter({ text: 'Dweeber >> help'});

        const MusicHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Music commands")
        .setDescription(`\`play\`, \`queue\`, \`repeat\`, \`resume\`, \`skip\`, \`stop\`, \`volume\`, \`lyrics[WIP]\``)
        .setFooter({ text: 'Dweeber >> help'});

        const UtilityHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Productivity commands")
        .setDescription(`\`apod\`, \`color\`, \`iss_position\`, \`npmlookup [WIP]\`, \`remindme\`, \`weather\``)
        .setFooter({ text: 'Dweeber >> help'});

        const StatsHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Stats commands")
        .setDescription(`\`apex\`, \`csgo\`, \`fortnite [WIP]\`, \`mcstats\``)
        .setFooter({ text: 'Dweeber >> help'});

        const ImageHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Image Manipulation commands")
        .setDescription(`\`eject\`, \`fakeytcomment\``)
        .setFooter({ text: 'Dweeber >> help'});

        const OwnerHelp = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Owner commands")
        .setDescription(`\`eval\`, \`createoverride\`, \`override\``)
        .setFooter({ text: 'Dweeber >> help'});

        const deniedEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Access denied")
        .setDescription(`You do not have access to this category!`)
        .setFooter({ text: 'Dweeber >> help'});

        interaction.reply({embeds: [helpChoose], components: [HelpButtons]})

        const filter = i => i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 45000,
            componentType: "SELECT_MENU"
        })

        collector.on("collect", async (collected) => {
            const value = collected.values[0]

            if(value === "anime") {
                collected.update({embeds: [AnimeHelp]})
            } 
            
            if(value === "economy") {
                collected.update({embeds: [EcoHelp]})
            }      
            if(value === "games") {
                collected.update({embeds: [GamesHelp]})
            }
            if(value === "general") {
                collected.update({embeds: [GeneralHelp]})
            }
            if(value === "miscellaneous") {
                collected.update({embeds: [MiscHelp]})
            }
            if(value === "moderation") {
                collected.update({embeds: [ModHelp]})
            }
            if(value === "music") {
                collected.update({embeds: [MusicHelp]})
            }
            if(value === "utility") {
                collected.update({embeds: [UtilityHelp]})
            }
            if(value === "stats") {
                collected.update({embeds: [StatsHelp]})
            }
            if(value === "image") {
                collected.update({embeds: [ImageHelp]})
            }
            if(value === "owner" && interaction.user.id === "658186843963260929") {
                collected.update({embeds: [OwnerHelp]})
               
            } else {
                collected.update({embeds: [deniedEmbed]})
            }
        })
        
        setTimeout(function () {
            HelpButtons.components[0].setDisabled(true);
            interaction.editReply({components: [HelpButtons]});
        }, 45000)
    }
}
