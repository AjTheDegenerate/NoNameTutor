const chapter4Lessons = [
  {
    key: "linear", title: "Where are you?", section: "4.1.1 Describing position", pages: "49–50",
    hook: "“Where?” is meaningless until we agree on where zero is.",
    textbook: "To describe position, the textbook starts with a fixed reference point and uses both distance and direction from that point. An object is in motion when its position relative to the reference point changes with time.",
    teacher: "Think of a school corridor. If the main gate is our origin, “20 m away” is incomplete: 20 m toward the school and 20 m toward the road are different positions. In a straight line we can choose one direction as positive and the opposite as negative.",
    example: "An athlete starts at O and is 60 m to the right. Her position can be represented as +60 m. If she moves 20 m left of O, her position is −20 m.",
    interaction: { type: "choice", prompt: "A student sits 5 m east of the classroom and never moves. Relative to the classroom, what is true?", options: ["The student is in motion because time passes.", "The student is at rest because position is not changing.", "The student has zero position.", "Position cannot be described without speed."], answer: 1, explain: "Correct. The textbook defines rest relative to a reference point: the position does not change with time." },
    mistake: "Motion and rest are relative to the chosen reference point. Do not treat “moving” or “at rest” as meaningful without saying what you are comparing the object with.",
    checkpoint: { prompt: "What two things, besides the reference point, are needed to describe position?", answer: "Distance and direction." },
    sources: ["Chapter 4, §4.1.1, pp. 49–50"]
  },
  {
    key: "distance", title: "Distance vs displacement", section: "4.1.2 Distance travelled and displacement", pages: "50–51",
    hook: "The path you travel and where you end up are not the same measurement.",
    textbook: "The textbook’s athlete travels from O to A and then back to B: total distance is 160 m, while the displacement is 40 m in the positive direction. It defines displacement as the net change in position between two instants.",
    teacher: "Distance adds up the actual path. Displacement compares the final position with the initial position and keeps direction. That is why displacement can be zero even when an object has travelled a long way.",
    example: "Walk 100 m east, then 60 m west. Distance = 160 m. Final position = 40 m east of the start, so displacement = +40 m.",
    interaction: { type: "numeric", prompt: "You walk 30 m east, then 10 m west. What are the distance and displacement?", answer: "Distance = 40 m; displacement = +20 m.", explain: "Distance counts both parts of the path. Displacement is the net change in position." },
    textbookActivity: "Textbook activity 4.1 asks you to track a ball thrown upward and falling back to O, then compare distance and displacement at several positions.",
    mistake: "Do not say displacement is simply “the shortest distance”. Its complete description includes magnitude and direction; it is the net change in position.",
    checkpoint: { prompt: "Can displacement be zero while distance is not zero?", answer: "Yes. For example, after a complete out-and-back trip, the final and initial positions are the same." },
    sources: ["Chapter 4, §4.1.2, pp. 50–51; Activity 4.1, p. 51"]
  },
  {
    key: "speed", title: "How fast are you moving?", section: "4.1.3 Average speed and average velocity", pages: "52–53",
    hook: "Speed tells you how much ground you covered. Velocity also tells you which way your position changed.",
    textbook: "Average speed is total distance travelled divided by the time interval. Average velocity is displacement divided by the time interval and therefore requires direction. Uniform motion means equal distances in equal time intervals.",
    teacher: "Use distance for speed and displacement for velocity. The units are m/s (or km/h). If an object turns around, speed and the magnitude of average velocity can differ.",
    example: "Sarang swims 25 m to the other end of a 25 m pool and returns in 50 s. Distance = 50 m, displacement = 0 m. So average speed = 1 m/s and average velocity = 0 m/s.",
    interaction: { type: "choice", prompt: "A runner completes a lap and returns exactly to the starting point. Which statement must be true for the whole lap?", options: ["Average speed is zero.", "Average velocity is zero.", "Distance is zero.", "Speed and velocity are always equal."], answer: 1, explain: "Correct. The displacement is zero because the runner finishes where they started, so average velocity is zero." },
    textbookActivity: "The chapter also connects the speed-distance-time idea to Aryabhatiya and a two-postmen problem from Ganitakaumudi.",
    mistake: "Average velocity is not “average of the speeds”. Use displacement ÷ time interval.",
    checkpoint: { prompt: "What is the formula for average velocity?", answer: "Average velocity = displacement ÷ time interval." },
    sources: ["Chapter 4, §4.1.3, pp. 52–53; Example 4.2, p. 53"]
  },
  {
    key: "acceleration", title: "Acceleration & gravity", section: "4.1.4 Average acceleration", pages: "54–56",
    hook: "Acceleration is about changing velocity — not simply being fast.",
    textbook: "Average acceleration is the change in velocity divided by the time interval: a = (v − u)/t. The chapter explains that speeding up gives acceleration in the direction of velocity, while slowing down gives acceleration opposite to velocity.",
    teacher: "A bus can be travelling quickly and still have zero acceleration if its velocity stays constant. Acceleration can also appear because velocity changes direction, which becomes important later in circular motion.",
    example: "A bus changes from 36 km/h to 54 km/h in 10 s. Convert first: 10 m/s to 15 m/s. Then a = (15 − 10)/10 = 0.5 m/s².",
    interaction: { type: "numeric", prompt: "A vehicle changes velocity from 8 m/s to 20 m/s in 4 s. What is its average acceleration?", answer: "3 m/s².", explain: "a = (20 − 8) ÷ 4 = 12 ÷ 4 = 3 m/s²." },
    textbookActivity: "Example 4.4 shows a dropped object gaining 9.8 m/s of velocity each second. The textbook identifies this constant acceleration as acceleration due to gravity, g = 9.8 m/s².",
    mistake: "A negative acceleration does not automatically mean “slowing down”. The sign depends on your chosen positive direction and the velocity direction.",
    checkpoint: { prompt: "What does acceleration actually measure?", answer: "How quickly velocity changes with time." },
    sources: ["Chapter 4, §4.1.4, pp. 54–56; Examples 4.3–4.4"]
  },
  {
    key: "graphs", title: "Read motion like a graph", section: "4.2 Graphical Representation of Motion", pages: "56–63",
    hook: "A motion graph turns a story about movement into something you can see.",
    textbook: "The chapter uses position-time and velocity-time graphs to represent how motion changes with time. For the straight-line, one-direction cases used here, distance and displacement magnitude are equal, as are speed and velocity magnitude.",
    teacher: "On a position-time graph, ask “how quickly is position changing?” That is the slope, so slope gives velocity. On a velocity-time graph, slope gives acceleration. The area under a velocity-time graph gives displacement.",
    example: "A position-time line rises 40 m over 2 s. Its slope is 20 m/s, so the average velocity over that interval is 20 m/s.",
    interaction: { type: "choice", prompt: "A position-time graph is a horizontal line at 40 m. What does it mean?", options: ["The object is accelerating.", "The object is moving at constant velocity.", "The object is at rest at 40 m.", "The object is moving backward."], answer: 2, explain: "Correct. Position is not changing with time, so the object is stationary at 40 m." },
    textbookActivity: "Activity 4.3 walks through choosing axes, choosing scales, plotting position-time data and connecting the points. Later activities use slope and area to extract physical quantities.",
    mistake: "A graph is not a route map. The textbook explicitly warns that it shows how a quantity changes with another quantity, not the physical path taken.",
    checkpoint: { prompt: "What does the slope of a velocity-time graph give?", answer: "Acceleration." },
    sources: ["Chapter 4, §4.2.1–4.2.3, pp. 57–63; Activities 4.3–4.4"]
  },
  {
    key: "kinematics", title: "Kinematic equations", section: "4.3 Kinematic Equations for Motion in a Straight Line with Constant Acceleration", pages: "63–65",
    hook: "Three equations let you predict motion — but only under the right condition.",
    textbook: "For straight-line motion with constant acceleration, the textbook derives the kinematic equations: v = u + at; s = ut + ½at²; and v² = u² + 2as. The equations relate displacement, time, initial velocity, final velocity and acceleration.",
    teacher: "Before choosing an equation, list what you know and what you need. Then choose an equation containing those quantities. Most mistakes here come from using an equation without checking whether acceleration is constant or from mixing units.",
    example: "A car brakes with a = −4 m/s² from u = 15 m/s to v = 0. Using v² = u² + 2as gives 0 = 225 − 8s, so s = 28.125 m.",
    interaction: { type: "choice", prompt: "Which equation is the natural choice when you know u, v and a but need s?", options: ["v = u + at", "s = ut + ½at²", "v² = u² + 2as", "average speed = distance ÷ time"], answer: 2, explain: "Correct. v² = u² + 2as contains u, v, a and s without requiring t." },
    textbookActivity: "The chapter derives two primary equations from the velocity-time graph and derives v² = u² + 2as by eliminating time. It also gives two more derivations as a Journey Beyond exercise.",
    mistake: "These equations are valid only for constant acceleration. Also keep the signs of u, v, a and s consistent with the chosen direction.",
    checkpoint: { prompt: "State the condition that must hold before you use the kinematic equations.", answer: "The acceleration must be constant." },
    sources: ["Chapter 4, §4.3, pp. 63–65; Example 4.8, p. 65"]
  },
  {
    key: "circular", title: "When straight-line rules meet a circle", section: "4.4.1 Uniform circular motion", pages: "66–68",
    hook: "An object can keep the same speed and still be accelerating.",
    textbook: "In circular motion, the distance travelled around the path and the straight-line displacement are different. After one complete revolution, distance is 2πR while displacement is zero. In uniform circular motion, speed is constant but the direction of velocity changes continuously.",
    teacher: "Velocity includes direction. Imagine a runner on a circular track: even if their speedometer never changes, their velocity direction is changing at every point. Therefore acceleration is non-zero.",
    example: "For one revolution of radius R completed in time T, average speed is 2πR/T and average velocity is zero. In uniform circular motion, that constant speed is also the speed at every point.",
    interaction: { type: "choice", prompt: "A car travels around a circular track at constant speed. Is it accelerating?", options: ["No, because speed is constant.", "Yes, because the direction of velocity continuously changes.", "Only if its speed increases.", "Only after one full lap."], answer: 1, explain: "Correct. Acceleration depends on change in velocity, and velocity changes when direction changes." },
    textbookActivity: "Activity 4.5 uses a marble moving inside a ring. When the ring is lifted away, the marble moves in a straight line in the direction it was moving at that instant — along the tangent.",
    mistake: "Constant speed does not mean constant velocity when direction changes.",
    checkpoint: { prompt: "What changes continuously in uniform circular motion even though speed stays constant?", answer: "The direction of velocity." },
    sources: ["Chapter 4, §4.4–4.4.1, pp. 66–68; Activity 4.5"]
  },
  {
    key: "applications", title: "Real problems & chapter mastery", section: "Revise, Reflect, Refine", pages: "65–71",
    hook: "Now the ideas have to survive outside the lesson card.",
    textbook: "The chapter applies motion concepts to braking distance, safe following distance, road travel, graph interpretation, circular motion and everyday measurements. Its revision set mixes distance/displacement, acceleration, graphs, kinematics and circular motion.",
    teacher: "Use a repeatable problem-solving routine: identify the reference point and direction, write known values with units, choose the relevant definition/equation, calculate, then check whether the sign and magnitude make physical sense.",
    example: "The textbook’s braking example shows why speed matters: with the same braking acceleration, increasing initial velocity greatly increases stopping distance. It then connects this to safe following distance and driver reaction time.",
    interaction: { type: "numeric", prompt: "A bus travels at 36 km/h for 0.5 s before the driver reacts. How far does it travel during the reaction time?", answer: "5 m.", explain: "36 km/h = 10 m/s. Reaction distance = speed × time = 10 × 0.5 = 5 m." },
    textbookActivity: "The chapter ends with 16 mixed revision problems and Journey Beyond activities, including deriving additional equations, comparing graph scales, investigating vehicle braking factors, and using a smartphone accelerometer.",
    mistake: "Do not jump straight to a formula. First identify the physical quantity being asked for and the conditions of the problem.",
    checkpoint: { prompt: "Before solving a motion numerical, name one thing you should establish first.", answer: "A consistent reference direction/sign convention and the known quantities with units." },
    sources: ["Chapter 4, Example 4.8 and Bridging Science and Society, pp. 65; Revise, Reflect, Refine, pp. 68–70; The Journey Beyond, p. 71"]
  }
];

export default chapter4Lessons;
