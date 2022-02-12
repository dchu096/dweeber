const Discord = require('discord.js');


module.exports = {
    config: {
        name: "lock",
        description: "lockdown the channel",
        usage: "[channel]",
        category: "channels",
        accessableby: "Moderators",
    },

    run: async (message) => {

        const embedColor = '#87CEEB'; // color: skyblue


        let lChannel = msg.mentions.channels.first() || msg.channel;

        //messages
        msg.delete()

        let id = msg.guild.roles.everyone;

        let ow = msg.channel.permissionOverwrites.get(id); // get the permissionOverwrites fro that role

        if (ow && ow.SEND_MESSAGES === false) msg.channel.send(`${message.client.emotes.error} The channel is already locked.`);

        else { // otherwise, lock it

            await lChannel.updateOverwrite(lChannel.guild.roles.everyone, {SEND_MESSAGES: false});

            let lockedEmbed = new Discord.MessageEmbed()
                .setTitle("🔒Channel locked")
                .setDescription(`This channel have been locked by ${msg.author.tag}`)
            await lChannel.send(lockedEmbed)
        }



        let lockEmbed = new Discord.MessageEmbed()
            .setTitle(`${message.client.emotes.success} Success`)
            .setDescription(`${lChannel} has been locked`)
        await msg.channel.send(lockEmbed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});


    }
}

