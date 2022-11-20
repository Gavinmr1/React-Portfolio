import { useLayoutEffect } from "react";
import tw from "twin.macro";
import Map from "../miniGame/images/miniGameMap.png";

import playerUp from "../miniGame/images/playerUp.png";
import playerLeft from "../miniGame/images/playerLeft.png";
import playerDown from "../miniGame/images/playerDown.png";
import playerRight from "../miniGame/images/playerRight.png";

import ForegroundImage from "../miniGame/images/foregroundObjects.png";
import { collisions } from "../miniGame/data/collisions.js";
import { Boundary, Sprite } from "../miniGame/classes.js";

export default function Post() {
  useLayoutEffect(() => {
    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");

    canvas.width = 1024;
    canvas.height = 576;

    const collisionMap = [];
    for (let i = 0; i < collisions.length; i += 70) {
      collisionMap.push(collisions.slice(i, i + 70));
    }

    const boundaries = [];
    const offset = {
      x: -738,
      y: -330,
    };

    collisionMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025) {
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          );
        }
      });
    });

    const foregroundImage = new Image();
    foregroundImage.src = ForegroundImage;

    const playerDownImage = new Image();
    playerDownImage.src = playerDown;

    const playerUpImage = new Image();
    playerUpImage.src = playerUp;

    const playerLeftImage = new Image();
    playerLeftImage.src = playerLeft;

    const playerRightImage = new Image();
    playerRightImage.src = playerRight;

    const image = new Image();
    image.src = Map;

    const player = new Sprite({
      position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
      },
      image: playerDownImage,
      frames: {
        max: 4,
      },
      sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        down: playerDownImage,
        right: playerRightImage,
      },
    });

    const background = new Sprite({
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: image,
    });

    const foreground = new Sprite({
      position: {
        x: offset.x,
        y: offset.y,
      },
      image: foregroundImage,
    });

    const keys = {
      up: { pressed: false },
      left: { pressed: false },
      down: { pressed: false },
      right: { pressed: false },
    };

    const movables = [background, ...boundaries, foreground];

    function rectangularCollision({ rectangle1, rectangle2 }) {
      return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x + 6 && //left
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width - 6 && //right
        rectangle1.position.y <=
          rectangle2.position.y + rectangle2.height - 40 && //up
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y //downs
      );
    }

    function Animate() {
      window.requestAnimationFrame(Animate);
      background.draw(c);
      player.draw(c);
      foreground.draw(c);
      boundaries.forEach((boundary) => {
        boundary.draw(c);
      });

      let moving = true;
      player.moving = false;
      if (keys.up.pressed && lastKey === "up") {
        player.moving = true;
        player.image = player.sprites.up;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving)
          movables.forEach((movable) => {
            movable.position.y += 3;
          });
      } else if (keys.left.pressed && lastKey === "left") {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x + 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving)
          movables.forEach((movable) => {
            movable.position.x += 3;
          });
      } else if (keys.down.pressed && lastKey === "down") {
        player.moving = true;
        player.image = player.sprites.down;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving)
          movables.forEach((movable) => {
            movable.position.y -= 3;
          });
      } else if (keys.right.pressed && lastKey === "right") {
        player.moving = true;
        player.image = player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x - 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving)
          movables.forEach((movable) => {
            movable.position.x -= 3;
          });
      }
    }
    Animate();

    let lastKey = "";

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
          keys.up.pressed = true;
          lastKey = "up";
          break;
        case "ArrowUp":
          keys.up.pressed = true;
          lastKey = "up";
          break;
        case "a":
          keys.left.pressed = true;
          lastKey = "left";
          break;
        case "ArrowLeft":
          keys.left.pressed = true;
          lastKey = "left";
          break;
        case "s":
          keys.down.pressed = true;
          lastKey = "down";
          break;
        case "ArrowDown":
            keys.down.pressed = true;
            lastKey = "down";
            break;
        case "d":
          keys.right.pressed = true;
          lastKey = "right";
          break;
        case "ArrowRight":
          keys.right.pressed = true;
          lastKey = "right";
          break;
        default:
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
          keys.up.pressed = false;
          break;
        case "ArrowUp":
          keys.up.pressed = false;
          break;
        case "a":
          keys.left.pressed = false;
          break;
        case "ArrowLeft":
          keys.left.pressed = false;
          break;
        case "s":
          keys.down.pressed = false;
          break;
        case "ArrowDown":
          keys.down.pressed = false;
          break;
        case "d":
          keys.right.pressed = false;
          break;
        case "ArrowRight":
          keys.right.pressed = false;
          break;
        default:
      }
    });
  }, []);

  return (
    <MiniGameContainer>
      <Header>Play My Mini Game!!</Header>
      <Canvas></Canvas>
    </MiniGameContainer>
  );
}

const MiniGameContainer = tw.div`pt-12 h-full w-full bg-gray-800 flex flex-col justify-center items-center`;
const Header = tw.h1`text-white text-lg font-semibold pb-8`;
const Canvas = tw.canvas`w-4/5`;
