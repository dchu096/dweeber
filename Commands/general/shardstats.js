require('module-alias/register')
const { MessageEmbed, Message } = require('discord.js');
const signale = require('signale');

module.exports = {
    name: "shardstats",
    description: "Show the stats of the bot shards",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
	async run(client, interaction) {

        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        try {

            client.shard.broadcastEval(client => [client.shard.ids, client.ws.status, client.ws.ping, client.guilds.cache.size])
            .then((results) =>{
                const embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`📡 Total shards: (${interaction.client.shard.count})`)
                    .setFooter({ text: 'Dweeber >> shardstats'})
                    
                
                results.map((data) => {
                    embed.addFields({ name: `Shard ${data[0]}`, value: `**ID:** \`[ ${data[1]} ]\` | **Ping:** \`[ ${data[2]}ms ]\` | **Guilds:** \`[ ${data[3]} ]\``, inline: false})
                });
                interaction.reply({ embeds: [embed] });
            })
            
        } catch (err) {
        interaction.reply(`There is an error. Please try again later.`);
        signale.fatal(err)
    }
            
	}
};



// discord-logs


// https://www.npmjs.com/package/discord-temp-channels







