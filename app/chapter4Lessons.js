const chapter4Lessons = [
  {
    key: "linear", title: "Where are you?", section: "4.1.1 Describing position", pages: "49–50",
    hook: "Before we say where something is, we need a starting point.",
    textbook: "The textbook says to choose a fixed point first. Then describe how far away something is and in which direction. If its position changes over time, it is moving.",
    teacher: "Imagine the school gate is our starting point. “20 m away” is not enough: we need to say whether it is toward the school or toward the road. We can call one direction positive (+) and the other negative (−).",
    example: "If a runner is 60 m to the right of the start, write +60 m. If they are 20 m to the left, write −20 m.",
    interaction: { type: "choice", prompt: "A student sits 5 m east of the classroom and never moves. Relative to the classroom, what is true?", options: ["The student is in motion because time passes.", "The student is at rest because position is not changing.", "The student has zero position.", "Position cannot be described without speed."], answer: 1, explain: "Correct. The textbook defines rest relative to a reference point: the position does not change with time." },
    mistake: "Something can be at rest compared with one thing and moving compared with another. Always say what you are comparing it with.",
    checkpoint: { prompt: "What two things, besides the reference point, are needed to describe position?", answer: "Distance and direction." },
    sources: ["Chapter 4, §4.1.1, pp. 49–50"], externalReferences: [{ label: "Khan Academy: Motion (Class 9)", url: "https://www.khanacademy.org/science/in-in-class9th-physics-india/in-in-motion" }]
  },
  {
    key: "distance", title: "Distance vs displacement", section: "4.1.2 Distance travelled and displacement", pages: "50–51",
    hook: "The total path and your final position are two different things.",
    textbook: "In the textbook's runner example, the total distance is 160 m, but the displacement is 40 m forward. Distance counts the whole trip. Displacement tells us how far and which way the final position is from the start.",
    teacher: "Distance is the full length of the trip. Displacement is the straight change from where you started to where you finished, including direction. If you return to your start, displacement is zero even though you travelled.",
    example: "Walk 100 m east, then 60 m west. Distance = 160 m. Final position = 40 m east of the start, so displacement = +40 m.",
    interaction: { type: "numeric", prompt: "You walk 30 m east, then 10 m west. What are the distance and displacement?", answer: "Distance = 40 m; displacement = +20 m.", explain: "Distance counts both parts of the path. Displacement is the net change in position." },
    textbookActivity: "Textbook activity 4.1 asks you to track a ball thrown upward and falling back to O, then compare distance and displacement at several positions.",
    mistake: "Displacement is not just the path's shortest length. It tells you the change from start to finish and the direction.",
    checkpoint: { prompt: "Can displacement be zero while distance is not zero?", answer: "Yes. For example, after a complete out-and-back trip, the final and initial positions are the same." },
    sources: ["Chapter 4, §4.1.2, pp. 50–51; Activity 4.1, p. 51"], externalReferences: [{ label: "Khan Academy: Distance and displacement", url: "https://www.khanacademy.org/science/in-in-class9th-physics-india/in-in-motion" }, { label: "Khan Academy: Describing motion", url: "https://en.khanacademy.org/science/strengthened-shs-physics-1/x5eb5cea12d2cf683:descriptors-of-motion/a/describing-motion" }]
  },
  {
    key: "speed", title: "How fast are you moving?", section: "4.1.3 Average speed and average velocity", pages: "52–53",
    hook: "Speed tells you how fast you move. Velocity tells you how fast and in which direction.",
    textbook: "Average speed = total distance ÷ total time. Average velocity = displacement ÷ total time, including direction. In uniform motion, an object covers equal distances in equal time intervals.",
    teacher: "For speed, use distance. For velocity, use displacement. Both can be measured in m/s or km/h. If you turn around, the average speed and average velocity may be different.",
    example: "Sarang swims 25 m to the other end of a 25 m pool and returns in 50 s. Distance = 50 m, displacement = 0 m. So average speed = 1 m/s and average velocity = 0 m/s.",
    interaction: { type: "choice", prompt: "A runner completes a lap and returns exactly to the starting point. Which statement must be true for the whole lap?", options: ["Average speed is zero.", "Average velocity is zero.", "Distance is zero.", "Speed and velocity are always equal."], answer: 1, explain: "Correct. The displacement is zero because the runner finishes where they started, so average velocity is zero." },
    textbookActivity: "The chapter also connects the speed-distance-time idea to Aryabhatiya and a two-postmen problem from Ganitakaumudi.",
    mistake: "Average velocity is not the average of the speed readings. Use displacement ÷ time.",
    checkpoint: { prompt: "What is the formula for average velocity?", answer: "Average velocity = displacement ÷ time interval." },
    sources: ["Chapter 4, §4.1.3, pp. 52–53; Example 4.2, p. 53"], externalReferences: [{ label: "Khan Academy: Motion (Class 9)", url: "https://www.khanacademy.org/science/in-in-class9th-physics-india/in-in-motion" }]
  },
  {
    key: "acceleration", title: "Acceleration & gravity", section: "4.1.4 Average acceleration", pages: "54–56",
    hook: "Acceleration means velocity is changing. It does not just mean moving fast.",
    textbook: "Average acceleration = change in velocity ÷ time: a = (v − u)/t. If an object speeds up, acceleration points along its motion. If it slows down, acceleration points the other way.",
    teacher: "A fast bus has zero acceleration if its speed and direction stay the same. Acceleration also happens when direction changes, as it does on a circular track.",
    example: "A bus changes from 36 km/h to 54 km/h in 10 s. Convert first: 10 m/s to 15 m/s. Then a = (15 − 10)/10 = 0.5 m/s².",
    interaction: { type: "numeric", prompt: "A vehicle changes velocity from 8 m/s to 20 m/s in 4 s. What is its average acceleration?", answer: "3 m/s².", explain: "a = (20 − 8) ÷ 4 = 12 ÷ 4 = 3 m/s²." },
    textbookActivity: "Example 4.4 shows a dropped object gaining 9.8 m/s of velocity each second. The textbook identifies this constant acceleration as acceleration due to gravity, g = 9.8 m/s².",
    mistake: "Negative acceleration does not always mean slowing down. It depends on which direction you call positive and which way the object is moving.",
    checkpoint: { prompt: "What does acceleration actually measure?", answer: "How quickly velocity changes with time." },
    sources: ["Chapter 4, §4.1.4, pp. 54–56; Examples 4.3–4.4"], externalReferences: [{ label: "Khan Academy: Motion (Class 9)", url: "https://www.khanacademy.org/science/in-in-class9th-physics-india/in-in-motion" }]
  },
  {
    key: "graphs", title: "Read motion like a graph", section: "4.2 Graphical Representation of Motion", pages: "56–63",
    hook: "Graphs help us see how an object's motion changes over time.",
    textbook: "The textbook uses two main graphs: position vs time and velocity vs time. These graphs show how motion changes as time passes.",
    teacher: "On a position-time graph, the slope tells you velocity. On a velocity-time graph, the slope tells you acceleration. The area under a velocity-time graph tells you displacement.",
    example: "A position-time line rises 40 m over 2 s. Its slope is 20 m/s, so the average velocity over that interval is 20 m/s.",
    interaction: { type: "choice", prompt: "A position-time graph is a horizontal line at 40 m. What does it mean?", options: ["The object is accelerating.", "The object is moving at constant velocity.", "The object is at rest at 40 m.", "The object is moving backward."], answer: 2, explain: "Correct. Position is not changing with time, so the object is stationary at 40 m." },
    textbookActivity: "Activity 4.3 walks through choosing axes, choosing scales, plotting position-time data and connecting the points. Later activities use slope and area to extract physical quantities.",
    mistake: "A motion graph is not a map of the route. It shows how a value changes over time.",
    checkpoint: { prompt: "What does the slope of a velocity-time graph give?", answer: "Acceleration." },
    sources: ["Chapter 4, §4.2.1–4.2.3, pp. 57–63; Activities 4.3–4.4"], externalReferences: [{ label: "Khan Academy: Position-time graphs", url: "https://www.khanacademy.org/science/in-in-class9th-physics-india/in-in-motion" }, { label: "Khan Academy: Velocity-time graphs", url: "https://en.khanacademy.org/science/cambridge-o-level-physics-cie/x0e04e0cb682fb793:kinematics/x0e04e0cb682fb793:velocity-time-graphs/a/what-are-velocity-vs-time-graphs" }]
  },
  {
    key: "kinematics", title: "Kinematic equations", section: "4.3 Kinematic Equations for Motion in a Straight Line with Constant Acceleration", pages: "63–65",
    hook: "These three equations help solve motion problems when acceleration stays constant.",
    textbook: "When an object moves in a straight line with constant acceleration, we can use: v = u + at; s = ut + ½at²; and v² = u² + 2as. These connect starting speed, final speed, time, acceleration and displacement.",
    teacher: "First write down what you know and what you need to find. Choose the equation that uses those values. Check that acceleration is constant and that your units match.",
    example: "A car brakes with a = −4 m/s² from u = 15 m/s to v = 0. Using v² = u² + 2as gives 0 = 225 − 8s, so s = 28.125 m.",
    interaction: { type: "choice", prompt: "Which equation is the natural choice when you know u, v and a but need s?", options: ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "average speed = distance ÷ time"], answer: 2, explain: "Correct. v² = u² + 2as contains u, v, a and s without requiring t." },
    textbookActivity: "The chapter derives two primary equations from the velocity-time graph and derives v² = u² + 2as by eliminating time. It also gives two more derivations as a Journey Beyond exercise.",
    mistake: "Use these equations only when acceleration is constant. Keep your positive and negative signs consistent.",
    checkpoint: { prompt: "State the condition that must hold before you use the kinematic equations.", answer: "The acceleration must be constant." },
    sources: ["Chapter 4, §4.3, pp. 63–65; Example 4.8, p. 65"], externalReferences: [{ label: "Khan Academy: Motion and kinematic equations", url: "https://www.khanacademy.org/science/in-in-class9th-physics-india/in-in-motion" }]
  },
  {
    key: "circular", title: "When straight-line rules meet a circle", section: "4.4.1 Uniform circular motion", pages: "66–68",
    hook: "An object can move at the same speed and still accelerate.",
    textbook: "On a circle, the distance is the length of the path. After one full lap, distance is 2πR but displacement is zero because you end where you started. In uniform circular motion, speed stays the same but direction keeps changing.",
    teacher: "Velocity includes direction. A runner going around a track may keep the same speed, but keeps turning. Since direction changes, velocity changes too — so there is acceleration.",
    example: "For one revolution of radius R completed in time T, average speed is 2πR/T and average velocity is zero. In uniform circular motion, that constant speed is also the speed at every point.",
    interaction: { type: "choice", prompt: "A car travels around a circular track at constant speed. Is it accelerating?", options: ["No, because speed is constant.", "Yes, because the direction of velocity continuously changes.", "Only if its speed increases.", "Only after one full lap."], answer: 1, explain: "Correct. Acceleration depends on change in velocity, and velocity changes when direction changes." },
    textbookActivity: "Activity 4.5 uses a marble moving inside a ring. When the ring is lifted away, the marble moves in a straight line in the direction it was moving at that instant — along the tangent.",
    mistake: "Same speed does not mean same velocity if direction changes.",
    checkpoint: { prompt: "What changes continuously in uniform circular motion even though speed stays constant?", answer: "The direction of velocity." },
    sources: ["Chapter 4, §4.4–4.4.1, pp. 66–68; Activity 4.5"], externalReferences: [{ label: "Khan Academy: Uniform circular motion", url: "https://www.khanacademy.org/science/in-in-class9th-physics-india/in-in-motion" }]
  },
  {
    key: "applications", title: "Real problems & chapter mastery", section: "Revise, Reflect, Refine", pages: "65–71",
    hook: "Let's use what you've learned to solve real problems.",
    textbook: "The chapter applies motion concepts to braking distance, safe following distance, road travel, graph interpretation, circular motion and everyday measurements. Its revision set mixes distance/displacement, acceleration, graphs, kinematics and circular motion.",
    teacher: "For each problem: write down what you know, include units, choose the right formula, solve it, and check if your answer makes sense.",
    example: "The textbook’s braking example shows why speed matters: with the same braking acceleration, increasing initial velocity greatly increases stopping distance. It then connects this to safe following distance and driver reaction time.",
    interaction: { type: "numeric", prompt: "A bus travels at 36 km/h for 0.5 s before the driver reacts. How far does it travel during the reaction time?", answer: "5 m.", explain: "36 km/h = 10 m/s. Reaction distance = speed × time = 10 × 0.5 = 5 m." },
    textbookActivity: "The chapter ends with 16 mixed revision problems and Journey Beyond activities, including deriving additional equations, comparing graph scales, investigating vehicle braking factors, and using a smartphone accelerometer.",
    mistake: "Don't grab a formula straight away. First work out what the question is asking and what information you have.",
    checkpoint: { prompt: "Before solving a motion numerical, name one thing you should establish first.", answer: "A consistent reference direction/sign convention and the known quantities with units." },
    sources: ["Chapter 4, Example 4.8 and Bridging Science and Society, pp. 65; Revise, Reflect, Refine, pp. 68–70; The Journey Beyond, p. 71"], externalReferences: [{ label: "Khan Academy: Class 9 Motion practice", url: "https://www.khanacademy.org/science/in-in-class9th-physics-india/in-in-motion" }]
  }
];

export default chapter4Lessons;
