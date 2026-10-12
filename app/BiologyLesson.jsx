"use client";

import { useState } from "react";
import ScientificText from "./ScientificText";

function Choice({ question, selected, onSelect, passed }) {
  return <div className="interaction-options">
    {question.options.map((option, i) => <button key={option} disabled={passed} className={selected===i?(passed?"correct":"wrong"):""} onClick={()=>onSelect(i)}>
      {String.fromCharCode(65+i)}. <ScientificText value={option}/>
    </button>)}
    {selected!==null&&<div className={passed?"feedback good":"feedback bad"}>{passed?<>✓ Correct. <ScientificText value={question.explain}/></>:"Not quite — try another option."}</div>}
  </div>;
}

export default function BiologyLesson({ lesson, lessonNumber, completed, onComplete }) {
 const [step,setStep]=useState(0);
 const [selected,setSelected]=useState(null);
 const [checkpointSelected,setCheckpointSelected]=useState(null);
 const interaction=lesson.interaction;
 const checkpoint=lesson.checkpoint;
 const interactionPassed=selected===interaction.answer;
 const checkpointPassed=checkpointSelected===checkpoint.answer;
 const steps=[
  {label:"HOOK",title:lesson.hook,body:"Begin with the question this idea helps answer."},
  {label:"TEXTBOOK",title:"What the chapter says",body:lesson.textbook,source:lesson.sources?.[0]},
  {label:"TEACHER",title:"Let's unpack the idea",body:lesson.teacher},
  {label:"EXAMPLE",title:"Connect the idea to an example",body:lesson.example},
  {label:"YOUR TURN",title:interaction.prompt,body:"Choose an answer, then read the explanation. Move on once you have the idea."},
  {label:"COMMON MISTAKE",title:"What to watch out for",body:lesson.mistake},
  {label:"TEXTBOOK ACTIVITY",title:"Try it in your own words",body:lesson.textbookActivity,source:lesson.sources?.[0]},
  {label:"CHECKPOINT",title:checkpoint.prompt,body:"Use what you learned to finish the lesson."}
 ];
 const current=steps[step];
 function next(){if(step===4&&!interactionPassed)return;if(step===7&&!checkpointPassed)return;if(step<7)setStep(step+1);else onComplete();}
 function back(){if(step>0)setStep(step-1);}
 return <div className="lesson-modal">
  <div className="lesson-modal-head"><div><span className="kicker">LESSON {lessonNumber} · {lesson.section}</span><h2>{lesson.title}</h2><small>Textbook pages {lesson.pages}</small></div><div className="lesson-step-count">{step+1} / {steps.length}</div></div>
  <div className="lesson-progress"><i style={{width:((step+1)/steps.length*100)+"%"}}/></div>
  <article className={"teaching-card teaching-"+current.label.toLowerCase().replaceAll(" ","-")}>
   <div className="teaching-label">{current.label}</div>
   <h3><ScientificText value={current.title}/></h3>
   <div className="teaching-copy">{String(current.body||"").split(/\n\n+/).filter(Boolean).map((paragraph,i)=><p key={i}><ScientificText value={paragraph}/></p>)}</div>
   {current.source&&<div className="source-ref">📖 {current.source}</div>}
   {step===2&&lesson.externalReferences?.length>0&&<div className="source-ref" style={{marginTop:"1rem"}}><strong>Want another explanation?</strong><ul style={{margin:"0.5rem 0 0",paddingLeft:"1.25rem"}}>{lesson.externalReferences.map(ref=><li key={ref.url}><a href={ref.url} target="_blank" rel="noreferrer" style={{color:"#43f5c3",textDecoration:"underline"}}>{ref.title} ↗</a></li>)}</ul><small>Optional extra reading; your supplied NCERT chapter remains the main syllabus source.</small></div>
   {current.label==="YOUR TURN"&&<Choice question={interaction} selected={selected} onSelect={setSelected} passed={interactionPassed}/>}
   {current.label==="CHECKPOINT"&&<Choice question={checkpoint} selected={checkpointSelected} onSelect={setCheckpointSelected} passed={checkpointPassed}/>}
   {step===7&&checkpointPassed&&<div className="mastery-note">✓ Checkpoint passed — ready to complete this lesson</div>}
  </article>
  <div className="lesson-nav"><button onClick={back} disabled={step===0}>← Back</button><button onClick={next} disabled={(step===4&&!interactionPassed)||(step===7&&!checkpointPassed)}>{step===7?"Complete lesson ✓":"Continue →"}</button></div>
  {completed&&<div className="mastery-note">Previously completed — this lesson can be reviewed.</div>}
 </div>;
}
