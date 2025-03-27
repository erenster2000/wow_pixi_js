import { Container, Sprite, Text } from "pixi.js";
import { GAME_WIDTH } from ".";
import WriteBoard from "./writeboard";

export default class Writer extends Container {
  constructor(letters = ["G", "O", "D", "L"]) {
    super();
    this.letters = letters;
    this.writtenWord = [];
    this.words = [
      ["GOLD", [0,0,"G"], [0,1,"O"], [0,2,"L"], [0,3,"D"]],
      ["GOD", [0,0,"G"], [1,0,"O"], [2,0,"D"]],
      ["LOG", [0,2,"L"], [1,2,"O"], [2,2,"G"]],
      ["DOG", [2,0,"D"], [2,1,"O"], [2,2,"G"]]
    ];
    this.init();
    this.maxLength = 4
  }

  init() {
    this.createBubble();
    this.addShuffleButton();
    this.positionLetters();
  }

  createBubble() {
    this.bubbleContainer = new Container();
    this.bubbleContainer.position.set(GAME_WIDTH / 2, 630);
    this.bubble = Sprite.from("bubble_white");
    this.bubble.anchor.set(0.5);
    this.bubble.scale.set(0.9);
    this.bubble.alpha = 0.9;
    this.bubbleContainer.addChild(this.bubble);
    this.addChild(this.bubbleContainer);
  }

  addShuffleButton() {
    this.shuffleButton = Sprite.from("shuffle");
    this.shuffleButton.anchor.set(0.5);
    this.shuffleButton.scale.set(0.1);
    this.shuffleButton.interactive = true;
    this.shuffleButton.cursor = "pointer";
    this.shuffleButton.on("pointerdown", () => this.shuffleLetters());
    this.bubbleContainer.addChild(this.shuffleButton);
  }

  positionLetters() {
    const positions = [
      { x: -100, y: 0 },  // Sol
      { x: 0, y: -100 },   // Üst
      { x: 100, y: 0 },    // Sağ
      { x: 0, y: 100 }     // Alt
    ];
    this.letterTexts = [];
    this.letters.forEach((letter, index) => {
      const letterText = this.createLetterText(letter, positions[index]);
      this.bubbleContainer.addChild(letterText);
      this.letterTexts.push(letterText);
    });
  }

  createLetterText(letter, position) {
    const text = new Text(letter, {
      fontFamily: "Arial",
      fontSize: 45,
      fill: 0xff9933,
      fontWeight: "bold"
    });
    text.anchor.set(0.5);
    text.position.set(position.x, position.y);
    text.interactive = true;
    text.cursor = "pointer";
    text.on("pointerdown", () => this.handleLetterClick(letter, text));
    return text;
  }

  handleLetterClick(letter, textObj) {
    textObj.alpha = 0.5;
    setTimeout(() => { textObj.alpha = 1; }, 200);
    this.writtenWord.push(letter);
    const writeBoard = this.parent.getChildByName("Write Board");
    if (writeBoard) {
      writeBoard.updateWord(this.writtenWord.join(""));
    }
    this.checkWord();
  }

  checkWord() {
    const writtenWordStr = this.writtenWord.join("").toUpperCase();
    const foundWord = this.words.find(w => w[0] === writtenWordStr);
    if (foundWord) {
      this.placeWordOnGrid(foundWord);
      this.writtenWord = [];
      const writeBoard = this.parent.getChildByName("Write Board");
      if (writeBoard) {
        writeBoard.clearWord();
      }
    } else if (this.writtenWord.length >= this.maxLength) {
      this.writtenWord = [];
      const writeBoard = this.parent.getChildByName("Write Board");
      if (writeBoard) {
        writeBoard.clearWord();
      }
    }
  }

  placeWordOnGrid(wordData) {
    const grid = this.parent.getChildByName("Grid");
    if (!grid) {
      return;
    }
    for (let i = 1; i < wordData.length; i++) {
      const [row, col, letter] = wordData[i];
      grid.placeLetter(row, col, letter);
    }
  }

  shuffleLetters() {
    for (let i = this.letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.letters[i], this.letters[j]] = [this.letters[j], this.letters[i]];
    }
    this.letterTexts.forEach(text => this.bubbleContainer.removeChild(text));
    this.letterTexts = [];
    const positions = [
      { x: -100, y: 0 },
      { x: 0, y: -100 },
      { x: 100, y: 0 }, 
      { x: 0, y: 100 }
    ];
    
    this.letters.forEach((letter, index) => {
      const text = this.createLetterText(letter, positions[index]);
      this.bubbleContainer.addChild(text);
      this.letterTexts.push(text);
    });

    this.writtenWord = [];
    const writeBoard = this.parent.getChildByName("Write Board");
    if (writeBoard) {
      writeBoard.clearWord();
    }
  }
}