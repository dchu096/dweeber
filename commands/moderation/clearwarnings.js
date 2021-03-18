

























const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

module.exports = {
    config: {
        name: "clearwarnings",
        description: "clear a warning from members",
        usage: "[user/ID]",
        category: "admins",
        accessableby: "Administrators",
        aliases: ["clrwarn"]
    },
    run: async (bot, message, args) => {
        const embedColor = '#FFFF00'; // color: yellow, change the hex for different color
        const warningColor = '#ff0000';
        const okColor = '#00ff00';
        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        let mentioned = message.mentions.users.first() || message.guild.members.cache.get(args[0]);


        // MESSAGES

            message.delete().catch(O_o => {});

        if (!mentioned) {
            let nopersonembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing target user to clear warn")
                .addField("required:", "mentions/ID", false)
                .setColor(warningColor);
            return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});
        }


        if (!message.member.permissions.has("ADMINISTRATOR")) {
            let nopermsembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("You do not have permission to clear warnings")
                .addField("required:", "ADMINISTRATOR permission", false)
                .setColor(warningColor);
            return message.channel.send(nopermsembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});
        }

        if(!warns[`${mentioned.id}, ${message.guild.id}`]){
            warns[`${mentioned.id}, ${message.guild.id}`] = {
                warns: 0
            };
        }

        let reason = `${warns[`${mentioned.id}, ${message.guild.id}`].warns} warnings have been cleared for ${mentioned}`;

        if(warns[`${mentioned.id}, ${message.guild.id}`].warns > 0) {
            warns[`${mentioned.id}, ${message.guild.id}`] = {
                warns: 0
            };
        }else{
            reason = 'This user doesnt have any warnings!'
        }

        fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
            if(err) throw err;
        });

        let successembed = new Discord.MessageEmbed()
            .setColor(okColor)
            .setDescription(reason)
        await message.channel.send(successembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});

        let doneembed = new Discord.MessageEmbed()
            .setTitle(`Moderation: clear warnings`)
            .setColor(embedColor)
            .setDescription(`${mentioned.tag} warnings have been cleared by ${message.author.tag}`)
        let sChannel = message.guild.channels.cache.find(c => c.name === "shame-stream")
        sChannel.send(doneembed)
    }
    }