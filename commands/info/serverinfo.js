const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class serverinfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            group: 'info',
            memberName: 'serverinfo',
            description: 'Shows the current server info',
            clientPermissions: [
                'SEND_MESSAGES'
            ],
            userPermissions: [
                'SEND_MESSAGES'
            ],

            guildOnly: true,
        });
    }
    async run(msg) {
        
         const embedColor = '#87CEEB'; // color: skyblue
        
        const errorEmoji = '<a:ag_exc:781410611366985748>';
        const successEmoji = '<a:ag_tickop:781395575962599445>';
        const loadingEmoji = '<a:ag_loading:781410654841077780>';

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days === 1 ? " day" : " days") + " ago";
        }

        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };

        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };

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



        const Embed = new Discord.MessageEmbed() // Creates the embed thats returned to the person warning if its sent
        .setColor(embedColor)
            .setTitle("Server Info")
            .setAuthor(`${msg.guild.name}`, msg.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField(`Server Owner:`, `${msg.guild.owner}`, true)
            .addField("Member Count:", `${msg.guild.memberCount}`, true)
            .addField("Role Count:", `${msg.guild.roles.cache.size}`, true)
            .addField("server ID", msg.guild.id, true)
            .addField("Total | Humans | Bots", `${msg.guild.members.cache.size} | ${msg.guild.members.cache.filter(member => !member.user.bot).size} | ${msg.guild.members.cache.filter(member => member.user.bot).size}`, true)
            .addField("Channels", msg.guild.channels.cache.size, true)
            .addField("Creation Date", `${msg.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(msg.channel.guild.createdAt)})`, true)
            .addField('AFK Timeout', `${msg.guild.afkTimeout / 60} minutes`, false)
            .addField("Explicit Filter:", `${filterLevels[msg.guild.explicitContentFilter]}`, false)
            .addField("Verification Level:", `${verificationLevels[msg.guild.verificationLevel]}`)
            .addField("Region", region[msg.guild.region], true)
            .addField("Boost Tier", `${msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : 'None'}`, false)
            .addField("Boost Count:", `${msg.guild.premiumSubscriptionCount || '0'}`)
            .setThumbnail(msg.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))

        await msg.channel.send(Embed);


    }
}