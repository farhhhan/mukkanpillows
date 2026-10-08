"use client";
import { useState } from "react";
import styles from "./QuizWidget.module.css";
import Image from "next/image";

const steps = [
  {
    id: "position",
    question: "How do you usually sleep?",
    desc: "Your primary sleeping position helps us determine the right support level.",
    options: ["Back", "Side", "Stomach"],
  },
  {
    id: "firmness",
    question: "What is your firmness preference?",
    desc: "Select the feel that provides you with the most comfort.",
    options: ["Soft", "Medium", "Firm"],
  },
  {
    id: "temp",
    question: "Do you sleep hot?",
    desc: "We can recommend active cooling technology if you need it.",
    options: ["Hot Sleeper", "Neutral"],
  }
];

const recommendations = {
  "Cloud Plush": { 
    name: "Mukkan Cloud Plush Pillow", 
    desc: "Ultra-soft microfiber fill for a cloud-like sleep experience.",
    image: "/assets/products/cloud_plush_pillow.png"
  },
  "Contour Ortho": { 
    name: "Mukkan Contour Ortho Pillow", 
    desc: "Ergonomic memory foam designed for optimal neck support.",
    image: "/assets/products/contour_ortho_pillow.png"
  },
  "Frost Cooling": { 
    name: "Mukkan Frost Cooling Gel Pillow", 
    desc: "Dual-sided cooling mesh, perfect for hot sleepers.",
    image: "/assets/products/frost_cooling_pillow.png"
  },
  "Silk Travel": { 
    name: "Mukkan Silk Touch Travel Pillow", 
    desc: "Compact ergonomic support wrapped in premium silk.",
    image: "/assets/products/silk_travel_pillow.png"
  }
};

export default function QuizWidget() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelect = (option) => {
    const stepId = steps[currentStep].id;
    const newAnswers = { ...answers, [stepId]: option };
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      let rec = "Cloud Plush";
      if (newAnswers.temp === "Hot Sleeper") rec = "Frost Cooling";
      else if (newAnswers.firmness === "Firm" || newAnswers.position === "Back") rec = "Contour Ortho";
      else if (newAnswers.firmness === "Medium") rec = "Silk Travel";

      setResult(recommendations[rec]);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className={styles.quizSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Find Your Perfect Match</h2>
          <p>Take our 3-step quiz to discover the pillow engineered for your sleep style.</p>
        </div>

        <div className={styles.widgetWrapper}>
          <div className={`${styles.widget} glass`}>
            
            {!result ? (
              <div className={styles.quizInner} key={currentStep}>
                
                {/* Progress Bar */}
                <div className={styles.progressContainer}>
                  <div 
                    className={styles.progressBar} 
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
                <span className={styles.stepIndicator}>Step {currentStep + 1} of {steps.length}</span>
                
                <h3 className={styles.question}>{steps[currentStep].question}</h3>
                <p className={styles.desc}>{steps[currentStep].desc}</p>
                
                <div className={styles.options}>
                  {steps[currentStep].options.map((opt, i) => (
                    <button 
                      key={opt} 
                      className={styles.optionCard}
                      onClick={() => handleSelect(opt)}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className={styles.optionContent}>
                        <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                        <span className={styles.optionText}>{opt}</span>
                      </div>
                      <div className={styles.radioCircle}></div>
                    </button>
                  ))}
                </div>

              </div>
            ) : (
              <div className={styles.resultInner} key="result">
                <span className={styles.resultBadge}>Your Perfect Match</span>
                <h3 className={styles.resultName}>{result.name}</h3>
                <div className={styles.resultVisual}>
                  <Image src={result.image} alt={result.name} width={400} height={300} className={styles.resultImg} />
                </div>
                <p className={styles.resultDesc}>{result.desc}</p>
                <div className={styles.actions}>
                  <button className="button-primary" style={{padding: '14px 40px', fontSize: '1.1rem'}}>Shop Now</button>
                  <button className={styles.retryBtn} onClick={resetQuiz}>Retake Quiz</button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
}
