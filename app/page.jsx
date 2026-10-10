"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ScientificText from "./ScientificText";
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

function normalisePhysicsAnswer(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[−–]/g, "-")
    .replace(/m\s*s[⁻−-]¹/g, "m/s")
    .replace(/m\s*s[⁻−-]²/g, "m/s^2")
    .replace(/m\/s[⁻−-]²/g, "m/s^2")
    .replace(/m\/s²/g, "m/s^2")
    .replace(/m\/s¹/g, "m/s")
    .replace(/m\s*s\^-1/g, "m/s")
    .replace(/m\s*s\^-2/g, "m/s^2")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/[×·]/g, "*")
    .replace(/[.,;:]+$/g, "")
    .replace(/\s+/g, "");
}

function physicsAnswerMatches(expected, submitted) {
  const target = normalisePhysicsAnswer(expected);
  const response = normalisePhysicsAnswer(submitted);
  return response.length > 0 && target === response;
}

function toMathMarkup(value) {
  const source = String(value ?? "").trim();
  // Formula datasets may opt into exact LaTeX with $...$; keep it untouched.
  if (source.startsWith("$") && source.endsWith("$") && source.length > 2) {
    return "\\(" + source.slice(1, -1) + "\\)";
  }
  const known = new Set(["MA", "F_net", "W_net", "m_system", "v_avg", "a_avg", "K1", "U1", "K2", "U2", "T1", "T2", "F1", "F2", "m1", "m2", "v1", "v2", "u1", "u2", "x1", "x2", "t1", "t2"]);
  const products = new Set(["mv", "mgh", "ut", "at", "as", "vt", "uv", "ma", "mg"]);
  const expression = source
    .replace(/([A-Za-z]+(?:_[A-Za-z0-9]+)?)/g, (token) => {
      if (token === "MA") return "\\mathrm{MA}";
      if (/^[A-Za-z][0-9]+$/.test(token)) return token[0] + "_{" + token.slice(1) + "}";
      if (known.has(token)) return token.replace(/_([A-Za-z0-9]+)/g, "_{\\mathrm{$1}}");
      if (products.has(token) || token.length === 1) return token;
      return "\\text{" + token + "}";
    })
    .replace(/[₀-₉]/g, (digit) => "_{" + "₀₁₂₃₄₅₆₇₈₉".indexOf(digit) + "}")
    .replace(/²/g, "^{2}").replace(/³/g, "^{3}")
    .replace(/⁻¹/g, "^{-1}").replace(/⁻²/g, "^{-2}")
    .replace(/½/g, "\\frac{1}{2}").replace(/\b1\/2\b/g, "\\frac{1}{2}")
    .replace(/π/g, "\\pi").replace(/×/g, "\\times ").replace(/·/g, "\\cdot ")
    .replace(/[−–]/g, "-").replace(/Δ/g, "\\Delta ")
    .replace(/≤/g, "\\le ").replace(/≥/g, "\\ge ")
    .replace(/≠/g, "\\ne ").replace(/≈/g, "\\approx ")
    .replace(/→/g, "\\to ")
    .replace(/ /g, "\\ ");
  return "\\(" + expression + "\\)";
}


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

function GraphSketch({ type }) {
  if (type === "inclined-plane-diagram") {
    return <svg className="graph-sketch-svg" viewBox="0 0 360 210" role="img" aria-label="Inclined plane diagram showing ramp length L, vertical height h, load, and effort along the ramp">
      <path d="M52 166 L316 166 L316 58 Z" fill="rgba(67,245,195,0.08)" stroke="#71857b" strokeWidth="1.5" />
      <path d="M52 166 L316 58" stroke="#43f5c3" strokeWidth="4" strokeLinecap="round" />
      <rect x="250" y="70" width="26" height="22" rx="2" transform="rotate(-22.3 263 81)" fill="#f0c674" stroke="#070b0a" strokeWidth="1.5" />
      <line x1="252" y1="99" x2="290" y2="83" stroke="#f0c674" strokeWidth="2" />
      <path d="M281 82 L291 83 L286 92" fill="none" stroke="#f0c674" strokeWidth="2" />
      <line x1="328" y1="166" x2="328" y2="58" stroke="#a7b9af" strokeDasharray="4 4" />
      <text x="337" y="116" fill="#a7b9af" fontSize="12">h</text>
      <text x="170" y="128" fill="#43f5c3" fontSize="12">L</text>
      <text x="207" y="92" fill="#f0c674" fontSize="10">effort</text>
      <text x="252" y="56" fill="#a7b9af" fontSize="10">load</text>
      <text x="182" y="196" textAnchor="middle" fill="#8da197" fontSize="9">Ideal smooth ramp; schematic, not to scale</text>
    </svg>;
  }
  if (type === "lever-diagram") {
    return <svg className="graph-sketch-svg" viewBox="0 0 360 210" role="img" aria-label="Lever diagram with fulcrum, load and effort acting on opposite arms">
      <path d="M48 111 L316 111" stroke="#43f5c3" strokeWidth="5" strokeLinecap="round" />
      <path d="M164 145 L188 111 L212 145 Z" fill="#71857b" stroke="#a7b9af" strokeWidth="1.5" />
      <circle cx="188" cy="111" r="4" fill="#f0c674" />
      <line x1="83" y1="56" x2="83" y2="110" stroke="#f0c674" strokeWidth="2.5" />
      <path d="M77 100 L83 110 L89 100" fill="none" stroke="#f0c674" strokeWidth="2.5" />
      <line x1="288" y1="56" x2="288" y2="110" stroke="#f0c674" strokeWidth="2.5" />
      <path d="M282 100 L288 110 L294 100" fill="none" stroke="#f0c674" strokeWidth="2.5" />
      <text x="65" y="43" fill="#f0c674" fontSize="11">Effort</text>
      <text x="270" y="43" fill="#f0c674" fontSize="11">Load</text>
      <text x="175" y="164" fill="#a7b9af" fontSize="10">fulcrum</text>
      <text x="108" y="100" fill="#a7b9af" fontSize="10">d₁</text>
      <text x="234" y="100" fill="#a7b9af" fontSize="10">d₂</text>
      <text x="182" y="196" textAnchor="middle" fill="#8da197" fontSize="9">Conceptual lever diagram; not to scale</text>
    </svg>;
  }
  if (type === "system-diagram") {
    return <svg className="graph-sketch-svg" viewBox="0 0 360 210" role="img" aria-label="Two connected boxes treated as one system, pulled by an external force and sharing one acceleration">
      <rect x="76" y="82" width="76" height="44" rx="5" fill="rgba(67,245,195,0.12)" stroke="#43f5c3" strokeWidth="2" />
      <rect x="158" y="82" width="76" height="44" rx="5" fill="rgba(67,245,195,0.12)" stroke="#43f5c3" strokeWidth="2" />
      <text x="114" y="108" textAnchor="middle" fill="#a7b9af" fontSize="12">m₁</text>
      <text x="196" y="108" textAnchor="middle" fill="#a7b9af" fontSize="12">m₂</text>
      <line x1="235" y1="103" x2="304" y2="103" stroke="#f0c674" strokeWidth="2.5" />
      <path d="M296 96 L306 103 L296 110" fill="none" stroke="#f0c674" strokeWidth="2.5" />
      <text x="269" y="90" fill="#f0c674" fontSize="12">F</text>
      <line x1="78" y1="146" x2="235" y2="146" stroke="#43f5c3" strokeWidth="2.5" />
      <path d="M227 139 L237 146 L227 153" fill="none" stroke="#43f5c3" strokeWidth="2.5" />
      <text x="155" y="165" textAnchor="middle" fill="#43f5c3" fontSize="11">common acceleration a</text>
      <text x="180" y="196" textAnchor="middle" fill="#8da197" fontSize="9">F is external to the combined system</text>
    </svg>;
  }

  const positionGraph = type === "position-time-line" || type === "position-time-tangent" || type === "rest-constant-velocity";
  const areaGraph = type === "velocity-time-area";
  const tangentGraph = type === "position-time-tangent";
  const forceDisplacementGraph = type === "force-displacement-area";
  const energyGraph = type === "energy-conservation";
  const powerGraph = type === "power-time-inverse";
  const directGraph = ["acceleration-force-line", "force-mass-line", "potential-height-line"].includes(type);
  const dualMotionGraph = type === "rest-constant-velocity";
  const axisLabel = forceDisplacementGraph ? "force F (N)"
    : energyGraph ? "energy (J)"
    : powerGraph ? "average power P (W)"
    : type === "acceleration-force-line" ? "acceleration a (m/s²)"
    : type === "force-mass-line" ? "force F (N)"
    : type === "potential-height-line" ? "potential energy U (J)"
    : positionGraph ? "position x (m)" : "velocity v (m/s)";
  const xLabel = forceDisplacementGraph ? "displacement s (m)"
    : energyGraph ? "time t (s)"
    : powerGraph ? "time t (s)"
    : type === "acceleration-force-line" ? "net force F (N)"
    : type === "force-mass-line" ? "mass m (kg)"
    : type === "potential-height-line" ? "height h (m)" : "time t (s)";
  const ariaLabel = forceDisplacementGraph ? "Force-displacement graph with constant positive force; the shaded rectangle represents work"
    : energyGraph ? "Ideal energy-versus-time schematic with kinetic energy increasing, potential energy decreasing, and total mechanical energy constant"
    : powerGraph ? "Average power decreases as the time taken increases for a fixed amount of work"
    : type === "acceleration-force-line" ? "Acceleration against net force for fixed mass, a straight line through the origin"
    : type === "force-mass-line" ? "Weight against mass near Earth's surface for constant gravitational acceleration"
    : type === "potential-height-line" ? "Gravitational potential energy against height for fixed mass and gravity"
    : areaGraph ? "Velocity-time graph with positive area under an increasing velocity line shaded; the shaded positive area represents displacement over this interval"
    : tangentGraph ? "Position-time curve with a tangent touching the curve at the marked point; tangent slope represents instantaneous velocity"
    : dualMotionGraph ? "Position-time graph comparing an object at rest, horizontal line, and constant velocity, rising straight line"
    : positionGraph ? "Position-time graph with a straight rising line; slope represents constant velocity"
    : "Velocity-time graph with a straight rising line; slope represents constant acceleration";

  return <svg className="graph-sketch-svg" viewBox="0 0 360 224" role="img" aria-label={ariaLabel}>
    {[70, 100, 130].map((y) => <line key={"gy" + y} x1="52" y1={y} x2="326" y2={y} stroke="#23342d" strokeWidth="1" />)}
    {[120, 188, 256, 324].map((x) => <line key={"gx" + x} x1={x} y1="28" x2={x} y2="160" stroke="#23342d" strokeWidth="1" />)}
    <line x1="52" y1="25" x2="52" y2="166" stroke="#71857b" strokeWidth="1.5" />
    <path d="M47 32 L52 24 L57 32" fill="none" stroke="#71857b" strokeWidth="1.5" />
    <line x1="52" y1="160" x2="333" y2="160" stroke="#71857b" strokeWidth="1.5" />
    <path d="M325 155 L333 160 L325 165" fill="none" stroke="#71857b" strokeWidth="1.5" />
    <text x="56" y="18" fill="#a7b9af" fontSize="11">{axisLabel}</text>
    <text x="284" y="184" fill="#a7b9af" fontSize="11">{xLabel}</text>
    <text x="38" y="176" fill="#a7b9af" fontSize="10">0</text>
    {[120, 188, 256, 324].map((x) => <line key={"xt" + x} x1={x} y1="156" x2={x} y2="164" stroke="#71857b" />)}
    {[130, 100, 70, 40].map((y) => <line key={"yt" + y} x1="48" y1={y} x2="56" y2={y} stroke="#71857b" />)}
    {forceDisplacementGraph && <polygon points="52,160 52,65 326,65 326,160" fill="rgba(67,245,195,0.16)" />}
    {areaGraph && <polygon points="52,160 52,130 326,48 326,160" fill="rgba(67,245,195,0.16)" />}
    {energyGraph ? <>
      <line x1="52" y1="36" x2="326" y2="36" stroke="#f0c674" strokeWidth="2.5" />
      <path d="M52 48 C140 54 226 126 326 160" fill="none" stroke="#43f5c3" strokeWidth="2.8" />
      <path d="M52 160 C140 154 226 82 326 48" fill="none" stroke="#77a8ff" strokeWidth="2.8" />
      <text x="284" y="28" fill="#f0c674" fontSize="10">total</text>
      <text x="284" y="151" fill="#43f5c3" fontSize="10">U</text>
      <text x="284" y="60" fill="#77a8ff" fontSize="10">K</text>
    </> : powerGraph ? <>
      <path d="M68 45 C85 78 142 116 326 147" fill="none" stroke="#43f5c3" strokeWidth="3" strokeLinecap="round" />
      <text x="176" y="93" fill="#a7e8d4" fontSize="10">P = W/t for fixed W</text>
    </> : directGraph ? <>
      <line x1="52" y1="160" x2="326" y2="48" stroke="#43f5c3" strokeWidth="3" strokeLinecap="round" />
      <text x="206" y="92" fill="#a7e8d4" fontSize="10">direct relationship</text>
    </> : dualMotionGraph ? <>
      <line x1="52" y1="122" x2="326" y2="122" stroke="#f0c674" strokeWidth="2.8" />
      <line x1="52" y1="148" x2="326" y2="58" stroke="#43f5c3" strokeWidth="2.8" />
      <text x="260" y="114" fill="#f0c674" fontSize="10">rest</text>
      <text x="226" y="75" fill="#43f5c3" fontSize="10">constant v</text>
    </> : tangentGraph ? <>
      <path d="M52 145 Q182 145 326 48" fill="none" stroke="#43f5c3" strokeWidth="3" strokeLinecap="round" />
      <line x1="112" y1="146.75" x2="252" y2="97.2" stroke="#f0c674" strokeWidth="2.2" strokeDasharray="5 4" />
      <circle cx="185.5" cy="120.75" r="4" fill="#f0c674" stroke="#070b0a" strokeWidth="1.5" />
      <text x="200" y="91" fill="#f0c674" fontSize="10">tangent at point</text>
    </> : forceDisplacementGraph ? <line x1="52" y1="65" x2="326" y2="65" stroke="#43f5c3" strokeWidth="3" /> : <line x1="52" y1={areaGraph ? 130 : 142} x2="326" y2="48" stroke="#43f5c3" strokeWidth="3" strokeLinecap="round" />}
    {areaGraph && <text x="143" y="143" fill="#a7e8d4" fontSize="10">shaded positive area = displacement here</text>}
    {forceDisplacementGraph && <text x="143" y="143" fill="#a7e8d4" fontSize="10">area = work</text>}
    <text x="188" y="210" textAnchor="middle" fill="#8da197" fontSize="9">Schematic — not to scale; tick spacing is illustrative</text>
  </svg>;
}
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
    const safe=text
      .replace(/[₀-₉]/g, digit => "_" + "₀₁₂₃₄₅₆₇₈₉".indexOf(digit))
      .replaceAll("½","1/2").replaceAll("¼","1/4").replaceAll("¾","3/4")
      .replaceAll("²","^2").replaceAll("³","^3").replaceAll("¹","^1")
      .replaceAll("⁻¹","^-1").replaceAll("⁻²","^-2").replaceAll("⁻³","^-3")
      .replaceAll("—","-").replaceAll("–","-").replaceAll("−","-")
      .replaceAll("•","-").replaceAll("×","*").replaceAll("·","*")
      .replaceAll("√","sqrt").replaceAll("π","pi").replaceAll("Δ","Delta")
      .replaceAll("α","alpha").replaceAll("β","beta").replaceAll("θ","theta")
      .replaceAll("μ","mu").replaceAll("ρ","rho").replaceAll("λ","lambda")
      .replaceAll("→","->").replaceAll("≤","<=").replaceAll("≥",">=")
      .replaceAll("≈","~=").replaceAll("≠","!=").replaceAll("∝","proportional to")
      .replaceAll("∞","infinity").replaceAll("°"," deg")
      .replaceAll("“",'"').replaceAll("”",'"').replaceAll("‘","'").replaceAll("’","'")
      .replace(/[^\x20-\x7E\n\r\t]/g,"?");
    const wrap=(line,max=92)=>{const out=[];let rest=line;while(rest.length>max){let cut=rest.lastIndexOf(" ",max);if(cut<1)cut=max;out.push(rest.slice(0,cut));rest=rest.slice(cut).trimStart();}out.push(rest);return out;};
    const lines=safe.split("\n").flatMap(line=>line?wrap(line):[""]);
    const perPage=58;const pages=[];for(let i=0;i<lines.length;i+=perPage)pages.push(lines.slice(i,i+perPage));
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

      {tab==="flashcards"&&<><span className="kicker">{chapter.id==="force"?"CHAPTER 6 · SUPPLIED ANKI IMPORT":chapter.id==="work"?"CHAPTER 7 · SUPPLIED ANKI IMPORT":"CHAPTER 4 · ANKI IMPORT"}</span><h2>{chapter.id==="force"?"How Forces Affect Motion":chapter.id==="work"?"Work, Energy, and Simple Machines":"Linear Motion"} — card {card+1} / {chapter.id==="force"?chapter6Flashcards.length:chapter.id==="work"?chapter7Flashcards.length:flashcards.length}</h2><article className="flashcard"><span className="card-label">QUESTION</span><h3><ScientificText value={(chapter.id==="force"?chapter6Flashcards:chapter.id==="work"?chapter7Flashcards:flashcards)[card][0]} /></h3>{showAnswer?<div className="card-answer"><span className="card-label">ANSWER</span><p><ScientificText value={(chapter.id==="force"?chapter6Flashcards:chapter.id==="work"?chapter7Flashcards:flashcards)[card][1]} /></p></div>:<button className="reveal" onClick={()=>setShowAnswer(true)}>Reveal answer</button>}</article><div className="flash-controls"><button disabled={card===0} onClick={()=>{setCard(card-1);setShowAnswer(false);}}>← Previous</button><button onClick={()=>{const total=chapter.id==="force"?chapter6Flashcards.length:chapter.id==="work"?chapter7Flashcards.length:flashcards.length;setCard((card+1)%total);setShowAnswer(false);}}>{card===(chapter.id==="force"?chapter6Flashcards.length:chapter.id==="work"?chapter7Flashcards.length:flashcards.length)-1?"Restart deck →":"Next card →"}</button></div><p className="deck-note">{chapter.id==="force"?"80 cards imported from the supplied Physics Flashcards Anki deck.":chapter.id==="work"?"80 cards imported from the supplied Physics Flashcards Anki deck for Chapter 7.":"80 cards imported from the supplied Linear Motion Anki deck."}</p></>}

      {tab==="practice"&&chapter.id==="motion"&&<><span className="kicker">CHAPTER 4 · ASSESSED QUIZ</span><h2>Motion quiz — {chapter4Quiz.length} questions.</h2><p className="overlay-intro">Choose an answer for each question. Incorrect answers can be retried; a question is only marked correct after you select the right option. Explanations appear after a correct answer.</p><div className="quiz-score"><b>{chapter4Quiz.filter((q,i)=>quizAnswers["ch4:"+i]===q.answerIndex).length}</b><span> / {chapter4Quiz.length} correct</span></div>{chapter4Quiz.map((q,i)=>{const picked=quizAnswers["ch4:"+i];const correct=picked===q.answerIndex;return <article className="practice-card" key={q.question}><span>Q{i+1}</span><h3><ScientificText value={q.question} /></h3><div className="quiz-options">{q.options.map((option,n)=><button key={option} disabled={correct} className={correct&&n===q.answerIndex?"quiz-option-correct":picked===n&&!correct?"quiz-option-wrong":""} onClick={()=>setQuizAnswers(x=>({...x,["ch4:"+i]:n}))}>{String.fromCharCode(65+n)}. <ScientificText value={option} /></button>)}</div>{typeof picked==="number"&&!correct&&<div className="quiz-answer is-wrong">Not quite — try another option.</div>}{correct&&<div className="quiz-answer">✓ Correct. <ScientificText value={q.explanation} /></div>}</article>})}</>}

      {tab==="practice"&&chapter.id==="force"&&<><span className="kicker">CHAPTER 6 · SUPPLIED QUIZ</span><h2>Force quiz — {chapter6Quiz.length} questions.</h2><p className="overlay-intro">Attempt the supplied multiple-choice quiz. Choose an option, check it, then continue to the next question.</p>{chapter6Quiz.map((q,i)=>{const picked=quizAnswers["ch6:"+i];const correct=picked===q.answer;return <article className="practice-card" key={q.q}><span>Q{i+1}</span><h3><ScientificText value={q.q} /></h3><div className="quiz-options">{q.options.map((option,n)=><button key={option} disabled={correct} className={correct&&option===q.answer?"quiz-option-correct":picked===option&&!correct?"quiz-option-wrong":""} onClick={()=>setQuizAnswers(x=>({...x,["ch6:"+i]:option}))}>{String.fromCharCode(65+n)}. <ScientificText value={option} /></button>)}</div>{typeof picked==="string"&&!correct?<div className="quiz-answer is-wrong">Not quite — try another option.</div>:null}{correct&&<div className="quiz-answer">✓ Correct — <ScientificText value={q.answer} /></div>}</article>})}</>}

      {tab==="practice"&&chapter.id==="work"&&<><span className="kicker">CHAPTER 7 · SUPPLIED QUIZ</span><h2>Work, Energy and Simple Machines — {chapter7Quiz.length} questions.</h2><p className="overlay-intro">The supplied multiple-choice quiz is preserved with its four answer choices. Choose an option to see whether it matches the marked answer.</p>{chapter7Quiz.map((q,i)=>{const picked=quizAnswers["ch7:"+i];const correct=picked===q.answer;return <article className="practice-card" key={q.q}><span>Q{i+1}</span><h3><ScientificText value={q.q} /></h3><div className="quiz-options">{q.options.map((option,n)=><button key={option} disabled={correct} className={correct&&option===q.answer?"quiz-option-correct":picked===option&&!correct?"quiz-option-wrong":""} onClick={()=>setQuizAnswers(x=>({...x,["ch7:"+i]:option}))}>{String.fromCharCode(65+n)}. <ScientificText value={option} /></button>)}</div>{typeof picked==="string"&&!correct?<div className="quiz-answer is-wrong">Not quite — try another option.</div>:null}{correct&&<div className="quiz-answer">✓ Correct — <ScientificText value={q.answer} /></div>}</article>})}</>}

      {tab==="revision"&&chapterData&&<><span className="kicker">CHAPTER {chapter.number} · QUESTION BANK</span><h2>{chapter.title} — {chapterData.questionBank.length} revision questions.</h2><p className="overlay-intro">Attempt first. MCQs and single-answer numericals are checked automatically and can be retried until correct. Longer, multi-part, and explanation questions reveal the answer and explanation when you are ready to review.</p><div className="question-filters">{["all","one-word","mcq","assertion-reasoning","very-short","short","long","numerical","graph","derivative","case","differentiate","revision"].map(m=><button key={m} className={questionMode===m?"selected":""} onClick={()=>setQuestionMode(m)}>{m==="all"?"All":m.replaceAll("-"," ")}</button>)}</div><div className="question-grid">{chapterData.questionBank.filter(q=>questionMode==="all"||q.type===questionMode).map((q,i)=>{const id=chapter.id+":"+q.type+":"+i;const response=questionAnswers[id];const selected=typeof response==="number"?response:null;const revealed=response===true;const isMcq=Array.isArray(q.options)&&(q.type==="mcq"||q.type==="assertion-reasoning");const correct=isMcq&&selected!==null&&q.options[selected]===q.answer;const numericAttempt=response&&typeof response==="object"&&typeof response.value==="string"?response:null;const isSingleNumerical=q.type==="numerical"&&!/[;]/.test(q.answer);const numericCorrect=isSingleNumerical&&numericAttempt?.checked&&physicsAnswerMatches(q.answer,numericAttempt.value);return <article className="question-card" key={id}><div className="question-top"><span>{q.type.replaceAll("-"," ").toUpperCase()}</span>{q.options&&<em>{q.options.length} options</em>}</div><h3><ScientificText value={q.q} /></h3>{isMcq?<><div className="quiz-options">{q.options.map((o,n)=><button key={o} disabled={correct} className={correct&&q.options[n]===q.answer?"quiz-option-correct":selected===n&&!correct?"quiz-option-wrong":""} onClick={()=>setQuestionAnswers(x=>({...x,[id]:n}))}>{String.fromCharCode(65+n)}. <ScientificText value={o} /></button>)}</div>{selected!==null&&!correct&&<div className="quiz-answer is-wrong">Not quite — try another option.</div>}{correct&&<div className="question-answer"><b>Correct</b><p><ScientificText value={q.answer} /></p><small><ScientificText value={q.explanation} /></small></div>}</>:isSingleNumerical?<><label className="answer-label">Your answer<input type="text" value={numericAttempt?.value||""} placeholder="Enter value and unit" autoComplete="off" onChange={e=>setQuestionAnswers(x=>({...x,[id]:{value:e.target.value,checked:false}}))}/></label><button disabled={!numericAttempt?.value?.trim()} onClick={()=>setQuestionAnswers(x=>({...x,[id]:{value:numericAttempt.value,checked:true}}))}>Check answer</button>{numericAttempt?.checked&&!numericCorrect&&<div className="quiz-answer is-wrong">Not quite — check your calculation, sign, and unit, then try again.</div>}{numericCorrect&&<div className="question-answer"><b>Correct</b><p><ScientificText value={q.answer} /></p><small><ScientificText value={q.explanation} /></small></div>}</>:<>{q.options&&<ol className="question-options">{q.options.map((o,n)=><li key={o}>{String.fromCharCode(65+n)}. <ScientificText value={o} /></li>)}</ol>}{revealed?<div className="question-answer"><b>Answer</b><p><ScientificText value={q.answer} /></p><small><ScientificText value={q.explanation} /></small></div>:<button onClick={()=>setQuestionAnswers(x=>({...x,[id]:true}))}>Reveal answer + explanation</button>}</>}</article>})}</div></>}

      {tab==="mindmap"&&chapterData&&<><span className="kicker">CHAPTER {chapter.number} · MIND MAP</span><h2>{chapter.title}.</h2><div className="mind-filters">{mindGroups.map(g=><button key={g} className={mindFilter===g?"selected":""} onClick={()=>setMindFilter(g)}>{g}</button>)}</div><div className="mind-grid">{filteredMindMap.map(([group,title,body])=><article key={group+title}><span>{group}</span><h3><ScientificText value={title} /></h3><p><ScientificText value={body} /></p></article>)}</div></>}

      {tab==="papers"&&chapterData&&<><span className="kicker">CHAPTER {chapter.number} · PAPER BANK</span><h2>Source-backed papers + generated practice.</h2><p className="overlay-intro">Authoritative material stays linked to its source. Generated papers are clearly marked as NCERT-based supplementary practice rather than historical exam papers.</p><div className="paper-filters">{["all","past","solved","unsolved","practice"].map(m=><button key={m} className={paperMode===m?"selected":""} onClick={()=>setPaperMode(m)}>{m==="all"?"All":m[0].toUpperCase()+m.slice(1)}</button>)}</div>{[...chapterData.papers,...chapterData.paperSources].filter(p=>paperMode==="all"||p.modes.includes(paperMode)).length===0?<div className="asset-placeholder">{paperMode==="past"?"No official CBSE Class IX board past-paper source is listed here. Class IX assessments are school-based; the official NCERT Exemplar and CBSE competency resources linked in this bank are practice or assessment-item collections, not past CBSE board papers. Verified school papers can be added when available.":"No items match this filter yet."}</div>:<div className="paper-grid">{[...chapterData.papers,...chapterData.paperSources].filter(p=>paperMode==="all"||p.modes.includes(paperMode)).map(p=><article className="paper-card" key={p.id}><div className="paper-top"><span>{p.kind==="generated"?"IN-APP PDF":p.kind.toUpperCase()}</span><em>✓ {p.status}</em></div><h3><ScientificText value={p.title} /></h3><p><ScientificText value={p.description} /></p><div className="paper-meta"><span>Class {p.classLevel}</span><span>{p.subject}</span><span>{p.year}</span>{p.kind==="generated"&&<span>{p.pages} pages</span>}</div>{p.kind==="generated"?<><div className="paper-actions"><button onClick={()=>openPaperPdf(p)}>Open PDF ↗</button><button onClick={()=>openPaperPdf(p,true)}>Download PDF</button></div>{p.sources&&<div className="paper-sources"><b>Official source basis</b>{p.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div>}</>:<a href={p.url} target="_blank" rel="noreferrer">Open authoritative source ↗</a>}</article>)}</div>}</>}

      {tab==="formulas"&&chapterData&&<><span className="kicker">CHAPTER {chapter.number} · FORMULA + GRAPH REFERENCE</span><h2>Numerical formulas + graph tools for {chapter.short}.</h2><p className="overlay-intro">Each topic separates calculation tools from graphical interpretation, with conditions and usage notes kept close to the equations.</p><div className="formula-filters"><button className={formulaTopic==="all"?"selected":""} onClick={()=>setFormulaTopic("all")}>All topics</button>{chapterData.formulas.map(f=><button key={f.topic} className={formulaTopic===f.topic?"selected":""} onClick={()=>setFormulaTopic(f.topic)}>{f.topic}</button>)}</div><div className="formula-grid">{chapterData.formulas.filter(f=>formulaTopic==="all"||f.topic===formulaTopic).map(f=><article className="formula-card" key={f.topic}><div className="formula-heading"><span className="kicker">TOPIC</span><h3>{f.topic}</h3></div>{f.condition&&<div className="formula-condition">⚠️ {f.condition}</div>}<section><h4>Numerical / equation tools</h4>{f.numeric.map(([name,formula,note])=><div className="formula-row" key={name}><b><ScientificText value={name} /></b><span className="math-formula">{toMathMarkup(formula)}</span><p><ScientificText value={note} /></p></div>)}</section><section><h4>Graphical tools</h4>{f.graphical.map(([name,formula,note])=><div className="formula-row graph-row" key={name}><b><ScientificText value={name} /></b><span className="math-formula graph-math-formula">{toMathMarkup(formula)}</span><p><ScientificText value={note} /></p></div>)}</section><div className="formula-use"><b>When to use:</b> <ScientificText value={f.use} /></div></article>)}</div></>}

      {tab==="derivations"&&chapterData&&<><span className="kicker">CHAPTER {chapter.number} · DERIVATIONS</span><h2>Derive it on paper. See the force on the graph.</h2><p className="overlay-intro">Follow the algebraic route and the matching graphical interpretation. Only source-supported extensions are included.</p><div className="derivation-grid">{chapterData.derivations.map(d=><article className="derivation-card" key={d.title}><div className="derivation-top"><span>{d.mode==="extension"?"HIGHER-GRADE EXTENSION":d.mode==="graph"?"GRAPH → EQUATION":"PAPER / ALGEBRA"}</span></div><h3><ScientificText value={d.title} /></h3><p className="derivation-setup"><ScientificText value={d.setup} /></p><div className="derivation-columns"><div><h4>On paper</h4><ol>{d.steps.map((s,i)=><li key={i}><ScientificText value={s} /></li>)}</ol><div className="derived-result"><span>RESULT</span><span className="math-formula">{toMathMarkup(d.result)}</span></div></div><div className="graph-explain"><h4>On the graph</h4><p><ScientificText value={d.graph} /></p><div className="graph-sketch graph-sketch-accurate">{d.graphType ? <GraphSketch type={d.graphType} /> : <div className="graph-sketch-note">No separate plotted graph is needed for this derivation; use the explanation above as the relevant diagram or relationship.</div>}</div></div></div></article>)}</div></>}

      {tab==="notes"&&<><span className="kicker">CHAPTER {chapter.number} · QUICK NOTES</span><h2>Chapter at a glance.</h2><div className="note-grid">{content.map(x=><article key={x.key}><b>{x.title}</b><p><ScientificText value={x.body} /></p></article>)}</div></>}

    </div></section>}

    <footer><span>NoNameTutor · Class 9 Physics</span><span>Chapter {chapter.number} study pack integrated</span></footer>
  </main>;
}