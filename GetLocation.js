

//--------------Hier werden Packages eingebunden welche wir für das Ausführen der Funktionen benötiogen--------------

//Telegraf ist ein Bot Framework welche uns die Interaktion mit der Nutzer:in über den Bot einfacher macht -> https://telegraf.js.org/
const Telegraf = require('telegraf').Telegraf;


const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'

//Hier erstellen wir die Verbindung zum Telegram Bot
const bot = new Telegraf(BOT_TOKEN,{ telegram: { webhookReply: false } })


//----------------- Ab hier beginnt der Code für euren Bot --------------------

//Das ist die erste Nachricht die Jemand sieht wenn er euren Bot öffnet
bot.command('start', ctx => {
    console.log(ctx.from) //Hier bekommt ihr ausgegeben wer sich aktuell mit eurem Bot verbunden hat
    bot.telegram.sendMessage(ctx.chat.id, 'Hallo ich bin der IncidenceBot 🤖 Schreibe Corona oder Inzidenz in den Chat um herauszufinden wie die Inzidenz in deinem Landkreis ist 🤧 ', {
    })
})


//Wenn der Bot incidence, inzidenz oder corona hört führt er die Befehle in dieser Funktion aus. Im Beispiel frägt er Nutzer:innen nach der Location
bot.hears(['incidence','inzidenz','corona'], (ctx) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Um dir sagen zu können, wie hoch die Inzidenz bei dir ist, benötige ich natürlich den Ort, an welchem du dich befindest.', requestLocationKeyboard); // Hier wird die Funktion requestLocationKeyboard aufgerufen, welche ein Keyboard erstellt auf welchem der nutzer seine Location teilen kann.
})


// Wenn diese Funktion aufgerufen wird, wird die Nutzer:in dazu aufgefordert ihre Location zu teilen
const requestLocationKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "location",
                request_location: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }
}


//Wenn dem Bot die Location geteilt wurde, wird diese Funktion ausgeführt.
bot.on('location', (ctx) => {
    console.log(ctx.update.message.location)   
})

bot.launch();

