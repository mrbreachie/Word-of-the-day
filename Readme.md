# 📖 Word of the Day

A small web development project that displays a Word of the Day.

This is a **learning project** for two people who are learning to code together. The goal is to learn by building something useful rather than following a tutorial without understanding what the code does.

The project will start very simple and gradually become more advanced.

---

## 🎯 Project Goal

Build a website that:

1. Displays a word.
2. Displays information about that word.
3. Gets words from a local list.
4. Randomly selects a word.
5. Eventually displays a different Word of the Day every 24 hours.
6. Is hosted publicly using GitHub Pages.

The first version should be intentionally simple.

**Do not add APIs, databases, frameworks, accounts, or other complicated systems until the basic site works.**

---

# 🛠️ Technologies

For Version 1 we will use:

- **HTML** - Website structure
- **CSS** - Website appearance
- **JavaScript** - Website functionality
- **JSON** - Store our list of words
- **Git** - Version control
- **GitHub** - Store the project and collaborate
- **GitHub Pages** - Host the website

We should avoid frameworks such as React initially. The purpose of this project is to understand the fundamentals first.

---

# 📁 Planned File Structure

Eventually the project should look something like:

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

- Page title
- Word
- Definition
- Example sentence
- Buttons

---

### `style.css`

Controls how the website looks.

Things such as:

- Fonts
- Sizes
- Spacing
- Background
- Colours
- Buttons
- Responsive design

---

### `script.js`

Controls the functionality.

Eventually it will:

- Load the word list
- Choose a word
- Display the word
- Display its definition
- Handle buttons
- Determine the daily word

---

### `words.json`

Contains the words used by the website.

Example structure:

```json
[
    {
        "word": "Serendipity",
        "definition": "A fortunate discovery made by chance.",
        "example": "Finding that little café was pure serendipity."
    }
]
```

We can expand the information stored for each word later.

---

# 🚧 Development Roadmap

## Phase 1 - Basic HTML

### Goal

Create a webpage that displays:

```text
WORD OF THE DAY

Serendipity

A fortunate discovery made by chance.

Example:
Finding that little café was pure serendipity.
```

### Learn

- HTML documents
- Elements
- Headings
- Paragraphs
- Divs
- Classes
- IDs
- Basic page structure

### Done when

The page opens in a browser and displays the information correctly.

---

# Phase 2 - Basic CSS

### Goal

Make the page look like an actual website.

Things to experiment with:

- Background
- Fonts
- Text size
- Alignment
- Spacing
- Cards
- Buttons

### Learn

- Selectors
- Classes
- IDs
- Box model
- Margin
- Padding
- Flexbox
- Responsive design

### Done when

The website looks reasonably good on both desktop and mobile.

---

# Phase 3 - Add JavaScript

### Goal

Move the word information into JavaScript and have JavaScript display it on the page.

Instead of manually writing the word into HTML, JavaScript should control what appears.

### Learn

- Variables
- Strings
- Objects
- Functions
- DOM manipulation
- `querySelector`
- Changing HTML/text with JavaScript

### Done when

Changing the word in JavaScript changes what appears on the webpage.

---

# Phase 4 - Create Our Word List

### Goal

Create a collection of words.

Initially aim for around:

**30-50 words**

Each word should contain:

- Word
- Definition
- Example sentence

Example:

```json
{
    "word": "Mellifluous",
    "definition": "Pleasantly smooth and musical to hear.",
    "example": "She had a mellifluous voice."
}
```

### Learn

- Arrays
- Objects
- JSON
- Structured data

### Done when

The website can access multiple words.

---

# Phase 5 - Random Word

### Goal

When the website loads, randomly select one word from our list.

Conceptually:

```text
Load website
      ↓
Load word list
      ↓
Count available words
      ↓
Generate random number
      ↓
Select word
      ↓
Display word
```

### Learn

- Array indexes
- `Math.random()`
- `Math.floor()`
- Functions
- Working with arrays

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

- Events
- Event listeners
- Functions
- Buttons
- Reusing functions

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

### 3. Explain your code

Because this is a learning project, don't just copy code without understanding it.

If one of us writes something we don't understand, ask:

> "What does this line actually do?"

Understanding the code is more important than getting the feature working quickly.

---

# Phase 8 - GitHub Pages

Once the website works locally, publish it using GitHub Pages.

GitHub Pages can host HTML, CSS and JavaScript directly from a GitHub repository, so we don't need to pay for a separate web server.

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

### Important

The first random version does **not** need anything running on a server.

JavaScript runs in the visitor's browser.

We can eventually change the logic from:

```text
Pick a random word whenever the page loads
```

to:

```text
Determine today's date
        ↓
Use today's date to select a word
        ↓
Everyone gets the same word
```

For example:

```text
September 1 → Word A
September 2 → Word B
September 3 → Word C
September 4 → Word D
```

This means the word can change every 24 hours while still being hosted entirely as a static GitHub Pages website.

We do **not** need a server running constantly to accomplish this.

---

# 🔮 Future Features

These are intentionally NOT part of Version 1.

Once the basic project works, we can consider:

- [ ] Same Word of the Day for everyone
- [ ] Countdown until next word
- [ ] Previous Words
- [ ] Search words
- [ ] Favourite words
- [ ] Categories
- [ ] Difficulty levels
- [ ] Pronunciation
- [ ] Audio pronunciation
- [ ] Dark mode
- [ ] Animations
- [ ] Mobile optimisation
- [ ] Dictionary API
- [ ] Thousands of words
- [ ] Word history
- [ ] Daily streak
- [ ] Share today's word
- [ ] Social media sharing
- [ ] Custom domain

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

---

# ✅ Version 1 Definition of Done

Version 1 is complete when:

- [ ] Repository created
- [ ] `index.html` created
- [ ] Basic webpage created
- [ ] CSS added
- [ ] JavaScript added
- [ ] `words.json` created
- [ ] At least 30 words added
- [ ] JavaScript loads the word list
- [ ] Random word selected
- [ ] Word displayed
- [ ] Definition displayed
- [ ] Example displayed
- [ ] "Another Word" button works
- [ ] Project committed to Git
- [ ] Project pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Live website works

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