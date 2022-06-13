require('module-alias/register')
const { MessageEmbed } = require('discord.js');
const signale = require('signale');

module.exports = {
    name: "buy",
    description: "Buy a item from the shop",
    clientPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'],

	async run(client, interaction) {

        try {

            let userBalance = client.eco.fetchMoney(message.author.id);
            if (userBalance.amount < 1) return message.channel.send("Looks like you are poor.");
            let item = args[0];
            if (!item) return message.channel.send("What are you trying to buy?");
            let hasItem = client.shop[item.toLowerCase()];
            if (!hasItem || hasItem == undefined) return message.reply("That item doesnt exists lol");
            let isBalanceEnough = (userBalance.amount >= hasItem.cost);
            if (!isBalanceEnough) return message.reply("Your balance is insufficient. You need :dollar: "+hasItem.cost+" to buy this item.");
            let buy = client.eco.removeMoney(message.author.id, hasItem.cost);
            
            let itemStruct = {
              name: item.toLowerCase(),
              prize: hasItem.cost
            };
            
            client.db.push(`items_${message.author.id}`, itemStruct);
            return message.channel.send(`You purchased **${item}** for **:dollar: ${hasItem.cost}**.`);



        } catch (err) {
        interaction.followUp(`There is an error. Please try again later.`);
        signale.fatal(err)
        }
        
	}
};

