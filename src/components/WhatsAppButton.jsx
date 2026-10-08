import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/917736609923" 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.waButton}
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 32 32" className={styles.waIcon} xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2A13.9 13.9 0 0 0 2.1 16c0 2.5.6 4.8 1.8 6.9L2 29.8l7-1.8c2.1 1.1 4.4 1.7 6.9 1.7A13.9 13.9 0 0 0 30 16 13.9 13.9 0 0 0 16 2zm0 25.4c-2 0-4-.5-5.8-1.6l-.4-.2-4.3 1.1 1.1-4.2-.3-.5A11.6 11.6 0 0 1 4.5 16a11.5 11.5 0 0 1 11.5-11.5A11.5 11.5 0 0 1 27.5 16 11.5 11.5 0 0 1 16 27.4zm6.3-8.6c-.3-.2-2-.9-2.3-1s-.6-.2-.8.1-.9 1-1.1 1.3-.4.3-.8.1c-.3-.2-1.4-.5-2.7-1.6-1-1-1.7-2.1-1.9-2.5-.2-.3 0-.5.1-.6s.3-.4.5-.5.2-.3.3-.5.1-.4 0-.6c-.2-.3-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1.1.5s-1.4 1.4-1.4 3.4 1.4 3.9 1.6 4.2c.2.3 2.9 4.4 7 6.1 1 .4 1.7.6 2.3.8.9.3 1.8.2 2.5.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.4.2-1.6-.1-.2-.4-.3-.7-.5z" fill="currentColor"/>
      </svg>
    </a>
  );
}
