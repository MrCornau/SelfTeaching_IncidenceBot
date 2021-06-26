

//--------------Hier werden Packages eingebunden welche wir für das Ausführen der Funktionen benötiogen--------------

//Telegraf ist ein Bot Framework welche uns die Interaktion mit der Nutzer:in über den Bot einfacher macht -> https://telegraf.js.org/
const Telegraf = require('telegraf').Telegraf;

//Axios ist ein HTML Client. Über diesen können wir in unserem Beispiel Daten von einer API abfragen. -> https://www.npmjs.com/package/axios
const axios = require('axios').default;


const GECODE_API_TOKEN = 'YOUR_GEOCODE_APITOKEN';
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
    //console.log(ctx.update.message.location)
	let location = ctx.update.message.location; // Die Location des Nutzers wird in eine Variable gespeichert
	
    //Parameter für das Abfragen der GeocodeApi mit welcher wir den Amtlichen Gemeindeschlüssel der Nutzer:in herausfinden
    const params = {
        auth: GECODE_API_TOKEN,
        locate: location['latitude']+','+location['longitude'],
        json: '1'
      }
      axios.get('https://geocode.xyz', {params})
      .then(response => {
          return ags = response.data.adminareas.admin6.de_amtlicher_gemeindeschluessel;})
          .then((ags) =>  {
          return response2 = axios.get('https://api.corona-zahlen.org/districts/'+ags)})
          .then((response2) => {
          ctx.reply('In deinem Landkreis ' + response2.data.data[ags].name + ' besteht aktuell eine Inzidenz von: ' + response2.data.data[ags].weekIncidence.toFixed(0) +
          ' 🦠 Diese Woche gab es ' + response2.data.data[ags].casesPerWeek.toFixed(0) + ' Fälle 🤧 '  +
          'Von der Delta Variante gab es bis jetzt ' + response2.data.data[ags].delta.cases.toFixed(0) + ' Fälle 😰 Bleib gesund und pass auf dich auf 😌'
          ),
          console.log(response2.data.data[ags])},)
          .catch(error => {
            console.log(error); 
           })      
})

bot.launch();

