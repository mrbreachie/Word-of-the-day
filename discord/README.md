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

After that it posts every day at 08:00 UTC. To change the time, edit the `cron`
line in `.github/workflows/discord-word.yml`.

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
