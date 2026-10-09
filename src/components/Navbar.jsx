"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoContainer} onClick={closeMenu}>
          <video
            src="/assets/contact-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.logoVideo}
            aria-label="Mukkans Pillow Logo"
          />
        </Link>
        
        {/* Desktop Links */}
        <div className={styles.links}>
          <Link href="#collection">Collection</Link>
          <Link href="#anatomy">Craftsmanship</Link>
          <Link href="#contact" className="button-primary" style={{padding: "8px 20px", fontSize: "0.9rem"}}>Contact Us</Link>
        </div>

        {/* Mobile Header Actions */}
        <div className={styles.mobileActions}>
          <Link href="#contact" className={styles.mobileQuickBtn} onClick={closeMenu}>
            Contact
          </Link>
          <button 
            type="button"
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${menuOpen ? styles.mobileDrawerOpen : ""}`}>
        <div className={styles.mobileNavLinks}>
          <Link href="#collection" onClick={closeMenu} className={styles.mobileNavLink}>
            Collection
          </Link>
          <Link href="#anatomy" onClick={closeMenu} className={styles.mobileNavLink}>
            Craftsmanship
          </Link>
          <Link href="#contact" onClick={closeMenu} className={`button-primary ${styles.mobileContactBtn}`}>
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}

