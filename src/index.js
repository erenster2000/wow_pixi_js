import * as PIXI from "pixi.js";
import { Application } from "pixi.js";
import { initAssets } from "./assets";
import { gsap } from "gsap";
import { CustomEase, PixiPlugin } from "gsap/all";
import Game from "./game";
import { initDevtools } from "@pixi/devtools";

export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 800;

export const app = new Application({
  backgroundColor: 0x000000,
  antialias: true,
  hello: true,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

initDevtools({app});

app.ticker.stop();
gsap.ticker.add(() => {
  app.ticker.update();
});

async function init() {

  document.body.appendChild(app.view);

  let assets = await initAssets();
  console.log("assets", assets);

  gsap.registerPlugin(PixiPlugin, CustomEase);
  PixiPlugin.registerPIXI(PIXI);

  const game = new Game();
  game.name = "Game";
  app.stage.addChild(game)
}

init();
