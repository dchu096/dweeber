require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signale = require('signale');
const { SRAAPI } = require("@root/config.json");

module.exports = {
    name: "mcstats",
    description: "Show a Minecraft server's stats",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
    options: [
        {
            name: "ip",
            description: "The IP of the server",
            type: 'STRING',
            required: true,
        },
    ],
	async run(client, interaction) {

        await interaction.deferReply();
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        const serverip = interaction.options.getString('ip');

        try {
        
            await fetch(`https://api.mcsrvstat.us/2/${serverip}`).then(res => res.json()).then(json => {
            

                if (json.online === true) onlineMode = '🟢 Online';
                if (json.online === false) onlineMode = '🔴 Offline';

                const statusEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`MC server stats | ${onlineMode}`)
                .setDescription(`MC server status for ${json.ip} running on port ${json.port}`)
                .addField('Server Status', `Pingable: ${json.debug.ping} | Query enabled: ${json.debug.query} | srv record: ${json.debug.srv} | IP in SRV record: ${json.debug.ipinsrv} | CNAME in SRV record: ${json.debug.cnameinsrv} `, true)
                .addField('Server Info 2', `Query mismatch: ${json.debug.querymismatch} | Animated MOTD: ${json.debug.animatedmotd} | Cachetime: ${json.debug.cachetime} | API Version: ${json.debug.apiversion}`, true)

                .setFooter({ text: 'Dweeber >> mcstats'});

                
            if (!json.motd.clean[0] === null) {
                statusEmbed.addField(`MOTD:`, `\`\`\`${json.motd.clean[0]}\`\`\``, false)
            }

            if (!json.players.online === null) {
                statusEmbed.addField(`Players:`, `\`\`\`${json.players.online}/${json.players.max}\`\`\``, false)
            }

            if (!json.version === null) {
                statusEmbed.addField(`Version:`, `${json.version}`)
            }

            if (!json.software === null) {
                statusEmbed.addField(`Software`, `${json.software}`)
            }

                
                
                
                
                
                
                

                return interaction.followUp({ embeds: [statusEmbed] });
                 
            });
        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
    }


            
	}
};

