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
                    .setTitle("**__Bot Stats__**")
                    .setColor("#87CEEB")
                    .setThumbnail(client.user.displayAvatarURL())
                    .addFields({ name: '• Bot Name', value:  client.user.tag, inline: true })
                    .addFields({ name: '• Bot Version', value: version, inline: true })
                    .addFields({ name: '=================', value: `=================` })     
                    .addFields({ name: '• Servers', value: `${client.guilds.cache.size.toLocaleString()}`, inline: true })
                    .addFields({ name: '• Users', value: `${client.users.cache.size.toLocaleString()}`, inline: true })
                    .addFields({ name: '• Channels', value: `${client.channels.cache.size.toLocaleString()}`, inline: true })
                    .addFields({ name: '=================', value: `=================` })    
                    .addFields({ name: '• Uptime', value: `${ms(client.uptime, { long: true})}`, inline: true })
                    .addFields({ name: '• Discord.js', value: discordJSVersion, inline: true })
                    .addFields({ name: '=================', value: `=================` })
                    .addFields({ name: '• Client status', value: `\`🟢 Online || ${Math.round(client.ws.ping)} ms\``, inline: true })
                    .addFields({ name: '• Database status', value: `\`🟢 Connected to MongoDB\``, inline: true })
                    .addFields({ name: '=================', value: `=================` })
                    .addFields({ name: '• CPU', value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\`` })
                    .addFields({ name: '• CPU usage', value: `\`${percent.toFixed(2)}%\``, inline: true})
                    .addFields({ name: '• Memory usage', value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\``, inline: true})
                    .addFields({ name: '• Arch', value:  `\`${os.arch()}\``, inline: true})
                    .addFields({ name: '• Platform', value: `\`\`${os.platform()}\`\``, inline: true})
                    .setFooter({ text: 'Dweeber >> botInfo'});
    
                    return interaction.followUp({ embeds: [statsEmbed] })
            })

            



        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
        }
        
	}
};

