"use client";

import { useMemo, useState } from "react";
import flash1 from "./chapter4Flashcards1";
import flash2 from "./chapter4Flashcards2";
import flash3 from "./chapter4Flashcards3";
import flash4 from "./chapter4Flashcards4";
import quiz from "./chapter4Quiz";
import mindMap from "./chapter4MindMap";
import chapter4Lessons from "./chapter4Lessons";
import Chapter4Lesson from "./Chapter4Lesson";
import paperSources from "./paperSources";
import chapter4QuestionBank from "./chapter4QuestionBank";
import chapter4Papers from "./chapter4Papers";

const chapters = [
  { id: "motion", number: "04", title: "Describing Motion Around Us", short: "Motion" },
  { id: "force", number: "06", title: "How Forces Affect Motion", short: "Forces" },
  { id: "work", number: "07", title: "Work, Energy, and Simple Machines", short: "Energy" }
];

const lessons = {
  motion: chapter4Lessons.map((x) => ({ key: x.key, title: x.title, body: x.hook })),
  force: [
    { key: "force", title: "The concept of force", body: "Force can change an object's motion or shape. Force is a vector quantity, so magnitude and direction matter." },
    { key: "newton1", title: "Newton's First Law", body: "An object remains at rest or in uniform straight-line motion unless acted upon by an unbalanced external force." },
    { key: "newton2", title: "Newton's Second Law", body: "For constant mass, net force is related to acceleration by F = ma." },
    { key: "newton3", title: "Newton's Third Law", body: "When two objects interact, each exerts a force on the other; the forces are equal in magnitude and opposite in direction." }
  ],
  work: [
    { key: "work", title: "Work done by a force", body: "For a constant force acting along displacement, work done is W = F × s." },
    { key: "energy", title: "Energy", body: "Energy is the capacity to do work. The SI unit of work and energy is the joule (J)." },
    { key: "kinetic", title: "Kinetic energy", body: "Kinetic energy is the energy an object possesses because of motion: KE = ½mv²." },
    { key: "machines", title: "Simple machines", body: "Simple machines make tasks easier by changing the magnitude or direction of an applied force." }
  ]
};

const flashcards = [...flash1, ...flash2, ...flash3, ...flash4];

export default function Home() {
  const [chapter, setChapter] = useState(chapters[0]);
  const [tab, setTab] = useState("learn");
  const [query, setQuery] = useState("");
  const [done, setDone] = useState([]);
  const [card, setCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [mindFilter, setMindFilter] = useState("All");
  const [activeLesson, setActiveLesson] = useState(null);
  const [paperMode, setPaperMode] = useState("all");
  const [questionMode, setQuestionMode] = useState("all");
  const [questionAnswers, setQuestionAnswers] = useState({});

  const content = lessons[chapter.id];
  const filtered = useMemo(() => content.filter((x) => (x.title + " " + x.body).toLowerCase().includes(query.toLowerCase())), [content, query]);
  const totalConcepts = chapter.id === "motion" ? chapter4Lessons.length : content.length;
  const completedConcepts = done.filter((x) => x.includes(":lesson:")).length;
  const progress = Math.round((completedConcepts / totalConcepts) * 100);
  const mindGroups = ["All", ...Array.from(new Set(mindMap.map((x) => x[0])))];
  const filteredMindMap = mindMap.filter((x) => mindFilter === "All" || x[0] === mindFilter);

  function complete(key) {
    setDone((current) => current.includes(key) ? current : [...current, key]);
  }

  function makePaperPdf(text) {
    const safe = text
      .replaceAll("—", "-").replaceAll("–", "-").replaceAll("•", "-")
      .replaceAll("×", "x").replaceAll("²", "^2").replaceAll("−", "-")
      .replaceAll("→", "->");
    const wrap = (line, max = 92) => {
      const out = [];
      let rest = line;
      while (rest.length > max) {
        let cut = rest.lastIndexOf(" ", max);
        if (cut < 1) cut = max;
        out.push(rest.slice(0, cut));
        rest = rest.slice(cut).trimStart();
      }
      out.push(rest);
      return out;
    };
    const lines = safe.split("\n").flatMap((line) => line ? wrap(line) : [""]);
    const perPage = 56;
    const pages = [];
    for (let i = 0; i < lines.length; i += perPage) pages.push(lines.slice(i, i + perPage));

    const esc = (s) => s.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
    const objects = [];
    objects.push("<< /Type /Catalog /Pages 2 0 R >>");
    const pageRefs = pages.map((_, i) => `${3 + i * 2} 0 R`).join(" ");
    objects.push(`<< /Type /Pages /Kids [${pageRefs}] /Count ${pages.length} >>`);
    pages.forEach((page, i) => {
      const pageObj = 3 + i * 2;
      const contentObj = 4 + i * 2;
      let stream = "BT /F1 10 Tf 45 800 Td 12 TL\n";
      page.forEach((line, n) => {
        if (n) stream += "T*\n";
        stream += `(${esc(line)}) Tj\n`;
      });
      stream += "ET";
      objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${3 + pages.length * 2} 0 R >> >> /Contents ${contentObj} 0 R >>`);
      objects.push(`<< /Length ${stream.length} >>\\nstream\\n${stream}\\nendstream`);
    });
    objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

    let pdf = "%PDF-1.4\\n";
    const offsets = [0];
    objects.forEach((obj, i) => {
      offsets.push(pdf.length);
      pdf += `${i + 1} 0 obj\\n${obj}\\nendobj\\n`;
    });
    const xref = pdf.length;
    pdf += `xref\\n0 ${objects.length + 1}\\n0000000000 65535 f \\n`;
    for (let i = 1; i <= objects.length; i++) pdf += String(offsets[i]).padStart(10, "0") + " 00000 n \\n";
    pdf += `trailer\\n<< /Size ${objects.length + 1} /Root 1 0 R >>\\nstartxref\\n${xref}\\n%%EOF`;
    return new Blob([pdf], { type: "application/pdf" });
  }

  function openPaperPdf(paper, download = false) {
    const url = URL.createObjectURL(makePaperPdf(paper.text));
    if (download) {
      const a = document.createElement("a");
      a.href = url;
      a.download = paper.title.replaceAll(" ", "_") + ".pdf";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }
  }

  function openTab(next) {
    setTab(next);
    if (next === "flashcards") { setCard(0); setShowAnswer(false); }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setTab("learn")} aria-label="NoNameTutor home"><span className="brand-mark">NN</span><span><b>NoNameTutor</b><small>Class 9 · Physics</small></span></button>
        <nav className="top-nav">
          <button className={tab === "learn" ? "nav-active" : ""} onClick={() => setTab("learn")}>Learn</button>
          <button className={tab === "practice" ? "nav-active" : ""} onClick={() => openTab("practice")}>Practice</button>
          <button className={tab === "flashcards" ? "nav-active" : ""} onClick={() => openTab("flashcards")}>Flashcards</button>
          <button className={tab === "notes" ? "nav-active" : ""} onClick={() => setTab("notes")}>Notes</button>
          <button className={tab === "papers" ? "nav-active" : ""} onClick={() => setTab("papers")}>Papers</button>
          <button className={tab === "revision" ? "nav-active" : ""} onClick={() => setTab("revision")}>Revision</button>
        </nav>
        <div className="stats"><span className="streak">🔥 <b>3</b> day streak</span><span className="xp">⚡ <b>{completedConcepts * 10}</b> XP</span><span className="avatar">A</span></div>
      </header>

      <section className="course-strip">
        <div><span className="kicker">CLASS 9 · PHYSICS</span><h1>Your learning path</h1><p>Chapter 4 is now a 35-skill learning path, backed by 80 flashcards, 28 quiz questions, a mind map and a verified paper-source bank.</p></div>
        <div className="goal"><div className="goal-top"><b>Daily goal</b><span>{Math.min(completedConcepts, 3)} / 3</span></div><div className="goal-track"><i style={{width: Math.min(100, completedConcepts / 3 * 100) + "%"}} /></div><small>Complete 3 lessons today</small></div>
      </section>

      <div className="main-grid">
        <section className="path-panel">
          <div className="path-head"><div><span className="kicker">PHYSICS PATH</span><h2>Build your physics streak</h2></div><span className="progress-chip">{progress}% complete</span></div>
          <div className="chapter-tabs">{chapters.map((c) => <button key={c.id} className={chapter.id === c.id ? "chapter-tab active" : "chapter-tab"} onClick={() => {setChapter(c); setTab("learn");}}><span>{c.number}</span>{c.short}</button>)}</div>
          {chapter.id === "motion" && <div className="asset-bar"><button onClick={() => openTab("flashcards")}>🃏 80 Flashcards</button><button onClick={() => openTab("practice")}>🧠 28-Question Quiz</button><button onClick={() => setTab("mindmap")}>🗺️ Mind Map</button><button onClick={() => setTab("papers")}>📚 Papers</button><button onClick={() => setTab("revision")}>✍️ Q&A Revision</button></div>}

          <div className="path">
            {filtered.map((lesson, i) => {
              const key = chapter.id + ":lesson:" + lesson.key;
              const completed = done.includes(key);
              const locked = i > 0 && !done.includes(chapter.id + ":lesson:" + content[i - 1].key);
              return <div className={"path-row " + (completed ? "is-done" : "")} key={lesson.key}>
                <div className="path-line"><span className="node">{completed ? "✓" : i + 1}</span></div>
                <article className={"lesson-card " + (locked ? "locked" : "")}><div className="lesson-meta"><span>LESSON {i + 1}</span>{completed && <em>COMPLETED</em>}</div><h3>{lesson.title}</h3><p>{lesson.body}</p><button disabled={locked} onClick={() => setActiveLesson(lesson.key)}>{completed ? "Review lesson →" : locked ? "Complete the previous lesson" : "Start lesson →"}</button></article>
              </div>;
            })}
          </div>
        </section>

        <aside className="right-rail">
          <div className="rail-card"><div className="rail-icon">🎯</div><span className="kicker">CHAPTER 4 STUDY PACK</span><h3>Everything for motion.</h3><p>Study the concepts, drill the imported cards, take the quiz, then move into official-source papers and practice.</p><button onClick={() => setTab("papers")}>Open paper bank</button></div>
          <div className="rail-card stats-card"><span className="kicker">YOUR PROGRESS</span><div className="big-stat">{completedConcepts}<small> / {totalConcepts}</small></div><p>lessons completed</p><div className="mini-track"><i style={{width: progress + "%"}} /></div></div>
          <div className="rail-card"><span className="kicker">CHAPTER SEARCH</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a concept..." />{query && <small className="search-count">{filtered.length} matching lessons</small>}</div>
        </aside>
      </div>

      {activeLesson && chapter.id === "motion" && <section className="overlay-panel"><div className="overlay-inner"><button className="close" onClick={() => setActiveLesson(null)}>× Close</button><Chapter4Lesson lesson={chapter4Lessons.find((x) => x.key === activeLesson)} lessonNumber={chapter4Lessons.findIndex((x) => x.key === activeLesson) + 1} completed={done.includes("motion:lesson:" + activeLesson)} locked={false} onComplete={() => { complete("motion:lesson:" + activeLesson); setActiveLesson(null); }} /></div></section>}

      {tab !== "learn" && <section className="overlay-panel"><div className="overlay-inner"><button className="close" onClick={() => setTab("learn")}>× Close</button>

        {tab === "flashcards" && <><span className="kicker">CHAPTER 4 · ANKI IMPORT</span><h2>Linear Motion — card {card + 1} / {flashcards.length}</h2><article className="flashcard"><span className="card-label">QUESTION</span><h3>{flashcards[card][0]}</h3>{showAnswer ? <div className="card-answer"><span className="card-label">ANSWER</span><p>{flashcards[card][1]}</p></div> : <button className="reveal" onClick={() => setShowAnswer(true)}>Reveal answer</button>}</article><div className="flash-controls"><button disabled={card === 0} onClick={() => {setCard(card - 1);setShowAnswer(false);}}>← Previous</button><button onClick={() => {setCard((card + 1) % flashcards.length);setShowAnswer(false);}}>{card === flashcards.length - 1 ? "Restart deck →" : "Next card →"}</button></div><p className="deck-note">80 cards imported from the supplied Linear Motion Anki deck.</p></>}

        {tab === "revision" && <><span className="kicker">CHAPTER 4 · LEARN + REVISE QUESTION BANK</span><h2>Questions with answers, not just questions.</h2><p className="overlay-intro">Use this as active revision: attempt first, reveal the answer, then read the explanation. It covers one-word answers, MCQs, assertion-reasoning, very short, short, long, numericals, graphs, derivatives, case-based questions, differentiations and mixed revision.</p><div className="question-filters">{["all","one-word","mcq","assertion-reasoning","very-short","short","long","numerical","graph","derivative","case","differentiate","revision"].map((m) => <button key={m} className={questionMode === m ? "selected" : ""} onClick={() => setQuestionMode(m)}>{m === "all" ? "All" : m.replaceAll("-", " ")}</button>)}</div><div className="question-grid">{chapter4QuestionBank.filter((q) => questionMode === "all" || q.type === questionMode).map((q, i) => { const id = q.type + ":" + i; const revealed = questionAnswers[id]; return <article className="question-card" key={id}><div className="question-top"><span>{q.type.replaceAll("-", " ").toUpperCase()}</span>{q.options && <em>{q.options.length} options</em>}</div><h3>{q.q}</h3>{q.options && <ol className="question-options">{q.options.map((o, n) => <li key={o}>{String.fromCharCode(65+n)}. {o}</li>)}</ol>}{revealed ? <div className="question-answer"><b>Answer</b><p>{q.answer}</p><small>{q.explanation}</small></div> : <button onClick={() => setQuestionAnswers((x) => ({...x, [id]: true}))}>Reveal answer + explanation</button>}</article>; })}</div></>}

        {tab === "practice" && <><span className="kicker">CHAPTER 4 · IMPORTED QUIZ</span><h2>Motion quiz — {quiz.length} questions.</h2><p className="overlay-intro">Reveal answers after attempting each question. The imported question bank covers definitions, numericals, graph interpretation, kinematics and circular motion.</p>{quiz.map((q, i) => <article className="practice-card" key={q[0]}><span>Q{i + 1}</span><h3>{q[0]}</h3>{quizAnswers[i] ? <div className="quiz-answer">✓ {q[1]}</div> : <button onClick={() => setQuizAnswers((x) => ({...x, [i]: true}))}>Reveal answer</button>}</article>)}</>}

        {tab === "mindmap" && <><span className="kicker">CHAPTER 4 · MIND MAP</span><h2>Describing Motion Around Us.</h2><div className="mind-filters">{mindGroups.map((g) => <button key={g} className={mindFilter === g ? "selected" : ""} onClick={() => setMindFilter(g)}>{g}</button>)}</div><div className="mind-grid">{filteredMindMap.map(([group,title,body]) => <article key={group + title}><span>{group}</span><h3>{title}</h3><p>{body}</p></article>)}</div></>}

        {tab === "papers" && <><span className="kicker">CHAPTER 4 · PAPER BANK</span><h2>Practice with real sources + your papers.</h2><p className="overlay-intro">Official sources stay linked to their authoritative repositories. The three Chapter 4 papers you generated are now integrated directly into the app as in-app PDF documents, clearly marked as NCERT-based rather than historical exam papers.</p><div className="paper-filters">{["all","past","solved","unsolved","practice"].map((m) => <button key={m} className={paperMode === m ? "selected" : ""} onClick={() => setPaperMode(m)}>{m === "all" ? "All" : m[0].toUpperCase() + m.slice(1)}</button>)}</div><div className="paper-grid">{[...chapter4Papers, ...paperSources].filter((p) => paperMode === "all" || p.modes.includes(paperMode)).map((p) => <article className="paper-card" key={p.id}><div className="paper-top"><span>{p.kind === "generated" ? "IN-APP PDF" : p.kind.toUpperCase()}</span><em>✓ {p.status}</em></div><h3>{p.title}</h3><p>{p.description}</p><div className="paper-meta"><span>Class {p.classLevel}</span><span>{p.subject}</span><span>{p.year}</span>{p.kind === "generated" && <span>{p.pages} page{p.pages === 1 ? "" : "s"}</span>}</div>{p.kind === "generated" ? <div className="paper-actions"><button onClick={() => openPaperPdf(p)}>Open PDF ↗</button><button onClick={() => openPaperPdf(p, true)}>Download PDF</button></div> : <a href={p.url} target="_blank" rel="noreferrer">Open authoritative source ↗</a>}</article>)}</div></>}

        {tab === "notes" && <><span className="kicker">CHAPTER 4 · QUICK NOTES</span><h2>Chapter at a glance.</h2><div className="note-grid">{content.map((x) => <article key={x.key}><b>{x.title}</b><p>{x.body}</p></article>)}</div></>}
      </div></section>}

      <footer><span>NoNameTutor · Class 9 Physics</span><span>Chapter 4 study pack integrated</span></footer>
    </main>
  );
}
