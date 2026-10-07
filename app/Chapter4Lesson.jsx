"use client";

import { useState } from "react";

export default function Chapter4Lesson({ lesson, lessonNumber, completed, locked, onComplete }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [passed, setPassed] = useState(false);

  const steps = [
    { label: "HOOK", title: lesson.hook, body: "Start with the question before memorising the definition." },
    { label: "TEXTBOOK", title: "Read the source idea", body: lesson.textbook, source: lesson.sources[0] },
    { label: "TEACHER", title: "Now make sense of it", body: lesson.teacher },
    { label: "EXAMPLE", title: "Watch it happen", body: lesson.example },
    { label: "YOUR TURN", title: lesson.interaction.prompt, body: lesson.interaction.type === "choice" ? "Choose the answer you think is correct." : "Work it out before revealing the answer." },
    { label: "COMMON MISTAKE", title: "Watch for this", body: lesson.mistake },
    { label: "TEXTBOOK ACTIVITY", title: "Back to the source", body: lesson.textbookActivity, source: lesson.sources.join(" · ") },
    { label: "CHECKPOINT", title: lesson.checkpoint.prompt, body: "Pass this checkpoint to complete the lesson." }
  ];

  const current = steps[step];

  function next() {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function checkChoice(index) {
    setSelected(index);
    if (index === lesson.interaction.answer) setPassed(true);
  }

  function finish() {
    setPassed(true);
    onComplete();
  }

  return (
    <div className="lesson-modal">
      <div className="lesson-modal-head">
        <div>
          <span className="kicker">LESSON {lessonNumber} · {lesson.section}</span>
          <h2>{lesson.title}</h2>
          <small>Textbook pages {lesson.pages}</small>
        </div>
        <div className="lesson-step-count">{step + 1} / {steps.length}</div>
      </div>

      <div className="lesson-progress"><i style={{ width: ((step + 1) / steps.length * 100) + "%" }} /></div>

      <article className={"teaching-card teaching-" + current.label.toLowerCase().replaceAll(" ", "-")}>
        <div className="teaching-label">{current.label}</div>
        <h3>{current.title}</h3>
        <p>{current.body}</p>
        {current.source && <div className="source-ref">📖 Source: {current.source}</div>}

        {current.label === "YOUR TURN" && lesson.interaction.type === "choice" && (
          <div className="interaction-options">
            {lesson.interaction.options.map((option, i) => (
              <button key={option} className={selected === i ? (i === lesson.interaction.answer ? "correct" : "wrong") : ""} onClick={() => checkChoice(i)}>{String.fromCharCode(65 + i)}. {option}</button>
            ))}
            {selected !== null && <div className={selected === lesson.interaction.answer ? "feedback good" : "feedback bad"}>{selected === lesson.interaction.answer ? "✓ Correct. " : "Not quite. "}{lesson.interaction.explain}</div>}
          </div>
        )}

        {current.label === "YOUR TURN" && lesson.interaction.type === "numeric" && (
          <div className="numeric-practice">
            {!revealed ? <button onClick={() => setRevealed(true)}>Reveal worked answer</button> : <div className="feedback good"><b>{lesson.interaction.answer}</b><br />{lesson.interaction.explain}</div>}
          </div>
        )}

        {current.label === "CHECKPOINT" && (
          <div className="checkpoint-box">
            {!revealed ? <button onClick={() => setRevealed(true)}>Reveal checkpoint answer</button> : <div className="feedback good"><b>{lesson.checkpoint.answer}</b></div>}
          </div>
        )}
      </article>

      <div className="lesson-nav">
        <button disabled={step === 0} onClick={() => setStep(step - 1)}>← Previous</button>
        {step < steps.length - 1 ? (
          <button onClick={next}>Continue →</button>
        ) : (
          <button disabled={!revealed} onClick={finish}>{completed ? "Lesson completed ✓" : "Complete lesson →"}</button>
        )}
      </div>
      {completed && <div className="mastery-note">✓ Mastery recorded — you can replay this lesson any time.</div>}
    </div>
  );
}
