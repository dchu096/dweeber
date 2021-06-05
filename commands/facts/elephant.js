const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const { MessageEmbed, MessageAttachment } = require('discord.js')
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
const fetch = require('node-fetch')
const {SRAapi} = require("../../botconfig.json");

module.exports = class elephantCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'elephant',
            aliases: ['elephants'],
            group: 'facts',
            memberName: 'elephant',
            description: 'A fact of elephant'
        });
    }


    async run(message, {sMESSAGE}) {

        const embedColor = '#87CEEB'; // color: skyblue

        const errorEmoji = '<a:ag_exc:781410611366985748>';
        const successEmoji = '<a:ag_tickop:781395575962599445>';
        const loadingEmoji = '<a:ag_loading:781410654841077780>';

        const { fact, image } = await fetch(`https://some-random-api.ml/facts/elephant?key=${SRAapi}`).then(response => response.json());

        let responseEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setDescription(fact)
            .setImage(image)

        message.channel.send(responseEmbed).catch(`${errorEmoji}An error occured!`);

    }


}