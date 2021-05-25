const Discord = require('discord.js');

module.exports = (bot, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${message.client.emotes.error} - There is no music being played on this server!`);
            break;
        case 'NotConnected':
            message.channel.send(`${message.client.emotes.error} - Please join a voice channel to enjoy the music!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${message.client.emotes.error} - I am not able to join your voice channel, do I have adequate permissions?`);
            break;
        case 'VideoUnavailable':
            message.channel.send(`${message.client.emotes.error} - ${args[0].title} is not available in your country! Skipping...`);
            break;
        case 'MusicStarting':
            message.channel.send(`The music is starting... please wait and retry!`);
            break;
        default:
            message.channel.send(`${message.client.emotes.error} - Something went wrong ... Error : ${error} please report this to the Support Server :pray:`);
    };
};
