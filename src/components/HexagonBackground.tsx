'use client';

import React, { useEffect, useRef } from 'react';

interface HexagonCanvasProps {
  className?: string;
}

export const HexagonBackground: React.FC<HexagonCanvasProps> = ({
  className = '',
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

    // Geometric parameters
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
          baseAlpha: 0.08 + Math.random() * 0.1,
          pulseSpeed: 0.5 + Math.random() * 0.8,
          phase: Math.random() * Math.PI * 2,
          isAccent: Math.random() > 0.68,
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

      // Clean, bright executive slate canvas background
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.25,
        100,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.9
      );
      bgGrad.addColorStop(0, '#fdfbf7'); // soft warm alabaster
      bgGrad.addColorStop(0.5, '#f8fafc'); // crisp bright slate
      bgGrad.addColorStop(1, '#f1f5f9'); // modern pearl slate
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < hexCells.length; i++) {
        const cell = hexCells[i];
        const breathing = Math.sin(elapsed * cell.pulseSpeed + cell.phase);
        const normalizedBreath = (breathing + 1) / 2;

        const currentAlpha = cell.isAccent
          ? cell.baseAlpha + normalizedBreath * 0.28
          : cell.baseAlpha + normalizedBreath * 0.08;

        // Elegant amber/gold honeycomb lines over light background
        ctx.strokeStyle = `rgba(217, 119, 6, ${currentAlpha})`; // Amber 600
        ctx.lineWidth = cell.isAccent ? 1.4 : 0.75;

        if (cell.isAccent && normalizedBreath > 0.5) {
          ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
          ctx.shadowBlur = 6 * normalizedBreath;
        } else {
          ctx.shadowBlur = 0;
        }

        drawHexagon(ctx, cell.x, cell.y, size - 2);
        ctx.stroke();

        // Delicate warm golden glow inside accented breathing cells
        if (cell.isAccent && normalizedBreath > 0.6) {
          ctx.fillStyle = `rgba(251, 191, 36, ${0.06 * normalizedBreath})`;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};
