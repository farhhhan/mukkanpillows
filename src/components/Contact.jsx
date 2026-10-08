"use client";
import React from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.contactSection} id="contact">
      
      <video 
        className={styles.videoBg} 
        src="/assets/contact-bg.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
      />
      
      <div className={styles.overlay}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          
          <div className={`${styles.infoCard} glass`}>
            <h2 className={styles.slogan}>REST ASSURED,<br/>REST WITH US</h2>
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <strong>Location</strong>
                <span>Thottekkad, Manjeri</span>
              </div>
              <div className={styles.detailItem}>
                <strong>Phone</strong>
                <span>+91 7736 609 923</span>
              </div>
            </div>
          </div>

          <form className={`${styles.form} glass`}>
            <h3 className={styles.formTitle}>Send a Message</h3>
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" placeholder="Your email address" />
            </div>
            <div className={styles.inputGroup}>
              <label>Message</label>
              <textarea rows="4" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="button-primary" onClick={(e) => e.preventDefault()}>Submit</button>
          </form>

        </div>
      </div>
    </section>
  );
}
