"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import Navbar from "./Navbar";

const FRAME_COUNT = 300;
const currentFrame = (index) =>
  `/assets/hero-sequence/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [forceLoaded, setForceLoaded] = useState(false);
  const [images, setImages] = useState({ main: [], logo: [] });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForceLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Preload images
    const preloadedImages = [];
    const preloadedLogoImages = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      preloadedImages.push(img);

      const logoImg = new Image();
      logoImg.src = `/assets/contact-sequence/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.png`;
      preloadedLogoImages.push(logoImg);
    }
    setImages({ main: preloadedImages, logo: preloadedLogoImages });
  }, []);

  const isLoaded = loadedCount >= FRAME_COUNT || forceLoaded;

  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw first frame
    const render = (index) => {
      if (images.main && images.main[index] && images.main[index].naturalWidth) {
        // scale to fit/cover
        const img = images.main[index];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
      }

      // Render logo
      const logoCanvas = document.getElementById('navbar-logo-canvas');
      if (logoCanvas && images.logo && images.logo[index] && images.logo[index].naturalWidth) {
        const logoCtx = logoCanvas.getContext('2d');
        const logoImg = images.logo[index];
        logoCtx.clearRect(0, 0, logoCanvas.width, logoCanvas.height);

        // Fit logo properly inside the small canvas
        const lRatio = Math.min(logoCanvas.width / logoImg.width, logoCanvas.height / logoImg.height);
        const lShiftX = (logoCanvas.width - logoImg.width * lRatio) / 2;
        const lShiftY = (logoCanvas.height - logoImg.height * lRatio) / 2;

        logoCtx.drawImage(
          logoImg,
          0, 0, logoImg.width, logoImg.height,
          lShiftX, lShiftY, logoImg.width * lRatio, logoImg.height * lRatio
        );
      }
    };

    render(0);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollHeight = height - window.innerHeight;
      const scrollY = -top;

      let progress = scrollY / scrollHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT)
      );

      requestAnimationFrame(() => render(frameIndex));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoaded, images]);

  return (
    <div className={styles.heroContainer} ref={containerRef}>
      {!isLoaded && (
        <div className={styles.loader}>
          <div className={styles.loaderText}>
            Loading Mukkan Experience... {Math.round((loadedCount / FRAME_COUNT) * 100)}%
          </div>
        </div>
      )}
      <div className={styles.stickyContainer}>
        <Navbar />
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* Overlays */}
        <div
          className={`${styles.textOverlay} ${scrollProgress > 0.1 && scrollProgress < 0.35 ? styles.active : ""}`}
        >
          <h1>MUKKAN — Sleep Re-engineered.</h1>
        </div>

        <div
          className={`${styles.textOverlay} ${scrollProgress > 0.4 && scrollProgress < 0.65 ? styles.active : ""}`}
        >
          <h2>Ergonomic Contour & Zero-Pressure Support.</h2>
        </div>

        <div
          className={`${styles.textOverlay} ${scrollProgress > 0.7 && scrollProgress <= 1.0 ? styles.active : ""}`}
        >
          <h2>A Pillow For Every Sleep Style.</h2>
        </div>
      </div>
    </div>
  );
}
