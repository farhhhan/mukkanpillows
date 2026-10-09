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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setupCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      context.scale(dpr, dpr);
    };

    setupCanvas();

    let currentFrameIndex = 0;

    // Draw frame
    const render = (index) => {
      currentFrameIndex = index;
      if (images.main && images.main[index] && images.main[index].naturalWidth) {
        const img = images.main[index];
        const canvasW = window.innerWidth;
        const canvasH = window.innerHeight;
        const isMobile = canvasW <= 768;

        let ratio;
        if (isMobile) {
          // On mobile, ensure the whole pillow contour is visible without 75% cropping
          const widthRatio = (canvasW / img.width) * 1.28;
          const maxHeightRatio = (canvasH * 0.52) / img.height;
          ratio = Math.min(widthRatio, maxHeightRatio);
        } else {
          // On desktop widescreen, cover the view
          ratio = Math.max(canvasW / img.width, canvasH / img.height);
        }

        const centerShift_x = (canvasW - img.width * ratio) / 2;
        // On mobile, center slightly above middle to leave room for the bottom text card
        const centerShift_y = isMobile
          ? (canvasH - img.height * ratio) * 0.44
          : (canvasH - img.height * ratio) / 2;

        context.clearRect(0, 0, canvasW, canvasH);
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

    const handleResize = () => {
      setupCanvas();
      render(currentFrameIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
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
          className={`${styles.textOverlay} ${scrollProgress < 0.35 ? styles.active : ""}`}
        >
          <h1>MUKKAN — Sleep Re-engineered.</h1>
          <p className={styles.subtitle}>Precision ergonomic contouring for zero-strain sleep.</p>
          <div className={styles.scrollCue}>Scroll to explore ↓</div>
        </div>

        <div
          className={`${styles.textOverlay} ${scrollProgress >= 0.35 && scrollProgress < 0.68 ? styles.active : ""}`}
        >
          <h2>Ergonomic Contour & Zero-Pressure Support.</h2>
          <p className={styles.subtitle}>Adaptive curves designed to align your spine effortlessly.</p>
        </div>

        <div
          className={`${styles.textOverlay} ${scrollProgress >= 0.68 && scrollProgress <= 1.0 ? styles.active : ""}`}
        >
          <h2>A Pillow For Every Sleep Style.</h2>
          <p className={styles.subtitle}>Back, side, or stomach sleepers — engineered for all.</p>
        </div>
      </div>
    </div>
  );
}
