const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class unlockCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'unlock',
            group: 'channels',
            memberName: 'unlock',
            description: 'unlocks a specific channel',
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
        
         const embedColor = '#87CEEB'; // color: skyblue
        
                const errorEmoji = '<a:ag_exc:781410611366985748>';
        const successEmoji = '<a:ag_tickop:781395575962599445>';
        const loadingEmoji = '<a:ag_loading:781410654841077780>';


        let lockchannel = msg.channel


        msg.delete()

        let id = msg.guild.roles.everyone;

        let ow = msg.channel.permissionOverwrites.get(id); // get the permissionOverwrites fro that role

        if (ow && ow.SEND_MESSAGES === true) msg.channel.send(`${errorEmoji} The channel is not locked.`);

        else { // otherwise, unlock it

            await lockchannel.updateOverwrite(lockchannel.guild.roles.everyone, {SEND_MESSAGES: true});

            let lockedEmbed = new Discord.MessageEmbed()
                .setTitle("🔓Channel unlocked")
                .setDescription(`This channel have been locked by ${msg.author.tag}`)
            await msg.channel.send(lockedEmbed)
        }



        let lockEmbed = new Discord.MessageEmbed()
            .setTitle(`${successEmoji} Success`)
            .setDescription(`${lockchannel} has been unlocked`)
        await msg.channel.send(lockEmbed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});



    }
}
