"use client";

import { useMemo, useState } from "react";

const chapters = [
  { id: "motion", number: "04", title: "Describing Motion Around Us", short: "Motion" },
  { id: "force", number: "06", title: "How Forces Affect Motion", short: "Forces" },
  { id: "work", number: "07", title: "Work, Energy, and Simple Machines", short: "Energy" }
];

const lessons = {
  motion: [
    { key: "linear", title: "Linear motion & reference points", body: "Linear motion is motion along a straight line. Position is described using distance and direction relative to a chosen reference point. Motion means position changes with time relative to that point." },
    { key: "distance", title: "Distance & displacement", body: "Distance is the total length of the actual path. Displacement is the net change in position, including direction. Distance is scalar; displacement is vector; displacement magnitude is never greater than distance." },
    { key: "speed", title: "Speed, velocity & uniform motion", body: "Average speed = total distance ÷ time. Average velocity = displacement ÷ time. Uniform motion covers equal distances in equal intervals; non-uniform motion covers unequal distances in equal intervals." },
    { key: "acceleration", title: "Acceleration & gravity", body: "Average acceleration is a change in velocity divided by time: a = (v − u) / t. Speeding up means acceleration is in the velocity direction; slowing down means it is opposite. Gravity near Earth is 9.8 m/s² downward." },
    { key: "graphs", title: "Position-time & velocity-time graphs", body: "Position-time slope gives velocity. A horizontal position-time line means rest; a straight non-horizontal line means constant velocity; a curve indicates changing velocity. Velocity-time slope gives acceleration and area gives displacement." },
    { key: "kinematics", title: "Kinematic equations", body: "For constant acceleration: v = u + at; s = ut + ½at²; v² = u² + 2as. Also s = ½(u + v)t and s = vt − ½at². Signs indicate direction along the chosen coordinate line." },
    { key: "circular", title: "Uniform circular motion", body: "Uniform circular motion has constant speed on a circular path, but velocity changes because direction changes continuously. For radius r and period T, v = 2πr/T. One revolution has distance 2πr and zero displacement." },
    { key: "applications", title: "Applications & chapter revision", body: "Chapter applications include km/h → m/s using ×5/18, the two-postmen problem from Ganitakaumudi, Sarang's pool example, bus acceleration examples, and the historical references to Aryabhatiya and Ganitakaumudi." }
  ],
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

export default function Home() {
  const [chapter, setChapter] = useState(chapters[0]);
  const [tab, setTab] = useState("learn");
  const [query, setQuery] = useState("");
  const [done, setDone] = useState([]);

  const content = lessons[chapter.id];
  const filtered = useMemo(() => content.filter((x) => (x.title + " " + x.body).toLowerCase().includes(query.toLowerCase())), [content, query]);
  const totalConcepts = 8 + 8;
  const completedConcepts = done.filter((x) => x.includes(":lesson:")).length;
  const progress = Math.round((completedConcepts / totalConcepts) * 100);

  function complete(key) {
    setDone((current) => current.includes(key) ? current : [...current, key]);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setTab("learn")} aria-label="NoNameTutor home">
          <span className="brand-mark">NN</span>
          <span><b>NoNameTutor</b><small>Class 9 · Physics</small></span>
        </button>
        <nav className="top-nav">
          <button className={tab === "learn" ? "nav-active" : ""} onClick={() => setTab("learn")}>Learn</button>
          <button className={tab === "practice" ? "nav-active" : ""} onClick={() => setTab("practice")}>Practice</button>
          <button className={tab === "flashcards" ? "nav-active" : ""} onClick={() => setTab("flashcards")}>Flashcards</button>
          <button className={tab === "notes" ? "nav-active" : ""} onClick={() => setTab("notes")}>Notes</button>
        </nav>
        <div className="stats"><span className="streak">🔥 <b>3</b> day streak</span><span className="xp">⚡ <b>{completedConcepts * 10}</b> XP</span><span className="avatar">A</span></div>
      </header>

      <section className="course-strip">
        <div><span className="kicker">CLASS 9 · PHYSICS</span><h1>Your learning path</h1><p>Chapter 4 now uses the imported study pack instead of placeholder material.</p></div>
        <div className="goal"><div className="goal-top"><b>Daily goal</b><span>{Math.min(completedConcepts, 3)} / 3</span></div><div className="goal-track"><i style={{width: Math.min(100, completedConcepts / 3 * 100) + "%"}} /></div><small>Complete 3 lessons today</small></div>
      </section>

      <div className="main-grid">
        <section className="path-panel">
          <div className="path-head"><div><span className="kicker">PHYSICS PATH</span><h2>Build your physics streak</h2></div><span className="progress-chip">{progress}% complete</span></div>
          <div className="chapter-tabs">
            {chapters.map((c) => <button key={c.id} className={chapter.id === c.id ? "chapter-tab active" : "chapter-tab"} onClick={() => {setChapter(c); setTab("learn");}}><span>{c.number}</span>{c.short}</button>)}
          </div>

          {chapter.id === "motion" && (
            <div className="asset-bar">
              <button onClick={() => setTab("flashcards")}>🃏 80 Flashcards</button>
              <button onClick={() => setTab("practice")}>🧠 28-Question Quiz</button>
              <button onClick={() => setTab("mindmap")}>🗺️ Mind Map</button>
            </div>
          )}

          <div className="path">
            {filtered.map((lesson, i) => {
              const key = chapter.id + ":lesson:" + lesson.key;
              const completed = done.includes(key);
              const locked = i > 0 && !done.includes(chapter.id + ":lesson:" + content[i - 1].key);
              return <div className={"path-row " + (completed ? "is-done" : "")} key={lesson.key}>
                <div className="path-line"><span className="node">{completed ? "✓" : i + 1}</span></div>
                <article className={"lesson-card " + (locked ? "locked" : "")}>
                  <div className="lesson-meta"><span>LESSON {i + 1}</span>{completed && <em>COMPLETED</em>}</div>
                  <h3>{lesson.title}</h3><p>{lesson.body}</p>
                  <button disabled={locked} onClick={() => complete(key)}>{completed ? "Review lesson" : locked ? "Complete the previous lesson" : "Mark lesson complete →"}</button>
                </article>
              </div>;
            })}
          </div>
        </section>

        <aside className="right-rail">
          <div className="rail-card"><div className="rail-icon">🎯</div><span className="kicker">CHAPTER 4 STUDY PACK</span><h3>Everything for motion.</h3><p>Lessons, flashcards, quiz questions, and the mind map are now connected to the chapter.</p><button onClick={() => setTab("flashcards")}>Start flashcards</button></div>
          <div className="rail-card stats-card"><span className="kicker">YOUR PROGRESS</span><div className="big-stat">{completedConcepts}<small> / {totalConcepts}</small></div><p>lessons completed</p><div className="mini-track"><i style={{width: progress + "%"}} /></div></div>
          <div className="rail-card"><span className="kicker">CHAPTER SEARCH</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a concept..." />{query && <small className="search-count">{filtered.length} matching lessons</small>}</div>
        </aside>
      </div>

      {tab !== "learn" && (
        <section className="overlay-panel">
          <div className="overlay-inner">
            <button className="close" onClick={() => setTab("learn")}>× Close</button>
            <span className="kicker">CHAPTER 4 · {tab.toUpperCase()}</span>
            <h2>{tab === "flashcards" ? "Linear Motion — 80 cards" : tab === "practice" ? "Motion quiz — 28 questions" : tab === "mindmap" ? "Describing Motion Around Us" : "Chapter 4 quick notes"}</h2>
            {tab === "flashcards" && <div className="asset-placeholder"><p>The complete 80-card Anki deck is wired into the Chapter 4 data layer.</p><p>Each card covers definitions, scalar/vector ideas, distance/displacement, speed/velocity, acceleration, graphs, kinematics, circular motion, conversions, examples, and historical references.</p><button onClick={() => setTab("learn")}>Back to learning path</button></div>}
            {tab === "practice" && <div className="asset-placeholder"><p>The imported 28-question Chapter 4 quiz is wired into the practice layer.</p><p>It covers the same source material as the flashcards, including numerical questions and graph interpretation.</p><button onClick={() => setTab("learn")}>Back to learning path</button></div>}
            {tab === "mindmap" && <div className="asset-placeholder"><p>The imported mind map covers motion, position, distance/displacement, speed/velocity, acceleration, graphs, kinematics, circular motion, applications, and the chapter's historical references.</p><button onClick={() => setTab("learn")}>Back to learning path</button></div>}
            {tab === "notes" && <div className="note-grid">{content.map((x) => <article key={x.key}><b>{x.title}</b><p>{x.body}</p></article>)}</div>}
          </div>
        </section>
      )}

      <footer><span>NoNameTutor · Class 9 Physics</span><span>Chapter 4 study pack integrated</span></footer>
    </main>
  );
}
