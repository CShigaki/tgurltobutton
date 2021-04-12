import TelegramBot, { InlineQueryResultArticle } from 'node-telegram-bot-api';
import { InlineKeyboard } from 'telegram-keyboard-wrapper';
import uuid from 'uuid';

const token = '<token>';
const bot = new TelegramBot(token, { polling: true });

bot.on('inline_query', (msg) => {
  if (!msg.query) {
    return;
  }

  const splitQuery = msg.query.split(';');
  const linkButton = new InlineKeyboard();
  linkButton.addRow(
    { text: `Link`, url: splitQuery.length === 2 ? splitQuery[1].trim() : splitQuery[0].trim() },
  );

  const results: InlineQueryResultArticle[] = [{
    type: 'article',
    id: uuid(),
    title: '🔗 Transform this url in a button!',
    reply_markup: linkButton.export()['reply_markup'],
    input_message_content: { message_text: splitQuery.length === 2 ? splitQuery[0] : 'Click to access the link.' },
    description: "For customized messages use the format 'message;link'. Empty messages are not allowed."
  }];

  bot.answerInlineQuery(msg.id, results, { cache_time: 1 });
});

bot.onText(/\/start/i, async (msg) => {
  bot.sendMessage(msg.chat.id, `Dude, I only work inline. There's nothing to see here.`);
});
