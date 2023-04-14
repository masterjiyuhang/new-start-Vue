import { ref, onMounted } from "vue";

function randomNumber(min: number, max: number) {
  const num = Math.floor(Math.random() * (max - min) + min);
  return num;
}

const randomColor = (min: number, max: number) => {
  const r = randomNumber(min, max);
  const g = randomNumber(min, max);
  const b = randomNumber(min, max);

  return `rgb(${r},${g},${b})`;
};

const draw = (dom: HTMLCanvasElement, width: number, height: number) => {
  const NUMBER_STRING = "0123456789";

  let imgCode = "";

  const ctx = dom.getContext("2d");

  if (!ctx) return imgCode;

  ctx.fillStyle = randomColor(180, 230);
  ctx.fillRect(0, 0, width, height);

  for (let index = 0; index < 4; index++) {
    const text = NUMBER_STRING[randomNumber(0, NUMBER_STRING.length)];
    imgCode += text;

    const fontSize = randomNumber(18, 41);
    const deg = randomNumber(-30, 30);

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
    ctx.moveTo(randomNumber(0, width), randomNumber(0, height));
    ctx.lineTo(randomNumber(0, width), randomNumber(0, height));
    ctx.strokeStyle = randomColor(180, 230);
    ctx.closePath();
    ctx.stroke();
  }

  for (let index = 0; index < 41; index++) {
    ctx.beginPath();
    ctx.arc(randomNumber(0, width), randomNumber(0, height), 1, 0, 2 * Math.PI);
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

  onMounted(() => {
    getImgCode();
  });

  return {
    domRef,
    imgCode,
    setImgCode,
    getImgCode,
  };
};
