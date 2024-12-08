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
async function reply(jid, text) {
    sock.sendMessage(jid, {text: text})
}
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
        //============ SEARCH ==============
    case "covid-19" : {
        let res = await fetch(`${global.api.ndaa}covid-19`)
        let json = await res.json()
        let h = json.result
        let teks = `*🦠 COVID-19 INFO*\n\n📊 Total Kasus : ${h.totalCases}\n💚 Sembuh : ${h.recovered}\n💔 Meninggal : ${h.deaths}\n⚠️ Kasus Aktif : ${h.activeCases}\n\n*🗓️ UPDATE : ${h.lastUpdate}*`
        m.reply(teks)
    }
        break
    case "yt-search":
    case "yts": {
        if (!text) return m.reply("Please provide a search query");
        let res = await fetch(`${global.api.ndaa}yt-search?query=${text}`)
        let json = await res.json()
        let map = json.result.all.map(e => `Video / Channel : ${e.type}\nTitle : ${e.title}\nLink : ${e.url}`).join("\n\n")
        m.reply(map)
    }
        break
        //================= NEWS ==================
    case "kumparan": 
    case "cnbc":
    case "cnn":
    case "replubika": {
        let res = await fetch(`${global.api.ndaa}news-${command}`)
        let json = await res.json()
        let maps = json.result.map(e => `Title : *${e.title}*\nUrl : ${e.link}`).join('\n\n')
        m.reply(maps)
    }
        break
        //================= AI ==================
    case "lumin-ai": {
        if (!text) return reply(`*Lumin AI*\n\n*Example:*\n${prefix + command} Hello`)
        let api = await fetch(`${global.api.ndaa}${command}?query=${text}`)
        let res = await api.json()
        m.reply(res.result.result)
    }
    break
    case "openai": case "gemini": case "claude": {
        if (!text) return reply(m.chat, `*[❗] Please enter the prompt you want` + `\n\n*Example : ${prefix + command} hello`)
        let api = await fetch(`${global.api.ndaa}${command}?query=${text}`)
        let json = await api.json()
        m.reply(json.result)
    }
        break
    //================= GENERAL ==================
    case "sc": {
        m.reply(`SC DI JUAL TERGANTUNG MOOD OWNER WKWK MINAT HUB OWNER :v\n\n Tapi Boong Hayyyuk https://github.com/LenzCompany/mywabot`)
    }
        break
    case "tqto": {
        let teks = `
        🙏 BIG THANKS TO:
✨ Allah SWT - Sumber segala berkah dan petunjuk!
👨‍👩‍👧‍👦 Orang Tua - Terima kasih atas cinta dan dukungan yang tiada henti!
🤖 User Bot - Terima kasih telah menggunakan bot ini! Kamu adalah bagian dari perjalanan kami!

🌟 SPECIAL THANKS TO:
💻 [ MININXD ] - Untuk base bot WhatsApp yang luar biasa! ( https://github.com/mininxd )
🌐 [ NDAA ] - Untuk API yang sangat membantu! ( https://api.ndaadev.us.kg )`
        m.reply(teks)
    }
        break
    case "menu": {
        let text = `Hello ${pushname}

        
🤖 AI-ASISTANT
*${prefix}lumin-ai* ~> 💬 Chat Dengan Lumin AI, asisten cerdas yang siap membantu!
*${prefix}openai* ~> 💡 Chat Dengan OpenAI, temukan jawaban dari berbagai pertanyaan!
*${prefix}gemini* ~> 🌌 Chat Dengan Gemini, eksplorasi ide-ide baru!
*${prefix}claude* ~> 🧠 Chat Dengan Claude, diskusikan topik menarik bersama!

📋 GENERAL
*${prefix}sc* ~> 📚 Source Code Bot - Dapatkan akses ke kode sumber bot ini dan pelajari lebih lanjut! 🚀
*${prefix}tqto* ~> 🙏 Terima Kasih - rasa terima kasih kepada semua yang telah berkontribusi! 💖✨
*${prefix}menu* ~> 📜 Menampilkan Menu Bot, lihat semua fitur yang tersedia!
*${prefix}owner* ~> 👤 Menampilkan Owner Bot, kenali pembuat bot ini!
*${prefix}ping* ~> ⚡ Menampilkan Ping Bot, cek kecepatan respons bot!

📰 NEWS
*${prefix}kumparan* ~> 🌟 Berita terkini dari Kumparan, dapatkan informasi terbaru dan terhangat!
*${prefix}cnbc* ~> 📈 Berita terkini dari CNBC, ikuti perkembangan ekonomi dan bisnis!
*${prefix}cnn* ~> 🌍 Berita terkini dari CNN, berita internasional dan lokal yang terpercaya!
*${prefix}republika* ~> 🕌 Berita terkini dari Republika, informasi seputar isu-isu sosial dan keagamaan!

🔍 SEARCH
*${prefix}yt-search* ~> 🎥 Mencari video di YouTube! Temukan konten menarik dan hiburan yang kamu cari!
*${prefix}covid-19* ~> 🦠 Informasi COVID-19 di Dunia!

👑 OWNER
*${prefix}update* ~> 🔄 Update Bot, perbarui versi bot!
*${prefix}pesan-masuk* ~> 📥 Menampilkan Pesan Masuk, lihat pesan yang diterima!
*${prefix}reset-pesan* ~> 🔄 Reset Pesan Masuk, hapus semua pesan yang ada!`

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
    case "update": {
        if (!isCreator) return reply(dfail.ownerOnly)
        exec("git pull https://github.com/LenzCompany/mywabot", (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)
        })
    }
        break
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
//AUTO RELOAD
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})

//END