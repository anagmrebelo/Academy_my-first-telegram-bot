import { Telegraf } from 'telegraf'

const bot = new Telegraf('12236784257864:BCkZSimadethisupRc3i28f')

bot.start((ctx) => ctx.reply("Hello!  Let's talk!"))
bot.hears('hello', (ctx) => ctx.reply('You said hello!'))
bot.command('sing', (ctx) => ctx.reply('La la la!'))

bot.launch()
