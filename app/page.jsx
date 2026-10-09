"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import flash1 from "./chapter4Flashcards1";
import flash2 from "./chapter4Flashcards2";
import flash3 from "./chapter4Flashcards3";
import flash4 from "./chapter4Flashcards4";
import chapter6Flashcards from "./chapter6Flashcards";
import chapter6Quiz from "./chapter6Quiz";
import chapter7Flashcards from "./chapter7Flashcards";
import chapter7Quiz from "./chapter7Quiz";
import chapter4Quiz from "./chapter4Quiz";
import chapter4MindMap from "./chapter4MindMap";
import chapter4Lessons from "./chapter4Lessons";
import Chapter4Lesson from "./Chapter4Lesson";
import chapter6MindMap from "./chapter6MindMap";
import chapter6Lessons from "./chapter6Lessons";
import Chapter6Lesson from "./Chapter6Lesson";
import chapter7Lessons from "./chapter7Lessons";
import Chapter7Lesson from "./Chapter7Lesson";
import chapter7MindMap from "./chapter7MindMap";
import paperSources4 from "./paperSources";
import paperSources6 from "./chapter6PaperSources";
import chapter4QuestionBank from "./chapter4QuestionBank";
import chapter6QuestionBank from "./chapter6QuestionBank";
import chapter7QuestionBank from "./chapter7QuestionBank";
import chapter4Papers from "./chapter4Papers";
import chapter6Papers from "./chapter6Papers";
import chapter7Papers from "./chapter7Papers";
import paperSources7 from "./chapter7PaperSources";
import chapter4Formulas from "./chapter4Formulas";
import chapter6Formulas from "./chapter6Formulas";
import chapter4Derivations from "./chapter4Derivations";
import chapter6Derivations from "./chapter6Derivations";
import chapter7Formulas from "./chapter7Formulas";
import chapter7Derivations from "./chapter7Derivations";

const chapters = [
  { id:"motion", number:"04", title:"Describing Motion Around Us", short:"Motion", description:"35-skill learning path backed by flashcards, quiz, mind map, question bank, papers, formulas and derivations." },
  { id:"force", number:"06", title:"How Forces Affect Motion", short:"Forces", description:"Full force-and-motion learning path covering force, friction, Newton's laws, graphs, numericals, systems, formulas and derivations." },
  { id:"work", number:"07", title:"Work, Energy, and Simple Machines", short:"Energy", description:"Full chapter learning path on scientific work, energy, power, mechanical advantage, pulleys, inclined planes and levers." }
];

const lessons = {
  motion: chapter4Lessons.map((x) => ({ key:x.key, title:x.title, body:x.hook })),
  force: chapter6Lessons.map((x) => ({ key:x.key, title:x.title, body:x.hook })),
  work: chapter7Lessons.map((x) => ({ key:x.key, title:x.title, body:x.hook }))
};

const dataByChapter = {
  motion:{mindMap:chapter4MindMap,questionBank:chapter4QuestionBank,papers:chapter4Papers,paperSources:paperSources4,formulas:chapter4Formulas,derivations:chapter4Derivations},
  force:{mindMap:chapter6MindMap,questionBank:chapter6QuestionBank,papers:chapter6Papers,paperSources:paperSources6,formulas:chapter6Formulas,derivations:chapter6Derivations},
  work:{mindMap:chapter7MindMap,questionBank:chapter7QuestionBank,papers:chapter7Papers,paperSources:paperSources7,formulas:chapter7Formulas,derivations:chapter7Derivations}
};

const flashcards = [...flash1,...flash2,...flash3,...flash4];

export default function Home(){
  const appRoot = useRef(null);
  const [chapter,setChapter]=useState(chapters[0]);
  const [tab,setTab]=useState("learn");
  const [query,setQuery]=useState("");
  const [done,setDone]=useState([]);
  const [card,setCard]=useState(0);
  const [showAnswer,setShowAnswer]=useState(false);
  const [quizAnswers,setQuizAnswers]=useState({});
  const [mindFilter,setMindFilter]=useState("All");
  const [activeLesson,setActiveLesson]=useState(null);
  const [paperMode,setPaperMode]=useState("all");
  const [questionMode,setQuestionMode]=useState("all");
  const [questionAnswers,setQuestionAnswers]=useState({});
  const [formulaTopic,setFormulaTopic]=useState("all");

  useEffect(() => {
    const root = appRoot.current;
    if (!root) return;
    const typeset = () => {
      if (window.MathJax?.typesetPromise) {
        window.MathJax.typesetClear?.([root]);
        window.MathJax.typesetPromise([root]).catch(() => {});
      }
    };
    if (window.MathJax?.typesetPromise) { typeset(); return; }
    window.MathJax = {
      tex: { inlineMath: [["$", "$"], ["\\(", "\\)"]], displayMath: [["$", "$"], ["\\[", "\\]"]], processEscapes: true },
      options: { skipHtmlTags: ["script", "noscript", "style", "textarea", "pre"] },
      startup: { typeset: false }
    };
    let script = document.getElementById("nonametutor-mathjax");
    if (!script) {
      script = document.createElement("script");
      script.id = "nonametutor-mathjax";
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", typeset, { once: true });
    if (window.MathJax?.typesetPromise) typeset();
    return () => script?.removeEventListener("load", typeset);
  }, [chapter.id, tab, activeLesson, card, showAnswer, questionMode, questionAnswers, quizAnswers, formulaTopic, mindFilter, paperMode]);
  const content=lessons[chapter.id];
  const featureData=dataByChapter[chapter.id];
  const filtered=useMemo(()=>content.filter(x=>(x.title+" "+x.body).toLowerCase().includes(query.toLowerCase())),[content,query]);
  const totalConcepts=content.length;
  const completedConcepts=done.filter(x=>x.startsWith(chapter.id+":lesson:")).length;
  const progress=Math.round((completedConcepts/totalConcepts)*100);
  const mindGroups=featureData?["All",...Array.from(new Set(featureData.mindMap.map(x=>x[0])))]:[];
  const filteredMindMap=featureData?featureData.mindMap.filter(x=>mindFilter==="All"||x[0]===mindFilter):[];

  function complete(key){setDone(current=>current.includes(key)?current:[...current,key]);}

  function openTab(next){
    if((next==="flashcards"||next==="practice")&&!["motion","force","work"].includes(chapter.id)) return;
    setTab(next);
    if(next==="flashcards"){setCard(0);setShowAnswer(false);}
  }

  function selectChapter(next){
    setChapter(next);setTab("learn");setQuery("");setMindFilter("All");setPaperMode("all");setQuestionMode("all");setFormulaTopic("all");setActiveLesson(null);
  }

  function makePaperPdf(text){
    const safe=text.replaceAll("—","-").replaceAll("–","-").replaceAll("•","-").replaceAll("×","x").replaceAll("²","^2").replaceAll("−","-").replaceAll("→","->");
    const wrap=(line,max=92)=>{const out=[];let rest=line;while(rest.length>max){let cut=rest.lastIndexOf(" ",max);if(cut<1)cut=max;out.push(rest.slice(0,cut));rest=rest.slice(cut).trimStart();}out.push(rest);return out;};
    const lines=safe.split("\n").flatMap(line=>line?wrap(line):[""]);
    const perPage=56;const pages=[];for(let i=0;i<lines.length;i+=perPage)pages.push(lines.slice(i,i+perPage));
    const esc=s=>s.replaceAll("\\","\\\\").replaceAll("(","\\(").replaceAll(")","\\)");
    const objects=["<< /Type /Catalog /Pages 2 0 R >>"];
    const pageRefs=pages.map((_,i)=>`${3+i*2} 0 R`).join(" ");
    objects.push(`<< /Type /Pages /Kids [${pageRefs}] /Count ${pages.length} >>`);
    pages.forEach((pageLines,i)=>{const pageObj=3+i*2;const contentObj=4+i*2;let stream="BT /F1 10 Tf 45 800 Td 12 TL\n";pageLines.forEach((line,n)=>{if(n)stream+="T*\n";stream+=`(${esc(line)}) Tj\n`;});stream+="ET";objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${3+pages.length*2} 0 R >> >> /Contents ${contentObj} 0 R >>`);objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);});
    objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
    let pdf="%PDF-1.4\n";const offsets=[0];objects.forEach((obj,i)=>{offsets.push(pdf.length);pdf+=`${i+1} 0 obj\n${obj}\nendobj\n`;});
    const xref=pdf.length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;for(let i=1;i<=objects.length;i++)pdf+=String(offsets[i]).padStart(10,"0")+" 00000 n \n";pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return new Blob([pdf],{type:"application/pdf"});
  }

  function openPaperPdf(paper,download=false){
    if(!paper.text)return;
    const url=URL.createObjectURL(makePaperPdf(paper.text));
    if(download){const a=document.createElement("a");a.href=url;a.download=paper.title.replaceAll(" ","_")+".pdf";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
    else{window.open(url,"_blank","noopener,noreferrer");setTimeout(()=>URL.revokeObjectURL(url),60000);}
  }

  const chapterData=featureData;
  return <main className="app-shell" ref={appRoot}>
    <header className="topbar">
      <button className="brand" onClick={()=>setTab("learn")} aria-label="NoNameTutor home"><span className="brand-mark">NN</span><span><b>NoNameTutor</b><small>Class 9 · Physics</small></span></button>
      <nav className="top-nav">
        <button className={tab==="learn"?"nav-active":""} onClick={()=>setTab("learn")}>Learn</button>
        <button className={tab==="practice"?"nav-active":""} disabled={!["motion","force","work"].includes(chapter.id)} onClick={()=>openTab("practice")}>Practice</button>
        <button className={tab==="flashcards"?"nav-active":""} disabled={!["motion","force","work"].includes(chapter.id)} onClick={()=>openTab("flashcards")}>Flashcards</button>
        <button className={tab==="notes"?"nav-active":""} onClick={()=>setTab("notes")}>Notes</button>
        <button className={tab==="papers"?"nav-active":""} onClick={()=>setTab("papers")}>Papers</button>
        <button className={tab==="revision"?"nav-active":""} onClick={()=>setTab("revision")}>Revision</button>
        <button className={tab==="formulas"?"nav-active":""} onClick={()=>setTab("formulas")}>Formulas</button>
        <button className={tab==="derivations"?"nav-active":""} onClick={()=>setTab("derivations")}>Derivations</button>
      </nav>
      
    </header>

    <section className="course-strip">
      <div><span className="kicker">CLASS 9 · PHYSICS · CHAPTER {chapter.number}</span><h1>Your learning path</h1><p>{chapter.description}</p></div>
      <div className="goal"><div className="goal-top"><b>Daily goal</b><span>{Math.min(completedConcepts,3)} / 3</span></div><div className="goal-track"><i style={{width:Math.min(100,completedConcepts/3*100)+"%"}} /></div><small>Complete 3 lessons today</small></div>
    </section>

    <div className="main-grid">
      <section className="path-panel">
        <div className="path-head"><div><span className="kicker">PHYSICS PATH</span><h2>{chapter.title}</h2></div><span className="progress-chip">{progress}% complete</span></div>
        <div className="chapter-tabs">{chapters.map(c=><button key={c.id} className={chapter.id===c.id?"chapter-tab active":"chapter-tab"} onClick={()=>selectChapter(c)}><span>{c.number}</span>{c.short}</button>)}</div>

        {chapter.id==="motion"&&<div className="asset-bar"><button onClick={()=>openTab("flashcards")}>🃏 80 Flashcards</button><button onClick={()=>openTab("practice")}>🧠 28-Question Quiz</button><button onClick={()=>setTab("mindmap")}>🗺️ Mind Map</button><button onClick={()=>setTab("papers")}>📚 Papers</button><button onClick={()=>setTab("revision")}>✍️ Q&A Revision</button><button onClick={()=>setTab("formulas")}>∑ Formulas + Graphs</button><button onClick={()=>setTab("derivations")}>∫ Derivations</button></div>}
        {chapter.id==="force"&&<div className="asset-bar"><button onClick={()=>openTab("flashcards")}>🃏 80 Flashcards</button><button onClick={()=>openTab("practice")}>🧠 27-Question Quiz</button><button onClick={()=>setTab("mindmap")}>🗺️ Mind Map</button><button onClick={()=>setTab("papers")}>📚 Papers</button><button onClick={()=>setTab("revision")}>✍️ 81-Question Revision</button><button onClick={()=>setTab("formulas")}>∑ Formulas + Graphs</button><button onClick={()=>setTab("derivations")}>∫ Derivations</button></div>}
        {chapter.id==="work"&&<div className="asset-bar"><button onClick={()=>openTab("flashcards")}>🃏 {chapter7Flashcards.length} Flashcards</button><button onClick={()=>openTab("practice")}>🧠 {chapter7Quiz.length}-Question Quiz</button><button onClick={()=>setTab("mindmap")}>🗺️ Mind Map</button><button onClick={()=>setTab("papers")}>📚 Papers</button><button onClick={()=>setTab("revision")}>✍️ {chapter7QuestionBank.length}-Question Revision</button><button onClick={()=>setTab("formulas")}>∑ Formulas + Graphs</button><button onClick={()=>setTab("derivations")}>∫ Derivations</button></div>}

        <div className="path">{filtered.map((lesson,i)=>{
          const key=chapter.id+":lesson:"+lesson.key;const completed=done.includes(key);const locked=i>0&&!done.includes(chapter.id+":lesson:"+content[i-1].key);
          return <div className={"path-row "+(completed?"is-done":"")} key={lesson.key}><div className="path-line"><span className="node">{completed?"✓":i+1}</span></div><article className={"lesson-card "+(locked?"locked":"")}><div className="lesson-meta"><span>LESSON {i+1}</span>{completed&&<em>COMPLETED</em>}</div><h3>{lesson.title}</h3><p>{lesson.body}</p><button disabled={locked} onClick={()=>setActiveLesson(lesson.key)}>{completed?"Review lesson →":locked?"Complete the previous lesson":"Start lesson →"}</button></article></div>;
        })}</div>
      </section>

      <aside className="right-rail">
        <div className="rail-card"><div className="rail-icon">{chapter.id==="force"?"⚙️":chapter.id==="work"?"⚡":"🎯"}</div><span className="kicker">CHAPTER {chapter.number} STUDY PACK</span><h3>{chapter.title}</h3><p>{chapter.id==="force"?"Learn force and friction, apply all three Newton laws, read force-from-graph problems and practise system-of-objects numericals.":chapter.id==="work"?"Learn scientific work, work–energy theorem, kinetic and potential energy, power, and how pulleys, ramps and levers trade force for distance.":"Study the concepts, drill the imported cards, take the quiz, then move into source-backed papers, revision, formulas and derivations."}</p><button onClick={()=>setTab("papers")}>Open paper bank</button></div>
        <div className="rail-card stats-card"><span className="kicker">YOUR PROGRESS</span><div className="big-stat">{completedConcepts}<small> / {totalConcepts}</small></div><p>lessons completed</p><div className="mini-track"><i style={{width:progress+"%"}} /></div></div>
        <div className="rail-card"><span className="kicker">CHAPTER SEARCH</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a concept..." />{query&&<small className="search-count">{filtered.length} matching lessons</small>}</div>
      </aside>
    </div>

    {activeLesson&&chapter.id==="motion"&&<section className="overlay-panel"><div className="overlay-inner"><button className="close" onClick={()=>setActiveLesson(null)}>× Close</button><Chapter4Lesson lesson={chapter4Lessons.find(x=>x.key===activeLesson)} lessonNumber={chapter4Lessons.findIndex(x=>x.key===activeLesson)+1} completed={done.includes("motion:lesson:"+activeLesson)} locked={false} onComplete={()=>{complete("motion:lesson:"+activeLesson);setActiveLesson(null);}} /></div></section>}
    {activeLesson&&chapter.id==="force"&&<section className="overlay-panel"><div className="overlay-inner"><button className="close" onClick={()=>setActiveLesson(null)}>× Close</button><Chapter6Lesson lesson={chapter6Lessons.find(x=>x.key===activeLesson)} lessonNumber={chapter6Lessons.findIndex(x=>x.key===activeLesson)+1} completed={done.includes("force:lesson:"+activeLesson)} onComplete={()=>{complete("force:lesson:"+activeLesson);setActiveLesson(null);}} /></div></section>}
    {activeLesson&&chapter.id==="work"&&<section className="overlay-panel"><div className="overlay-inner"><button className="close" onClick={()=>setActiveLesson(null)}>× Close</button><Chapter7Lesson lesson={chapter7Lessons.find(x=>x.key===activeLesson)} lessonNumber={chapter7Lessons.findIndex(x=>x.key===activeLesson)+1} completed={done.includes("work:lesson:"+activeLesson)} onComplete={()=>{complete("work:lesson:"+activeLesson);setActiveLesson(null);}} /></div></section>}

    {tab!=="learn"&&<section className="overlay-panel"><div className="overlay-inner"><button className="close" onClick={()=>setTab("learn")}>× Close</button>

      {tab==="flashcards"&&<><span className="kicker">{chapter.id==="force"?"CHAPTER 6 · SUPPLIED ANKI IMPORT":chapter.id==="work"?"CHAPTER 7 · SUPPLIED ANKI IMPORT":"CHAPTER 4 · ANKI IMPORT"}</span><h2>{chapter.id==="force"?"How Forces Affect Motion":chapter.id==="work"?"Work, Energy, and Simple Machines":"Linear Motion"} — card {card+1} / {chapter.id==="force"?chapter6Flashcards.length:chapter.id==="work"?chapter7Flashcards.length:flashcards.length}</h2><article className="flashcard"><span className="card-label">QUESTION</span><h3>{(chapter.id==="force"?chapter6Flashcards:chapter.id==="work"?chapter7Flashcards:flashcards)[card][0]}</h3>{showAnswer?<div className="card-answer"><span className="card-label">ANSWER</span><p>{(chapter.id==="force"?chapter6Flashcards:chapter.id==="work"?chapter7Flashcards:flashcards)[card][1]}</p></div>:<button className="reveal" onClick={()=>setShowAnswer(true)}>Reveal answer</button>}</article><div className="flash-controls"><button disabled={card===0} onClick={()=>{setCard(card-1);setShowAnswer(false);}}>← Previous</button><button onClick={()=>{const total=chapter.id==="force"?chapter6Flashcards.length:chapter.id==="work"?chapter7Flashcards.length:flashcards.length;setCard((card+1)%total);setShowAnswer(false);}}>{card===(chapter.id==="force"?chapter6Flashcards.length:chapter.id==="work"?chapter7Flashcards.length:flashcards.length)-1?"Restart deck →":"Next card →"}</button></div><p className="deck-note">{chapter.id==="force"?"80 cards imported from the supplied Physics Flashcards Anki deck.":chapter.id==="work"?"80 cards imported from the supplied Physics Flashcards Anki deck for Chapter 7.":"80 cards imported from the supplied Linear Motion Anki deck."}</p></>}

      {tab==="practice"&&chapter.id==="motion"&&<><span className="kicker">CHAPTER 4 · IMPORTED QUIZ</span><h2>Motion quiz — {chapter4Quiz.length} questions.</h2><p className="overlay-intro">Reveal answers after attempting each question. The imported quiz covers definitions, numericals, graph interpretation, kinematics and circular motion.</p>{chapter4Quiz.map((q,i)=><article className="practice-card" key={q[0]}><span>Q{i+1}</span><h3>{q[0]}</h3>{quizAnswers[i]?<div className="quiz-answer">✓ {q[1]}</div>:<button onClick={()=>setQuizAnswers(x=>({...x,[i]:true}))}>Reveal answer</button>}</article>)}</>}

      {tab==="practice"&&chapter.id==="force"&&<><span className="kicker">CHAPTER 6 · SUPPLIED QUIZ</span><h2>Force quiz — {chapter6Quiz.length} questions.</h2><p className="overlay-intro">Attempt the supplied multiple-choice quiz. Choose an option, check it, then continue to the next question.</p>{chapter6Quiz.map((q,i)=>{const picked=quizAnswers["ch6:"+i];const checked=typeof picked==="string";const correct=checked&&picked===q.answer;return <article className="practice-card" key={q.q}><span>Q{i+1}</span><h3>{q.q}</h3><div className="quiz-options">{q.options.map((option,n)=><button key={option} disabled={checked} className={checked&&option===picked?(correct?"quiz-option-correct":"quiz-option-wrong"):""} onClick={()=>setQuizAnswers(x=>({...x,["ch6:"+i]:option}))}>{String.fromCharCode(65+n)}. {option}</button>)}</div>{checked?<div className={correct?"quiz-answer":"quiz-answer is-wrong"}>{correct?"✓ Correct":"✕ Not quite"} — correct answer: {q.answer}</div>:null}</article>})}</>}

      {tab==="practice"&&chapter.id==="work"&&<><span className="kicker">CHAPTER 7 · SUPPLIED QUIZ</span><h2>Work, Energy and Simple Machines — {chapter7Quiz.length} questions.</h2><p className="overlay-intro">The supplied multiple-choice quiz is preserved with its four answer choices. Choose an option to see whether it matches the marked answer.</p>{chapter7Quiz.map((q,i)=>{const picked=quizAnswers["ch7:"+i];const checked=typeof picked==="string";const correct=checked&&picked===q.answer;return <article className="practice-card" key={q.q}><span>Q{i+1}</span><h3>{q.q}</h3><div className="quiz-options">{q.options.map((option,n)=><button key={option} disabled={checked} className={checked&&option===picked?(correct?"quiz-option-correct":"quiz-option-wrong"):""} onClick={()=>setQuizAnswers(x=>({...x,["ch7:"+i]:option}))}>{String.fromCharCode(65+n)}. {option}</button>)}</div>{checked?<div className={correct?"quiz-answer":"quiz-answer is-wrong"}>{correct?"✓ Correct":"✕ Not quite"} — correct answer: {q.answer}</div>:null}</article>})}</>}

      {tab==="revision"&&chapterData&&<><span className="kicker">CHAPTER {chapter.number} · QUESTION BANK</span><h2>{chapter.title} — {chapterData.questionBank.length} revision questions.</h2><p className="overlay-intro">Attempt first, then reveal the answer and explanation. Chapter 6 includes one-word, MCQ, assertion-reasoning, short/long, numerical, graph, derivative, case, differentiation and revision formats.</p><div className="question-filters">{["all","one-word","mcq","assertion-reasoning","very-short","short","long","numerical","graph","derivative","case","differentiate","revision"].map(m=><button key={m} className={questionMode===m?"selected":""} onClick={()=>setQuestionMode(m)}>{m==="all"?"All":m.replaceAll("-"," ")}</button>)}</div><div className="question-grid">{chapterData.questionBank.filter(q=>questionMode==="all"||q.type===questionMode).map((q,i)=>{const id=chapter.id+":"+q.type+":"+i;const revealed=questionAnswers[id];return <article className="question-card" key={id}><div className="question-top"><span>{q.type.replaceAll("-"," ").toUpperCase()}</span>{q.options&&<em>{q.options.length} options</em>}</div><h3>{q.q}</h3>{q.options&&<ol className="question-options">{q.options.map((o,n)=><li key={o}>{String.fromCharCode(65+n)}. {o}</li>)}</ol>}{revealed?<div className="question-answer"><b>Answer</b><p>{q.answer}</p><small>{q.explanation}</small></div>:<button onClick={()=>setQuestionAnswers(x=>({...x,[id]:true}))}>Reveal answer + explanation</button>}</article>})}</div></>}

      {tab==="mindmap"&&chapterData&&<><span className="kicker">CHAPTER {chapter.number} · MIND MAP</span><h2>{chapter.title}.</h2><div className="mind-filters">{mindGroups.map(g=><button key={g} className={mindFilter===g?"selected":""} onClick={()=>setMindFilter(g)}>{g}</button>)}</div><div className="mind-grid">{filteredMindMap.map(([group,title,body])=><article key={group+title}><span>{group}</span><h3>{title}</h3><p>{body}</p></article>)}</div></>}

      {tab==="papers"&&chapterData&&<><span className="kicker">CHAPTER {chapter.number} · PAPER BANK</span><h2>Source-backed papers + generated practice.</h2><p className="overlay-intro">Authoritative material stays linked to its source. Generated papers are clearly marked as NCERT-based supplementary practice rather than historical exam papers.</p><div className="paper-filters">{["all","past","solved","unsolved","practice"].map(m=><button key={m} className={paperMode===m?"selected":""} onClick={()=>setPaperMode(m)}>{m==="all"?"All":m[0].toUpperCase()+m.slice(1)}</button>)}</div><div className="paper-grid">{[...chapterData.papers,...chapterData.paperSources].filter(p=>paperMode==="all"||p.modes.includes(paperMode)).map(p=><article className="paper-card" key={p.id}><div className="paper-top"><span>{p.kind==="generated"?"IN-APP PDF":p.kind.toUpperCase()}</span><em>✓ {p.status}</em></div><h3>{p.title}</h3><p>{p.description}</p><div className="paper-meta"><span>Class {p.classLevel}</span><span>{p.subject}</span><span>{p.year}</span>{p.kind==="generated"&&<span>{p.pages} pages</span>}</div>{p.kind==="generated"?<><div className="paper-actions"><button onClick={()=>openPaperPdf(p)}>Open PDF ↗</button><button onClick={()=>openPaperPdf(p,true)}>Download PDF</button></div>{p.sources&&<div className="paper-sources"><b>Official source basis</b>{p.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div>}</>:<a href={p.url} target="_blank" rel="noreferrer">Open authoritative source ↗</a>}</article>)}</div></>}

      {tab==="formulas"&&chapterData&&<><span className="kicker">CHAPTER {chapter.number} · FORMULA + GRAPH REFERENCE</span><h2>Numerical formulas + graph tools for {chapter.short}.</h2><p className="overlay-intro">Each topic separates calculation tools from graphical interpretation, with conditions and usage notes kept close to the equations.</p><div className="formula-filters"><button className={formulaTopic==="all"?"selected":""} onClick={()=>setFormulaTopic("all")}>All topics</button>{chapterData.formulas.map(f=><button key={f.topic} className={formulaTopic===f.topic?"selected":""} onClick={()=>setFormulaTopic(f.topic)}>{f.topic}</button>)}</div><div className="formula-grid">{chapterData.formulas.filter(f=>formulaTopic==="all"||f.topic===formulaTopic).map(f=><article className="formula-card" key={f.topic}><div className="formula-heading"><span className="kicker">TOPIC</span><h3>{f.topic}</h3></div>{f.condition&&<div className="formula-condition">⚠️ {f.condition}</div>}<section><h4>Numerical / equation tools</h4>{f.numeric.map(([name,formula,note])=><div className="formula-row" key={name}><b>{name}</b><span className="math-formula">{formula}</span><p>{note}</p></div>)}</section><section><h4>Graphical tools</h4>{f.graphical.map(([name,formula,note])=><div className="formula-row graph-row" key={name}><b>{name}</b><code>{formula}</code><p>{note}</p></div>)}</section><div className="formula-use"><b>When to use:</b> {f.use}</div></article>)}</div></>}

      {tab==="derivations"&&chapterData&&<><span className="kicker">CHAPTER {chapter.number} · DERIVATIONS</span><h2>Derive it on paper. See the force on the graph.</h2><p className="overlay-intro">Follow the algebraic route and the matching graphical interpretation. Only source-supported extensions are included.</p><div className="derivation-grid">{chapterData.derivations.map(d=><article className="derivation-card" key={d.title}><div className="derivation-top"><span>{d.mode==="extension"?"HIGHER-GRADE EXTENSION":d.mode==="graph"?"GRAPH → EQUATION":"PAPER / ALGEBRA"}</span></div><h3>{d.title}</h3><p className="derivation-setup">{d.setup}</p><div className="derivation-columns"><div><h4>On paper</h4><ol>{d.steps.map((s,i)=><li key={i}>{s}</li>)}</ol><div className="derived-result"><span>RESULT</span><span className="math-formula">{d.result}</span></div></div><div className="graph-explain"><h4>On the graph</h4><p>{d.graph}</p><div className="graph-sketch"><span className="axis-y">quantity</span><div className="sketch-area"><i className={"sketch-line "+(d.mode==="paper"?"rise":"slope")} /><b>time →</b></div></div></div></div></article>)}</div></>}

      {tab==="notes"&&<><span className="kicker">CHAPTER {chapter.number} · QUICK NOTES</span><h2>Chapter at a glance.</h2><div className="note-grid">{content.map(x=><article key={x.key}><b>{x.title}</b><p>{x.body}</p></article>)}</div></>}

    </div></section>}

    <footer><span>NoNameTutor · Class 9 Physics</span><span>Chapter {chapter.number} study pack integrated</span></footer>
  </main>;
}