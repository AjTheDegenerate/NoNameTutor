import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const failures = [];
const checks = [];
function check(condition, message) {
  if (condition) checks.push(message);
  else failures.push(message);
}
function extractObjects(source, pattern) {
  return [...source.matchAll(pattern)].map((m) => m[0]);
}
function validateQuiz(path) {
  const source = read(path);
  const items = extractObjects(source, /\{\s*"question":([\s\S]*?)\n\s*\}/g);
  check(items.length >= 20, path + ": expected a substantial quiz bank");
  items.forEach((item, i) => {
    const optionsMatch = item.match(/"options":\s*\[([\s\S]*?)\]/);
    const optionCount = optionsMatch ? (optionsMatch[1].match(/^\s*"/gm) || []).length : 0;
    const answerMatch = item.match(/"answerIndex":\s*(\d+)/);
    const answer = answerMatch ? Number(answerMatch[1]) : -1;
    check(optionCount >= 2 && optionCount <= 6, path + ": question " + (i + 1) + " has a valid option list");
    check(answer >= 0 && answer < optionCount, path + ": question " + (i + 1) + " answerIndex points to an existing option");
    check(/"explanation":\s*"/.test(item), path + ": question " + (i + 1) + " has an explanation");
  });
  console.log(path + ": " + items.length + " quiz questions checked");
}
function validateQuestionBank(path) {
  const source = read(path);
  const items = extractObjects(source, /\{\s*"type":\s*"[^"]+"[\s\S]*?\n\s*\}/g);
  check(items.length >= 30, path + ": expected a substantial revision bank");
  items.forEach((item, i) => {
    check(/"q":\s*"/.test(item), path + ": item " + (i + 1) + " has a question");
    check(/"answer":\s*"/.test(item), path + ": item " + (i + 1) + " has an answer");
    check(/"explanation":\s*"/.test(item), path + ": item " + (i + 1) + " has an explanation");
    const optionsMatch = item.match(/"options":\s*\[([\s\S]*?)\]/);
    if (optionsMatch) {
      const optionCount = (optionsMatch[1].match(/^\s*"/gm) || []).length;
      check(optionCount >= 2 && optionCount <= 6, path + ": MCQ item " + (i + 1) + " has a valid option list");
    }
  });
  console.log(path + ": " + items.length + " revision questions checked");
}
function validateChapter3Lessons() {
  const path = "app/chapter3BiologyLessons.js";
  const source = read(path);
  const items = extractObjects(source, /\{\n\s*"key":\s*"[^"]+"[\s\S]*?(?=\n  \},\n  \{\n    "key":|\n  \}\n\];)/g);
  const keys = items.map((item) => (item.match(/"key":\s*"([^"]+)"/) || [])[1]).filter(Boolean);
  check(items.length >= 30, path + ": expected at least 30 structured lessons");
  check(new Set(keys).size === keys.length, path + ": lesson keys are unique");
  const required = ["hook", "textbook", "teacher", "example", "interaction", "mistake", "textbookActivity", "checkpoint", "sources"];
  items.forEach((item, i) => {
    required.forEach((field) => check(new RegExp('"' + field + '"\\s*:').test(item), path + ": lesson " + (i + 1) + " includes " + field));
    for (const field of ["interaction", "checkpoint"]) {
      const nested = item.match(new RegExp('"' + field + '"\\s*:\\s*\\{([\\s\\S]*?)\\n    \\}'));
      if (!nested) {
        check(false, path + ": lesson " + (i + 1) + " has a " + field + " object");
        continue;
      }
      const opts = nested[1].match(/"options":\s*\[([\s\S]*?)\]/);
      const count = opts ? (opts[1].match(/^\s*"/gm) || []).length : 0;
      const answer = nested[1].match(/"answer":\s*(\d+)/);
      const index = answer ? Number(answer[1]) : -1;
      check(count >= 2 && count <= 6, path + ": lesson " + (i + 1) + " " + field + " options are valid");
      check(index >= 0 && index < count, path + ": lesson " + (i + 1) + " " + field + " answer points to an existing option");
    }
  });
  console.log(path + ": " + items.length + " lessons and their interaction/checkpoint schemas checked");
}
function validatePapers(path) {
  const source = read(path);
  const items = extractObjects(source, /\{\s*"id":\s*"[^"]+"[\s\S]*?\n  \}/g);
  const ids = items.map((item) => (item.match(/"id":\s*"([^"]+)"/) || [])[1]).filter(Boolean);
  check(ids.length >= 4, path + ": expected solved, unsolved, practice and review paper variants");
  check(new Set(ids).size === ids.length, path + ": paper IDs are unique");
  items.forEach((item, i) => {
    check(/"modes":\s*\[/.test(item), path + ": paper/source " + (i + 1) + " declares modes");
    if (/"kind":\s*"generated"/.test(item)) {
      check(/"text":\s*"/.test(item), path + ": generated paper " + (i + 1) + " includes paper text");
      check(!/"year":\s*"(?:19|20)\d{2}[^"]*|[^"]*(?:past paper|board exam)[^"]*)"/i.test(item), path + ": generated paper " + (i + 1) + " is not mislabelled as a historical exam");
    }
  });
  console.log(path + ": " + items.length + " paper records checked");
}
validateQuiz("app/chapter2BiologyQuiz.js");
validateQuiz("app/chapter3BiologyQuiz.js");
validateQuestionBank("app/chapter2BiologyQuestionBank.js");
validateQuestionBank("app/chapter3BiologyQuestionBank.js");
validateChapter3Lessons();
validatePapers("app/chapter2BiologyPapers.js");
validatePapers("app/chapter3BiologyPapers.js");

const chapter2Lessons = read("app/chapter2BiologyLessons.js");
const lessonFactory = chapter2Lessons.match(/const makeLesson = \(([\s\S]*?)\) => \(\{([\s\S]*?)\n\}\);/);
const chapter2LessonCount = (chapter2Lessons.match(/makeLesson\("/g) || []).length;
check(lessonFactory !== null, "Chapter 2 lessons use a shared lesson schema factory");
check(chapter2LessonCount >= 30, "Chapter 2 has at least 30 structured lessons");
check(chapter2Lessons.includes("textbookActivity:activity"), "Chapter 2 lesson factory includes textbook activities");
check(chapter2Lessons.includes("checkpoint:{type:\"choice\""), "Chapter 2 lesson factory includes checkpoints");
console.log("app/chapter2BiologyLessons.js: " + chapter2LessonCount + " lessons checked");

for (const path of ["app/chapter2BiologyPaperSources.js", "app/chapter3BiologyPaperSources.js"]) {
  const source = read(path);
  const urls = [...source.matchAll(/url:\s*"([^"]+)"/g)].map((m) => m[1]);
  check(urls.length >= 2, path + ": contains multiple external references");
  check(urls.every((url) => /^https:\/\//.test(url)), path + ": external references use HTTPS");
  check(!/historical past paper/i.test(source) || /not a historical/i.test(source), path + ": distinguishes supplementary sources from historical past papers");
  console.log(path + ": " + urls.length + " HTTPS source URLs checked");
}

const lessonUi = read("app/BiologyLesson.jsx");
const labels = [...lessonUi.matchAll(/label:"([^"]+)"/g)].map((m) => m[1]);
const expected = ["HOOK", "TEXTBOOK", "TEACHER", "EXAMPLE", "YOUR TURN", "COMMON MISTAKE", "TEXTBOOK ACTIVITY", "CHECKPOINT"];
check(JSON.stringify(labels) === JSON.stringify(expected), "Biology lesson flow matches the required eight-step sequence exactly");

const css = read("app/globals.css");
const hubRule = css.match(/\.hub-shell\s*\{([^}]*)\}/);
check(!!hubRule, "Subject hub has a dedicated style rule");
check(!!hubRule && !/gradient/i.test(hubRule[1]), "Subject hub background has no gradient");

const homepage = read("app/page.jsx");
check(homepage.includes("I spent over 70 hours making this website so y'all could study with ease"), "Homepage contains the approved exact intro copy");
check(homepage.includes("Study without") && homepage.includes("the AI slop."), "Homepage contains the approved exact headline");
check(homepage.includes("Built by Akshaj Pradhan"), "Homepage contains the approved footer attribution");

if (failures.length) {
  console.error("\nCONTENT QA FAILED (" + failures.length + " checks):");
  failures.forEach((failure) => console.error(" - " + failure));
  process.exitCode = 1;
} else {
  console.log("\nCONTENT QA PASSED (" + checks.length + " checks).");
}
