import { Container, Sprite } from "pixi.js";
import Gridbox from "./gridbox";

export default class Grid extends Container {
  constructor(x,y) { 
    super();
    this.x = x;
    this.y = y;
    this.cellSize = 75; 
    this.grid = [];
    this.buildGrid();
    this.deleteGridBox([1, 1])
    this.deleteGridBox([1, 3])
    this.deleteGridBox([2, 3]) 
  }

  buildGrid() {
    for (let row = 0; row < this.x; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.y; col++) {
        const box = new Gridbox();
        box.x = col * this.cellSize;
        box.y = row * this.cellSize;
        box.coord = [row,col]
        box.name = [row,",",col]
        console.log(box.coord);
        this.grid[row][col] = box;
        this.addChild(box);
      }
    }
  }

  placeLetter(x, y, letter) {
    if (this.grid[x]?.[y]) {
      this.grid[x][y].setLetter(letter);
    }
  }

  deleteGridBox(coord) {
    const [col, row] = coord;
    if (this.grid[col]?.[row]) {
      this.removeChild(this.grid[col][row]);
      this.grid[col][row] = null;
      return true;
    }
    return false;
  }
}