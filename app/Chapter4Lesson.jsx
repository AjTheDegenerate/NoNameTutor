"use client";

import { useState } from "react";

export default function Chapter4Lesson({ lesson, lessonNumber, completed, onComplete }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const steps = [
    {label:"HOOK", title:lesson.hook, body:"Start with the idea before the formula."},
    {label:"TEXTBOOK", title:"What the source says", body:lesson.textbook, source:lesson.sources[0]},
    {label:"TEACHER", title:"Make it make sense", body:lesson.teacher},
    {label:"EXAMPLE", title:"Watch it work", body:lesson.example},
    {label:"YOUR TURN", title:lesson.interaction.prompt, body:lesson.interaction.type==="choice" ? "Choose the answer you think is correct." : "Work it out before revealing the worked answer."},
    {label:"COMMON MISTAKE", title:"Watch for this", body:lesson.mistake},
    {label:"TEXTBOOK ACTIVITY", title:"Apply it", body:lesson.textbookActivity, source:lesson.sources[0]},
    {label:"CHECKPOINT", title:lesson.checkpoint.prompt, body:"State the rule, then finish the lesson."}
  ];
  const current=steps[step];

  function next(){ if(step<steps.length-1){setStep(step+1);setSelected(null);setRevealed(false);} }
  function choose(i){setSelected(i);}
  const passedChoice=lesson.interaction.type==="choice" && selected===0;
  const passedWork=lesson.interaction.type==="numeric" && revealed;
  const passedCheckpoint=step===7 && revealed;

  return <div className="lesson-modal">
    <div className="lesson-modal-head">
      <div><span className="kicker">LESSON {lessonNumber} · {lesson.section}</span><h2>{lesson.title}</h2><small>Textbook pages {lesson.pages}</small></div>
      <div className="lesson-step-count">{step+1} / {steps.length}</div>
    </div>
    <div className="lesson-progress"><i style={{width:((step+1)/steps.length*100)+"%"}} /></div>
    <article className={"teaching-card teaching-"+current.label.toLowerCase().replaceAll(" ","-")}>
      <div className="teaching-label">{current.label}</div><h3>{current.title}</h3><p>{current.body}</p>
      {current.source && <div className="source-ref">📖 {current.source}</div>}
      {current.label==="TEXTBOOK" && lesson.externalReferences?.length>0 && <div className="web-references"><b>Official source</b>{lesson.externalReferences.map(ref=><a key={ref.url} href={ref.url} target="_blank" rel="noreferrer">{ref.label} ↗</a>)}</div>}
      {current.label==="YOUR TURN" && lesson.interaction.type==="choice" && <div className="interaction-options">
        {lesson.interaction.options.map((option,i)=><button key={option} className={selected===i?(i===0?"correct":"wrong"):""} onClick={()=>choose(i)}>{String.fromCharCode(65+i)}. {option}</button>)}
        {selected!==null && <div className={passedChoice?"feedback good":"feedback bad"}>{passedChoice?"✓ Correct. ":"Not quite. "}{lesson.interaction.explain}</div>}
      </div>}
      {current.label==="YOUR TURN" && lesson.interaction.type==="numeric" && <div className="numeric-practice">
        {!revealed?<button onClick={()=>setRevealed(true)}>Reveal worked answer</button>:<div className="feedback good"><b>{lesson.interaction.answer}</b><br/>{lesson.interaction.explain}</div>}
      </div>}
      {current.label==="CHECKPOINT" && <div className="checkpoint-box">
        {!revealed?<button onClick={()=>setRevealed(true)}>Reveal checkpoint answer</button>:<div className="feedback good"><b>{lesson.checkpoint.answer}</b></div>}
      </div>}
    </article>
    <div className="lesson-nav">
      <button disabled={step===0} onClick={()=>setStep(step-1)}>← Previous</button>
      {step<steps.length-1?<button onClick={next}>Continue →</button>:<button disabled={!passedCheckpoint} onClick={onComplete}>{completed?"Lesson completed ✓":"Complete lesson →"}</button>}
    </div>
    {completed&&<div className="mastery-note">✓ Mastery recorded — replay any time.</div>}
  </div>;
}
