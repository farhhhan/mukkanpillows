"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Anatomy.module.css";

const FRAME_COUNT = 300;
const currentFrame = (index) => 
  `/assets/anatomy-sequence/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

const LAYERS = [
  {
    title: "Outer Cover",
    desc: "3D Quilted Fabric & Lavender Piping"
  },
  {
    title: "Breathable Inner Mesh",
    desc: "Protective airflow sleeve"
  },
  {
    title: "Support Core",
    desc: "Ergonomic memory foam foundation"
  },
  {
    title: "Shredded Memory Foam & Fiber Fill",
    desc: "Micro-responsive plush comfort"
  }
];

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
    ScrollTrigger.config({ ignoreMobileResize: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    // Fix high DPI screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
        const isMobile = canvasW <= 768;
        
        let ratio;
        if (isMobile) {
          // Responsive scaling: pillow spans nicely across mobile screen without any cropping
          const widthRatio = canvasW / 1400;
          const maxHeightRatio = (canvasH * 0.48) / img.height;
          ratio = Math.min(widthRatio, maxHeightRatio);
        } else {
          // On desktop, stretch to cover full width and height
          const hRatio = canvasW / img.width;
          const vRatio = canvasH / img.height;
          ratio = Math.max(hRatio, vRatio);
        }
        
        const centerShift_x = (canvasW - img.width * ratio) / 2;
        const centerShift_y = isMobile
          ? (canvasH - img.height * ratio) * 0.42
          : (canvasH - img.height * ratio) / 2;
        
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
      const currentDpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * currentDpr;
      canvas.height = window.innerHeight * currentDpr;
      context.scale(currentDpr, currentDpr);
      render(animationObj.frame);
      ScrollTrigger.refresh();
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
      
      {/* Desktop Callouts */}
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

      {/* Mobile Dedicated Layer Card */}
      <div className={styles.mobileCardContainer}>
        {activeStep === 0 ? (
          <div className={`${styles.mobileLayerCard} glass`}>
            <div className={styles.mobileHintHeader}>
              <span className={styles.mobileHintTag}>Interactive Anatomy</span>
            </div>
            <p className={styles.mobileHintDesc}>Scroll down to peel back each layer ↓</p>
          </div>
        ) : (
          <div className={`${styles.mobileLayerCard} glass ${styles.cardActive}`}>
            <div className={styles.mobileCardHeader}>
              <span className={styles.layerPill}>Layer 0{activeStep} of 04</span>
              <div className={styles.layerDots}>
                {[1, 2, 3, 4].map((step) => (
                  <span
                    key={step}
                    className={`${styles.layerDot} ${activeStep === step ? styles.activeDot : ""}`}
                  />
                ))}
              </div>
            </div>
            <h4>{LAYERS[activeStep - 1]?.title}</h4>
            <p>{LAYERS[activeStep - 1]?.desc}</p>
          </div>
        )}
      </div>
    </section>
  );
}

