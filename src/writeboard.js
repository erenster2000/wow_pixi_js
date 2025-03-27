import gsap, { Power0 } from "gsap";
import { Container, Sprite, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";

export default class WriteBoard extends Container {
  constructor() {
    super();
    this.name = "Write Board"; 
    this.writtenWord = "";
    this.init();
  }

  init() {
    let sprite = Sprite.from("orange_pane");
    this.addChild(sprite);

    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(GAME_WIDTH/2, GAME_HEIGHT/2 + 50);
    sprite.scale.set(0.55, 0.55);

    this.wordDisplay = new Text("", {
      fontFamily: "Arial",
      fontSize: 36,
      fill: 0xffffff,
      fontWeight: "bold"
    });
    this.wordDisplay.anchor.set(0.5);
    this.wordDisplay.position.set(GAME_WIDTH/2, GAME_HEIGHT/2 + 50);
    this.addChild(this.wordDisplay);
  }

  updateWord(word) {
    this.writtenWord = word;
    this.wordDisplay.text = this.writtenWord;
  }

  clearWord() {
    this.updateWord("");
  }
}