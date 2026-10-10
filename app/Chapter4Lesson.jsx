"use client";

import { useState } from "react";
import ScientificText from "./ScientificText";

function normaliseAnswer(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[−–]/g, "-")
    .replace(/m\s*s[⁻−-]¹/g, "m/s")
    .replace(/m\s*s[⁻−-]²/g, "m/s^2")
    .replace(/m\/s[⁻−-]²/g, "m/s^2")
    .replace(/m\/s²/g, "m/s^2")
    .replace(/m\s*s\^-1/g, "m/s")
    .replace(/m\s*s\^-2/g, "m/s^2")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/[×·]/g, "*")
    .replace(/\s+/g, "");
}

function answerMatches(question, value) {
  const accepted = [question.answer, ...(question.acceptedAnswers || [])];
  const submitted = normaliseAnswer(value);
  return submitted.length > 0 && accepted.some((answer) => normaliseAnswer(answer) === submitted);
}

function ChoiceQuestion({ question, selected, onSelect, passed }) {
  return (
    <div className="interaction-options">
      {question.options.map((option, i) => {
        const isSelected = selected === i;
        const className = isSelected ? (passed ? "correct" : "wrong") : "";
        return (
          <button key={option} className={className} disabled={passed} onClick={() => onSelect(i)}>
            {String.fromCharCode(65 + i)}. <ScientificText value={option} />
          </button>
        );
      })}
      {selected !== null && (
        <div className={passed ? "feedback good" : "feedback bad"}>
          {passed ? (
            <>✓ Correct. <ScientificText value={question.explain} /></>
          ) : (
            <>Not quite — try another option.</>
          )}
        </div>
      )}
    </div>
  );
}

function WrittenAnswer({ question, value, setValue, checked, setChecked }) {
  const passed = checked && answerMatches(question, value);
  return (
    <div className="numeric-practice">
      <label className="answer-label">
        Your answer
        <input
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setChecked(false);
          }}
          placeholder="Enter a value with its unit"
          autoComplete="off"
        />
      </label>
      <button onClick={() => setChecked(true)} disabled={!value.trim()}>
        Check answer
      </button>
      {checked && (
        <div className={passed ? "feedback good" : "feedback bad"}>
          {passed ? (
            <>
              <b>✓ Correct — <ScientificText value={question.answer} /></b>
              <br />
              {question.explain}
            </>
          ) : (
            <>
              <b>Not quite. Try once more.</b>
              <br />
              <ScientificText value={question.hint || "Check the relationship, signs, arithmetic, and unit, then try again."} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Chapter4Lesson({ lesson, lessonNumber, completed, onComplete }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState("");
  const [interactionChecked, setInteractionChecked] = useState(false);
  const [checkpointSelected, setCheckpointSelected] = useState(null);
  const [checkpointResponse, setCheckpointResponse] = useState("");
  const [checkpointChecked, setCheckpointChecked] = useState(false);

  const interaction = lesson.interaction;
  const checkpoint = lesson.checkpoint;
  const interactionPassed = interaction.type === "choice"
    ? selected === interaction.answer
    : interactionChecked && answerMatches(interaction, response);
  const checkpointPassed = checkpoint.type === "choice"
    ? checkpointSelected === checkpoint.answer
    : checkpointChecked && answerMatches(checkpoint, checkpointResponse);

  const steps = [
    { label: "HOOK", title: lesson.hook, body: "Start with the question this idea helps us answer." },
    { label: "TEXTBOOK", title: "The chapter idea", body: lesson.textbook, source: lesson.sources?.[0] },
    { label: "TEACHER", title: "Let's break it down", body: lesson.teacher },
    { label: "EXAMPLE", title: "Work through an example", body: lesson.example },
    { label: "YOUR TURN", title: interaction.prompt, body: interaction.type === "choice" ? "Choose the best answer. Each option tests a different idea." : "Work it out yourself, enter your answer with a unit, and check it." },
    { label: "COMMON MISTAKE", title: "What to watch out for", body: lesson.mistake },
    { label: "TEXTBOOK ACTIVITY", title: "Try it in your own words", body: lesson.textbookActivity, source: lesson.sources?.[0] },
    { label: "CHECKPOINT", title: checkpoint.prompt, body: "Use what you learned to answer one final question before completing the lesson." }
  ];
  const current = steps[step];

  function next() {
    if (step === 4 && !interactionPassed) return;
    if (step < steps.length - 1) setStep(step + 1);
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
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
        <h3><ScientificText value={current.title} /></h3>
        <div className="teaching-copy">
          {String(current.body || "").split(/\n\n+/).filter(Boolean).map((paragraph, i) => (
            <p key={i}><ScientificText value={paragraph} /></p>
          ))}
        </div>
        {current.source && <div className="source-ref">📖 {current.source}</div>}
        {current.label === "TEXTBOOK" && lesson.externalReferences?.length > 0 && (
          <div className="web-references">
            <b>Official source</b>
            {lesson.externalReferences.map((ref) => (
              <a key={ref.url} href={ref.url} target="_blank" rel="noreferrer">{ref.label} ↗</a>
            ))}
          </div>
        )}

        {current.label === "YOUR TURN" && interaction.type === "choice" && (
          <ChoiceQuestion question={interaction} selected={selected} onSelect={setSelected} passed={interactionPassed} />
        )}
        {current.label === "YOUR TURN" && interaction.type === "numeric" && (
          <WrittenAnswer
            question={interaction}
            value={response}
            setValue={setResponse}
            checked={interactionChecked}
            setChecked={setInteractionChecked}
          />
        )}

        {current.label === "CHECKPOINT" && checkpoint.type === "choice" && (
          <ChoiceQuestion
            question={checkpoint}
            selected={checkpointSelected}
            onSelect={setCheckpointSelected}
            passed={checkpointPassed}
          />
        )}
        {current.label === "CHECKPOINT" && checkpoint.type === "numeric" && (
          <WrittenAnswer
            question={checkpoint}
            value={checkpointResponse}
            setValue={setCheckpointResponse}
            checked={checkpointChecked}
            setChecked={setCheckpointChecked}
          />
        )}
      </article>

      <div className="lesson-nav">
        <button disabled={step === 0} onClick={goBack}>← Previous</button>
        {step < steps.length - 1 ? (
          <button disabled={step === 4 && !interactionPassed} onClick={next}>Continue →</button>
        ) : (
          <button disabled={!checkpointPassed} onClick={onComplete}>
            {completed ? "Lesson completed ✓" : "Complete lesson →"}
          </button>
        )}
      </div>
      {completed && <div className="mastery-note">✓ Mastery recorded — replay any time.</div>}
    </div>
  );
}
