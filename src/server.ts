import { Telegraf } from "telegraf";
import getBotTokenOrQuit from "./util/getBotToken";
import axios from "axios";
import { response } from "express";

const botToken = getBotTokenOrQuit();

const bot = new Telegraf(botToken);

bot.start((ctx) => ctx.reply("Hello!  Let's talk!"));
bot.help((ctx) => ctx.reply("Hmm i am not programmed to be helpful, yet!"));
bot.hears("hello", (ctx) => ctx.reply("Ok, I heard you say hello"));
bot.command("sing", (ctx) => ctx.reply("La la la!  I got your command."));
bot.command("time", (ctx) => ctx.reply(Date()));

// Show all tasks with delete buttons
bot.command("tasks", (ctx) =>
  axios
    .get("https://anagmrebelo-to-do-app.onrender.com/tasks")
    .then((response) => ctx.reply(response.data))
);

// Add a new task
bot.command("newTask", (ctx) => {
  const message = ctx.message.text.split("/newTask");

  if (message[1] === "") {
    ctx.reply("Please type task description after /newTask");
    return;
  }

  axios
    .post("https://anagmrebelo-to-do-app.onrender.com/tasks", {
      value: message[1],
      dueDate: "",
      status: false,
    })
    .then(() => ctx.reply("Added a new task!"));
});

bot.on("poll_answer", (ctx) => {
  console.log(ctx.update.poll_answer);
});

//poll
bot.command("/colourpoll", async (ctx) => {
  const pollMessage = await ctx.replyWithPoll(
    "What is your favourite colour? Quick!",
    ["blue", "no, yellow", "pink", "purple", "green"],
    { is_anonymous: false }
  );
  console.log(pollMessage);

  setTimeout(() => {
    //@ts-ignore
    ctx.stopPoll(pollMessage.message_id);
    ctx.reply("(Poll is now closed!)");
  }, 20000);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
