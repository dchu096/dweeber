const Discord = require('discord.js');
const { MessageEmbed, MessageAttachment } = require('discord.js')
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
const axios = require('axios').default;
const SRAapi = require("../../botconfig.json")
const db = require("quick.db");
const { Signale } = require('signale');

const logger = new Signale({ scope: 'Discord' });

module.exports = {
    config: {
        name: "ai",
        description: "chat with the ai",
        usage: "dwbr ai [msg]",
        category: "ai",
        accessableby: "everyone",
        aliases: ["aichat"]
    },


    run: async (client, message, args) => {

        let user = db.get(`blacklist_${message.author}`);

        let blacklistedembed = new Discord.MessageEmbed()
            .setTitle(`User blacklisted`)
            .setDescription(`${message.client.emotes.error} You are not allowed to run any commands while you are blacklisted!`)
        if(user == true) return message.channel.send(blacklistedembed)
        else {
            const key = SRAapi

            const userID = message.author.id

            const embedColor = '#87CEEB'; // color: skyblue

            const { response } = await axios.get(`https://some-random-api.ml/chatbot?message=` + encodeURIComponent(sMESSAGE) + `&key=${key}&uid=${userID}`).then(response => response.json());

            let responseEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setDescription(response)

            message.channel.send(responseEmbed).catch((err) => {
                message.reply(`${message.client.emotes.error} An error occured!`).then(() => {
                    console.log(err).then(logger.error(`An error occured in ${message.guild.name} using command aichat`))
                });

            });
        }

    }
}
