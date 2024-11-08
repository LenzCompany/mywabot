
import { Client, Events, VCardBuilder  } from "@mengkodingan/ckptw";
import fetch from "node-fetch"
import util from "util"
import axios from "axios"
import mime from "mime-types"

const erorr = "Server Sedang Sibuk Coba Lagi Nanti!"

//function

async function randomUA() {
    const UAs = [
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3 WOW64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 6.3 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (X11 Ubuntu Linux x86_64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 Trident/7.0 rv:11.0) like Gecko",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.12 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 Trident/7.0 rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.11 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_11_6) AppleWebKit/603.2.5 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.5",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/58.0.3029.110 Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 6.1 Trident/7.0 rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063",
        "Mozilla/5.0 (Windows NT 6.1 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 OPR/45.0.2552.888",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (X11 Linux x86_64 rv:45.0) Gecko/20100101 Firefox/45.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_10_5) AppleWebKit/603.2.5 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.5",
        "Mozilla/5.0 (Windows NT 10.0 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (iPad CPU OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.0 Mobile/14F89 Safari/602.1",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
        "Mozilla/5.0 (X11 Ubuntu Linux x86_64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36 OPR/45.0.2552.812",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 5.1 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (X11 Linux x86_64 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.12 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:40.0) Gecko/20100101 Firefox/40.1",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10.10 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
        "Mozilla/5.0 (compatible MSIE 9.0 Windows NT 6.0 Trident/5.0 Trident/5.0)",
        "Mozilla/5.0 (Windows NT 6.1 WOW64 rv:45.0) Gecko/20100101 Firefox/45.0",
        "Mozilla/5.0 (compatible MSIE 9.0 Windows NT 6.1 Trident/5.0 Trident/5.0)",
        "Mozilla/5.0 (Windows NT 6.1 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0 Win64 x64 rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (iPad CPU OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 rv:52.0) Gecko/20100101 Firefox/52.0",
        "Mozilla/5.0 (Windows NT 6.1 WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
        "Mozilla/5.0 (X11 Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36",
        "Mozilla/5.0 (X11 Fedora Linux x86_64 rv:53.0) Gecko/20100101 Firefox/53.0",
        "Mozilla/5.0 (Macintosh Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7",
        "Mozilla/5.0 (Windows NT 10.0 WOW64 Trident/7.0 Touch rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 6.2 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3 WOW64 Trident/7.0 rv:11.0) like Gecko"
    ]

    return UAs[Math.floor(Math.random() * UAs.length)]
}

async function fetchJson(url, options = {}) {
    let { data } = await axios(url, {
        headers: {
            Accept: "application/json, text/plain, */*",
            Priority: "u=0, i",
            "User-Agent": randomUA(),
            "family": 4,
            ...(options.headers ? options.headers : {})
        },
        responseType: "json",
        timeout: 60 * 1000 * 15, // timeout 15 minutes
        ...(options && delete options.headers && options)
    })

    return data
}

async function getRandomElement(arr) {
    try {
        if (arr.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    } catch (error) {
        console.error(`Error:`, error);
        return null;
    }
}

async function openaii(userid, text, model = "gpt-4o-mini") {
    try {
        const response = await axios.post('https://luminai.my.id/v2', {
            text: text,
            userId: userid,
            model: model
        });

        return response.data.reply.reply;
    } catch (error) {
        console.error("Terjadi kesalahan:", error.message);
        throw new Error("Gagal mendapatkan respons dari AI.");
    }
}

async function luminaii(content) {
    try {
        const response = await axios.post('https://luminai.my.id/', { content });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const bot = new Client({
    prefix: ".",
    printQRInTerminal: false,
    readIncommingMsg: true,
    usePairingCode: true,
    phoneNumber: '62856405754211', // phone number, e.g 62xxxxx
    WAVersion: [2, 3000, 1017531287],
});
bot.ev.once(Events.ClientReady, (m, ctx) => {
    console.log(`ready at ${m.user.id}`)
});
bot.command({
    name: "e",
    code: async (ctx) => {
      try {
        var evaled = await eval(ctx.args.join(" "));
        return ctx.reply({
          text: util.inspect(evaled, { depth: 0 }),
        });
      } catch (err) {
        return ctx.reply({ text: `${err}!` });
      }
    },
  });

//GENERAL
bot.command("uptime", async(ctx) => {
    function formatUptime(uptimeInSeconds) {
        const totalSeconds = Math.floor(uptimeInSeconds);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;
    
        return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
    
    // Contoh penggunaan
    const uptime = process.uptime(); // Mendapatkan uptime dalam detik
    const formattedUptime = formatUptime(uptime);
    //console.log(`Server uptime: ${formattedUptime}`);
    ctx.reply(`Server Uptime: ${formattedUptime}`)

})
bot.command("ping", async(ctx) => {
    const startTime = Date.now();
    
    fetch(`https://github.com`, { method: 'HEAD', mode: 'no-cors' })
        .then(() => {
            const duration = Date.now() - startTime;
            ctx.reply(`${duration} ms`)
        })
})
bot.command("owner", async(ctx) => {
    try {
        const vcard = new VCardBuilder()
    .setFullName("Ndaa") // full name
    .setOrg("LenzyCompany") // organization name
    .setNumber("6285640575421") // phone number
    .build(); // required build function at end

ctx.reply({ contacts: { displayName: "Ndaa", contacts: [{ vcard }] }});
    } catch (error) {
        ctx.reply(erorr)
    }
})
bot.command("menu", async(ctx) => {
    try {
       const textnya = `Hello ${ctx.sender.pushName}!

*GENERAL*
> .owner
> .menu
> .ping
> .uptime

*AI ASSISTANT*
> .ai pertanyaan
> .gemini pertanyaan
> .luminai pertanyaan

*TEMP MAIL*
> .tempmail
> .get-mail

*DOWNLOADER*
> .tiktok
> .gore
> .waifu

*EKONOMI*
> .kurs

*FUN*
> .meme
> .jokes`


ctx.reply(textnya)
    } catch (error) {
        ctx.reply(error)
    }
})
//FUN
bot.command("jokes", async(ctx) => {
    const data = await fetch(`https://candaan-api.vercel.app/api/text/random`)
    const dah = await data.json()
    ctx.reply(dah.data)
})
bot.command("meme", async(ctx) => {
    try {
        const res = await fetch(`https://candaan-api.vercel.app/api/image/random`)
        const mm = await res.json()
        return await ctx.reply({
            image: {
                url: mm.data.url
            },
            mimetype: mime.lookup("png"),
            caption: `DONE`
        });
    } catch (error) {
        ctx.reply(erorr)
    }
})
//EKONOMI
bot.command("kurs", async(ctx) => {
    try {
        const req = await fetch(`https://raw.githubusercontent.com/BochilTeam/database/refs/heads/master/ekonomi/kurs.json`)
        const ff = await req.json()
        ctx.reply(util.format(ff))
    } catch (error) {
        ctx.reply(erorr)
    }
})
//DOWNLOADER
bot.command("waifu", async(ctx) => {
    const getUrl = await fetch(`https://api.waifu.im/search?included_tags=waifu`)
            const jsonUrl = await getUrl.json()
            const picUrl = jsonUrl.images[0].url
            ctx.sendMessage(ctx.id, { image: { url: picUrl}})
})
bot.command("gore", async(ctx) => {
    try {
        const ff = await fetch(`https://widipe.com/randomgore`)
    const res = await ff.json()
    ctx.reply({
        video: {
            url: res.result.url
        },
        mimetype: "video/mp4",
        caption: `${res.result.title}`,
        gifPlayback: false
    });

    } catch (error) {
        ctx.reply(`Maaf Fitur sedang di perbaiki!`)
        
    }
})
bot.command("tiktok", async(ctx) => {
    try {
        const text = ctx.args.join(" ") || null
        if (!text) return ctx.reply(`.tiktok url tiktok`)
        const ff = await fetch(`https://tikwm.com/api/?url=${text}`)
    const res = await ff.json()
    ctx.reply({
        video: {
            url: res.data.play
        },
        mimetype: "video/mp4",
        caption: `${res.data.title}`,
        gifPlayback: false
    });

    } catch (error) {
        ctx.reply(`Maaf Fitur sedang di perbaiki!`)
        
    }
})
//TEMP MAIL MENU
bot.command("tempmail", async(ctx) => {
    try {
       const url = await fetch(`https://widipe.com/tempmail`)
       const ya = await url.json()
       ctx.reply(util.format(ya.data))
    } catch (error) {
        ctx.reply(error)
    }
})
bot.command("get-mail", async(ctx) => {
    try {
        const text = ctx.args.join(" ") || null
        if (!text) return ctx.reply(`.get-mail email`)
        const ress = await fetch(`https://widipe.com/getmail?email=${text}`) 
    const result = await ress.json()
    ctx.reply(util.format(result.result.email))
    } catch (error) {
        ctx.reply(error)
        console.log("error", error)
    }
})
//AI MENU
bot.command("luminai", async(ctx)=> {
    try {
        const argz = ctx.args.join(" ") || null
        if (!argz) return ctx.reply(`.luminai query`)
        const epep = await luminaii(argz)
    ctx.reply(epep.result)
    } catch (error) {
        ctx.reply(erorr)
    }
})
bot.command("gemini", async(ctx) => {
    try {
        const text = ctx.args.join(" ") || null
        if (!text) return ctx.reply(`.gemini query`)
            const url_api = await fetch(`https://wudysoft.us.kg/api/ai/ai-groq/gemini?q=${text}`)
        const final = await url_api.json()
        ctx.reply(final.result)
    } catch (error) {
        ctx.reply(error)
    }
})
bot.command("ai", async(ctx) => {
    try {
        const text = ctx.args.join(" ") || null
        if (!text) return ctx.reply(`.ai pertanyaan`)
        const resss = await fetch(`https://widipe.com/openai?text=${text}`) 
    const ress = await resss.json()
    ctx.reply(ress.result)
    } catch (error) {
        ctx.reply(error)
        console.log("error", error)
    }
})
bot.launch();
