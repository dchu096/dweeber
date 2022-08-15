const { ShardingManager } = require('discord.js');
const signale = require('signale');

const config = require('./config.json');

let manager = new ShardingManager('./index.js', {
    token: config.TOKEN,
    totalShards: 'auto',
});

    console.log(`====================================================================================`)
    signale.pending("Waking up the shards...")

manager.on('shardCreate', shard => {
    signale.success(`Shard ${shard.id} has launched!`);
});

    console.log(`====================================================================================`)

manager.spawn();