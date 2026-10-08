import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoContainer}>
          <canvas id="navbar-logo-canvas" width={160} height={90} style={{ width: "120px", height: "auto" }}></canvas>
        </Link>
        
        <div className={styles.links}>
          <Link href="#collection">Collection</Link>
          <Link href="#anatomy">Craftsmanship</Link>
          <Link href="#contact" className="button-primary" style={{padding: "8px 20px", fontSize: "0.9rem"}}>Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}
