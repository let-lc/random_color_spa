import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { random } from 'lodash';

class Color {
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

  toString(): string {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const fixColorNum = (colorNum: number) => {
  if (colorNum < 0) {
    return fixColorNum(Math.abs(colorNum));
  } else if (colorNum > 255) {
    return fixColorNum(510 - colorNum);
  } else {
    return colorNum;
  }
};

const randomColor = (): Color => {
  return new Color(random(0, 255), random(0, 255), random(0, 255));
};

const Home = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref && ref.current) loop();
  }, []);

  const loop = async () => {
    const ctx = ref.current.getContext('2d');
    const { width, height } = ref.current;

    const color = randomColor();

    const draw = async (x: number, y: number) => {
      color.nextColor(5);
      ctx.fillStyle = color.toString();
      ctx.fillRect(x, y, 1, 1);
      await sleep(0);
    };

    // ◤
    for (let x = 0; x <= width; x++) {
      for (let y = 0; y <= x && y <= height; y++) {
        await draw(x - y, y);
      }
    }

    // ◢
    for (let y = 1; y <= height; y++) {
      for (let i = y; i <= height; i++) {
        await draw(width + y - i, i);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Next.js/TailwindCSS/TypeScript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen min-w-full items-center justify-center" suppressHydrationWarning>
        <canvas ref={ref} width={1600} height={900} />
      </div>
    </>
  );
};

export default Home;
