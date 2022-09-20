import { useRef, useState } from 'react';

import Menu from '../components/Menu';
import { randomColor, nextColor } from '../Color';

const Home = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [timer, setTimer] = useState(0);

  const updateCanvas = (configs: GenerateConfig) => {
    if (ref && ref.current) {
      const start = performance.now();
      const { width, height, chaos, method } = configs;
      const ctx = ref.current.getContext('2d', { willReadFrequently: true });
      const initColor = randomColor();
      const d = new Uint8ClampedArray(width * height * 4);
      d[0] = initColor.r;
      d[1] = initColor.g;
      d[2] = initColor.b;
      // d[0] = 215;
      // d[1] = 151;
      // d[2] = 156;
      d[3] = 255;

      const drawNext = (x: number, y: number) => {
        let pixels: Array<Uint8ClampedArray> = [];
        let i = (y * width + x) * 4, // current coordinate
          t = ((y - 1) * width + x) * 4, // top pixel coordinate
          l = (y * width + (x - 1)) * 4; // left pixel coordinate
        if (y - 1 >= 0) pixels.push(new Uint8ClampedArray([d[t], d[t + 1], d[t + 2], d[t + 3]]));
        if (x - 1 >= 0) pixels.push(new Uint8ClampedArray([d[l], d[l + 1], d[l + 2], d[l + 3]]));

        const c = nextColor(pixels, chaos, method);
        d[i] = c.r;
        d[i + 1] = c.g;
        d[i + 2] = c.b;
        d[i + 3] = 255;
      };

      ref.current.width = width;
      ref.current.height = height;

      for (let x = 1; x < width; x++) for (let y = 0; y <= x; y++) drawNext(x - y, y); // ◤
      for (let y = 1; y < height; y++) for (let i = y; i < height; i++) drawNext(width + y - i - 1, i); // ◢
      const imageData = new ImageData(d, width, height);
      ctx.putImageData(imageData, 0, 0);
      const end = performance.now();
      setTimer(end - start);
    }
  };

  const loopCanvas = (configs: GenerateConfig) => {
    setInterval(updateCanvas, 50, configs);
  };

  return (
    <div className="flex min-h-screen min-w-full items-center justify-center bg-black" suppressHydrationWarning>
      <Menu apply={updateCanvas} />
      <div className="fixed left-2 top-2 text-sm text-white">
        <p>{timer / 1000} s</p>
      </div>
      <div className="overflow-hidden rounded-sm bg-black p-1 ring-2 ring-white ring-offset-2 ring-offset-black">
        <canvas ref={ref} className="bg-white" />
      </div>
    </div>
  );
};

export default Home;
