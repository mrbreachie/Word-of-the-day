# Discord Word of the Day

Posts a word from `words.json` into a Discord channel every day, using a
Discord webhook and GitHub Actions. There's nothing to host and it costs nothing.

## Setup

1. **Create a webhook in Discord.**
   Open the channel's settings, go to **Integrations → Webhooks → New Webhook**,
   then click **Copy Webhook URL**.
2. **Add it to GitHub as a secret.**
   In the repo, go to **Settings → Secrets and variables → Actions → New repository secret**.
   Name it `DISCORD_WEBHOOK_URL` and paste the URL as the value.
   Never commit this URL: anyone who has it can post in your channel.
3. *(Optional)* **Link to the website.**
   On the same page, open the **Variables** tab and add `SITE_URL`
   (for example your GitHub Pages address). The word's title in the post becomes a link to it.
4. **Test it.**
   Open **Actions → Discord Word of the Day → Run workflow**.

After that it posts every day at midday Melbourne time. Because Melbourne has
daylight saving, the workflow runs at both 01:00 and 02:00 UTC, and the script
only posts from the run that lands at 12:00 in Melbourne (the other run just
logs "skipping"). To change the time, edit `POST_TIME_ZONE` / `POST_HOUR` in
`post-word.js` and the `cron` lines in `.github/workflows/discord-word.yml`.

If GitHub starts a scheduled run more than an hour late (rare), that day's post
is skipped. Use **Run workflow** to post it by hand.

## Preview without posting

```sh
DRY_RUN=1 node discord/post-word.js
```

## Good to know

- On a public repo, GitHub **pauses scheduled workflows after 60 days with no commits**.
  If the posts stop, push any commit or re-enable the workflow on the Actions tab.
- The word is chosen by `daily-word.js`, the same picker the website uses, so the post
  always matches the word on the site that day. It changes at midnight UK time,
  re-running on the same day posts the same word, and no word repeats until the
  whole list has been used.
