const Discord = require('discord.js');
const { ownerid} = require("../../botconfig.json");

module.exports = {
    config: {
        name: "safe",
        description: "Shows the memu blog on is memu safe",
        usage: "^2safe",
        category: "Memu",
        accessableby: "Memu members",
        aliases: ["sf"]
    },
    run: async (bot, message, args) => {

        if(message.channel.id === 623482968765104160 || message.author.id === "420839496263925767") {
            const exampleEmbed = {
                color: 0x9B870C,
                title: 'Memu info',
                author: {
                    name: 'Memu',
                    icon_url: 'https://cdn.discordapp.com/icons/617994627810721820/4d1a820d7ecbae66eb8fbc8fb69b4d60.webp?size=128',
                    url: 'https://memuplay.com',
                },
                thumbnail: {
                    url: 'https://cdn.discordapp.com/icons/617994627810721820/4d1a820d7ecbae66eb8fbc8fb69b4d60.webp?size=128',
                },
                fields: [
                    {
                        name: 'Is Memu safe??',
                        value: 'Please refer to this guide: https://www.memuplay.com/blog/is-memu-safe.html',
                        inline: false,
                    },

                ],
                timestamp: new Date(),
                footer: {
                    text: '^2help <command> for more details',
                    icon_url: 'https://cdn.discordapp.com/icons/617994627810721820/4d1a820d7ecbae66eb8fbc8fb69b4d60.webp?size=128',
                },
            };

            message.channel.send({embed: exampleEmbed});
        } else {
            return message.reply("This command should be processed only in <#623482968765104160> or by the bot owner")
        }
    }
}