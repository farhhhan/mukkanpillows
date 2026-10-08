"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProductShowcase.module.css";

const FRAME_COUNT = 300;
const currentFrame = (index) => 
  `/assets/showcase-sequence/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

export default function ProductShowcase() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

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
        if (i === 0) render(0);
      };
      images.push(img);
    }

    const render = (index) => {
      if (images[index]) {
        const img = images[index];
        const canvasW = window.innerWidth;
        const canvasH = window.innerHeight;
        
        // Use responsive scaling
        const hRatio = canvasW / img.width;
        const vRatio = canvasH / img.height;
        const ratio = canvasW <= 768 ? hRatio : Math.max(hRatio, vRatio);
        
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
        end: "+=300%",
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.33) setActiveStep(0);
          else if (p >= 0.33 && p < 0.66) setActiveStep(1);
          else setActiveStep(2);
        }
      }
    });

    tl.to(animationObj, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => render(animationObj.frame)
    });

    const handleResize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      context.scale(dpr, dpr);
      render(animationObj.frame);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.showcaseSection} ref={sectionRef} id="showcase">
      {loadedCount < FRAME_COUNT && (
        <div className={styles.loader}>
          Loading Product View... {Math.round((loadedCount / FRAME_COUNT) * 100)}%
        </div>
      )}
      
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      
      <div className={styles.overlay}>
        <div className={`${styles.titleCard} ${activeStep === 0 ? styles.active : ''}`} style={{ top: '15%' }}>
          <h2>The Ultimate Support</h2>
          <p>Engineered to adapt to your unique sleep position.</p>
        </div>
        
        <div className={`${styles.titleCard} ${activeStep === 1 ? styles.active : ''}`} style={{ top: '45%' }}>
          <h2>Breathable & Cooling</h2>
          <p>Advanced airflow technology keeps you cool all night.</p>
        </div>
        
        <div className={`${styles.titleCard} ${activeStep === 2 ? styles.active : ''}`} style={{ top: '75%' }}>
          <h2>A Cloud for Your Head</h2>
          <p>Experience zero-gravity comfort like never before.</p>
        </div>
      </div>
    </section>
  );
}
