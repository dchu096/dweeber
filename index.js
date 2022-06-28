const { Client, Collection } = require('discord.js');
const { TOKEN } = require("./config.json");
const client = new Client({intents: 131071}); //Intents choose what you want as currently its everything, https://ziad87.net/intents/
const signale = require('signale');
const config = require(`./config.json`);
const filters = require(`./filters.json`);
const Enmap = require("enmap");
const libsodium = require("libsodium-wrappers");
const ffmpeg = require("ffmpeg-static");
const voice = require("@discordjs/voice");
const DisTube = require("distube").default;
const https = require('https-proxy-agent');


//Database Connect
(async () => {
  await require("./Database/connect")();
})();

const proxy = 'http://0.0.0.0:8443';
const agent = https(proxy);
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp")
let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
}
if(config.spotify_api.enabled){
  spotifyoptions.api = {
    clientId: config.spotify_api.clientId,
    clientSecret: config.spotify_api.clientSecret,
  }
}
client.distube = new DisTube(client, {
  emitNewSongOnly: false,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  savePreviousSongs: true,
  emitAddSongWhenCreatingQueue: false,
  //emitAddListWhenCreatingQueue: false,
  searchSongs: 0,
  // youtubeCookie: config.youtubeCookie,     //Comment this line if you dont want to use a youtube Cookie 
  nsfw: false, //Set it to false if u want to disable nsfw songs
  emptyCooldown: 25,
  ytdlOptions: {
    requestOptions: {
      agent
    },
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 4,
  },
  youtubeDL: false,
  updateYouTubeDL: false,
  customFilters: filters,
  plugins: [
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})


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

    client.user.setActivity(`V2 | dweeber.dev`, { type: "WATCHING"}) //Set the activity of the bot
});

process.on('unhandledRejection', err => {
  signale.fatal(`[ERROR] Unhandled promise rejection: ${err.message}.`);
    console.log(err)
  });
  
  client.login(TOKEN);
  