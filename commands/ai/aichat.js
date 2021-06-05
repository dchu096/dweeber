const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const { MessageEmbed, MessageAttachment } = require('discord.js')
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
const fetch = require('node-fetch')
const {SRAapi} = require("../../botconfig.json");

module.exports = class aichatCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'aichat',
            aliases: ['chat', 'ai'],
            group: 'ai',
            memberName: 'aichat',
            description: 'AI chat',
            args: [
                {
                    key: 'sMESSAGE',
                    prompt:
                        'Whats the message you want to chat?',
                    type: 'string'
                }
            ]
        });
    }


    async run(message, {sMESSAGE}) {
        
        const userID = message.author.id

        const embedColor = '#87CEEB'; // color: skyblue

        const errorEmoji = '<a:ag_exc:781410611366985748>';
        const successEmoji = '<a:ag_tickop:781395575962599445>';
        const loadingEmoji = '<a:ag_loading:781410654841077780>';

        const { response } = await fetch(`https://some-random-api.ml/chatbot?message=` + encodeURIComponent(sMESSAGE) + `&key=${SRAapi}&uid=${userID}`).then(response => response.json());

        let responseEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setDescription(response)

        message.channel.send(responseEmbed).catch(`${errorEmoji}An error occured!`);

    }


    }
