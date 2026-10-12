"use client";

import { useMemo, useState } from "react";
import ScientificText from "./ScientificText";
import BiologyLesson from "./BiologyLesson";
import chapter2BiologyLessons from "./chapter2BiologyLessons";
import chapter2BiologyFlashcards from "./chapter2BiologyFlashcards";
import chapter2BiologyQuiz from "./chapter2BiologyQuiz";
import chapter2BiologyMindMap from "./chapter2BiologyMindMap";
import chapter2BiologyQuestionBank from "./chapter2BiologyQuestionBank";
import chapter2BiologyPapers from "./chapter2BiologyPapers";
import chapter2BiologyResources from "./chapter2BiologyResources";

const modes = ["all","past","solved","unsolved","practice","review"];
const questionTypes = ["all",...Array.from(new Set(chapter2BiologyQuestionBank.map(q=>q.type)))];

function makePaperPdf(text) {
 const safe=String(text||"")
  .replace(/[₀-₉]/g,d=>"_"+ "₀₁₂₃₄₅₆₇₈₉".indexOf(d))
  .replaceAll("½","1/2").replaceAll("¼","1/4").replaceAll("¾","3/4")
  .replaceAll("²","^2").replaceAll("³","^3").replaceAll("¹","^1")
  .replaceAll("⁻¹","^-1").replaceAll("⁻²","^-2").replaceAll("⁻³","^-3")
  .replaceAll("—","-").replaceAll("–","-").replaceAll("−","-")
  .replaceAll("•","-").replaceAll("×","*").replaceAll("·","*")
  .replaceAll("√","sqrt").replaceAll("π","pi").replaceAll("Δ","Delta")
  .replaceAll("→","->").replaceAll("≤","<=").replaceAll("≥",">=")
  .replaceAll("≈","~=").replaceAll("≠","!=").replaceAll("°"," deg")
  .replaceAll("“",'"').replaceAll("”",'"').replaceAll("‘","'").replaceAll("’","'")
  .replace(/[^\x20-\x7E\n\r\t]/g,"?");
 const wrap=(line,max=92)=>{const out=[];let rest=line;while(rest.length>max){let cut=rest.lastIndexOf(" ",max);if(cut<1)cut=max;out.push(rest.slice(0,cut));rest=rest.slice(cut).trimStart();}out.push(rest);return out;};
 const lines=safe.split("\n").flatMap(line=>line?wrap(line):[""]);
 const perPage=58,pages=[];for(let i=0;i<lines.length;i+=perPage)pages.push(lines.slice(i,i+perPage));
 const esc=s=>s.replaceAll("\\","\\\\").replaceAll("(","\\(").replaceAll(")","\\)");
 const objects=["<< /Type /Catalog /Pages 2 0 R >>"];
 const refs=pages.map((_,i)=>`${3+i*2} 0 R`).join(" ");
 objects.push(`<< /Type /Pages /Kids [${refs}] /Count ${pages.length} >>`);
 pages.forEach((pageLines,i)=>{const p=3+i*2,c=4+i*2;let stream="BT /F1 10 Tf 45 800 Td 12 TL\n";pageLines.forEach((line,n)=>{if(n)stream+="T*\n";stream+=`(${esc(line)}) Tj\n`;});stream+="ET";objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${3+pages.length*2} 0 R >> >> /Contents ${c} 0 R >>`);objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);});
 objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
 let pdf="%PDF-1.4\n";const offsets=[0];objects.forEach((obj,i)=>{offsets.push(pdf.length);pdf+=`${i+1} 0 obj\n${obj}\nendobj\n`;});
 const xref=pdf.length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;for(let i=1;i<=objects.length;i++)pdf+=String(offsets[i]).padStart(10,"0")+" 00000 n \n";pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
 return new Blob([pdf],{type:"application/pdf"});
}

function BioCellSketch({kind}) {
 if(kind.toLowerCase().includes("membrane")) return <svg className="bio-sketch" viewBox="0 0 540 180" role="img" aria-label="Schematic fluid-mosaic membrane with lipid bilayer and embedded proteins">
  {[0,1].map(r=>Array.from({length:18},(_,i)=><g key={r+"-"+i}><circle cx={36+i*27} cy={48+r*76} r="8" fill="#43f5c3" stroke="#bdf7e5" strokeWidth="1"/><path d={`M${32+i*27} ${56+r*76} l-3 15 m7-15 l3 15`} stroke="#f0c674" strokeWidth="2" strokeLinecap="round"/></g>))}
  <rect x="225" y="53" width="38" height="70" rx="16" fill="#93a7ff" stroke="#e2e9ff" strokeWidth="2"/><rect x="387" y="53" width="34" height="70" rx="16" fill="#93a7ff" stroke="#e2e9ff" strokeWidth="2"/>
  <text x="270" y="19" fill="#e8f4ee" fontSize="13">Water-attracting heads</text><text x="270" y="166" fill="#e8f4ee" fontSize="13">Water-attracting heads</text><text x="274" y="91" fill="#a7b9af" fontSize="12">tails face inward</text>
 </svg>;
 if(kind.toLowerCase().includes("nucleus")) return <svg className="bio-sketch" viewBox="0 0 540 180" role="img" aria-label="Schematic nucleus with double-layered membrane, pores, nucleolus and chromatin">
  <circle cx="270" cy="92" r="70" fill="#10251e" stroke="#43f5c3" strokeWidth="4"/><circle cx="270" cy="92" r="62" fill="none" stroke="#7acbb2" strokeWidth="2"/><circle cx="290" cy="90" r="16" fill="#f0c674"/><path d="M225 64 q20 -25 35 2 t20 25 t-8 23 t-22 6 t-23 -18 t-2 -38" fill="none" stroke="#9db4ff" strokeWidth="4"/>
  {[0,1,2,3,4].map(i=><circle key={i} cx={270+64*Math.cos(i*1.04)} cy={92+64*Math.sin(i*1.04)} r="4" fill="#f3f8f5"/>)}
  <text x="20" y="30" fill="#a7b9af" fontSize="12">Double-layered membrane</text><path d="M170 33 L213 45" stroke="#a7b9af"/><text x="395" y="40" fill="#a7b9af" fontSize="12">Nucleolus</text><path d="M393 45 L303 84" stroke="#a7b9af"/><text x="20" y="155" fill="#a7b9af" fontSize="12">Chromatin</text><path d="M90 150 L236 112" stroke="#a7b9af"/>
 </svg>;
 if(kind.toLowerCase().includes("mitochond")) return <svg className="bio-sketch" viewBox="0 0 540 180" role="img" aria-label="Schematic mitochondrion with outer and folded inner membrane">
  <path d="M90 93 C90 30 190 25 260 45 C335 5 450 43 450 92 C450 145 355 160 270 140 C180 163 90 145 90 93Z" fill="#10251e" stroke="#43f5c3" strokeWidth="4"/>
  <path d="M125 95 Q145 56 170 88 T215 90 T260 89 T305 90 T350 90 T405 88 M125 105 Q145 66 170 98 T215 100 T260 99 T305 100 T350 100 T405 98" fill="none" stroke="#f0c674" strokeWidth="4"/>
  <text x="12" y="26" fill="#a7b9af" fontSize="12">Outer membrane</text><path d="M118 30 L132 52" stroke="#a7b9af"/><text x="370" y="160" fill="#a7b9af" fontSize="12">Cristae</text><path d="M400 147 L380 103" stroke="#a7b9af"/>
 </svg>;
 if(kind.toLowerCase().includes("chloroplast")) return <svg className="bio-sketch" viewBox="0 0 540 180" role="img" aria-label="Schematic chloroplast showing double membrane, stroma and internal chlorophyll-containing membranes">
  <rect x="80" y="32" width="380" height="115" rx="56" fill="#10251e" stroke="#43f5c3" strokeWidth="4"/><rect x="90" y="42" width="360" height="95" rx="46" fill="none" stroke="#9ddfc8" strokeWidth="2"/>
  {[0,1,2,3,4].map(i=><g key={i}><ellipse cx={170+i*48} cy={82+(i%2)*18} rx="18" ry="8" fill="#f0c674"/><ellipse cx={170+i*48} cy={92+(i%2)*18} rx="18" ry="8" fill="#dfb65e"/></g>)}
  <text x="10" y="24" fill="#a7b9af" fontSize="12">Double membrane</text><path d="M100 27 L110 48" stroke="#a7b9af"/><text x="385" y="165" fill="#a7b9af" fontSize="12">Stroma</text><path d="M400 152 L405 126" stroke="#a7b9af"/>
 </svg>;
 if(kind.toLowerCase().includes("bacterial")) return <svg className="bio-sketch" viewBox="0 0 540 180" role="img" aria-label="Schematic bacterial cell with wall, membrane, nucleoid and ribosomes">
  <rect x="72" y="42" width="395" height="96" rx="48" fill="#14281f" stroke="#43f5c3" strokeWidth="7"/><rect x="81" y="51" width="377" height="78" rx="39" fill="none" stroke="#9ddfc8" strokeWidth="2"/><path d="M200 80 q25 -32 50 0 t50 0 t50 0" fill="none" stroke="#f0c674" strokeWidth="4"/>{[0,1,2,3,4,5,6,7,8].map(i=><circle key={i} cx={145+(i%3)*108} cy={65+Math.floor(i/3)*28} r="3" fill="#a8b8ff"/>)}
  <text x="12" y="25" fill="#a7b9af" fontSize="12">Cell wall / membrane</text><path d="M125 28 L130 49" stroke="#a7b9af"/><text x="355" y="165" fill="#a7b9af" fontSize="12">Nucleoid</text><path d="M380 151 L324 88" stroke="#a7b9af"/>
 </svg>;
 if(kind.toLowerCase().includes("plant cell")) return <svg className="bio-sketch" viewBox="0 0 540 180" role="img" aria-label="Schematic plant cell with outer cell wall, membrane, large central vacuole, nucleus and chloroplasts">
  <rect x="55" y="22" width="430" height="136" rx="16" fill="#132a21" stroke="#43f5c3" strokeWidth="7"/><rect x="64" y="31" width="412" height="118" rx="10" fill="none" stroke="#9ddfc8" strokeWidth="2"/>
  <rect x="145" y="48" width="190" height="88" rx="18" fill="#123c30" stroke="#73bea5" strokeWidth="2"/><circle cx="112" cy="85" r="22" fill="#183e32" stroke="#9db4ff" strokeWidth="3"/><circle cx="115" cy="84" r="7" fill="#f0c674"/>
  {[0,1,2,3].map(i=><g key={i}><ellipse cx={377+(i%2)*42} cy={60+Math.floor(i/2)*58} rx="14" ry="7" fill="#43f5c3" stroke="#b7f1df" strokeWidth="1.5"/></g>)}
  <text x="70" y="15" fill="#a7b9af" fontSize="11">Cell wall + membrane</text><text x="180" y="96" fill="#bcebdd" fontSize="12">Large central vacuole</text><text x="77" y="125" fill="#a7b9af" fontSize="11">Nucleus</text><text x="370" y="151" fill="#a7b9af" fontSize="11">Chloroplasts</text>
 </svg>;
 if(kind.toLowerCase().includes("animal cell")) return <svg className="bio-sketch" viewBox="0 0 540 180" role="img" aria-label="Schematic animal cell with membrane, nucleus, mitochondrion, Golgi apparatus and lysosome">
  <path d="M48 94 C41 46 105 22 175 34 C234 10 305 26 343 38 C417 21 483 54 481 96 C479 137 419 157 353 143 C274 170 200 146 150 151 C87 154 46 129 48 94Z" fill="#10251e" stroke="#43f5c3" strokeWidth="4"/>
  <circle cx="157" cy="91" r="35" fill="#183e32" stroke="#9db4ff" strokeWidth="3"/><circle cx="164" cy="91" r="9" fill="#f0c674"/><ellipse cx="278" cy="63" rx="35" ry="13" fill="#183e32" stroke="#f0c674" strokeWidth="3"/><path d="M253 61 q12 -18 22 0 t22 0" fill="none" stroke="#f0c674" strokeWidth="2"/><ellipse cx="355" cy="106" rx="26" ry="11" fill="#183e32" stroke="#9db4ff" strokeWidth="3"/><circle cx="407" cy="69" r="10" fill="#b4a0ff"/>
  <text x="117" y="143" fill="#a7b9af" fontSize="11">Nucleus</text><text x="265" y="37" fill="#a7b9af" fontSize="11">Golgi</text><text x="337" y="132" fill="#a7b9af" fontSize="11">Mitochondrion</text><text x="395" y="53" fill="#a7b9af" fontSize="11">Lysosome</text>
 </svg>;
 return <svg className="bio-sketch" viewBox="0 0 540 180" role="img" aria-label="Schematic eukaryotic cell with membrane, nucleus, organelles and vacuole">
  <ellipse cx="270" cy="90" rx="220" ry="67" fill="#10251e" stroke="#43f5c3" strokeWidth="4"/><circle cx="190" cy="87" r="35" fill="#183e32" stroke="#8ad7bd" strokeWidth="3"/><circle cx="198" cy="89" r="9" fill="#f0c674"/>
  <ellipse cx="330" cy="73" rx="40" ry="12" fill="#183e32" stroke="#f0c674" strokeWidth="3"/><path d="M305 69 q12 -18 22 0 t22 0" fill="none" stroke="#f0c674" strokeWidth="2"/><ellipse cx="350" cy="112" rx="25" ry="10" fill="#183e32" stroke="#9db4ff" strokeWidth="3"/><ellipse cx="270" cy="117" rx="38" ry="16" fill="#14352a" stroke="#43f5c3" strokeWidth="2"/>
  <text x="160" y="145" fill="#a7b9af" fontSize="11">Nucleus</text><text x="300" y="42" fill="#a7b9af" fontSize="11">ER</text><text x="365" y="134" fill="#a7b9af" fontSize="11">Mitochondrion</text><text x="260" y="120" fill="#d0f4e7" fontSize="10">Vacuole</text>
 </svg>;
}

export default function BiologyWorkspace({onBack}) {
 const [tab,setTab]=useState("learn");
 const [query,setQuery]=useState("");
 const [done,setDone]=useState([]);
 const [activeLesson,setActiveLesson]=useState(null);
 const [skipLessonKey,setSkipLessonKey]=useState(chapter2BiologyLessons[0].key);
 const [card,setCard]=useState(0);
 const [showAnswer,setShowAnswer]=useState(false);
 const [quizAnswers,setQuizAnswers]=useState({});
 const [mindFilter,setMindFilter]=useState("All");
 const [paperMode,setPaperMode]=useState("all");
 const [questionMode,setQuestionMode]=useState("all");
 const [questionAnswers,setQuestionAnswers]=useState({});
 const [comparisonIndex,setComparisonIndex]=useState(0);
 const [processIndex,setProcessIndex]=useState(0);
 const [classificationIndex,setClassificationIndex]=useState(0);
 const [glossaryQuery,setGlossaryQuery]=useState("");
 const [selectedDiagram,setSelectedDiagram]=useState(0);
 const [selectedDiagramPart,setSelectedDiagramPart]=useState(0);
 const [diagramRevealed,setDiagramRevealed]=useState(false);
 const content=chapter2BiologyLessons;
 const filtered=useMemo(()=>content.filter(x=>(x.title+" "+x.hook+" "+x.teacher).toLowerCase().includes(query.toLowerCase())),[content,query]);
 const completedConcepts=done.filter(x=>x.startsWith("biology:lesson:")).length;
 const progress=Math.round(completedConcepts/content.length*100);
 const currentLesson=content.find(x=>x.key===activeLesson);
 const mindGroups=["All",...Array.from(new Set(chapter2BiologyMindMap.map(x=>x[0])))];
 const filteredMindMap=chapter2BiologyMindMap.filter(x=>mindFilter==="All"||x[0]===mindFilter);
 const currentDiagram=chapter2BiologyResources.diagrams[selectedDiagram];
 const currentDiagramPart=currentDiagram.parts[selectedDiagramPart];
 const filteredQuestions=chapter2BiologyQuestionBank.filter(q=>questionMode==="all"||q.type===questionMode);
 const filteredGlossary=chapter2BiologyResources.glossary.filter(([term,def])=>(term+" "+def).toLowerCase().includes(glossaryQuery.toLowerCase()));
 const paperItems=chapter2BiologyPapers.filter(p=>paperMode==="all"||p.modes.includes(paperMode));
 const correctQuiz=chapter2BiologyQuiz.filter((q,i)=>quizAnswers[i]===q.answerIndex).length;
 function complete(key){setDone(v=>v.includes(key)?v:[...v,key]);}
 function openTab(next){setTab(next);if(next==="flashcards"){setCard(0);setShowAnswer(false);}}
 function launchLesson(key){setActiveLesson(key);setTab("learn");}
 function openPaperPdf(paper,download=false){if(!paper.text)return;const url=URL.createObjectURL(makePaperPdf(paper.text));if(download){const a=document.createElement("a");a.href=url;a.download=paper.title.replaceAll(" ","_")+".pdf";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}else{window.open(url,"_blank","noopener,noreferrer");setTimeout(()=>URL.revokeObjectURL(url),60000);}}
 const coreNav=[["learn","Learn"],["practice","Quiz"],["flashcards","Flashcards"],["papers","Papers"],["revision","Revision"],["notes","Notes"],["mindmap","Mind map"],["diagrams","Diagrams"],["processes","Processes"]];
 return <main className="app-shell bio-shell">
  <header className="topbar bio-topbar">
   <button className="brand" onClick={onBack} aria-label="Back to subjects"><span className="brand-mark">N</span><span><b>No Name Tutor</b><small>CLASS 9 · BIOLOGY</small></span></button>
   <nav className="top-nav bio-top-nav">{coreNav.map(([id,label])=><button key={id} className={tab===id||(id==="practice"&&tab==="practice")?"nav-active":""} onClick={()=>openTab(id)}>{label}</button>)}</nav>
   <button className="bio-back" onClick={onBack}>← Subjects</button>
  </header>
  <section className="course-strip bio-course-strip">
   <div><span className="kicker">CLASS 9 · BIOLOGY · SUPPLIED TEXTBOOK CHAPTER 2</span><h1>The Fascinating World of Cells</h1><p>Cell: The Building Block of Life · Source-grounded learning path and study tools.</p></div>
   <div className="goal"><div className="goal-top"><b>Daily goal</b><span>{Math.min(completedConcepts,3)} / 3</span></div><div className="goal-track"><i style={{width:Math.min(100,completedConcepts/3*100)+"%"}}/></div><small>Complete 3 lessons today</small></div>
  </section>

  {tab==="learn"&&<div className="main-grid bio-main-grid">
   <section className="path-panel">
    <div className="path-head"><div><span className="kicker">BIOLOGY LEARNING PATH</span><h2>Chapter 2 · Cell: The Building Block of Life</h2></div><span className="progress-chip">{progress}% complete</span></div>
    <div className="skip-lesson-control" style={{display:"flex",gap:"0.75rem",alignItems:"end",flexWrap:"wrap",margin:"1rem 0",padding:"1rem",border:"1px solid #23342d",borderRadius:"12px",background:"#0b100e"}}>
     <label style={{display:"grid",gap:".4rem",flex:"1 1 240px",color:"#a7b9af",fontSize:".85rem"}}><span>Skip to this lesson</span><select value={content.some(x=>x.key===skipLessonKey)?skipLessonKey:content[0].key} onChange={e=>setSkipLessonKey(e.target.value)} style={{width:"100%",minHeight:"42px",padding:".65rem",borderRadius:"8px",border:"1px solid #34483e",background:"#101815",color:"#f2f7f4"}}>{content.map((l,i)=><option key={l.key} value={l.key}>Lesson {i+1}: {l.title}</option>)}</select></label>
     <button onClick={()=>launchLesson(content.find(x=>x.key===skipLessonKey)?.key||content[0].key)} style={{minHeight:"42px",padding:".7rem 1rem",borderRadius:"8px",border:"1px solid #43f5c3",background:"#43f5c3",color:"#07100c",fontWeight:700}}>Go to lesson →</button>
    </div>
    <div className="asset-bar bio-asset-bar">
     <button onClick={()=>openTab("flashcards")}>🃏 {chapter2BiologyFlashcards.length} Flashcards</button>
     <button onClick={()=>openTab("practice")}>🧠 {chapter2BiologyQuiz.length}-Question Quiz</button>
     <button onClick={()=>openTab("mindmap")}>🗺️ Mind Map</button>
     <button onClick={()=>openTab("papers")}>📚 Papers</button>
     <button onClick={()=>openTab("revision")}>✍️ {chapter2BiologyQuestionBank.length}-Question Revision</button>
     <button onClick={()=>openTab("diagrams")}>🔬 Diagrams & Labeling</button>
     <button onClick={()=>openTab("processes")}>↻ Processes & Cycles</button>
     <button onClick={()=>openTab("compare")}>⇄ Compare Tables</button>
     <button onClick={()=>openTab("classify")}>⑂ Classification Trees</button>
     <button onClick={()=>openTab("glossary")}>📖 Glossary</button>
     <button onClick={()=>openTab("real-life")}>🌱 Real-life Links</button>
    </div>
    <div className="path">{filtered.map((lesson,i)=>{const key="biology:lesson:"+lesson.key;const completed=done.includes(key);const originalIndex=content.findIndex(x=>x.key===lesson.key);const locked=originalIndex>0&&!done.includes("biology:lesson:"+content[originalIndex-1].key);return <div className={"path-row "+(completed?"is-done":"")} key={lesson.key}><div className="path-line"><span className="node">{completed?"✓":originalIndex+1}</span></div><article className={"lesson-card "+(locked?"locked":"")}><div className="lesson-meta"><span>LESSON {originalIndex+1} · {lesson.pages}</span>{completed&&<em>COMPLETED</em>}</div><h3>{lesson.title}</h3><p>{lesson.hook}</p><button disabled={locked} onClick={()=>launchLesson(lesson.key)}>{completed?"Review lesson →":locked?"Complete the previous lesson":"Start lesson →"}</button></article></div>})}</div>
   </section>
   <aside className="right-rail">
    <div className="rail-card"><div className="rail-icon">🧬</div><span className="kicker">CHAPTER 2 STUDY PACK</span><h3>The Fascinating World of Cells</h3><p>28 lessons built around the supplied chapter, plus quiz, flashcards, mind map, ${chapter2BiologyQuestionBank.length} revision questions, papers, diagram practice, processes and visual reference tools.</p><button onClick={()=>openTab("papers")}>Open paper bank</button></div>
    <div className="rail-card stats-card"><span className="kicker">YOUR PROGRESS</span><div className="big-stat">{completedConcepts}<small> / {content.length}</small></div><p>lessons completed</p><div className="mini-track"><i style={{width:progress+"%"}}/></div></div>
    <div className="rail-card"><span className="kicker">CHAPTER SEARCH</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a concept..."/>{query&&<small className="search-count">{filtered.length} matching lessons</small>}</div>
    <div className="rail-card"><span className="kicker">CONTENT TRANSPARENCY</span><p>Lesson explanations follow your 20-page textbook. The re-uploaded quiz, mind-map and flashcard PDFs show the NotebookLM interface, not the underlying exported assets, so the study deck is labelled as textbook-based content rather than a claimed verbatim import.</p></div>
   </aside>
  </div>}

  {activeLesson&&currentLesson&&<section className="overlay-panel"><div className="overlay-inner"><button className="close" onClick={()=>setActiveLesson(null)}>× Close</button><BiologyLesson key={activeLesson} lesson={currentLesson} lessonNumber={content.findIndex(x=>x.key===activeLesson)+1} completed={done.includes("biology:lesson:"+activeLesson)} onComplete={()=>{complete("biology:lesson:"+activeLesson);setActiveLesson(null);setSkipLessonKey(activeLesson);}}/></div></section>}

  {tab!=="learn"&&!activeLesson&&<section className="overlay-panel"><div className="overlay-inner"><button className="close" onClick={()=>setTab("learn")}>× Close</button>

   {tab==="flashcards"&&<><span className="kicker">CHAPTER 2 · TEXTBOOK-BASED FLASHCARDS</span><h2>Cell biology — card {card+1} / {chapter2BiologyFlashcards.length}</h2><article className="flashcard"><span className="card-label">QUESTION</span><h3><ScientificText value={chapter2BiologyFlashcards[card][0]}/></h3>{showAnswer?<div className="card-answer"><span className="card-label">ANSWER</span><p><ScientificText value={chapter2BiologyFlashcards[card][1]}/></p></div>:<button className="reveal" onClick={()=>setShowAnswer(true)}>Reveal answer</button>}</article><div className="flash-controls"><button disabled={card===0} onClick={()=>{setCard(card-1);setShowAnswer(false);}}>← Previous</button><button onClick={()=>{setCard((card+1)%chapter2BiologyFlashcards.length);setShowAnswer(false);}}>{card===chapter2BiologyFlashcards.length-1?"Restart deck →":"Next card →"}</button></div><p className="deck-note">76 cards built from concepts and details in the supplied chapter. These are not claimed to be the unseen NotebookLM export.</p></>}

   {tab==="practice"&&<><span className="kicker">CHAPTER 2 · INTERACTIVE QUIZ</span><h2>The Fascinating World of Cells — {chapter2BiologyQuiz.length} questions.</h2><p className="overlay-intro">Choose an answer for each question. Incorrect answers can be retried; explanations appear after a correct response.</p><div className="quiz-score"><b>{correctQuiz}</b><span> / {chapter2BiologyQuiz.length} correct</span></div>{chapter2BiologyQuiz.map((q,i)=>{const picked=quizAnswers[i];const correct=picked===q.answerIndex;return <article className="practice-card" key={q.question}><span>Q{i+1}</span><h3><ScientificText value={q.question}/></h3><div className="quiz-options">{q.options.map((option,n)=><button key={option} disabled={correct} className={correct&&n===q.answerIndex?"quiz-option-correct":picked===n&&!correct?"quiz-option-wrong":""} onClick={()=>setQuizAnswers(x=>({...x,[i]:n}))}>{String.fromCharCode(65+n)}. <ScientificText value={option}/></button>)}</div>{typeof picked==="number"&&!correct&&<div className="quiz-answer is-wrong">Not quite — try another option.</div>}{correct&&<div className="quiz-answer">✓ Correct. <ScientificText value={q.explanation}/></div>}</article>})}</>}

   {tab==="mindmap"&&<><span className="kicker">CHAPTER 2 · MIND MAP</span><h2>Cell: The Building Block of Life</h2><p className="overlay-intro">Concepts are grouped in the same order and terminology as the supplied chapter.</p><div className="mind-filters">{mindGroups.map(g=><button key={g} className={mindFilter===g?"selected":""} onClick={()=>setMindFilter(g)}>{g}</button>)}</div><div className="mind-grid">{filteredMindMap.map(([group,title,body])=><article key={group+title}><span>{group}</span><h3><ScientificText value={title}/></h3><p><ScientificText value={body}/></p></article>)}</div></>}

   {tab==="revision"&&<><span className="kicker">CHAPTER 2 · QUESTION BANK</span><h2>Revision — {chapter2BiologyQuestionBank.length} questions.</h2><p className="overlay-intro">Attempt first. MCQs and assertion–reasoning questions can be checked and retried. Written responses reveal a model answer and source-based explanation.</p><div className="question-filters">{questionTypes.map(type=><button key={type} className={questionMode===type?"selected":""} onClick={()=>setQuestionMode(type)}>{type==="all"?"All":type.replaceAll("-"," ")}</button>)}</div><div className="question-grid">{filteredQuestions.map((q,i)=>{const id=q.type+":"+i;const response=questionAnswers[id];const picked=typeof response==="number"?response:null;const revealed=response===true;const isChoice=Array.isArray(q.options);const correct=isChoice&&picked!==null&&q.options[picked]===q.answer;return <article className="question-card" key={id}><div className="question-top"><span>{q.type.replaceAll("-"," ").toUpperCase()}</span>{q.options&&<em>{q.options.length} options</em>}</div><h3><ScientificText value={q.q}/></h3>{isChoice?<><div className="quiz-options">{q.options.map((o,n)=><button key={o} disabled={correct} className={correct&&q.options[n]===q.answer?"quiz-option-correct":picked===n&&!correct?"quiz-option-wrong":""} onClick={()=>setQuestionAnswers(x=>({...x,[id]:n}))}>{String.fromCharCode(65+n)}. <ScientificText value={o}/></button>)}</div>{picked!==null&&!correct&&<div className="quiz-answer is-wrong">Not quite — try another option.</div>}{correct&&<div className="question-answer"><b>Correct</b><p><ScientificText value={q.answer}/></p><small><ScientificText value={q.explanation}/></small></div>}</>:revealed?<div className="question-answer"><b>Model answer</b><p><ScientificText value={q.answer}/></p><small><ScientificText value={q.explanation}/></small></div>:<button onClick={()=>setQuestionAnswers(x=>({...x,[id]:true}))}>Reveal answer + explanation</button>}</article>})}</div></>}

   {tab==="papers"&&<><span className="kicker">CHAPTER 2 · PAPER BANK</span><h2>Solved, unsolved, practice and textbook review.</h2><p className="overlay-intro">Generated papers are clearly identified as supplementary/source-grounded. The supplied textbook's end-of-chapter prompts are separately labelled as textbook review, not past exam papers.</p><div className="paper-filters">{modes.map(mode=><button key={mode} className={paperMode===mode?"selected":""} onClick={()=>setPaperMode(mode)}>{mode==="all"?"All":mode==="past"?"Past papers":mode==="review"?"Textbook review":mode[0].toUpperCase()+mode.slice(1)}</button>)}</div>{paperItems.length===0?<div className="asset-placeholder">{paperMode==="past"?"No official Class IX Biology past examination paper was supplied or verified for this chapter. Class IX assessments are usually school-based; the supplied textbook review questions are available separately and are not mislabelled as past papers.":"No items match this filter."}</div>:<div className="paper-grid">{paperItems.map(p=><article className="paper-card" key={p.id}><div className="paper-top"><span>IN-APP PAPER</span><em>✓ {p.status}</em></div><h3>{p.title}</h3><p>{p.description}</p><div className="paper-meta"><span>Class {p.classLevel}</span><span>{p.subject}</span><span>{p.year}</span><span>{p.pages} pages (estimated)</span></div><div className="paper-actions"><button onClick={()=>openPaperPdf(p)}>Open PDF ↗</button><button onClick={()=>openPaperPdf(p,true)}>Download PDF</button></div></article>)}</div>}</>}

   {tab==="diagrams"&&<><span className="kicker">BIOLOGY TOOL · DIAGRAMS & LABELING</span><h2>Understand the diagram, then learn the labels.</h2><p className="overlay-intro">These are original schematic learning aids based on structures named in your textbook, not copied textbook figures. Select a diagram, test one label's function, and reveal it to check.</p><div className="mind-filters">{chapter2BiologyResources.diagrams.map((d,i)=><button key={d.title} className={selectedDiagram===i?"selected":""} onClick={()=>{setSelectedDiagram(i);setSelectedDiagramPart(0);setDiagramRevealed(false);}}>{d.title}</button>)}</div><article className="formula-card bio-diagram-card"><div className="formula-heading"><span className="kicker">SCHEMATIC</span><h3>{currentDiagram.title}</h3></div><BioCellSketch kind={currentDiagram.title}/><div className="bio-diagram-labels">{currentDiagram.parts.map(([name],i)=><button key={name} className={selectedDiagramPart===i?"selected":""} onClick={()=>{setSelectedDiagramPart(i);setDiagramRevealed(false);}}><span>{String(i+1).padStart(2,"0")}</span>{name}</button>)}</div><div className="bio-checkpoint-panel"><span className="kicker">LABEL CHECK · {selectedDiagramPart+1}/{currentDiagram.parts.length}</span><h3>What should you remember about “{currentDiagramPart[0]}”?</h3>{diagramRevealed?<div className="question-answer"><b>{currentDiagramPart[0]}</b><p>{currentDiagramPart[1]}</p></div>:<button onClick={()=>setDiagramRevealed(true)}>Reveal function →</button>}<div className="bio-controls"><button disabled={selectedDiagramPart===0} onClick={()=>{setSelectedDiagramPart(selectedDiagramPart-1);setDiagramRevealed(false);}}>← Previous label</button><button disabled={selectedDiagramPart===currentDiagram.parts.length-1} onClick={()=>{setSelectedDiagramPart(selectedDiagramPart+1);setDiagramRevealed(false);}}>Next label →</button></div></div></article></>}

   {tab==="processes"&&<><span className="kicker">BIOLOGY TOOL · PROCESSES & CYCLES</span><h2>Trace a process one step at a time.</h2><p className="overlay-intro">Process sequences are grounded in the supplied chapter. Procedures preserve the textbook's steps; explanatory connections are identified in the descriptions.</p><div className="mind-filters">{chapter2BiologyResources.processes.map((p,i)=><button key={p.title} className={processIndex===i?"selected":""} onClick={()=>setProcessIndex(i)}>{p.title}</button>)}</div>{(()=>{const p=chapter2BiologyResources.processes[processIndex];return <article className="formula-card"><div className="formula-heading"><span className="kicker">{p.type.toUpperCase()}</span><h3>{p.title}</h3></div><div className="bio-sequence">{p.steps.map(([title,body],i)=><div key={title} className="bio-sequence-step"><span>{String(i+1).padStart(2,"0")}</span><div><b>{title}</b><p>{body}</p></div></div>)}</div><div className="bio-controls"><button disabled={processIndex===0} onClick={()=>setProcessIndex(processIndex-1)}>← Previous process</button><button disabled={processIndex===chapter2BiologyResources.processes.length-1} onClick={()=>setProcessIndex(processIndex+1)}>Next process →</button></div></article>})()}</>}

   {tab==="compare"&&<><span className="kicker">BIOLOGY TOOL · COMPARE TABLES</span><h2>Compare structures and processes side by side.</h2><div className="mind-filters">{chapter2BiologyResources.comparisons.map((t,i)=><button key={t.title} className={comparisonIndex===i?"selected":""} onClick={()=>setComparisonIndex(i)}>{t.title}</button>)}</div>{(()=>{const table=chapter2BiologyResources.comparisons[comparisonIndex];return <article className="formula-card"><div className="formula-heading"><span className="kicker">COMPARISON</span><h3>{table.title}</h3></div><div className="bio-table-wrap"><table className="bio-data-table"><thead><tr>{table.headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{table.rows.map((row,i)=><tr key={i}>{row.map((v,j)=><td key={j}>{v}</td>)}</tr>)}</tbody></table></div><div className="bio-controls"><button disabled={comparisonIndex===0} onClick={()=>setComparisonIndex(comparisonIndex-1)}>← Previous table</button><button disabled={comparisonIndex===chapter2BiologyResources.comparisons.length-1} onClick={()=>setComparisonIndex(comparisonIndex+1)}>Next table →</button></div></article>})()}</>}

   {tab==="classify"&&<><span className="kicker">BIOLOGY TOOL · CLASSIFICATION TREES</span><h2>Follow the distinctions used in the chapter.</h2><div className="mind-filters">{chapter2BiologyResources.classification.map((t,i)=><button key={t.title} className={classificationIndex===i?"selected":""} onClick={()=>setClassificationIndex(i)}>{t.title}</button>)}</div>{(()=>{const tree=chapter2BiologyResources.classification[classificationIndex];return <article className="formula-card"><div className="bio-tree-root">{tree.title}</div><div className="bio-tree-branches">{tree.branches.map(branch=><article key={branch.name}><h3>{branch.name}</h3><p>{branch.detail}</p></article>)}</div><div className="bio-controls"><button disabled={classificationIndex===0} onClick={()=>setClassificationIndex(classificationIndex-1)}>← Previous tree</button><button disabled={classificationIndex===chapter2BiologyResources.classification.length-1} onClick={()=>setClassificationIndex(classificationIndex+1)}>Next tree →</button></div></article>})()}</>}

   {tab==="glossary"&&<><span className="kicker">BIOLOGY TOOL · GLOSSARY</span><h2>Find a term without losing the surrounding idea.</h2><input className="bio-search" value={glossaryQuery} onChange={e=>setGlossaryQuery(e.target.value)} placeholder="Search terms and definitions…"/><p className="overlay-intro">{filteredGlossary.length} of {chapter2BiologyResources.glossary.length} terms</p><div className="bio-glossary">{filteredGlossary.map(([term,definition])=><article key={term}><b>{term}</b><p>{definition}</p></article>)}</div></>}

   {tab==="real-life"&&<><span className="kicker">BIOLOGY TOOL · REAL-LIFE LINKS</span><h2>Where the chapter connects to everyday life.</h2><div className="mind-grid">{chapter2BiologyResources.realLife.map(([title,body])=><article key={title}><span>CHAPTER CONNECTION</span><h3>{title}</h3><p>{body}</p></article>)}</div></>}

   {tab==="notes"&&<><span className="kicker">CHAPTER 2 · QUICK NOTES</span><h2>Chapter at a glance.</h2><p className="overlay-intro">A compact outline that follows the chapter's order; open the lessons for full explanations, examples, activities and checkpoints.</p><div className="note-grid">{chapter2BiologyMindMap.filter((row,i)=>i%3===0).map(([group,title,body])=><article key={group+title}><span className="kicker">{group}</span><h3>{title}</h3><p>{body}</p></article>)}</div></>}

  </div></section>}

  <footer><span>Built by Akshaj Pradhan</span><span>Biology study content based on supplied textbook · Class 9 Chapter 2</span></footer>
 </main>;
}
