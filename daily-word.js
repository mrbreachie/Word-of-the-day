/* =========================================================
   Daily word picker — shared by the website (script.js)
   and the Discord bot (discord/post-word.js), so both always
   show the same word on the same day.

   How it works:
   - "Today" is the calendar date in the UK (Europe/London),
     so the word changes at midnight UK time.
   - The word list is shuffled once with a fixed seed, then we
     step through it one word per day. No word repeats until
     the whole list has been used.
   - Adding words to words.json changes the order, which just
     starts a fresh cycle.
   ========================================================= */

(function (root) {
  const SEED = 20261118; // change this to get a different order
  const TIME_ZONE = "Europe/London";

  // Small seeded random number generator (mulberry32)
  function seededRandom(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffled(list, seed) {
    const rand = seededRandom(seed);
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Whole days since 1 Jan 1970, counting by the UK calendar date
  function dayNumber(date) {
    const parts = {};
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TIME_ZONE,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
      .formatToParts(date)
      .forEach((p) => (parts[p.type] = Number(p.value)));
    return Math.floor(Date.UTC(parts.year, parts.month - 1, parts.day) / 86400000);
  }

  function wordForDate(words, date) {
    const order = shuffled(words, SEED);
    return order[dayNumber(date) % order.length];
  }

  const DailyWord = { TIME_ZONE, dayNumber, wordForDate };

  if (typeof module !== "undefined" && module.exports) module.exports = DailyWord;
  else root.DailyWord = DailyWord;
})(this);
