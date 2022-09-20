import { random } from 'lodash';

export class Color {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  nextColor(gap: number) {
    const { r, g, b } = this;
    this.r = fixColorNum(random(r - gap, r + gap));
    this.g = fixColorNum(random(g - gap, g + gap));
    this.b = fixColorNum(random(b - gap, b + gap));
  }

  toUint8Array(): Uint8ClampedArray {
    const { r, g, b } = this;
    return new Uint8ClampedArray([r, g, b, 255]);
  }
}

export const fixColorNum = (colorNum: number) => {
  if (colorNum < 0) {
    return fixColorNum(Math.abs(colorNum));
  } else if (colorNum > 255) {
    return fixColorNum(510 - colorNum);
  } else {
    return colorNum;
  }
};

export const randomColor = (): Color => {
  return new Color(random(0, 255), random(0, 255), random(0, 255));
};

const average = (colors: Array<Color>, chaos: number): Color => {
  const avgColor = new Color(
    colors.reduce((a, c) => a + c.r, 0) / colors.length,
    colors.reduce((a, c) => a + c.g, 0) / colors.length,
    colors.reduce((a, c) => a + c.b, 0) / colors.length
  );
  avgColor.nextColor(chaos);
  return avgColor;
};

const darken = (colors: Array<Color>, chaos: number): Color => {
  const avgColor = new Color(
    Math.floor(colors.reduce((a, c) => a + c.r, 0) / colors.length),
    Math.floor(colors.reduce((a, c) => a + c.g, 0) / colors.length),
    Math.floor(colors.reduce((a, c) => a + c.b, 0) / colors.length)
  );
  avgColor.nextColor(chaos);
  return avgColor;
};

const lighten = (colors: Array<Color>, chaos: number): Color => {
  const avgColor = new Color(
    Math.ceil(colors.reduce((a, c) => a + c.r, 0) / colors.length),
    Math.ceil(colors.reduce((a, c) => a + c.g, 0) / colors.length),
    Math.ceil(colors.reduce((a, c) => a + c.b, 0) / colors.length)
  );
  avgColor.nextColor(chaos);
  return avgColor;
};

export const nextColor = (pixels: Array<Uint8ClampedArray>, chaos = 2, method?: Method): Color => {
  const colors = pixels.map((px) => new Color(px[0], px[1], px[2]));
  switch (method) {
    case 'darken':
      return darken(colors, chaos);
    case 'lighten':
      return lighten(colors, chaos);
    default:
      return average(colors, chaos);
  }
};
