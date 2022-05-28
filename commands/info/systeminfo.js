require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const os = require('os');
const cpuStat = require("cpu-stat");
const moment = require("moment");
const { connected } = require("process");
const { version } = require("@root/package.json")
const packageJSON = require("@root/package.json");


module.exports = {
    config: {
        name: "systeminfo",
        description: "shows the bot stats",
        usage: "./systeminfo",
        category: "info",
        accessableby: "members",
        aliases: ["stat", "stats", "status", "botinfo"]
    },
    run: async (bot, message, args) => {

        cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) {
                return console.log(err);
            }


            const ToTalSeconds = (message.client.uptime / 1000);
            const Days = Math.floor(ToTalSeconds / 86400);
            const Hours = Math.floor(ToTalSeconds / 3600);
            const Minutes = Math.floor(ToTalSeconds / 60);

            const discordJSVersion = packageJSON.dependencies["discord.js"];

            //let duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            let statsEmbed = new MessageEmbed()
                .setTitle("*** Stats ***")
                .setColor("#87CEEB")
                .addField("• Bot Name", bot.user.tag)
                .addField("• Bot Version", version, true)
                .addField("=================", "=================")
                .addField("• Servers", `${bot.guilds.cache.size.toLocaleString()}`, true)
                .addField("• Users", `${bot.users.cache.size.toLocaleString()}`, true)
                .addField("• Channels ", `${bot.channels.cache.size.toLocaleString()}`, true)
                .addField("=================", "=================")
                .addField("• Uptime ", `${Days} Days, ${Hours} Hours, ${Minutes} Minutes`, true) //`${duration}`, true)
                .addField("• Discord.js", discordJSVersion, true)
                .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
                .addField("• CPU usage", `\`${percent.toFixed(2)}%\``,true)
                .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                .addField("• Arch", `\`${os.arch()}\``,true)
                .addField("• Platform", `\`\`${os.platform()}\`\``,true)
                .setFooter({ text: 'Dweeber >> SystemInfo'});

            message.channel.send({ embeds: [statsEmbed] }).catch(O_o => {});
        })
    }

}