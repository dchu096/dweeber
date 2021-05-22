const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class kickCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'kicks a specific user',
            clientPermissions: [
                'KICK_MEMBERS'
            ],
            userPermissions: [
                'KICK_MEMBERS'
            ],

            args: [
                {
                    key: 'kMember',
                    prompt:
                        'Please mention the user you want to kick with @ or provide his ID',
                    type: 'string'
                },

                {
                    key: 'reasoning',
                    prompt:
                        'Please provide a reason',
                    type: 'string',
                    default: 'no reason provided!'
                }
            ],

            guildOnly: true,

        });
    }
    async run(msg, {kMember, reasoning}) {
        
           const embedColor = '#87CEEB'; // color: skyblue
        
        const errorEmoji = '<a:ag_exc:781410611366985748>';
        const successEmoji = '<a:ag_tickop:781395575962599445>';
        const loadingEmoji = '<a:ag_loading:781410654841077780>';

        let kicked = msg.mentions.members.first() || msg.guild.members.cache.get(kMember);

        // MESSAGES

        if (!kicked)
            return msg.channel.send(`${errorEmoji} You must provide a valid user`);


        msg.delete()

        if(msg.guild.member(kicked)) {

            let kickembed = new Discord.MessageEmbed()
            .setColor(embedColor)
                .setAuthor(msg.author.username, msg.author.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 1024
                }))
                .setTitle(`You've been kicked in ${msg.guild.name}`)
                .addField('Kicked by', msg.author.tag)
                .addField('Reason', reasoning)
                .setTimestamp();
            kicked.send(kickembed).catch(O_o => {});


            msg.guild.member(kicked).kick(reasoning).then(msg.channel.send(`${kicked} have been kicked.`)).catch(O_o => {});

            //modlogs
            let doneembed = new Discord.MessageEmbed()
                .setTitle(`Moderation: Kick`)
                .setDescription(`${kicked.user.tag} has been kicked by ${msg.author.tag} because of ${reasoning}`)
            let sChannel = msg.guild.channels.cache.find(c => c.name === "shame-stream")
            sChannel.send(doneembed).catch(O_o => {});
        } else {
            let kickedEmbed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("This user is not in this server!")
        }



    }
}


