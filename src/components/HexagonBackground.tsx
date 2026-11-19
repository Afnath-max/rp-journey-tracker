'use client';

import React, { useEffect, useRef } from 'react';

interface HexagonCanvasProps {
  className?: string;
  theme?: 'bumblebee' | 'cyan';
}

export const HexagonBackground: React.FC<HexagonCanvasProps> = ({
  className = '',
  theme = 'bumblebee',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Hexagon math parameters
    const size = 38; // Radius of each hexagon
    const hexHeight = Math.sqrt(3) * size;
    const hexWidth = 2 * size;
    const horizDist = (3 / 2) * size;
    const vertDist = hexHeight;

    interface HexCell {
      x: number;
      y: number;
      baseAlpha: number;
      pulseSpeed: number;
      phase: number;
      glowIntensity: number;
    }

    const hexCells: HexCell[] = [];
    const cols = Math.ceil(width / horizDist) + 2;
    const rows = Math.ceil(height / vertDist) + 2;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * horizDist;
        const y = r * vertDist + (c % 2 === 1 ? vertDist / 2 : 0);
        hexCells.push({
          x,
          y,
          baseAlpha: 0.12 + Math.random() * 0.15,
          pulseSpeed: 0.8 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          glowIntensity: Math.random() > 0.65 ? 1 : 0.2,
        });
      }
    }

    const drawHexagon = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number
    ) => {
      context.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + radius * Math.cos(angle);
        const hy = y + radius * Math.sin(angle);
        if (i === 0) {
          context.moveTo(hx, hy);
        } else {
          context.lineTo(hx, hy);
        }
      }
      context.closePath();
    };

    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Deep dark futuristic background fill
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#090804');
      bgGrad.addColorStop(0.5, '#040402');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < hexCells.length; i++) {
        const cell = hexCells[i];
        // Breathing organic sinusoidal wave
        const breathing = Math.sin(elapsed * cell.pulseSpeed + cell.phase);
        // Normalize breathing to 0..1
        const normalizedBreath = (breathing + 1) / 2;

        const currentAlpha =
          cell.baseAlpha + normalizedBreath * 0.55 * cell.glowIntensity;

        // Colors tailored to Bumblebee honeycomb aesthetic
        const strokeColor =
          theme === 'bumblebee'
            ? `rgba(250, 204, 21, ${currentAlpha})` // vibrant yellow
            : `rgba(56, 189, 248, ${currentAlpha})`; // cyan alternative

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = cell.glowIntensity > 0.8 ? 1.8 : 1.0;

        // Subtle soft inner cell illumination on peak breathe
        if (cell.glowIntensity > 0.8 && normalizedBreath > 0.4) {
          ctx.shadowColor =
            theme === 'bumblebee'
              ? 'rgba(234, 179, 8, 0.65)'
              : 'rgba(56, 189, 248, 0.65)';
          ctx.shadowBlur = 10 * normalizedBreath;
        } else {
          ctx.shadowBlur = 0;
        }

        drawHexagon(ctx, cell.x, cell.y, size - 2);
        ctx.stroke();

        // Optional slight fill for active honeycombs
        if (cell.glowIntensity > 0.8 && normalizedBreath > 0.6) {
          ctx.fillStyle =
            theme === 'bumblebee'
              ? `rgba(234, 179, 8, ${0.04 * normalizedBreath})`
              : `rgba(56, 189, 248, ${0.04 * normalizedBreath})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};
