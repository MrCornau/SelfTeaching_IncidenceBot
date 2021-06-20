const Telegraf = require('telegraf').Telegraf;

const axios = require('axios').default;
const http = require('http-request');

const bot = new Telegraf('1755639752:AAGGyDOrh1xX0RD5_BjF3X4H86hXKFiT2as',{ telegram: { webhookReply: false } })

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {
    })
})




bot.hears("incidence", (ctx) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Can we access your location?', requestLocationKeyboard);
})


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

bot.on('location', (ctx) => {
    console.log(ctx.update.message.location)
	let location = ctx.update.message.location;
	
    
    const params = {
        auth: '759688732333420631416x27418',
        locate: location['latitude']+','+location['longitude'],
        json: '1'
      }
      axios.get('https://geocode.xyz', {params})
      .then(response => {
          return ags = response.data.adminareas.admin6.de_amtlicher_gemeindeschluessel;
          
        //console.log(response.data.adminareas.admin6.de_amtlicher_gemeindeschluessel, 'test');
      }).then((ags) =>  {return response2 = axios.get('https://api.corona-zahlen.org/districts/'+ags)}).then((response2) => {
           ctx.reply('In deinem Landkreis ' + response2.data.data[ags].name + 'besteht aktuell eine Inzidenz von: ' + response2.data.data[ags].weekIncidence )
      ,console.log(response2.data.data[ags])},).catch(error => {
        console.log(error);
      })
      
})


// async function GetIncidence(ags){
//     // shorthand syntax, buffered response
// return http.get('https://api.corona-zahlen.org/districts/'+ags, function (err, res) {
// 	if (err) {
// 		console.error(err);
// 		return;
// 	}
//     console.log(JSON.parse(res.buffer.toString()));
// 	return incidence = JSON.parse(res.buffer.toString());
// });

// }
   
    //bot.telegram.sendMessage(ctx.chat.id, 'Can we access your location?');









bot.launch();

