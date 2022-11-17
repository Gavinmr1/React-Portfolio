import { useLayoutEffect } from "react";
import tw from "twin.macro";
import Map from "../miniGame/images/miniGameMap.png";
import playerDown from "../miniGame/images/playerDown.png";

export default function Post() {
  useLayoutEffect(() => {
    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");

    canvas.width = 1024;
    canvas.height = 576;

    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    const playerImage = new Image();

    image.src = Map;
    playerImage.src = playerDown;

    class Sprite {
      constructor({ position, image, velosity }) {
        this.position = position;
        this.image = image;
        this.velosity = velosity;
      }

      draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
      }
    }

    const background = new Sprite({
      position: {
        x: -738,
        y: -300,
      },
      image: image,
    });

    const keys = {
      up: { pressed: false },
      left: { pressed: false },
      down: { pressed: false },
      right: { pressed: false },
    };

    function Animate() {
      window.requestAnimationFrame(Animate);
      background.draw();
      c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 4 / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
      );

      if (keys.up.pressed) background.position.y = background.position.y + 3;
      else if (keys.left.pressed)
        background.position.x = background.position.x + 3;
      else if (keys.down.pressed)
        background.position.y = background.position.y - 3;
      else if (keys.right.pressed)
        background.position.x = background.position.x - 3;
    }
    Animate();

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w" || "ArrowUp":
          keys.up.pressed = true;
          break;
        case "a" || "ArrowLeft":
          keys.left.pressed = true;
          break;
        case "s" || "ArrowDown":
          keys.down.pressed = true;
          break;
        case "d" || "ArrowRight":
          keys.right.pressed = true;
          break;
        default:
      }
    });

    window.addEventListener("keyup", (e) => {
        switch (e.key) {
            case "w" || "ArrowUp":
              keys.up.pressed = false;
              break;
            case "a" || "ArrowLeft":
              keys.left.pressed = false;
              break;
            case "s" || "ArrowDown":
              keys.down.pressed = false;
              break;
            case "d" || "ArrowRight":
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
