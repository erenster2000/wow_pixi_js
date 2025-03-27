import gsap, { Power0 } from "gsap";
import { Container, Sprite, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";

export default class PlayBoard extends Container {
  constructor() {
    super();
    this.base = null;
    this.button = null;
    this.text = null;
    this.init();
  }

  init() {
    this.base = new Container();
    this.addChild(this.base);
    this.base.x = GAME_WIDTH * 0.5;
    this.base.y = 750;
    this.base.scale.set(1.2);
    
    this.button = Sprite.from("install");
    this.base.addChild(this.button);
    this.button.anchor.set(0.5);

    this.text = new Text("PLAY NOW!", {
      fill: 0xffffff,
      fontSize: 25,
      fontFamily: "Sniglet-Regular"
    });
    this.text.zIndex = 1;
    this.base.addChild(this.text);
    this.text.name = "PLAY NOW!";
    this.text.anchor.set(0.5);

    gsap.to(this.base, {
      pixi: {
        scale: 1.5,
      },
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.easeInOut",
    });
  }


}