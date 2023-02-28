const  { Telegraf } =  require('telegraf');
const { message } = require('telegraf/filters');
const axios = require("axios")
require("dotenv").config()

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('temp', async (ctx, next) => {
  const start = new Date()
  next()
  await getFermenterTemperature().then((data) => {
    const temp = "Fermenter Temp: " + data.toString() + "°C"
    console.log("data", data)
    ctx.telegram.sendMessage(ctx.message.chat.id, temp)
    
  })
  const ms = new Date() - start
  console.log('Response time: %sms', ms)
})

bot.command('tempcooler', async (ctx, next) => {
    const start = new Date()
    next()
    await getFermenterTemperature().then((data) => {
      const temp = "Kühlung Temp: " + data.toString() + "°C"
      console.log("data", data)
      ctx.telegram.sendMessage(ctx.message.chat.id, temp)
      
    })
    const ms = new Date() - start
    console.log('Response time: %sms', ms)
  })

var getFermenterTemperature = function () {
    return new Promise(function (resolve, reject) {
        axios.get('http://192.168.178.85:8000/sensor/Ey4P8xhZPRR5UpcnT3qVw9')
        .then(function (response) {
            // handle success
            console.log(response.data.value);
            resolve(response.data.value)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            reject(error)
        })
        .finally(function () {
            // na
        });

    });
  };

  var getFridgeTemperature = function () {
    return new Promise(function (resolve, reject) {
        axios.get('http://192.168.178.85:8000/sensor/4QkExpiXTM6ECEEjbiZbti')
        .then(function (response) {
            // handle success
            console.log(response.data.value);
            resolve(response.data.value)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            reject(error)
        })
        .finally(function () {
            // na
        });

    });
  };




bot.launch()