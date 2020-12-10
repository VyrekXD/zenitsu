const Discord = require('discord.js');

/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns {Promise<Discord.Message>}
 */

module.exports = (client, message) => {
    let embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTimestamp()
        .setDescription('No hay nadie en el canal de voz, Hasta la proxima!')
    message.channel.send({ embed: embed })
}