const Discord = require("discord.js");

module.exports = {
    config: {
        name: "setnick",
        description: "Change someone's nickname",
        usage: "[user] [nick-name]",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["setnickname"]
    },
    run: async (bot, message, args) => {
        let embedColor = '#3891A6' // color: blue, change the hex for different color
        const warningColor = '#ff0000';
        const muteColor = '#808080';
        const okColor = '#00ff00';


        // MESSAGES
        message.delete().catch(O_o => {});

        if (!message.member.permissions.has("MANAGE_NICKNAMES")) {
            let nopermsembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing MANAGE_NICKNAMES permission (user)")
                .addField("required:", "MANAGE_NICKNAMES permission", false)
                .setColor(warningColor);
            return message.channel.send(nopermsembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
        }

        if (!message.guild.me.permissions.has("MANAGE_NICKNAMES")) {
            let botnopermsembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing MANAGE_NICKNAMES permission (bot)")
                .addField("required:", "MANAGE_NICKNAMES permission", false)
                .setColor(warningColor);
            return message.channel.send(botnopermsembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
        }

        let nUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

        if (!nUser) {
            let nopersonembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing target user to set nick")
                .addField("required:", "mentions/ID", false)
                .setColor(warningColor);
            return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
        }

        let prevName = nUser.user.username; //user's previous name before they get nicked

        if (nUser.id === bot.user.id) return;

        let nickname = args.join(" ").slice(22);

        if (!nickname) {
            let nopersonembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing nickname for user")
                .addField("required:", "nicknames", false)
                .setColor(warningColor);
            return message.channel.send(nopersonembed).then(msg => msg.delete({timeout: 10000})).catch(O_o => {});
        }

        try {
            await message.guild.members.cache.get(nUser.id).setNickname(nickname);
        } catch(e) {
            console.log(e)
        }
        let successfullyembed = new Discord.MessageEmbed()
            .setTitle("✅Success")
            .setDescription(`${prevName}'s nickname have been changed to ${nickname} successfully.`)
            .setColor(okColor);
        await message.channel.send(successfullyembed).catch(O_o => {});

        //modlogs
        let doneembed = new Discord.MessageEmbed()
            .setTitle(`Moderation: Setnick`)
            .setColor(embedColor)
            .setDescription(`${nUser.user.tag} has been renamed by ${message.author.tag} from ${prevName} to ${nickname}`)
        let sChannel = message.guild.channels.cache.find(c => c.name === "shame-stream")
        sChannel.send(doneembed).catch(O_o => {});
    }
}