require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const config = require("@root/config.json");
const signale = require('signale');

module.exports = {
    name: "nowplaying",
    description: "Now playing",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {
		await interaction.deferReply();

        const VoiceChannel = interaction.member.voice.channel;
        const queue = client.distube.getQueue(VoiceChannel)        

        const noVoice = new MessageEmbed()
              .setColor('#ff0000')
                .setTitle('<a:crossmark:1011568778942885909> Error')
                .setDescription('Ya need to be in a voice channel so i can play music for you!')
                .setFooter({ text: 'Dweeber >> nowplaying'});

        const differentVoice = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('<a:crossmark:1011568778942885909> Error')
                .setDescription('Ya need to be in the same voice channel as me so i can play music for you!')
                .setFooter({ text: 'Dweeber >> nowplaying'});

        const noqueue = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('<a:crossmark:1011568778942885909> Error')
                .setDescription('There is no music on right now! Please run \`/play\` to play some music!')
                .setFooter({ text: 'Dweeber >> queue'});

        if(!VoiceChannel) return interaction.followUp({embeds: [noVoice]});

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.followUp({embeds: [differentVoice]});

        if (!queue) return interaction.followUp({embeds: [noqueue]});

        if (!queue && !client.distube.isPlaying(VoiceChannel)) return interaction.followUp({embeds: [noqueue]});

        const song = queue.songs[0]
        const name = song.name
        const tn = song.thumbnail
        const link = song.url
        const volume = queue.volume
        const current = queue.formattedCurrentTime
        const guild = interaction.guild
        const Target = interaction.member;

        try {

        const Nowplayingembed = new MessageEmbed()
        .setColor("RANDOM")
        .addFields(
            { name: '<:bloblistening:991504183368888361> Currently Playing:', value: `[${name}](${link}) - \`${song.formattedDuration}\``, inline: true },
            { name: '<:channels:1012863952302112938> In Channel:', value: `<#${guild.me.voice.channelId}>`, inline: true },
            { name: '<:5257membericon:989442572642562058> Requested By:', value: `${song.user}`, inline: true },
            { name: '<a:volume:1011851449229131866> Volume', value: `${volume}%`, inline: true },
            { name: '<a:looping:1011853938942808164> Loop:', value: `${queue.repeatMode ? queue.repeatMode === 2 ? '`All Queue`' : '`All Song`' : '`Off`'}`, inline: true },
            { name: '<:send:1012988250752823346> Playback:', value: `\`${current}\` - \`${song.formattedDuration}\``, inline: true },
            { name: '🤖 Autoplay:', value: `\`${queue.autoplay ? 'On' : 'Off'}\``, inline: true },
            { name: '<a:equalizer:1011875478983946361> Filters:', value: `\`${queue.filters.join(", ") || "Off"}\``, inline: true },
        )
        
        .setFooter("Dweeber >> nowplaying")
        .setThumbnail(`${tn}`)

        interaction.followUp({embeds: [Nowplayingembed]})
        
        }   catch (err) {
            interaction.followUp(`There is an error. Please try again later.`);
            signale.error(err)

          } 


	
	}
};