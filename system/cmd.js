require("../config")
const fs = require('fs')
const util = require('util')
const axios = require('axios')
const { exec } = require("child_process")
const SimplDB = require("simpl.db");


module.exports = async (sock, m) => {
try {
const body = (
(m.mtype === 'conversation' && m.message.conversation) ||
(m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
(m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
(m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
(m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
(m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
(m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
) ? (
(m.mtype === 'conversation' && m.message.conversation) ||
(m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
(m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
(m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
(m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
(m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
(m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
) : '';

const budy = (typeof m.text === 'string') ? m.text : '';
const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const sender = m.key.fromMe ? (sock.user.id.split(':')[0]+'@s.whatsapp.net' || sock.user.id) : (m.key.participant || m.key.remoteJid)
const botNumber = await sock.decodeJid(sock.user.id)
const senderNumber = sender.split('@')[0]
const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)

//DFAIL

global.dfail = {
    ownerOnly: `You are not the owner of this bot`,
    example: `${prefix + command}`,
}


//CONSOLE MESSAGE & DATABASE
const db = new SimplDB();
global.db = db

if (m.message) {
    //DATABASE USER
    const userDb = await db.get(`user.${m.sender}`);
    if (!userDb) {
        await db.set(`user.${m.sender}`, {
            coin: 1000,
            level: 0,
            uid: generateUID(m.sender),
            xp: 0
        });
    }
    //SAVE MESSAGE TO DATABASE
    var db_msg = JSON.parse(fs.readFileSync('./database/msg.json'))
    db_msg.push({
        sender: m.sender,
        message: budy || m.type,
        date: new Date().toISOString(),
    })
    await fs.writeFileSync('./database/msg.json', JSON.stringify(db_msg))
    //CONSOLE MESSAGE
    console.log(`GOT NEW MESSAGE FROM : ${pushname} MESSSAGE : ${budy || m.type}`)
}

//=========== FUNCTION ====================
async function generateUID(phoneNumber) {
    if (typeof phoneNumber !== "string") {
        phoneNumber = phoneNumber.toString();
    }

    let hash = 0;
    for (let i = 0; i < phoneNumber.length; i++) {
        const charCode = phoneNumber.charCodeAt(i);
        hash = (hash * 31 + charCode) % 1000000007;
    }

    const uniquePart = phoneNumber.split("").reverse().join("").charCodeAt(0).toString(16);

    return `${Math.abs(hash).toString(16).toLowerCase()}-${uniquePart}`;
}




//COMMANDS
switch(command) {
    //================= GENERAL ==================
    case "menu": {
        let text = `Hello ${pushname}

*GENERAL*       
${prefix}menu ~> Menampilkan Menu Bot
${prefix}owner ~> Menampilkan Owner Bot
${prefix}ping ~> Menampilkan Ping Bot

*OWNER*
${prefix}pesan-masuk ~> Menampilkan Pesan Masuk
${prefix}reset-pesan ~> Reset Pesan Masuk`

m.reply(text)
    }
    break
    case "owner": {
        const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Ndaa\n' // full name
            + 'ORG:Lenzy ORG;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=6285640575421:+62 856 4057 5421\n' // WhatsApp ID + phone number
            + 'END:VCARD'
            sock.sendMessage(
                m.chat,
                { 
                    contacts: { 
                        displayName: 'Ndaa', 
                        contacts: [{ vcard }] 
                    }
                }
            )
    }
    break
    case "ping": {
        m.reply(`Pong!\n\nServer : https://ndaadev.us.kg`)
    }
break
//============== OWNER ==========
case "reset-pesan": {
if (!isCreator) return m.reply('Hanya bot owner yang bisa menggunakan fitur ini')
fs.writeFileSync("./database/msg.json", JSON.stringify([]))
m.reply('Data berhasil di reset')
}
break
case "pesan": case "pesan-masuk" : {
if (!isCreator) return m.reply('Hanya bot owner yang bisa menggunakan fitur ini')
const pesan = db_msg.map(e => `PENGIRIM : ${e.sender}\nPESAN : ${e.message}\nTANGGAL : ${e.date}`).join('\n\n')
m.reply(`
${pesan}`)
}
break
default:
if (budy.startsWith('=>')) {
if (!isCreator) return m.reply(dfail.ownerOnly)
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return m.reply(bang)
}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))
}
}

if (budy.startsWith('>')) {
if (!isCreator) return m.reply(dfail.ownerOnly)
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}

if (budy.startsWith('$')) {
if (!isCreator) return m.reply(dfail.ownerOnly)
exec(budy.slice(2), (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) return m.reply(stdout)
})
}
}

} catch (err) {
console.log(util.format(err))
}
}