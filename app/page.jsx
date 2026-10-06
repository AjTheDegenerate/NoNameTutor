"use client";
import { useMemo, useState } from "react";

const chapters=[
{id:"motion",number:"04",title:"Describing Motion Around Us",tag:"Motion",desc:"Position, distance, displacement, speed, velocity, acceleration and graphs."},
{id:"force",number:"06",title:"How Forces Affect Motion",tag:"Forces",desc:"Force, Newton's laws, momentum, friction and how forces change motion."},
{id:"work",number:"07",title:"Work, Energy, and Simple Machines",tag:"Energy",desc:"Work, energy, power and simple machines such as pulleys, ramps and levers."}
];
const lessons={
motion:[
{key:"position",title:"Position & motion",body:"An object is in motion when its position relative to a chosen reference point changes with time. A useful description of position includes both distance and direction from the reference point."},
{key:"distance",title:"Distance vs displacement",body:"Distance describes the total path travelled. Displacement describes the change from the initial position to the final position, including direction. Distance is never negative; displacement depends on the chosen direction."},
{key:"speed",title:"Speed & velocity",body:"Speed tells how fast distance is covered. Average speed is total distance divided by total time. Velocity includes direction and is based on displacement over time."},
{key:"acceleration",title:"Acceleration",body:"Acceleration describes how velocity changes with time. It can involve a change in speed, direction, or both. For constant acceleration, the equations of motion connect u, v, a, t and displacement."}
],
force:[
{key:"force",title:"The concept of force",body:"A force can change an object's state of motion or its shape. Force is a vector quantity, so both magnitude and direction matter."},
{key:"newton1",title:"Newton's First Law",body:"An object remains at rest or continues in uniform straight-line motion unless acted upon by an unbalanced external force. This is associated with inertia."},
{key:"newton2",title:"Newton's Second Law",body:"The net force on an object is related to the rate of change of its momentum. For constant mass, this gives the familiar relation F = ma."},
{key:"newton3",title:"Newton's Third Law",body:"When two objects interact, each exerts a force on the other. These interaction forces are equal in magnitude and opposite in direction, and they act on different objects."}
],
work:[
{key:"work",title:"Work done by a force",body:"For a constant force acting along the displacement, work done is W = F × s. Work depends on the force doing the work and the displacement in the direction of that force."},
{key:"energy",title:"Energy",body:"Energy is the capacity to do work. Work done on an object can appear as a change in its energy. The SI unit of both work and energy is the joule (J)."},
{key:"kinetic",title:"Kinetic energy",body:"Kinetic energy is the energy an object possesses because of its motion. For an object of mass m moving with speed v, kinetic energy is KE = ½mv²."},
{key:"machines",title:"Simple machines",body:"Simple machines make tasks easier by changing the magnitude or direction of applied force. This chapter introduces pulleys, inclined planes and levers, and mechanical advantage."}
]};
const questions={
motion:["What is the difference between distance and displacement?","A car travels 120 m in 10 s. What is its average speed?","Can an object have zero displacement but non-zero distance? Explain."],
force:["State Newton's First Law in your own words.","Why do passengers tend to move forward when a moving bus brakes suddenly?","A net force of 20 N acts on a 5 kg object. What acceleration does it produce?"],
work:["When is work done by a force zero?","A 10 N force moves an object 3 m in its direction. Calculate the work done.","Why does a fixed pulley make lifting a load more convenient even though its ideal mechanical advantage is 1?"]
};

export default function Home(){
const [chapter,setChapter]=useState(chapters[0]); const [tab,setTab]=useState("learn"); const [query,setQuery]=useState(""); const [done,setDone]=useState<string[]>([]);
const content=lessons[chapter.id]; const filtered=useMemo(()=>content.filter(x=>(x.title+" "+x.body).toLowerCase().includes(query.toLowerCase())),[content,query]);
return <main>
<header className="top"><div className="brand"><span className="mark">NN</span><div><b>NoNameTutor</b><small>Class 9 · Physics</small></div></div><div className="pill">PRE-WRITTEN MVP</div></header>
<section className="hero"><div><span className="eyebrow">YOUR STUDY DESK</span><h1>Learn physics.<br/><i>Actually understand it.</i></h1><p>A focused Class 9 workspace built around your textbook chapters — read, learn, practise and track what you've mastered.</p></div><div className="progress"><span>COURSE PROGRESS</span><strong>{Math.round(done.length/12*100)}%</strong><div className="bar"><i style={{width:Math.min(100,done.length/12*100)+"%"}}/></div><small>{done.length} of 12 concepts completed</small></div></section>
<div className="layout"><aside><div className="side-title">PHYSICS · CLASS 9</div>{chapters.map(c=><button className={chapter.id===c.id?"chapter active":"chapter"} onClick={()=>{setChapter(c);setTab("learn")}} key={c.id}><span>{c.number}</span><div><b>{c.title}</b><small>{c.tag}</small></div></button>)}<div className="side-note"><b>Built to grow.</b><p>More chapters, practice sets and adaptive learning can slot into this structure later.</p></div></aside>
<section className="workspace"><div className="chapter-head"><div><span className="eyebrow">CHAPTER {chapter.number}</span><h2>{chapter.title}</h2><p>{chapter.desc}</p></div><div className="search"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search this chapter..." /></div></div>
<nav className="tabs"><button className={tab==="learn"?"selected":""} onClick={()=>setTab("learn")}>Learn</button><button className={tab==="practice"?"selected":""} onClick={()=>setTab("practice")}>Practice</button><button className={tab==="notes"?"selected":""} onClick={()=>setTab("notes")}>Quick notes</button></nav>
{tab==="learn"&&<div className="cards">{filtered.map((l,i)=><article className="lesson" key={l.key}><div className="lesson-num">0{i+1}</div><div><h3>{l.title}</h3><p>{l.body}</p><button onClick={()=>setDone(d=>d.includes(chapter.id+l.key)?d:d.concat(chapter.id+l.key))} className={done.includes(chapter.id+l.key)?"complete":"action"}>{done.includes(chapter.id+l.key)?"✓ Completed":"Mark complete →"}</button></div></article>)}</div>}
{tab==="practice"&&<div className="practice">{questions[chapter.id].map((q,i)=><article className="question" key={q}><span>Q{i+1}</span><h3>{q}</h3><button onClick={()=>setDone(d=>d.includes(chapter.id+"q"+i)?d:d.concat(chapter.id+"q"+i))}>{done.includes(chapter.id+"q"+i)?"Completed ✓":"I can answer this"}</button></article>)}</div>}
{tab==="notes"&&<div className="notes"><div><span>CHAPTER CHEAT SHEET</span><h3>What to remember</h3></div><ul>{content.map(x=><li key={x.key}><b>{x.title}:</b> {x.body}</li>)}</ul></div>}
</section></div><footer><span>NoNameTutor · Class 9 Physics</span><span>Built as the foundation for a much bigger learning system.</span></footer>
</main>}
