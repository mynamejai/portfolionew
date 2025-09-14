import { useEffect, useRef } from "react";
// Notice there are no external libraries imported for the animation
import { useTheme } from "../providers/theme";

// Color palettes for light and dark themes
const WAVE_COLORS = {
  light: [
    "rgba(0, 119, 190, 0.5)",
    "rgba(100, 200, 255, 0.5)",
  ],
  dark: [
    "rgba(70, 80, 150, 0.6)",
    "rgba(50, 60, 120, 0.6)",
  ],
};

export default function Wave() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let time = 0; // A variable to control the animation over time

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      ctx.filter = `blur(10px)`;
    };

    const render = () => {
      ctx.fillStyle = theme === "dark" ? "#020817" : "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // Make the wave move by slowly increasing the time
      time += 0.01;

      const currentColors = theme === "dark" ? WAVE_COLORS.dark : WAVE_COLORS.light;

      // Draw each layer of the river
      currentColors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, height);

        // Create the wavy line across the screen
        for (let x = 0; x < width; x += 10) {
          // --- THIS IS THE ONLY PART THAT CHANGED ---
          // Replaced simplex noise with a simple Sine wave from Math.sin()
          // We vary the sine wave for each layer to create a nice effect.
          const waveFrequency = 150 + i * 50;
          const waveAmplitude = 50 + i * 10;
          const waveSpeed = 1 + i * 0.2;
          
          const y = Math.sin(x / waveFrequency + time * waveSpeed) * waveAmplitude;
          ctx.lineTo(x, y + height * 0.5); // Center the wave vertically
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    handleResize();
    render();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      className="fixed inset-0 z-0"
      ref={canvasRef}
    />
  );
}
