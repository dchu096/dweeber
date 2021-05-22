const childProcess = require('child_process');
const Discord = require("discord.js");

module.exports = {
    config: {
        name: "exec",
        description: "Executes a process command",
        usage: "[code]",
        category: "owner",
        accessableby: "owner",
        aliases: ["exe"]
    },
    run: (bot, message, args, data, errors) => {
        let ownerid = "420839496263925767"
        if (message.author.id === ownerid) {
            childProcess.exec(args.join(' '), {},
                (err, stdout, stderr) => {
                    if (err) return message.channel.send('```' + err.message + '```');
                    message.channel.send(`\n\`\`\``  + stdout + `\n\`\`\``);
                });
        } else {
            let embedColor = '#FF0000' // color: red, change the hex for different color
            let deniedembed = new Discord.MessageEmbed()
                .setTitle(`❌Error`)
                .setDescription(`This bot doesnt belong to you!`)
                .addField("required:", "bot developers", false)
                .setColor(warningColor)
            return message.reply(deniedembed).then(msg => msg.delete(10000)).then(() =>
                console.log(`${message.author.username} have been trying to access command exec`));
        }
    }
}