"use client";

import { useEffect, useMemo, useState } from "react";
import ScientificText from "./ScientificText";

export default function Chapter6Lesson({ lesson, lessonNumber, completed, onComplete }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [checkpointRevealed, setCheckpointRevealed] = useState(false);

  const interaction = lesson.interaction;
  const numericTarget = useMemo(() => {
    const match = String(interaction?.answer ?? "").match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : null;
  }, [interaction]);

  const steps = [
    { label:"HOOK", title:lesson.hook, body:"Start with the idea before the equation." },
    { label:"TEXTBOOK", title:"What the source says", body:lesson.textbook, source:lesson.sources?.[0] },
    { label:"TEACHER", title:"Make it make sense", body:lesson.teacher },
    { label:"EXAMPLE", title:"Watch it work", body:lesson.example },
    { label:"YOUR TURN", title:interaction.prompt, body:interaction.type === "choice" ? "Choose an answer, then check it." : "Enter your numerical answer, then check it." },
    { label:"COMMON MISTAKE", title:"Watch for this", body:lesson.mistake },
    { label:"TEXTBOOK ACTIVITY", title:"Apply it", body:lesson.textbookActivity, source:lesson.sources?.[0] },
    { label:"CHECKPOINT", title:lesson.checkpoint.prompt, body:"Reveal the checkpoint answer, then finish the lesson." }
  ];
  const current = steps[step];

  useEffect(() => {
    const root = document.querySelector(".lesson-modal");
    if (!root || !window.MathJax?.typesetPromise) return;
    window.MathJax.typesetClear?.([root]);
    window.MathJax.typesetPromise([root]).catch(() => {});
  }, [step, selected, input, feedback, checkpointRevealed]);

  function checkInteraction() {
    if (interaction.type === "choice") {
      if (selected === null) return;
      const ok = selected === interaction.answer;
      setFeedback(ok ? { ok:true, text:"Correct. Nice." } : { ok:false, text:"Not quite. Try again and use the explanation from this lesson." });
      return;
    }
    const value = Number(input.replace(",", ".").trim());
    if (!Number.isFinite(value)) {
      setFeedback({ ok:false, text:"Enter a number first." });
      return;
    }
    if (numericTarget !== null && Math.abs(value - numericTarget) < 0.0001) {
      setFeedback({ ok:true, text:"Correct. Your number matches the worked answer." });
    } else {
      setFeedback({ ok:false, text:"Not quite. Recheck the direction, units and calculation, then try again." });
    }
  }

  function next() {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setFeedback(null);
      return;
    }
    if (!checkpointRevealed) return;
    onComplete();
  }

  function canAdvance() {
    if (step !== 4) return true;
    return Boolean(feedback?.ok);
  }

  return (
    <article className="lesson-modal">
      <div className="lesson-progress">
        <div><span>LESSON {lessonNumber}</span><b>{step + 1} / {steps.length}</b></div>
        <i style={{width: ((step + 1) / steps.length * 100) + "%"}} />
      </div>

      <div className="lesson-step">
        <span className="kicker">{current.label}</span>
        <h2><ScientificText value={current.title} /></h2>
        <p><ScientificText value={current.body} /></p>
        {current.source && <a className="source-link" href={lesson.externalReferences?.[0]?.url} target="_blank" rel="noreferrer">Source: {current.source} ↗</a>}

        {step === 4 && (
          <div className="lesson-interaction">
            {interaction.type === "choice" ? (
              <div className="lesson-choices">
                {interaction.options.map((option, index) => (
                  <button key={option} className={selected === index ? "choice-selected" : ""} onClick={() => { setSelected(index); setFeedback(null); }}>
                    <span>{String.fromCharCode(65 + index)}</span><ScientificText value={option} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="numeric-box">
                <input value={input} onChange={(e) => { setInput(e.target.value); setFeedback(null); }} inputMode="decimal" placeholder="Enter the number" aria-label="Numerical answer" />
                <button onClick={checkInteraction}>Check answer</button>
              </div>
            )}
            {interaction.type === "choice" && <button className="check-answer" onClick={checkInteraction} disabled={selected === null}>Check answer</button>}
            {feedback && <div className={"lesson-feedback " + (feedback.ok ? "is-correct" : "is-wrong")}>{feedback.text}</div>}
          </div>
        )}

        {step === 7 && (
          <div className="checkpoint-box">
            <button onClick={() => setCheckpointRevealed(true)}>{checkpointRevealed ? "Checkpoint revealed" : "Reveal checkpoint answer"}</button>
            {checkpointRevealed && <div><span>ANSWER</span><p><ScientificText value={lesson.checkpoint.answer} /></p></div>}
          </div>
        )}
      </div>

      <div className="lesson-nav">
        <button disabled={step === 0} onClick={() => { setStep(step - 1); setFeedback(null); }}>← Back</button>
        <button disabled={!canAdvance()} onClick={next}>{step === steps.length - 1 ? (completed ? "Close lesson" : "Complete lesson") : "Continue →"}</button>
      </div>
    </article>
  );
}