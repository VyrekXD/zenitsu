const Canvas = require('canvas')
/* eslint-disable no-unused-vars */
const { Message, MessageAttachment } = require('discord.js');
const { Client } = require('discord.js');

const Command = require('../../Utils/Classes').Command;
module.exports = class Comando extends Command {
	constructor() {
		super()
		this.name = "nicememe"
		this.alias = []
		this.category = 'diversion'
	}
	/**
	 * @param {Object} obj
	 * @param {Message} obj.message
	 * @param {Client} obj.client
	 */
	async run(obj) {
		const { message, client, embedResponse, args } = obj;
		/* regex sacado de https://github.com/AndreMor955/gidget/blob/master/src/commands/image/spin.js */
		const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/gm;
		let foto = (args[0] && args[0].match(reg) ? args[0].match(reg)[0] : null) || (message.attachments.array()[0] ? message.attachments.array()[0].url : null) || (message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({ size: 2048, format: 'png' }) : null);
		if (!foto)
			return embedResponse('<:cancel:804368628861763664> | Necesitas adjuntar una imagen o mencionar a alguien.')
		foto = await Canvas.loadImage(foto)
		const canvas = Canvas.createCanvas(552, 513);
		let bck = await Canvas.loadImage('https://cdn.discordapp.com/attachments/803346384144433154/804045257587032097/AZwCgO7.png');
		const ctx = canvas.getContext('2d');
		ctx.drawImage(bck, 0, 0, 552, 513)
		ctx.drawImage(foto, 15, 10, 525, 350)
		return enviar(message, canvas.toBuffer(), 'img.png')
	}
}

/**
 * @namespace enviar
 * @param {import('discord.js').Message} message 
 * @param {Buffer} buffer
 * @param {String} name
 * @returns {Promise<import('discord.js').Message>}
 * @example 
 * enviar(message, canvas.toBuffer(), 'img.png')
 */

function enviar(message, buffer, name) {

	const att = new MessageAttachment(buffer, name)
	return message.channel.send({ files: [att] })

}