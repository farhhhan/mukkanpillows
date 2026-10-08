"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Anatomy.module.css";

const FRAME_COUNT = 300;
const currentFrame = (index) => 
  `/assets/anatomy-sequence/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

export default function Anatomy() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [forceLoaded, setForceLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForceLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    // Fix high DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    context.scale(dpr, dpr);

    const images = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (i === 0) {
          render(0);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      images.push(img);
    }

    const render = (index) => {
      if (images[index] && images[index].naturalWidth) {
        const img = images[index];
        const canvasW = window.innerWidth;
        const canvasH = window.innerHeight;
        
        // Responsive scaling logic
        const hRatio = canvasW / img.width;
        const vRatio = canvasH / img.height;
        
        let ratio;
        if (canvasW <= 768) {
            // On mobile devices, ensure the full width of the pillow is visible without aggressive cropping
            ratio = hRatio;
        } else {
            // On desktop, stretch to cover the full width and height
            ratio = Math.max(hRatio, vRatio);
        }
        
        const centerShift_x = (canvasW - img.width * ratio) / 2;
        const centerShift_y = (canvasH - img.height * ratio) / 2;
        
        context.clearRect(0, 0, canvasW, canvasH);
        context.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
      }
    };

    let animationObj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%", // Scroll duration
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.25) setActiveStep(0);
          else if (p >= 0.25 && p < 0.50) setActiveStep(1);
          else if (p >= 0.50 && p < 0.75) setActiveStep(2);
          else if (p >= 0.75 && p < 0.95) setActiveStep(3);
          else if (p >= 0.95) setActiveStep(4);
        }
      }
    });

    tl.to(animationObj, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => render(animationObj.frame)
    });

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      context.scale(dpr, dpr);
      render(animationObj.frame);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.anatomySection} ref={sectionRef}>
      {loadedCount < FRAME_COUNT && !forceLoaded && (
        <div className={styles.loader}>
          Loading Interactive Experience... {Math.round((loadedCount / FRAME_COUNT) * 100)}%
        </div>
      )}
      
      <div className={styles.header}>
        <h2>Crafted for Perfection</h2>
        <p>Peel back the layers of ultimate comfort.</p>
      </div>

      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      
      <div className={`${styles.callout} ${styles.pos1} ${activeStep === 1 ? styles.active : ""}`}>
        <div className={styles.line}></div>
        <div className={`${styles.badge} glass`}>
          <h4>Outer Cover</h4>
          <p>3D Quilted Fabric & Lavender Piping</p>
        </div>
      </div>

      <div className={`${styles.callout} ${styles.pos2} ${activeStep === 2 ? styles.active : ""}`}>
        <div className={styles.line}></div>
        <div className={`${styles.badge} glass`}>
          <h4>Breathable Inner Mesh</h4>
          <p>Protective airflow sleeve</p>
        </div>
      </div>

      <div className={`${styles.callout} ${styles.pos3} ${activeStep === 3 ? styles.active : ""}`}>
        <div className={styles.line}></div>
        <div className={`${styles.badge} glass`}>
          <h4>Support Core</h4>
          <p>Ergonomic memory foam foundation</p>
        </div>
      </div>

      <div className={`${styles.callout} ${styles.pos4} ${activeStep === 4 ? styles.active : ""}`}>
        <div className={styles.line}></div>
        <div className={`${styles.badge} glass`}>
          <h4>Shredded Memory Foam & Fiber Fill</h4>
          <p>Micro-responsive plush comfort</p>
        </div>
      </div>
    </section>
  );
}
