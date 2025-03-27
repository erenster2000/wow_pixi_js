import { Sprite, Text, Container } from "pixi.js";

export default class Gridbox extends Container {
  constructor() {
    super();
    this.bg = Sprite.from("rect");
    this.bg.width = this.bg.height = 50;
    this.addChild(this.bg);
    this.scale.set(1.2,1.2)
    this.coord = []

    this.letterText = new Text("", {
      fill: 0x000000,
      fontSize: 24,
      fontWeight: "bold"
    });
    this.letterText.anchor.set(0.5);
    this.letterText.position.set(25, 25);
    this.addChild(this.letterText);
  }

  setLetter(letter) {
    this.letterText.text = letter;
  }
}