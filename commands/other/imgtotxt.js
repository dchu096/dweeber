require('module-alias/register')
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {Signale} = require('signale');
const { ImgToTextAPI } = require("@root/botconfig.json")
module.exports = {
    config: {
        name: "imgtotxt",
        description: "Fetch words from a image",
        usage: "<Attchment>",
        category: "other",
        accessableby: "Members",
        aliases: ["imagetotext"]
    },
    run: async (bot, message, args) => {

        if(!message.attachments) {
            message.channel.send("No attachment found in your message")
        }

        const embedColor = '#87CEEB'; // color: skyblue
        const signale = new Signale();

        await fetch(`https://api.apilayer.com/image_to_text/url?url=${message.attachments.first()?.url}&apikey=${ImgToTextAPI}`).then(res => res.json()).then(json => {
            
            const colorEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Text from image`)
            .setDescription(`${json.all_text}`)
            .addField("Language:", `${json.lang}`)
            .setFooter({ text: 'Dweeber >> ImgToText'});


        message.channel.send({ embeds: [colorEmbed] }).catch((err) => {
            signale.error(err)

        });
        });

       

    }

}
