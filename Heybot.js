

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
    bot.telegram.sendMessage(ctx.chat.id, 'Hey' + ctx.from.first_name + ' schön dich zu sehen', {
    })
})


//Wenn der Hey hört, grüßt er die Nutzer:in mit ihrem Namen
bot.hears('Hey', (ctx) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'hi ' + ctx.from.first_name, {
    })// Hier wird die Funktion requestLocationKeyboard aufgerufen, welche ein Keyboard erstellt auf welchem der nutzer seine Location teilen kann.
})


bot.launch();

