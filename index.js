const { Client, Collection, Interaction, MessageEmbed, ActivityType } = require('discord.js');
const { TOKEN, OPENAIKEY } = require("./config.json");
const client = new Client({intents: 131071}); //Intents choose what you want as currently its everything, https://ziad87.net/intents/
const signale = require('signale');
const config = require(`./config.json`);
const Enmap = require("enmap");
const libsodium = require("libsodium-wrappers");
const ffmpeg = require("ffmpeg-static");
const voice = require("@discordjs/voice");
const https = require('https-proxy-agent');
const fs = require('fs');
const DisTube = require('distube').default
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { SpotifyPlugin } = require('@distube/spotify')
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { Configuration, OpenAIApi } = require("openai");
const { GiveawaysManager } = require('discord-giveaways');


//Database Connect
(async () => {
  await require("./Database/connect")();
})();

const configuration = new Configuration({
  apiKey: OPENAIKEY,
});

client.openai = new OpenAIApi(configuration);


const proxy = 'http://0.0.0.0:8443';
const agent = https(proxy);


client.commands = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.settings = new Collection()
client.config = require('./config.json')
client.maps = new Map();

module.exports = client;

["Event", "Slash"].forEach(handler => {
  require(`./Structures/${handler}`)(client);
});

const manager = new GiveawaysManager(client, {
  storage: './giveaways.json',
  default: {
      botsCanWin: false,
      embedColor: 'RANDOM',
      embedColorEnd: '#000000',
      reaction: '<:6323partyicon:989442575867994162>',
  }
});

client.giveawaysManager = manager;


client.distube = new DisTube(client, {
  searchSongs: 5,
  searchCooldown: 30,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  youtubeDL: false,
  nsfw: false,
  plugins: [new SoundCloudPlugin(), new SpotifyPlugin(), new YtDlpPlugin({updateYouTubeDL: true})]
})

const NoUser2 = new MessageEmbed()
    .setColor("#30B700")
    .setTitle("<a:crossmark:1011568778942885909> Music stopped!")
    .setDescription(`You all left the voice channel. me will leave too!`)
    .setFooter({ text: 'Dweeber >> Music'})

    const SongsFinnished = new MessageEmbed()
    .setColor("#30B700")
    .setTitle("<a:crossmark:1011568778942885909> Music stopped!")
    .setDescription(`This is the last song in the playlist. I will go ahead and stop the music for ya.`)
    .setFooter({ text: 'Dweeber >> Music'})

    const NoResultFound = new MessageEmbed()
    .setColor("#30B700")
    .setTitle("<a:crossmark:1011568778942885909> Music stopped!")
    .setDescription(`I didnt found any result for your query.`)
    .setFooter({ text: 'Dweeber >> Music'})

    const errorembed = new MessageEmbed()
    .setColor("#30B700")
    .setDescription(`There is an error. Please try again later.`)
    .setFooter({ text: 'Dweeber >> Music'})

client.distube
    .on('playSong', (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
  .setColor("RANDOM")
  .setTitle(`<:bloblistening:991504183368888361> Now playing: \`${song.name}\``)
  .setDescription(``)
  .addFields(
		{ name: '<a:hourglass_animated:1011874607592124416> Song duration', value: `\`${song.formattedDuration}\``, inline: true },
		{ name: '<a:volume:1011851449229131866> Queue volume', value: `\`${queue.volume}%\``, inline: true },
    { name: '<a:equalizer:1011875478983946361> Filter status', value: `\`${queue.filters.join(", ") || "Off"}\``, inline: true },
    { name: '<a:musicdisc:1013688284867735592> Total Queue:', value: `${queue.songs.length}`, inline: true },
    { name: '<:5257membericon:989442572642562058> Requested by', value: `${song.user}`, inline: true },
		{ name: '<a:looping:1011853938942808164> Repeat mode', value: `\`${queue.repeatMode ? queue.repeatMode === 2 ? '`All Queue`' : '`All Song`' : '`Off`'}\``, inline: true },
	)
  .setFooter({ text: 'Dweeber >> Play'})
]}))
    .on('addSong', (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`<a:tick:991178421113733130> Added \`${song.name}\` to the queue.`)
  .addFields(
		{ name: 'Duration:', value: `${song.formattedDuration}`, inline: true },
		{ name: 'Requested by:', value: `${song.user}`, inline: true },
	)
  .setFooter({ text: 'Dweeber >> Play'})
]}))
    .on('addList', (queue, playlist) =>
        queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`<a:tick:991178421113733130> Added \`${playlist.name}\` playlist (${playlist.songs.length})`)
    .setFooter({ text: 'Dweeber >> Play'})
]}))
    .on('searchNoResult', (message) => message.channel.send({embeds: [NoResultFound]}))
    .on('error', (textChannel, e) => {
        textChannel.send({embeds: [errorembed]})
    client.channels.cache.get('735548363340251207').send(`${e}`);
})
  .on('finish', queue => queue.textChannel.send({embeds: [SongsFinnished]}))
    .on('empty', queue => queue.textChannel.send({embeds: [NoUser2]}))



client.once("ready", () => {
  require("./dashboard/index.js")(client);
  console.log(`====================================================================================`)
  console.log(`    :::::::::  :::       ::: :::::::::: :::::::::: :::::::::  :::::::::: :::::::::  `)
  console.log(`    :+:    :+: :+:       :+: :+:        :+:        :+:    :+: :+:        :+:    :+: `)
  console.log(`   +:+    +:+ +:+       +:+ +:+        +:+        +:+    +:+ +:+        +:+    +:+  `)
  console.log(`  +#+    +:+ +#+  +:+  +#+ +#++:++#   +#++:++#   +#++:++#+  +#++:++#   +#++:++#:    `)
  console.log(` +#+    +#+ +#+ +#+#+ +#+ +#+        +#+        +#+    +#+ +#+        +#+    +#+    `)
  console.log(`#+#    #+#  #+#+# #+#+#  #+#        #+#        #+#    #+# #+#        #+#    #+#     `)
  console.log(`#########    ###   ###   ########## ########## #########  ########## ###    ###     `)
  console.log(`====================================================================================`)

  signale.pending(`Authenticating with Discord gateway, please wait`)

  signale.success(`${client.user.username} is online, if theres any error message it will be below this message`)

  console.log(`Current stats: ${client.users.cache.size} users and ${client.guilds.cache.size} servers.`);

  console.log(`====================================================================================`)

  client.channels.cache.get('1013645706935935036').send({content: 'The bot is now started!'})

  client.user.setPresence({
    activities: [{ name: `V2 | dweeber.dev`, type: "WATCHING" }],
    status: 'online',
  }); //Set the activity of the bot
});

process.on('unhandledRejection', (err, message) => {
  signale.fatal(`[ERROR] Unhandled promise rejection: ${err.message}.`);
  
  const errEmbed = new MessageEmbed()
  .setColor("#FF0000")
  .setTitle("Error")
  .setDescription(`${err.message}`)
  .setFooter({ text: 'Dweeber >> Error'})

  client.channels.cache.get('989310134423531561').send({content: '<@!658186843963260929>', embeds: [errEmbed]})

  });
  
  client.login(TOKEN);
  