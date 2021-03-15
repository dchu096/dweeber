const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const os = require('os')
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = class statsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'info',
            memberName: 'stats',
            description: 'Shows the stats of the bot',
            clientPermissions: [
                'SEND_MESSAGES'
            ],
            userPermissions: [
                'SEND_MESSAGES'
            ],

        });
    }
    async run(msg) {


        let { version } = require("discord.js");

        cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) {
                return console.log(err);
            }

            let secs = Math.floor(msg.client.uptime % 60);
            let days = Math.floor((msg.client.uptime % 31536000) / 86400);
            let hours = Math.floor((msg.client.uptime / 3600) % 24);
            let mins = Math.floor((msg.client.uptime / 60) % 60);

            //let duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            let embedStats = new Discord.MessageEmbed()
                .setTitle("*** Stats ***")
                .setColor("#87CEEB")
                .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                .addField("• Uptime ", `${days}d ${hours}h ${mins}m ${secs}s`, true) //`${duration}`, true)
                .addField("• Users", `${msg.client.users.cache.size.toLocaleString()}`, true)
                .addField("• Servers", `${msg.client.guilds.cache.size.toLocaleString()}`, true)
                .addField("• Channels ", `${msg.client.channels.cache.size.toLocaleString()}`, true)
                .addField("• Discord.js", `v${version}`, true)
                // .addField("• Node", `${process.version}`, true)
                .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
                .addField("• CPU usage", `\`${percent.toFixed(2)}%\``,true)
                .addField("• Arch", `\`${os.arch()}\``,true)
                .addField("• Platform", `\`\`${os.platform()}\`\``,true)
                .setFooter("Thats the OS that the bot runs on!")

            msg.channel.send(embedStats).catch(O_o => {});
        })


    }
}