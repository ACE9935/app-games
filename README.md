# app-games 🎮

**app-games** is a fun and interactive platform offering 4 mini-games to test your skills and reflexes. Built with React, it allows users to play games like **Rock-Paper-Scissors**, **Hangman**, **Memorization Game**, and **Type Racer** all in one place. Whether you're looking to challenge yourself or just kill time, this app has something for everyone!

---

## 🕹️ Mini-Games

### 🧩 Hangman
**Hangman** is a classic word-guessing game where the player has to guess a hidden word by suggesting letters. With each incorrect guess, a part of the stick figure is drawn. If the player guesses the word before the figure is fully drawn, they win!

### ⌨️ Type Racer
**Type Racer** is a fast-paced typing game where the goal is to type a passage as quickly and accurately as possible. The faster you type, the better your score! Test your typing speed and accuracy while racing against time.

### 🧠 Memorization Game
**Memorization Game** is a challenging game where the player needs to match pairs of items on a grid. You can choose to play solo or against the computer, with the option of selecting grid sizes.
  - The computer opponent gets smarter as the difficulty increases (easy, normal, and hard). 
  - At higher difficulty levels, the computer starts remembering previously revealed spots and tries to find duplicates in the grid to maximize its chances of winning.
  - The algorithm the computer uses ensures it avoids random spots, focusing on spots it has already revealed, making it more difficult at higher levels. The difficulty simply controls how fast the computer remembers the discovered spots. For example, at **hard** difficulty, the computer remembers 100% of discovered spots.
  
  For more details about how the computer algorithm works, check out the implementation in this [Matchcomputer.js file](https://github.com/ACE9935/app-games/blob/master/src/app-state/Matchcomputer.js).

### ✊ Rock-Paper-Scissors
**Rock-Paper-Scissors** is the well-known hand game where rock beats scissors, scissors beats paper, and paper beats rock. In this version, you can play against the computer, and it features a set number of rounds to test your skill and luck!

---

## ⚙️ State Management
Each game has a saving system powered by **Redux**. The global app state tracks the progress of each game, and users can hop between games without losing their progress. However, please note that progress is lost upon page reload or close, as all saved data is stored in the session.

---

## 🛠 Tech Stack
- **Frontend**: React
- **State Management**: Redux
- **No Backend**: Entirely client-side app

---

## 🚀 Getting Started

To run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/ACE9935/app-games.git
cd app-games
