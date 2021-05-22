const childProcess = require('child_process');
const express = require('express');
const Discord = require("discord.js");
const {PythonShell} = require("python-shell");
const app = express();
const port = 3000;

module.exports = {
    config: {
        name: "pythonexec",
        description: "Executes a python process command",
        usage: "[code]",
        category: "owner",
        accessableby: "owner",
        aliases: ["pyexe", "pythonexecute"]
    },

    run: (bot, message, args, data, errors) => {
            let ownerid = "420839496263925767"
            if (message.author.id === ownerid) {
                let options = {
                    mode: 'text',
                    pythonPath: 'C:/Python39/python.exe',
                    pythonOptions: ['-c'], // get print results in real-time
                    args: ['value1', 'value2', 'value3']
                };


                PythonShell.run(args.join(' '), options, function (err, results) {
                    if (err) throw err;
                    // results is an array consisting of messages collected during execution

                    let codeEmbed = new Discord.MessageEmbed()
                        .setColor('#ffff00')
                        .setTitle("Python")
                        .setDescription(`Code Execution result`)
                        .addField('results', `\n\`\`\`` + results + `\n\`\`\``, false)

                    message.channel.send(codeEmbed)
                });
            } else {
                let embedColor = '#FF0000' // color: red, change the hex for different color
                let deniedembed = new Discord.MessageEmbed()
                    .setTitle(`❌Error`)
                    .setDescription(`This bot doesnt belong to you!`)
                    .addField("required:", "bot developers", false)
                    .setColor(embedColor)
                return message.reply(deniedembed).then(msg => msg.delete(10000)).then(() =>
                    console.log(`${message.author.username} have been trying to access command exec`));
            }
        }
}

