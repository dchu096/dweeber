require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const signale = require('signale');
const fetch = require('node-fetch');
const { musicAPI } = require("@root/config.json");


module.exports = {
    name: "lyrics",
    description: "Get the lyrics of the song playing",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "song",
            description: "The song you want to get the lyrics of",
            type: 'STRING',
            required: true,
        },
        {
            name: "artist",
            description: "The artist of the song you want to get the lyrics of",
            type: 'STRING',
            required: true,
        },

    ],
	async run(client, interaction) {
		await interaction.deferReply();

        const VoiceChannel = interaction.member.voice.channel;

        const songinput = interaction.options.getString('song');

        const artistname = interaction.options.getString('artist');

        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        try {

            const queue = client.distube.getQueue(VoiceChannel)

        const stopEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Searching...`)
            .setDescription(`<a:loading:986418430360047616> Searching lyrics for ${songinput}...`)
            .setFooter({ text: 'Dweeber >> lyrics'});

            interaction.followUp({embeds: [stopEmbed]});


        await fetch(`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${songinput}&q_artist=${artistname}&apikey=${musicAPI}`).then(res => res.json()).then(json => {
            
            const lyricsEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Lyrics`)
            .setDescription(`ID: ${json.body.lyrics[0].lyrics_id}`)
            .addField('Disclaimer', `${json.lyrics_copyright}`)
            .addField('Lyrics', trim(`${json.body.lyrics[0].lyrics_body}`, 1024))
            .setFooter({ text: 'Dweeber >> lyrics'});
             return interaction.followUp({ embeds: [lyricsEmbed] });
        });


            
        
        
        }   catch (err) {
                signale.error(err)
                interaction.followUp(`The lyrics of the song ${songinput} could not be found, or there is an error. Please try again later.`);
          } 


	
	}
};