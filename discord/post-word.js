/* Posts the Word of the Day to Discord via a webhook.

   Run by .github/workflows/discord-word.yml once a day.
   Needs Node 18+ (uses the built-in fetch) and no npm packages.

   Environment variables:
     DISCORD_WEBHOOK_URL  (required) the channel's webhook URL — keep it secret!
     SITE_URL             (optional) link to the website, shown in the post
     DRY_RUN=1            (optional) print the message instead of sending it

   How the word is chosen:
     Uses daily-word.js — the same picker as the website — so the
     Discord post always matches the word on the site that day. */

const fs = require("fs");
const path = require("path");
const { wordForDate, TIME_ZONE } = require("../daily-word.js");

const WORDS_PATH = path.join(__dirname, "..", "words.json");
const COLOUR = 0x48d1cc; // embed stripe colour, matches --accent on the site

function buildMessage(w, date, total) {
  const siteUrl = process.env.SITE_URL;
  const dateText = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TIME_ZONE,
  });

  // e.g.  *noun*  ·  `ser-en-DIP-i-tee`
  const heading = [
    w.partOfSpeech && `*${w.partOfSpeech}*`,
    w.pronunciation && `\`${w.pronunciation}\``,
  ]
    .filter(Boolean)
    .join("  ·  ");

  const lines = [];
  if (heading) lines.push(heading, "");
  lines.push(`**${w.definition}**`);
  if (w.example) lines.push("", `> *${w.example}*`);
  if (w.synonyms && w.synonyms.length) {
    lines.push("", "**Similar words**", w.synonyms.map((s) => `\`${s}\``).join("  "));
  }
  if (siteUrl) lines.push("", `[Listen & explore more words →](${siteUrl})`);

  const embed = {
    author: { name: `📖  Word of the Day  ·  ${dateText}` },
    title: w.word,
    description: lines.join("\n"),
    color: COLOUR,
    footer: { text: `Word No. ${w.id} of ${total}  ·  A new word every day` },
    timestamp: date.toISOString(),
  };
  if (siteUrl) {
    embed.url = siteUrl;
    embed.author.url = siteUrl;
  }

  return { username: "Word of the Day", embeds: [embed] };
}

async function main() {
  const { words } = JSON.parse(fs.readFileSync(WORDS_PATH, "utf8"));
  if (!Array.isArray(words) || words.length === 0) throw new Error("No words in words.json");

  const now = new Date();
  const message = buildMessage(wordForDate(words, now), now, words.length);

  if (process.env.DRY_RUN) {
    console.log(JSON.stringify(message, null, 2));
    return;
  }

  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) throw new Error("DISCORD_WEBHOOK_URL is not set");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  if (!res.ok) throw new Error(`Discord said ${res.status}: ${await res.text()}`);
  console.log(`Posted "${message.embeds[0].title}"`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
