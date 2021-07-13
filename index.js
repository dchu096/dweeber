const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const Discord = require("discord.js");
const {Collection} = require("discord.js");
const {config, prefix, token, owner, YTAPI } = require("./botconfig.json");

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: owner,
    invite: '',
});



client.registry
    .registerGroups([
        ['admins', 'Commands for admins'],
        ['channels', 'Channel commands'],
        ['info', 'informational commands'],
        ['roles', 'roles commands'],
        ['moderation', 'Moderation commands'],
        ['music', 'music system (cannot be disabled)'],
        ['other', 'random commands'],
        ['owner', 'owner specific commands'],

    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));


    ["console", "event"].forEach(x => require(`./handlers/${x}`)(client));


const MusicBot = require('discord-music-system'); // Require the best package ever created on NPM (= require discord-music-system)

const bot = new MusicBot({
    botPrefix: prefix, // Example: !
    ytApiKey: YTAPI, //
    botClient: client // Your Discord client. Here we're using discord.js so it's the Discord.Client()
});

const afk = require("afk-cord")

const afkcord = new afk("wio.db") // You Have 2 Choices For Database!(wio.db Uses JSON,quick.db Uses SQLITE)

const minigames = require('@superphantomuser/discordjs-minigames'); //define the minigame package

const fs = require('fs');


client.on('guildMemberAdd', async member => {

    let wChan = client.channels.cache.get('617994627810721824')

    if(wChan == null) return;

    if(!wChan) return;

    let welcomeEmbed = new Discord.MessageEmbed()
        .setTitle(`welcome ${member.user.tag} to MEmu Discord!`)
        .setDescription("Welcome to the MEmu community!")
        .addField("Rules:", "We have some server rules at <#790489245193732127> to maintain behaviour in server, please read so you dont break them!", false)
        .addField("Roles:", " A lot of channels in this server require a role to be assigned. Go to <#786798319992307763> to get yourself some!", false)
        .addField("channels:", "channels have been setup to help easier. so please do post in the correct channels so we can troubleshoot faster!", false)
        .setFooter("As long as you follow, then welcome!")

        try {
            wChan.send(welcomeEmbed) //Send the image to the channel
        } catch (e) {
           console.log(e)
        }
    })

client.on('message', message => { // When the bot receive a message
    bot.onMessage(message)
});


client.on("message", message => {
    if (message.content === "^2afk") {
        let reason = 'setAFK' // somehow define the reason(like args etc)
        afkcord.options({notafkmsg: "You Are Not AFK Anymore!", afkmsg: "You Are AFK Now!"}) // notafkmsg = The Message The Bot Will Send When The User Is Not AFK Anymore!,afkmsg = The Message That Bot Will Send When AFK Command Is Used!
        afkcord.afk(client, msg.author.id, reason, msg.channel.id)
        message.channel.send("You are now set AFK. Type any message to remove")
    }
});




client.login(token);
