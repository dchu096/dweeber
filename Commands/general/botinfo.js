require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');
const os = require('os');
const cpuStat = require("cpu-stat");
const { connected } = require("process");
const { version } = require("@root/package.json")
const packageJSON = require("@root/package.json");
const ms = require("ms");

module.exports = {
    name: "botinfo",
    description: "Shows the bot informations",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

	async run(client, interaction) {

        await interaction.deferReply();

        try {

            cpuStat.usagePercent(function(err, percent, seconds) {
                if (err) {
                    return signale.fatal(err);
                }
    
    
                const discordJSVersion = packageJSON.dependencies["discord.js"];
    
                //let duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
                let statsEmbed = new MessageEmbed()
                    .setTitle("*** Stats ***")
                    .setColor("#87CEEB")
                    .addField("• Bot Name", client.user.tag)
                    .addField("• Bot Version", version, true)
                    .addField("=================", "=================")
                    .addField("• Servers", `${client.guilds.cache.size.toLocaleString()}`, true)
                    .addField("• Users", `${client.users.cache.size.toLocaleString()}`, true)
                    .addField("• Channels ", `${client.channels.cache.size.toLocaleString()}`, true)
                    .addField("=================", "=================")
                    .addField("• Uptime ", `${ms(client.uptime, { long: true})}`, true) 
                    .addField("• Discord.js", discordJSVersion, true)
                    .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
                    .addField("• CPU usage", `\`${percent.toFixed(2)}%\``,true)
                    .addField("• Mem Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``, true)
                    .addField("• Arch", `\`${os.arch()}\``,true)
                    .addField("• Platform", `\`\`${os.platform()}\`\``,true)
                    .setFooter({ text: 'Dweeber >> botInfo'});
    
                    return interaction.followUp({ embeds: [statsEmbed] })
            })



        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
        }
        
	}
};

