import { useRef, useEffect, useCallback, useState } from 'react';
import { defaultConfig } from './fixtures';
import { MathX } from './lib';
import generateParticle from './lib/particle-generator';

interface StarryBackgroundProps {
  width?: number;
  height?: number;
  config?: {
    layers: {
      speed: number;
      scale: number;
      count: number;
    }[];
    starsAngle: number;
    starBaseRadius: number;
  };
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({
  config = defaultConfig,
  width,
  height,
}) => {
  const { layers, starsAngle, starBaseRadius } = config;

  const canvasRef = useRef(null);
  const [stars, setStars] = useState<any>([]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, frameCount: number) => {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.update();
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fill();
        if (star.x > width) {
          star.x = 0;
        }
        if (star.x < 0) {
          star.x = width;
        }
        if (star.y > height) {
          star.y = 0;
        }
        if (star.y < 0) {
          star.y = height;
        }
      }
    },
    [stars]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
      for (const layer of layers) {
        for (let i = 0; i < layer.count; i++) {
          const star = generateParticle().create(
            MathX.randomRange(0, ctx.canvas.width),
            MathX.randomRange(0, ctx.canvas.height),
            0,
            0
          );
          star.radius = starBaseRadius * layer.scale;
          star.setSpeed(layer.speed);
          star.setHeading(MathX.degreesToRads(starsAngle));
          setStars((prevState: any) => [...prevState, star]);
        }
      }
    }
  }, [layers, starBaseRadius, starsAngle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context: CanvasRenderingContext2D = canvas.getContext('2d');
      let frameCount = 0;
      let animationFrameId: number;

      //Our draw came here
      const render = () => {
        frameCount++;
        draw(context, frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [draw]);

  return (
    <canvas
      width={width}
      height={height}
      className="absolute left-0 top-0"
      ref={canvasRef}
    />
  );
};

export default StarryBackground;

// functions taken from https://www.tnonline.co.uk/
