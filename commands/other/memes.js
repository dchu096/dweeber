const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const got = require('got');

module.exports = class memesCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'memes',
            aliases: ['meme'],
            group: 'other',
            memberName: 'memes',
            description: 'Show a popular memes on reddit',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],

            guildOnly: true,

        });
    }



	async run(message) {

        const embedColor = '#87CEEB'; // color: skyblue

		const embed = new Discord.MessageEmbed();
	got('https://www.reddit.com/r/memes/random/.json')
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;

			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor('RANDOM');
			embed.setImage(memeImage);
			embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

			message.channel.send(embed);
		})
		.catch(console.error);

       
    }
};