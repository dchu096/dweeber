const { MessageEmbed } = require('discord.js');




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


        let lChannel = message.mentions.channels.first() || message.channel;

        //messages
        message.delete()

        let id = message.guild.roles.everyone;

        let ow = message.channel.permissionOverwrites.get(id); // get the permissionOverwrites fro that role

        if (ow && ow.SEND_MESSAGES === false) message.channel.send(`${message.client.emotes.error} The channel is already locked.`);

        else { // otherwise, lock it

            await lChannel.updateOverwrite(lChannel.guild.roles.everyone, {SEND_MESSAGES: false});

            let lockedEmbed = new MessageEmbed()
                .setTitle("🔒Channel locked")
                .setColor("FF0000")
                .setDescription(`This channel have been locked by ${message.author.tag}`)
            await lChannel.send({ embeds: [lockedEmbed] })
        }



        let lockEmbed = new MessageEmbed()
            .setTitle(`${message.client.emotes.success} Success`)
            .setDescription(`${lChannel} has been locked`)
        await message.channel.send({ embeds: [lockEmbed] }).then(message => message.delete({timeout: 5000})).catch((err) => {
            signale.error(err)
        });


    }
}

