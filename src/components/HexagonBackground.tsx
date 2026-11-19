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

    // Hexagon geometric parameters
    const size = 36;
    const hexHeight = Math.sqrt(3) * size;
    const horizDist = (3 / 2) * size;
    const vertDist = hexHeight;

    interface HexCell {
      x: number;
      y: number;
      baseAlpha: number;
      pulseSpeed: number;
      phase: number;
      isAccent: boolean;
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
          // Subtle, elegant alpha so it's not overpowering
          baseAlpha: 0.05 + Math.random() * 0.08,
          pulseSpeed: 0.6 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          isAccent: Math.random() > 0.72,
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

      // Sophisticated Lighter Obsidian Slate Gradient (Dark Charcoal / Graphite instead of pitch black)
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        80,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, '#1c1b17'); // Soft warm graphite charcoal
      bgGrad.addColorStop(0.5, '#121210'); // Deep charcoal
      bgGrad.addColorStop(1, '#0c0c0a'); // Dark slate carbon
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < hexCells.length; i++) {
        const cell = hexCells[i];
        const breathing = Math.sin(elapsed * cell.pulseSpeed + cell.phase);
        const normalizedBreath = (breathing + 1) / 2;

        const currentAlpha = cell.isAccent
          ? cell.baseAlpha + normalizedBreath * 0.35
          : cell.baseAlpha + normalizedBreath * 0.12;

        const strokeColor = `rgba(250, 204, 21, ${currentAlpha})`;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = cell.isAccent ? 1.4 : 0.8;

        if (cell.isAccent && normalizedBreath > 0.5) {
          ctx.shadowColor = 'rgba(234, 179, 8, 0.45)';
          ctx.shadowBlur = 8 * normalizedBreath;
        } else {
          ctx.shadowBlur = 0;
        }

        drawHexagon(ctx, cell.x, cell.y, size - 2);
        ctx.stroke();

        // Very delicate fill for breathing active cells
        if (cell.isAccent && normalizedBreath > 0.65) {
          ctx.fillStyle = `rgba(250, 204, 21, ${0.03 * normalizedBreath})`;
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
