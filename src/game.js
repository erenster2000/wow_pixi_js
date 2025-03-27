import gsap, { Power0 } from "gsap";
import { Container, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from ".";
import Writer from "./writer";
import Grid from "./grid";
import PlayBoard from './play_now';
import WriteBoard from "./writeboard";

export default class Game extends Container {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.background = Sprite.from("background");
    this.background.name = "Background";
    this.background.width = GAME_WIDTH;
    this.background.height = GAME_HEIGHT;
    this.addChild(this.background);

    this.writeboard = new WriteBoard();
    this.writeboard.name = "Write Board";
    this.addChild(this.writeboard);
    
    this.writer = new Writer(["G", "O", "D", "L"], this.writeboard);
    this.addChild(this.writer);

    this.grid = new Grid(3,4); 
    this.grid.name = "Grid";
    this.grid.pivot.set(this.grid.width/2, this.grid.height/2);
    this.grid.position.set(GAME_WIDTH/2, 300);
    this.addChild(this.grid);

    this.install = new PlayBoard();
    this.install.name = "Install Button";
    this.addChild(this.install);
  }
}