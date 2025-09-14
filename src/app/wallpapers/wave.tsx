import React, { useEffect, useRef } from "react";
// Fix: Import simplex-noise from a CDN to resolve the module.
import { createNoise3D } from "https://cdn.jsdelivr.net/npm/simplex-noise@4.0.1/dist/esm/simplex-noise.js";

// A color palette adjusted for a dark theme, with a brighter highlight color.
const RIVER_COLORS = ["#0d3f67", "#1e6091", "#1a759f", "#168aad", "#52b6b9"];
const SPARKLE_COLOR = "rgba(255, 255, 255, 0.7)";

/**
 * A custom hook to simulate a theme provider for this standalone component.
 */
const useTheme = () => {
    // Set the default theme to 'dark'.
    const [theme, setTheme] = React.useState('dark');
    return { theme };
};

export default function RiverWave() {
    // --- Refs for animation state and elements ---
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const animationFrameId = useRef(null);
    const noiseTime = useRef(0);
    const dimensions = useRef({ w: window.innerWidth, h: window.innerHeight });
    const sparkles = useRef([]);

    // --- Theme Handling ---
    const { theme } = useTheme();
    const themeRef = useRef(theme);

    // Instance of the noise generator
    const noise = createNoise3D();

    // --- Drawing Functions ---

    const drawRiver = () => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        const { w, h } = dimensions.current;

        // Loop through each color to draw a layer of water
        RIVER_COLORS.forEach((color, i) => {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.7 - i * 0.05; // Deeper layers are more opaque
            ctx.beginPath();
            ctx.moveTo(0, h);

            for (let x = 0; x < w; x += 10) {
                const y = noise(x / (600 + i * 40), 0.1 * i, noiseTime.current * (0.7 + i * 0.05)) * (40 + i * 10);
                ctx.lineTo(x, h * 0.55 + y); // Lowered the river slightly on the screen
            }

            ctx.lineTo(w, h);
            ctx.closePath();
            ctx.fill();
        });

        ctx.globalAlpha = 1.0;
    };

    const drawSparkles = () => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        ctx.fillStyle = SPARKLE_COLOR;
        ctx.globalAlpha = 1.0;

        sparkles.current.forEach(sparkle => {
            // Calculate the y position based on the top wave's noise value
            const topWaveY = noise(sparkle.x / 640, 0.4, noiseTime.current * 0.75) * 80;

            // Twinkle effect using a sine wave
            const opacity = Math.max(0, Math.sin(noiseTime.current * sparkle.speed + sparkle.offset));

            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.arc(sparkle.x, dimensions.current.h * 0.55 + topWaveY, sparkle.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 1.0;
    };


    // --- Animation Loop ---
    const render = () => {
        const ctx = ctxRef.current;
        if (!ctx) return;
        const { w, h } = dimensions.current;

        noiseTime.current += 0.004; // Controls the speed of the water flow

        // Set background based on theme
        ctx.fillStyle = themeRef.current === 'light' ? "#FFFFFF" : "#020617"; // Dark blue for dark theme
        ctx.fillRect(0, 0, w, h);

        // Draw elements
        drawRiver();
        drawSparkles();

        // Request the next frame
        animationFrameId.current = requestAnimationFrame(render);
    };

    // --- Initialization and Cleanup ---
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx) {
            ctxRef.current = ctx;

            const initSparkles = (num) => {
                sparkles.current = [];
                for(let i=0; i < num; i++) {
                    sparkles.current.push({
                        x: Math.random() * window.innerWidth,
                        radius: Math.random() * 1.2 + 0.5,
                        speed: Math.random() * 0.5 + 0.5,
                        offset: Math.random() * 2 * Math.PI
                    });
                }
            };

            const setupCanvas = () => {
                dimensions.current = { w: window.innerWidth, h: window.innerHeight };
                ctx.canvas.width = dimensions.current.w;
                ctx.canvas.height = dimensions.current.h;
                // The blur effect is key to the soft, watery look
                ctx.filter = `blur(18px)`;
                initSparkles(50); // Create 50 sparkles
            };

            setupCanvas();
            render();

            const handleResize = () => setupCanvas();
            window.addEventListener('resize', handleResize);

            // Cleanup
            return () => {
                window.removeEventListener('resize', handleResize);
                if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current);
                }
            };
        }
    }, []);

    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    return (
        <canvas
            className="fixed inset-0 z-0"
            ref={canvasRef}
        />
    );
}

