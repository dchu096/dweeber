const {Client, Collection } = require("discord.js");
const Discord = require('discord.js');
const { token } = require("./botconfig.json");
const bot = new Discord.Client(); // Create the bot client.

const MusicBot = require('discord-music-system'); // Require the best package ever created on NPM (= require discord-music-system)

const client = new MusicBot({
    botPrefix: '^2', // Example: !
    ytApiKey: 'YT API', //
    botClient: bot // Your Discord client. Here we're using discord.js so it's the Discord.Client()
});

const afk = require("afk-cord")

const afkcord = new afk("wio.db") // You Have 2 Choices For Database!(wio.db Uses JSON,quick.db Uses SQLITE)

const minigames = require('@superphantomuser/discordjs-minigames'); //define the minigame package

const config = require('./botconfig.json');

const fs = require('fs');

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));


bot.on('guildMemberAdd', async member => {

    let wChan = bot.channels.cache.get('617994627810721824')

    if(wChan == null) return;

    if(!wChan) return;

    let welcomeEmbed = new Discord.MessageEmbed()
        .setTitle(`welcome ${member.user.tag} to MEmu Discord!`)
        .setDescription("Welcome to the MEmu community!")
        .addField("Rules:", "We setup a server rules at <#790489245193732127> to maintain behaviour in server, please read so you dont break them!", false)
        .addField("Roles:", " A lot of channels in this server requires a role to be assigned. get to <#786798319992307763> to get yourself some!", false)
        .addField("channels:", "channels have been setup to help easier. so please do post in the correct channels so we can troubleshoot faster!", false)
        .setFooter("As long as you follow, then welcome!")

        try {
            wChan.send(welcomeEmbed) //Send the image to the channel
        } catch (e) {
           console.log(e)
        }
    })

bot.on('message', message => { // When the bot receive a message
    client.onMessage(message)
});


bot.on("message", message => {
    if (message.content === "^2afk") {
        let reason = 'setAFK' // somehow define the reason(like args etc)
        afkcord.options({notafkmsg: "You Are Not AFK Anymore!", afkmsg: "You Are AFK Now!"}) // notafkmsg = The Message The Bot Will Send When The User Is Not AFK Anymore!,afkmsg = The Message That Bot Will Send When AFK Command Is Used!
        afkcord.afk(client, msg.author.id, reason, msg.channel.id)
        message.channel.send("You are now set AFK. Type any message to remove")
    }
});




bot.login(token);
