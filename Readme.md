# 📖 Word of the Day

A small web development project that displays a Word of the Day.

This is a **learning project** for two people who are learning to code together. The goal is to learn by building something useful rather than simply following a tutorial.

The project will start very simple and gradually become more advanced.

---

# 🎯 Project Goal

Build a website that:

1. Displays a word.
2. Displays information about that word.
3. Gets words from a local JSON list.
4. Randomly selects a word.
5. Eventually displays a different Word of the Day every 24 hours.
6. Is hosted publicly using GitHub Pages.

The first version should be intentionally simple.

**Do not add APIs, databases, frameworks, accounts, or other complicated systems until the basic site works.**

---

# 🛠️ Technologies

For Version 1 we will use:

* **HTML** - Website structure
* **CSS** - Website appearance
* **JavaScript** - Website functionality
* **JSON** - Store our list of words
* **Git** - Version control
* **GitHub** - Store the project and collaborate
* **GitHub Pages** - Host the website

We should avoid frameworks such as React initially. The purpose of this project is to understand the fundamentals first.

---

# 📁 Planned File Structure

```text
word-of-the-day/
│
├── index.html
├── style.css
├── script.js
├── words.json
│
└── README.md
```

### `index.html`

Contains the structure of the webpage.

For example:

* Page title
* Word
* Definition
* Part of speech
* Pronunciation
* Example sentence
* Buttons

---

### `style.css`

Controls how the website looks.

Things such as:

* Fonts
* Sizes
* Spacing
* Background
* Colours
* Buttons
* Responsive design

---

### `script.js`

Controls the functionality.

Eventually it will:

* Load the word list
* Choose a word
* Display the word
* Display its definition
* Display pronunciation
* Display the example
* Handle buttons
* Determine the daily word

---

### `words.json`

Contains the words used by the website.

## JSON Schema

The initial schema for each word is:

| Field           | Type   | Required | Description                     |
| --------------- | ------ | -------- | ------------------------------- |
| `id`            | Number | Yes      | Unique identifier for the word  |
| `word`          | String | Yes      | The word itself                 |
| `definition`    | String | Yes      | Definition of the word          |
| `partOfSpeech`  | String | Yes      | Noun, verb, adjective, etc.     |
| `pronunciation` | String | No       | Easy-to-read pronunciation      |
| `example`       | String | No       | Example sentence using the word |

### Example

```json
{
  "words": [
    {
      "id": 1,
      "word": "Serendipity",
      "definition": "The occurrence of events by chance in a happy or beneficial way.",
      "partOfSpeech": "noun",
      "pronunciation": "ser-en-DIP-i-tee",
      "example": "Finding that little café was pure serendipity."
    },
    {
      "id": 2,
      "word": "Mellifluous",
      "definition": "Pleasantly smooth and musical to hear.",
      "partOfSpeech": "adjective",
      "pronunciation": "meh-LIF-loo-us",
      "example": "She had a mellifluous voice."
    }
  ]
}
```

### Schema rules

For Version 1:

* Every word must have a unique `id`.
* `word` must contain the word being displayed.
* `definition` must contain a definition.
* `partOfSpeech` should identify how the word is used.
* `pronunciation` can be omitted if one isn't available.
* `example` can be omitted if one isn't available.
* Keep the data consistent between entries.
* Avoid duplicate words.

### Future schema improvements

The schema may eventually be expanded to support:

* Multiple definitions
* Multiple parts of speech
* Difficulty levels
* Categories
* Word origins/etymology
* Audio pronunciation
* Synonyms
* Antonyms

These should **not** be added until they are actually needed.

---

# 🚧 Development Roadmap

## Phase 1 - Basic HTML

### Goal

Create a webpage that displays:

```text
WORD OF THE DAY

Serendipity

A fortunate discovery made by chance.

Noun

Pronunciation:
ser-en-DIP-i-tee

Example:
Finding that little café was pure serendipity.
```

### Learn

* HTML documents
* Elements
* Headings
* Paragraphs
* Divs
* Classes
* IDs
* Basic page structure

### Done when

The page opens in a browser and displays the information correctly.

---

# Phase 2 - Basic CSS

### Goal

Make the page look like an actual website.

Things to experiment with:

* Background
* Fonts
* Text size
* Alignment
* Spacing
* Cards
* Buttons
* Mobile layout

### Learn

* Selectors
* Classes
* IDs
* Box model
* Margin
* Padding
* Flexbox
* Responsive design

### Done when

The website looks reasonably good on both desktop and mobile.

---

# Phase 3 - Add JavaScript

### Goal

Move the word information into JavaScript and have JavaScript display it on the page.

Instead of manually writing the word into HTML, JavaScript should control what appears.

### Learn

* Variables
* Strings
* Objects
* Functions
* DOM manipulation
* `querySelector`
* Changing text with JavaScript

### Done when

Changing the word data changes what appears on the webpage.

---

# Phase 4 - Create Our Word List

### Goal

Create a collection of words using `words.json`.

Initially aim for:

**30-50 words**

Each word should contain:

* ID
* Word
* Definition
* Part of speech
* Pronunciation where available
* Example sentence where available

### Learn

* Arrays
* Objects
* JSON
* Structured data
* Reading external JSON data

### Done when

The website can access multiple words from `words.json`.

---

# Phase 5 - Random Word

### Goal

When the website loads, randomly select one word from our list.

Conceptually:

```text
Load website
      ↓
Load words.json
      ↓
Get list of words
      ↓
Generate random number
      ↓
Select word
      ↓
Display word
      ↓
Display definition
      ↓
Display other information
```

### Learn

* Array indexes
* `Math.random()`
* `Math.floor()`
* Functions
* Working with arrays
* JSON data

### Done when

Refreshing the page can display different words.

---

# Phase 6 - "Another Word" Button

### Goal

Add a button:

```text
[ Another Word ]
```

Clicking it should select another random word.

### Learn

* Events
* Event listeners
* Functions
* Buttons
* Reusing functions

### Done when

Clicking the button changes the displayed word without refreshing the page.

---

# Phase 7 - Git & GitHub Collaboration

We should use Git throughout the project rather than waiting until the end.

### Basic workflow

Before working:

```bash
git pull
```

Create a branch:

```bash
git checkout -b feature-name
```

Make changes.

Check what changed:

```bash
git status
```

Stage changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Add random word selection"
```

Push:

```bash
git push
```

Then create a Pull Request on GitHub.

---

## Collaboration Rules

### 1. Don't work directly on `main`

Use branches for changes.

Example:

```text
main
│
├── feature/random-word
├── feature/styling
└── feature/word-list
```

### 2. Keep commits small

Prefer:

```text
Add word data
Add random word function
Add another word button
Style word card
```

instead of:

```text
finished website
```

### 3. Review each other's work

Before merging a Pull Request:

* Read the code
* Test the feature
* Ask questions about anything unclear
* Check that existing features still work

The goal is for both people to understand the project.

### 4. Don't copy code you don't understand

Because this is a learning project, understanding the code is more important than getting the feature working quickly.

If something doesn't make sense, stop and figure out what it does.

---

# Phase 8 - GitHub Pages

Once the website works locally, publish it using GitHub Pages.

GitHub Pages can host HTML, CSS and JavaScript directly from a GitHub repository, so we don't need a separate web server.

The basic setup will be:

```text
GitHub Repository
       ↓
GitHub Pages
       ↓
Live Website
```

### Done when

We can send someone a URL and they can open the Word of the Day website.

---

# Phase 9 - Word of the Day

### Current behaviour

The first version will randomly select a word whenever the website loads.

```text
Page loads
    ↓
Random word
```

### Future behaviour

Eventually we want:

```text
Date
 ↓
Determine today's word
 ↓
Display today's word
```

For example:

```text
September 1 → Word A
September 2 → Word B
September 3 → Word C
September 4 → Word D
```

Everyone visiting the website on the same day should receive the same word.

This can be done entirely with JavaScript running in the visitor's browser.

**We do not need a server running every 24 hours.**

---

# 🔮 Future Features

These are intentionally NOT part of Version 1.

* [ ] Same Word of the Day for everyone
* [ ] Countdown until next word
* [ ] Previous Words
* [ ] Search words
* [ ] Favourite words
* [ ] Categories
* [ ] Difficulty levels
* [ ] Pronunciation
* [ ] Audio pronunciation
* [ ] Dark mode
* [ ] Animations
* [ ] Mobile optimisation
* [ ] Dictionary API
* [ ] Thousands of words
* [ ] Word history
* [ ] Daily streak
* [ ] Share today's word
* [ ] Social media sharing
* [ ] Custom domain

---

# 📚 Learning Principles

This project is about **learning to code**, not just producing a website.

### Rule 1

Try to solve problems before looking for the answer.

### Rule 2

If you copy something, understand what it does.

### Rule 3

Ask questions when something doesn't make sense.

### Rule 4

Use Git commits as checkpoints.

### Rule 5

Don't be afraid to break the website.

Breaking things is part of learning.

### Rule 6

Build one feature at a time.

Don't try to build the entire website in one go.

### Rule 7

Teach each other

If one person figures something out, explain it to the other person rather than simply committing the finished solution.

---

# ✅ Version 1 Definition of Done

Version 1 is complete when:

* [ ] Repository created
* [ ] `index.html` created
* [ ] Basic webpage created
* [ ] CSS added
* [ ] JavaScript added
* [ ] `words.json` created
* [ ] JSON follows the agreed schema
* [ ] At least 30 words added
* [ ] JavaScript loads `words.json`
* [ ] Random word selected
* [ ] Word displayed
* [ ] Definition displayed
* [ ] Part of speech displayed
* [ ] Pronunciation displayed when available
* [ ] Example displayed when available
* [ ] "Another Word" button works
* [ ] Project committed to Git
* [ ] Project pushed to GitHub
* [ ] GitHub Pages enabled
* [ ] Live website works

---

# 🧠 First Task

Don't start by writing the whole website.

Start with:

```text
1. Create the GitHub repository
2. Clone it in VS Code
3. Create index.html
4. Make a basic webpage
5. Commit it
6. Push it
```

Once that works, move to CSS.

**One small step at a time.**
