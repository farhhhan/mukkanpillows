import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import QuizWidget from "@/components/QuizWidget";
import Anatomy from "@/components/Anatomy";
import Contact from "@/components/Contact";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Catalog />
      <div id="anatomy"><Anatomy /></div>
      <QuizWidget />
      <Contact />
    </main>
  );
}
