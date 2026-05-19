import { ref } from "vue";
import { rand } from "@/utils/is";
import { randomColor } from "@/utils/color";

const draw = (dom: HTMLCanvasElement, width: number, height: number) => {
  const NUMBER_STRING = "0123456789";

  let imgCode = "";

  const ctx = dom.getContext("2d");

  if (!ctx) return imgCode;

  ctx.fillStyle = randomColor(180, 230);
  ctx.fillRect(0, 0, width, height);

  for (let index = 0; index < 4; index++) {
    const text = NUMBER_STRING[rand(0, NUMBER_STRING.length - 1)];
    imgCode += text;

    const fontSize = rand(18, 40);
    const deg = rand(-30, 30);

    ctx.font = `${fontSize}px Simhei`;
    ctx.textBaseline = "top";
    ctx.fillStyle = randomColor(80, 150);
    ctx.save();
    ctx.translate(30 * index + 15, 15);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(text, -15 + 5, -15);
    ctx.restore();
  }

  for (let index = 0; index < 5; index++) {
    ctx.beginPath();
    ctx.moveTo(rand(0, width), rand(0, height));
    ctx.lineTo(rand(0, width), rand(0, height));
    ctx.strokeStyle = randomColor(180, 230);
    ctx.closePath();
    ctx.stroke();
  }

  for (let index = 0; index < 41; index++) {
    ctx.beginPath();
    ctx.arc(rand(0, width), rand(0, height), 1, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = randomColor(150, 200);
    ctx.fill();
  }

  return imgCode;
};

export const useImageVerify = (width = 120, height = 40) => {
  const domRef = ref<HTMLCanvasElement>();
  const imgCode = ref<string>("");

  const setImgCode = (code: string) => {
    imgCode.value = code;
  };

  const getImgCode = () => {
    if (!domRef.value) return;
    imgCode.value = draw(domRef.value, width, height);
  };

  return {
    domRef,
    imgCode,
    setImgCode,
    getImgCode,
  };
};
