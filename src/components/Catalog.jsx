"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Catalog.module.css";

const FRAME_COUNT = 300;
const currentFrame = (index) =>
  `/assets/showcase-sequence/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.webp`;

const products = [
  {
    id: "plush",
    name: "Mukkan Cloud Plush Pillow",
    desc: "Ultra-soft microfiber fill for a cloud-like sleep experience.",
    price: "₹1000",
    firmness: "Soft"
  },
  {
    id: "ortho",
    name: "Mukkan Contour Ortho Pillow",
    desc: "Ergonomic memory foam designed for optimal neck support.",
    price: "₹1200",
    firmness: "Firm"
  },
  {
    id: "frost",
    name: "Mukkan Frost Cooling Gel Pillow",
    desc: "Dual-sided cooling mesh, perfect for hot sleepers.",
    price: "₹1250",
    firmness: "Medium"
  },
  {
    id: "travel",
    name: "Mukkan Silk Touch Travel Pillow",
    desc: "Compact ergonomic support wrapped in premium silk.",
    price: "₹1500",
    firmness: "Medium"
  }
];

export default function Catalog() {
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

        // Responsive scaling
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
        end: "+=400%", // 4 screens for 4 products
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.25) setActiveStep(0);
          else if (p >= 0.25 && p < 0.50) setActiveStep(1);
          else if (p >= 0.50 && p < 0.75) setActiveStep(2);
          else setActiveStep(3);
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
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.catalogSection} ref={sectionRef} id="collection">
      {loadedCount < FRAME_COUNT && !forceLoaded && (
        <div className={styles.loader}>
          Loading Collection... {Math.round((loadedCount / FRAME_COUNT) * 100)}%
        </div>
      )}

      <div className={styles.canvasContainer}>
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
      </div>

      <div className={styles.overlayUI}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`${styles.productDetails} ${activeStep === index ? styles.active : ''}`}
          >
            <div className={styles.topContent}>
              <span className={styles.brandName}>Mukkan Collection</span>
              <h2>{product.name.replace('Mukkan ', '').replace(' Pillow', '')}</h2>
            </div>

            <div className={styles.bottomContent}>
              <p className={styles.desc}>{product.desc}</p>
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Firmness</span>
                  <span className={styles.firmness}>{product.firmness}</span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Price</span>
                  <span className={styles.price}>{product.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
