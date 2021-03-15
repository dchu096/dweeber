const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class lockCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'lock',
            group: 'channels',
            memberName: 'lock',
            description: 'locks a specific channel',
            clientPermissions: [
                'MANAGE_CHANNELS'
            ],
            userPermissions: [
                'MANAGE_CHANNELS'
            ],

            guildOnly: true,

        });
    }
    async run(msg) {

        let lChannel = msg.mentions.channels.first() || msg.channel;

        //messages
        msg.delete()

        let id = msg.guild.roles.everyone;

        let ow = msg.channel.permissionOverwrites.get(id); // get the permissionOverwrites fro that role

        if (ow && ow.SEND_MESSAGES === false) msg.channel.send("The channel is already locked.");

        else { // otherwise, lock it

            await lChannel.updateOverwrite(lChannel.guild.roles.everyone, {SEND_MESSAGES: false});

            let lockedEmbed = new Discord.MessageEmbed()
                .setTitle("🔒Channel locked")
                .setDescription(`This channel have been locked by ${msg.author.tag}`)
            await lChannel.send(lockedEmbed)
        }



        let lockEmbed = new Discord.MessageEmbed()
            .setTitle("✅Success")
            .setDescription(`${lChannel} has been locked`)
        await msg.channel.send(lockEmbed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});


    }
}
