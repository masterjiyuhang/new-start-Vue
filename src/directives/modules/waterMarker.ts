import type { Directive, DirectiveBinding } from "vue";

const watermarkDirective: Directive = {
  mounted(el, binding: DirectiveBinding) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    // 水印文字，父元素，字体，文字颜色
    const text = binding.value?.text || "Watermark";
    const font = binding.value.font || "20px Arial";
    const textColor = binding.value.textColor || "red";

    const width = ctx.measureText(text).width;
    console.log(width);
    const height = 140;
    canvas.width = width + 120 > 205 ? 205 : width + 120;
    canvas.height = height;
    canvas.style.display = "none";

    ctx.rotate((-30 * Math.PI) / 180);
    ctx.font = font;
    ctx.fillStyle = textColor;
    ctx.textAlign = "left";
    ctx.textBaseline = "Middle" as CanvasTextBaseline;
    ctx.fillText(text, canvas.width / 10, canvas.height / 2);

    el.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
  },
};

export default watermarkDirective;
