const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const { MessageEmbed, MessageAttachment } = require('discord.js')
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
const fetch = require('node-fetch')
const {SRAapi} = require("../../botconfig.json");

module.exports = class whaleCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'whale',
            group: 'facts',
            memberName: 'whale',
            description: 'A image of whale and a fact'
        });
    }


    async run(message, {sMESSAGE}) {

        const embedColor = '#87CEEB'; // color: skyblue

        const errorEmoji = '<a:ag_exc:781410611366985748>';
        const successEmoji = '<a:ag_tickop:781395575962599445>';
        const loadingEmoji = '<a:ag_loading:781410654841077780>';

        const { fact, image } = await fetch(`https://some-random-api.ml/facts/whale?key=${SRAapi}`).then(response => response.json()).catch(`${errorEmoji}An error occured!`);

        let responseEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setDescription(fact)

        message.channel.send(responseEmbed).catch(`${errorEmoji}An error occured!`);

    }


}