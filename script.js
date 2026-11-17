/* =========================================================
   Word of the Day

   How it works:
   1. Load our list of English words from words.json.
   2. Pick one at random every time the page loads.
   3. Remember the last few words shown (in localStorage) so
      you don't see the same word twice in a row.
   4. "Another word" picks a new one without refreshing.
   ========================================================= */

const WORDS_URL = "words.json";
const INTRO_MIN_MS = 1600; // keep the intro on screen at least this long
const RECENT_KEY = "wotd-recent";
const RECENT_LIMIT = 15; // how many recent words to avoid repeating

// Used if words.json can't be loaded (e.g. opening the file
// directly without a local server)
const BACKUP_WORDS = [
  {
    id: 1,
    word: "Serendipity",
    partOfSpeech: "noun",
    pronunciation: "ser-en-DIP-i-tee",
    definition: "The occurrence of events by chance in a happy or beneficial way.",
    example: "Finding that little café was pure serendipity.",
    synonyms: ["chance", "fluke", "luck"],
  },
];

// Grab the elements we'll fill in
const els = {
  intro: document.getElementById("intro"),
  introDate: document.getElementById("intro-date"),
  introTitle: document.getElementById("intro-title"),
  todayDate: document.getElementById("today-date"),
  card: document.getElementById("word-card"),
  badge: document.getElementById("badge"),
  partOfSpeech: document.getElementById("part-of-speech"),
  word: document.getElementById("word"),
  pronunciation: document.getElementById("pronunciation"),
  audioBtn: document.getElementById("audio-btn"),
  definition: document.getElementById("definition"),
  example: document.getElementById("example"),
  synonyms: document.getElementById("synonyms"),
  anotherBtn: document.getElementById("another-btn"),
  shareBtn: document.getElementById("share-btn"),
  wordCount: document.getElementById("word-count"),
};

let words = []; // filled once words.json has loaded
let currentWord = null; // the word on screen right now

/* ---------------------------------------------------------
   Loading & picking words
   --------------------------------------------------------- */

async function loadWords() {
  try {
    const res = await fetch(WORDS_URL);
    if (!res.ok) throw new Error("Could not load words.json");
    const data = await res.json();
    if (!Array.isArray(data.words) || data.words.length === 0) throw new Error("No words");
    return data.words;
  } catch (err) {
    console.warn(err);
    return BACKUP_WORDS;
  }
}

// Words we've shown recently, saved between visits
function getRecent() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  } catch {
    return [];
  }
}

function addRecent(word) {
  const recent = getRecent().filter((w) => w !== word);
  recent.push(word);
  // Never remember so many that there's nothing left to pick
  const limit = Math.min(RECENT_LIMIT, words.length - 1);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(-limit)));
  } catch {}
}

function pickRandomWord() {
  const recent = getRecent();
  let choices = words.filter((w) => !recent.includes(w.word));
  if (choices.length === 0) choices = words;
  // Never show the exact same word straight after itself
  if (currentWord && choices.length > 1) {
    choices = choices.filter((w) => w.word !== currentWord.word);
  }

  const w = choices[Math.floor(Math.random() * choices.length)];
  addRecent(w.word);
  return w;
}

/* ---------------------------------------------------------
   Showing things on the page
   --------------------------------------------------------- */

// Put each letter in its own <span> so CSS can animate them one by one
function splitLetters(el, text) {
  el.textContent = "";
  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? " " : char;
    span.style.setProperty("--i", i);
    el.appendChild(span);
  });
  el.setAttribute("aria-label", text);
}

function renderWord(w) {
  currentWord = w;

  splitLetters(els.word, w.word.toLowerCase());
  els.partOfSpeech.textContent = w.partOfSpeech || "";
  els.partOfSpeech.hidden = !w.partOfSpeech;
  els.pronunciation.textContent = w.pronunciation || "";
  els.definition.textContent = w.definition;
  els.example.textContent = w.example ? `“${w.example}”` : "";

  els.synonyms.textContent = "";
  (w.synonyms || []).slice(0, 5).forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s;
    els.synonyms.appendChild(li);
  });

  els.badge.textContent = `No. ${w.id}`;
  document.title = `${capitalise(w.word)} · Word of the Day`;

  // Restart the reveal animation
  const wordTime = 0.1 + w.word.length * 0.055 + 0.25;
  els.card.style.setProperty("--after-word", wordTime + "s");
  els.card.classList.remove("reveal");
  void els.card.offsetWidth; // forces the browser to notice the class was removed
  els.card.classList.add("reveal");
}

// Fade the card out, swap the word, fade back in
async function showAnotherWord() {
  els.anotherBtn.disabled = true;
  els.card.classList.add("swapping");

  await wait(250);
  renderWord(pickRandomWord());
  els.card.classList.remove("swapping");

  els.anotherBtn.disabled = false;
}

function capitalise(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setDates() {
  const label = new Date().toLocaleDateString("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  els.introDate.textContent = label;
  els.todayDate.textContent = label;
}

/* ---------------------------------------------------------
   Saying the word out loud
   Uses the browser's built-in speech, with an English voice.
   --------------------------------------------------------- */

const canSpeak = "speechSynthesis" in window;

function englishVoice() {
  const voices = speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "en-GB") ||
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang.startsWith("en"))
  );
}

function speak(text) {
  speechSynthesis.cancel();
  const say = new SpeechSynthesisUtterance(text);
  say.lang = "en-GB";
  const voice = englishVoice();
  if (voice) say.voice = voice;
  say.rate = 0.85;
  speechSynthesis.speak(say);
}

els.audioBtn.hidden = !canSpeak;

/* ---------------------------------------------------------
   Buttons
   --------------------------------------------------------- */

els.anotherBtn.addEventListener("click", showAnotherWord);

els.audioBtn.addEventListener("click", () => {
  if (canSpeak && currentWord) speak(currentWord.word);
});

els.shareBtn.addEventListener("click", async () => {
  if (!currentWord) return;
  const text = `${capitalise(currentWord.word)} (${currentWord.partOfSpeech}): ${currentWord.definition}`;
  const url = location.href;

  if (navigator.share) {
    try {
      await navigator.share({ title: "Word of the Day", text, url });
    } catch {}
    return;
  }

  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    els.shareBtn.textContent = "Copied!";
    setTimeout(() => (els.shareBtn.textContent = "Share"), 1800);
  } catch {}
});

/* ---------------------------------------------------------
   Start everything
   --------------------------------------------------------- */

async function start() {
  setDates();
  splitLetters(els.introTitle, els.introTitle.textContent);

  // Wait for BOTH the intro to play and the words to load
  const [list] = await Promise.all([loadWords(), wait(INTRO_MIN_MS)]);
  words = list;
  els.wordCount.textContent = words.length;

  renderWord(pickRandomWord());
  els.intro.classList.add("done");
  document.body.classList.add("ready");

  // Remove the intro once it has slid away
  setTimeout(() => els.intro.remove(), 1200);
}

start();
