const Discord = require("discord.js");

module.exports = {
    config: {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: " ",
        category: "info",
        accessableby: "Members",
        aliases: ["server", "serverdesc"]
    },
    run: async (bot, message, args) => {

        const embedColor = '#87CEEB';

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days === 1 ? " day" : " days") + " ago";
        }

        let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];

        let region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za:  South Africa"
        };



        const ServerInfoEmbed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent
            .setColor(embedColor)
            .setTitle("Server Info")
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField(`Server Name:`, `${message.guild.name}`, true)
            .addField(`Server Name:`, `${message.guild.id}`, true)
            .addField(`Server Owner:`, `${message.guild.owner}`, true)
            .addField("Member Count:", `${message.guild.memberCount}`, true)
            .addField("Role Count:", `${message.guild.roles.cache.size}`, true)
            .addField("server ID", message.guild.id, true)
            .addField("Region", region[message.guild.region], true)
            .addField("Total | Humans | Bots", `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
            .addField("Verification Level", verifLevels[message.guild.verificationLevel], true)
            .addField("Channels", message.guild.channels.cache.size, true)
            .addField("Roles", message.guild.roles.cache.size, true)
            .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))

        await message.channel.send({ embeds: [ServerInfoEmbed] });
    }
}