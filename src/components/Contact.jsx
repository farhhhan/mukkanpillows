"use client";
import React, { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    setSubmitted(true);
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const text = `Hi Mukkans Pillow! My name is ${formData.name || "Customer"}.${
      formData.phone ? ` Phone: ${formData.phone}.` : ""
    } Message: ${formData.message || "I would like to inquire about your ergonomic pillows."}`;
    window.open(`https://wa.me/917736609923?text=${encodeURIComponent(text)}`, "_blank");
  };

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
          
          {/* Info Card / Direct Connect */}
          <div className={`${styles.infoCard} glass`}>
            <div className={styles.brandBadge}>
              <span className={styles.badgeDot}></span>
              <span>Direct Connect</span>
            </div>

            <h2 className={styles.slogan}>
              Rest Assured,<br />Rest With Us
            </h2>

            <p className={styles.infoSubtitle}>
              Experience spine-aligning comfort. Connect directly with our sleep specialists or follow our story online.
            </p>

            {/* Quick Interactive Channels */}
            <div className={styles.channelGrid}>
              
              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/917736609923?text=Hi%20Mukkans%20Pillow%2C%20I%20would%20like%20to%20know%20more%20about%20your%20ergonomic%20pillows!"
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.channelCard} ${styles.waCard}`}
                title="Chat with us on WhatsApp"
              >
                <div className={`${styles.channelIconWrapper} ${styles.waIcon}`}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.53C9.36 7.53 9.1 7.6 8.87 7.84C8.65 8.09 8.02 8.68 8.02 9.9C8.02 11.11 8.91 12.28 9.03 12.44C9.15 12.61 10.74 15.06 13.2 16.12C13.79 16.37 14.24 16.52 14.6 16.64C15.19 16.82 15.72 16.8 16.15 16.73C16.63 16.66 17.62 16.13 17.83 15.54C18.04 14.96 18.04 14.46 17.97 14.36C17.9 14.25 17.74 14.19 17.48 14.06C17.22 13.93 15.96 13.31 15.72 13.22C15.49 13.14 15.33 13.1 15.16 13.35C15 13.6 14.52 14.19 14.38 14.36C14.23 14.52 14.09 14.54 13.83 14.42C13.58 14.29 12.76 14.02 11.78 13.15C11.02 12.47 10.51 11.63 10.36 11.38C10.22 11.13 10.34 11 10.47 10.87C10.59 10.75 10.73 10.57 10.87 10.41C11.01 10.24 11.05 10.12 11.14 9.95C11.23 9.78 11.18 9.63 11.12 9.51C11.06 9.39 10.58 8.21 10.39 7.72C10.19 7.25 9.99 7.31 9.84 7.3C9.7 7.3 9.53 7.29 9.53 7.53Z"/>
                  </svg>
                </div>
                <div className={styles.channelText}>
                  <div className={styles.channelHeader}>
                    <strong>WhatsApp Support</strong>
                    <span className={styles.statusPill}>Instant Reply</span>
                  </div>
                  <span className={styles.channelValue}>+91 7736 609 923</span>
                </div>
                <div className={styles.channelArrow}>→</div>
              </a>

              {/* Call Card */}
              <a 
                href="tel:+917736609923" 
                className={`${styles.channelCard} ${styles.callCard}`}
                title="Call us directly"
              >
                <div className={`${styles.channelIconWrapper} ${styles.callIcon}`}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className={styles.channelText}>
                  <div className={styles.channelHeader}>
                    <strong>Phone Call</strong>
                    <span className={styles.statusPill}>Direct Line</span>
                  </div>
                  <span className={styles.channelValue}>+91 7736 609 923</span>
                </div>
                <div className={styles.channelArrow}>→</div>
              </a>

              {/* Instagram Card */}
              <a 
                href="https://www.instagram.com/mukkans_pillow?obrf=aGtybzJ6OHFhc3Ju" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.channelCard} ${styles.igCard}`}
                title="Follow us on Instagram"
              >
                <div className={`${styles.channelIconWrapper} ${styles.igIcon}`}>
                  <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
                <div className={styles.channelText}>
                  <div className={styles.channelHeader}>
                    <strong>Instagram</strong>
                    <span className={styles.statusPill}>@mukkans_pillow</span>
                  </div>
                  <span className={styles.channelValue}>Follow for stories & updates</span>
                </div>
                <div className={styles.channelArrow}>→</div>
              </a>

              {/* Location Card */}
              <a 
                href="https://maps.google.com/?q=Thottekkad+Manjeri+Kerala" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${styles.channelCard} ${styles.locCard}`}
                title="View location on Google Maps"
              >
                <div className={`${styles.channelIconWrapper} ${styles.locIcon}`}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className={styles.channelText}>
                  <div className={styles.channelHeader}>
                    <strong>Studio Location</strong>
                  </div>
                  <span className={styles.channelValue}>Thottekkad, Manjeri, Kerala</span>
                </div>
                <div className={styles.channelArrow}>→</div>
              </a>

            </div>
          </div>

          {/* Inquiry Form */}
          <div className={`${styles.formCard} glass`}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Send a Message</h3>
              <p className={styles.formSubtitle}>Have a question about sizing, materials, or delivery? Write to us below.</p>
            </div>

            {submitted ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h4>Thank You!</h4>
                <p>Your message has been received. Our ergonomic sleep specialist will contact you shortly.</p>
                <button 
                  type="button" 
                  className={styles.resetBtn} 
                  onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", message: "" }); }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label htmlFor="contact-name">Your Name</label>
                  <input 
                    id="contact-name"
                    type="text" 
                    placeholder="Enter your full name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="contact-phone">Phone / WhatsApp Number</label>
                  <input 
                    id="contact-phone"
                    type="tel" 
                    placeholder="+91 00000 00000" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="contact-message">Message</label>
                  <textarea 
                    id="contact-message"
                    rows="4" 
                    placeholder="Tell us what you're looking for (e.g. pillow firmness, chronic neck pain support...)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <div className={styles.formActions}>
                  <button 
                    type="submit" 
                    className={`button-primary ${styles.submitBtn}`}
                  >
                    Submit Inquiry
                  </button>
                  <button 
                    type="button" 
                    className={styles.waSubmitBtn}
                    onClick={handleWhatsAppSend}
                    title="Send your message directly via WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.53C9.36 7.53 9.1 7.6 8.87 7.84C8.65 8.09 8.02 8.68 8.02 9.9C8.02 11.11 8.91 12.28 9.03 12.44C9.15 12.61 10.74 15.06 13.2 16.12C13.79 16.37 14.24 16.52 14.6 16.64C15.19 16.82 15.72 16.8 16.15 16.73C16.63 16.66 17.62 16.13 17.83 15.54C18.04 14.96 18.04 14.46 17.97 14.36C17.9 14.25 17.74 14.19 17.48 14.06C17.22 13.93 15.96 13.31 15.72 13.22C15.49 13.14 15.33 13.1 15.16 13.35C15 13.6 14.52 14.19 14.38 14.36C14.23 14.52 14.09 14.54 13.83 14.42C13.58 14.29 12.76 14.02 11.78 13.15C11.02 12.47 10.51 11.63 10.36 11.38C10.22 11.13 10.34 11 10.47 10.87C10.59 10.75 10.73 10.57 10.87 10.41C11.01 10.24 11.05 10.12 11.14 9.95C11.23 9.78 11.18 9.63 11.12 9.51C11.06 9.39 10.58 8.21 10.39 7.72C10.19 7.25 9.99 7.31 9.84 7.3C9.7 7.3 9.53 7.29 9.53 7.53Z"/>
                    </svg>
                    Send via WhatsApp
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}

