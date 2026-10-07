"use client";

import { useMemo, useState } from "react";

const chapters = [
  { id: "motion", number: "04", title: "Describing Motion Around Us", short: "Motion" },
  { id: "force", number: "06", title: "How Forces Affect Motion", short: "Forces" },
  { id: "work", number: "07", title: "Work, Energy, and Simple Machines", short: "Energy" }
];

const lessons = {
  motion: [
    { key: "position", title: "Position & motion", body: "An object is in motion when its position relative to a chosen reference point changes with time." },
    { key: "distance", title: "Distance vs displacement", body: "Distance describes the total path travelled. Displacement describes the change from the initial position to the final position, including direction." },
    { key: "speed", title: "Speed & velocity", body: "Average speed is total distance divided by total time. Velocity includes direction and is based on displacement over time." },
    { key: "acceleration", title: "Acceleration", body: "Acceleration describes how velocity changes with time. It can involve a change in speed, direction, or both." }
  ],
  force: [
    { key: "force", title: "The concept of force", body: "A force can change an object's state of motion or its shape. Force is a vector quantity, so both magnitude and direction matter." },
    { key: "newton1", title: "Newton's First Law", body: "An object remains at rest or continues in uniform straight-line motion unless acted upon by an unbalanced external force." },
    { key: "newton2", title: "Newton's Second Law", body: "The net force on an object is related to the rate of change of its momentum. For constant mass, F = ma." },
    { key: "newton3", title: "Newton's Third Law", body: "When two objects interact, each exerts a force on the other. These forces are equal in magnitude and opposite in direction." }
  ],
  work: [
    { key: "work", title: "Work done by a force", body: "For a constant force acting along the displacement, work done is W = F × s." },
    { key: "energy", title: "Energy", body: "Energy is the capacity to do work. The SI unit of both work and energy is the joule (J)." },
    { key: "kinetic", title: "Kinetic energy", body: "Kinetic energy is the energy an object possesses because of its motion: KE = ½mv²." },
    { key: "machines", title: "Simple machines", body: "Simple machines make tasks easier by changing the magnitude or direction of applied force." }
  ]
};

const questions = {
  motion: [
    "What is the difference between distance and displacement?",
    "A car travels 120 m in 10 s. What is its average speed?",
    "Can an object have zero displacement but non-zero distance? Explain."
  ],
  force: [
    "State Newton's First Law in your own words.",
    "Why do passengers tend to move forward when a moving bus brakes suddenly?",
    "A net force of 20 N acts on a 5 kg object. What acceleration does it produce?"
  ],
  work: [
    "When is work done by a force zero?",
    "A 10 N force moves an object 3 m in its direction. Calculate the work done.",
    "Why does a fixed pulley make lifting a load more convenient?"
  ]
};

export default function Home() {
  const [chapter, setChapter] = useState(chapters[0]);
  const [tab, setTab] = useState("learn");
  const [query, setQuery] = useState("");
  const [done, setDone] = useState([]);

  const content = lessons[chapter.id];
  const filtered = useMemo(
    () => content.filter((x) => (x.title + " " + x.body).toLowerCase().includes(query.toLowerCase())),
    [content, query]
  );

  const totalConcepts = chapters.length * 4;
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
          <button className="nav-active">Learn</button>
          <button onClick={() => setTab("practice")}>Practice</button>
          <button onClick={() => setTab("notes")}>Notes</button>
        </nav>
        <div className="stats">
          <span className="streak">🔥 <b>3</b> day streak</span>
          <span className="xp">⚡ <b>{completedConcepts * 10}</b> XP</span>
          <span className="avatar">A</span>
        </div>
      </header>

      <section className="course-strip">
        <div>
          <span className="kicker">CLASS 9 · PHYSICS</span>
          <h1>Your learning path</h1>
          <p>Pick up where you left off. Finish a lesson, earn XP, and keep moving.</p>
        </div>
        <div className="goal">
          <div className="goal-top"><b>Daily goal</b><span>{Math.min(completedConcepts, 3)} / 3</span></div>
          <div className="goal-track"><i style={{ width: Math.min(100, completedConcepts / 3 * 100) + "%" }} /></div>
          <small>Complete 3 lessons today</small>
        </div>
      </section>

      <div className="main-grid">
        <section className="path-panel">
          <div className="path-head">
            <div><span className="kicker">PHYSICS PATH</span><h2>Build your physics streak</h2></div>
            <span className="progress-chip">{progress}% complete</span>
          </div>

          <div className="chapter-tabs">
            {chapters.map((c) => (
              <button key={c.id} className={chapter.id === c.id ? "chapter-tab active" : "chapter-tab"} onClick={() => { setChapter(c); setTab("learn"); }}>
                <span>{c.number}</span>{c.short}
              </button>
            ))}
          </div>

          <div className="path">
            {filtered.map((lesson, i) => {
              const key = chapter.id + ":lesson:" + lesson.key;
              const completed = done.includes(key);
              const locked = i > 0 && !done.includes(chapter.id + ":lesson:" + content[i - 1].key);
              return (
                <div className={"path-row " + (completed ? "is-done" : "")} key={lesson.key}>
                  <div className="path-line"><span className="node">{completed ? "✓" : i + 1}</span></div>
                  <article className={"lesson-card " + (locked ? "locked" : "")}>
                    <div className="lesson-meta">
                      <span>LESSON {i + 1}</span>
                      {completed && <em>COMPLETED</em>}
                    </div>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.body}</p>
                    <button disabled={locked} onClick={() => complete(key)}>
                      {completed ? "Review lesson" : locked ? "Complete the previous lesson" : "Start lesson →"}
                    </button>
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="right-rail">
          <div className="rail-card">
            <div className="rail-icon">🎯</div>
            <span className="kicker">TODAY</span>
            <h3>Keep the streak alive.</h3>
            <p>One small lesson is better than an abandoned study plan.</p>
            <button onClick={() => setTab("learn")}>Continue learning</button>
          </div>

          <div className="rail-card stats-card">
            <span className="kicker">YOUR PROGRESS</span>
            <div className="big-stat">{completedConcepts}<small> / {totalConcepts}</small></div>
            <p>lessons completed</p>
            <div className="mini-track"><i style={{ width: progress + "%" }} /></div>
          </div>

          <div className="rail-card">
            <span className="kicker">CHAPTER SEARCH</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a concept..." />
            {query && <small className="search-count">{filtered.length} matching lessons</small>}
          </div>
        </aside>
      </div>

      {tab !== "learn" && (
        <section className="overlay-panel">
          <div className="overlay-inner">
            <button className="close" onClick={() => setTab("learn")}>× Close</button>
            <span className="kicker">{tab === "practice" ? "PRACTICE" : "QUICK NOTES"}</span>
            <h2>{tab === "practice" ? "Test what you know." : "Your chapter at a glance."}</h2>
            {tab === "practice" ? questions[chapter.id].map((q, i) => (
              <article className="practice-card" key={q}><span>Q{i + 1}</span><h3>{q}</h3><button onClick={() => complete(chapter.id + ":question:" + i)}>I can answer this ✓</button></article>
            )) : (
              <div className="note-grid">{content.map((x) => <article key={x.key}><b>{x.title}</b><p>{x.body}</p></article>)}</div>
            )}
          </div>
        </section>
      )}

      <footer><span>NoNameTutor · Class 9 Physics</span><span>Learn · Practise · Master</span></footer>
    </main>
  );
}
