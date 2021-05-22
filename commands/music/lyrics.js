const Commando = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Pagination = require('discord-paginationembed');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { geniusLyricsAPI } = require('../../botconfig.json');

// Skips loading if not found in config.json
if (!geniusLyricsAPI) return;

module.exports = class lyricsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'lyrics',
      memberName: 'lyrics',
      aliases: ['lr'],
      group: 'music',
      description:
        'Get lyrics of any song or the lyrics of the currently playing song!',
      throttling: {
        usages: 1,
        duration: 10
      },
      clientPermissions: [
        'MANAGE_MESSAGES'
    ],
    userPermissions: [
        'VIEW_CHANNEL'
    ],
      args: [
        {
          key: 'songName',
          default: '',
          type: 'string',
          prompt: ':mag: What song lyrics would you like to get?'
        }
      ]
    });
  }
  async run(message, { songName }) {

    const track = message.client.player.nowPlaying(message);

        const embedColor = '#87CEEB'; // color: skyblue

    if (
      songName == '' &&
      message.client.player.getQueue(message)
    ) {
      songName = track.title;
    } else if (songName == '' && !message.client.player.getQueue(message)) {
      message.reply(
        `${message.client.emotes.error} There is no song playing!`
      );
      return;
    }

    const sentMessage = await message.channel.send(
      `${message.client.emotes.loading} Searching for lyrics!`
    );

    try {
      const url = await lyricsCommand.searchSong(
        lyricsCommand.cleanSongName(songName)
      );
      const songPageURL = await lyricsCommand.getSongPageURL(url);
      const lyrics = await lyricsCommand.getLyrics(songPageURL);

      const lyricsIndex = Math.round(lyrics.length / 2048) + 1;
      const lyricsArray = [];

      for (let i = 1; i <= lyricsIndex; ++i) {
        let b = i - 1;
        lyricsArray.push(
          new MessageEmbed()
            .setTitle(`Lyrics Page #` + i)
            .setDescription(lyrics.slice(b * 2048, i * 2048))
            .setFooter('Provided by genius.com')
        );
      }

      const lyricsEmbed = new Pagination.Embeds()
        .setArray(lyricsArray)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setURL(songPageURL)
        .setColor(embedColor);

      return sentMessage
        .edit(`${message.client.emotes.success} Lyrics Found!`, lyricsEmbed.build())
        .then(msg => {
          msg.delete({ timeout: 2000 });
        });
    } catch (err) {
      message.reply(err);
    }
  }

  static cleanSongName(songName) {
    return songName
      .replace(/ *\([^)]*\) */g, '')
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
      );
  }

  static searchSong(query) {
    return new Promise(async function(resolve, reject) {
      const searchURL = `https://api.genius.com/search?q=${encodeURI(query)}`;
      const headers = {
        Authorization: `Bearer ${geniusLyricsAPI}`
      };
      try {
        const body = await fetch(searchURL, { headers });
        const result = await body.json();
        const songPath = result.response.hits[0].result.api_path;
        resolve(`https://api.genius.com${songPath}`);
      } catch (e) {
        reject(`No song has been found for ${songName}`);
      }
    });
  }

  static getSongPageURL(url) {
    return new Promise(async function(resolve, reject) {
      const headers = {
        Authorization: `Bearer ${geniusLyricsAPI}`
      };
      try {
        const body = await fetch(url, { headers });
        const result = await body.json();
        if (!result.response.song.url) {
          reject(`There was a problem finding a URL for this song`);
        } else {
          resolve(result.response.song.url);
        }
      } catch (e) {
        console.log(e);
        reject(`There was a problem finding a URL for this song`);
      }
    });
  }

  static getLyrics(url) {
    return new Promise(async function(resolve, reject) {
      try {
        const response = await fetch(url);
        const text = await response.text();
        const $ = cheerio.load(text);
        let lyrics = $('.lyrics')
          .text()
          .trim();
        if (!lyrics) {
          $('.Lyrics__Container-sc-1ynbvzw-2')
            .find('br')
            .replaceWith('\n');
          lyrics = $('.Lyrics__Container-sc-1ynbvzw-2').text();
          if (!lyrics) {
            reject(
              `There was a problem fetching lyrics for this song, please try again`
            );
          } else {
            resolve(lyrics.replace(/(\[.+\])/g, ''));
          }
        } else {
          resolve(lyrics.replace(/(\[.+\])/g, ''));
        }
      } catch (e) {
        console.log(e);
        reject(
          `There was a problem fetching lyrics for this song, please try again`
        );
      }
    });
  }
};