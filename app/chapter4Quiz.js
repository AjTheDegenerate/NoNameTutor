const chapter4Quiz = [
  {
    question: "What is linear motion?",
    options: ["Motion along a straight line", "Motion along a circular path only", "Motion that repeats at equal intervals", "Motion with zero displacement in every case"],
    answerIndex: 0,
    explanation: "Linear motion is motion along a straight line."
  },
  {
    question: "Which two details are needed to describe an object's position relative to a reference point in this chapter?",
    options: ["Mass and time", "Distance and direction", "Speed and acceleration", "Force and displacement"],
    answerIndex: 1,
    explanation: "Position is described by how far and in which direction the object is from the reference point."
  },
  {
    question: "When is an object in motion relative to a reference point?",
    options: ["Whenever it has mass", "Only when its speed is increasing", "When its position changes with time relative to that reference", "Only when it moves in a circle"],
    answerIndex: 2,
    explanation: "Motion is determined by whether position changes with time relative to the chosen reference point."
  },
  {
    question: "Which statement correctly distinguishes distance from displacement?",
    options: ["Distance includes direction; displacement never does", "They are always equal", "Displacement is the whole route length", "Distance is total path length; displacement is the net change in position"],
    answerIndex: 3,
    explanation: "Distance adds the whole path, while displacement compares initial and final positions and includes direction."
  },
  {
    question: "When does distance equal the magnitude of displacement for a straight-line journey?",
    options: ["When the object moves in one direction without turning back", "Whenever the object moves for more than one second", "Only when the object returns to its start", "Only when the speed is zero"],
    answerIndex: 0,
    explanation: "If the object does not reverse direction, the path length equals the straight-line separation of the endpoints."
  },
  {
    question: "A ball rises 40 cm from point O and returns to O. What are its total distance and displacement magnitude?",
    options: ["Distance 40 cm; displacement 40 cm", "Distance 80 cm; displacement 0 cm", "Distance 0 cm; displacement 80 cm", "Distance 80 cm; displacement 80 cm"],
    answerIndex: 1,
    explanation: "It travels 40 cm up and 40 cm down, but its final position is its starting position."
  },
  {
    question: "Which statement about displacement is always true?",
    options: ["Displacement is always positive", "Displacement is always equal to distance", "The magnitude of displacement is no greater than distance", "Displacement is measured in metres per second"],
    answerIndex: 2,
    explanation: "The straight-line separation between endpoints cannot exceed the length of the path travelled."
  },
  {
    question: "How is average speed calculated?",
    options: ["Total time divided by total distance", "Displacement divided by time", "Final speed minus initial speed", "Total distance divided by total time"],
    answerIndex: 3,
    explanation: "Average speed = total distance travelled ÷ total time interval."
  },
  {
    question: "Unequal distances covered in equal time intervals indicate which type of motion?",
    options: ["Non-uniform motion", "Uniform motion in every case", "Rest", "Zero acceleration in every case"],
    answerIndex: 0,
    explanation: "In uniform motion, equal distances are covered in equal time intervals; unequal distances indicate non-uniform motion."
  },
  {
    question: "Two postmen are 210 yojanas apart and walk towards each other at 9 and 5 yojanas per day. When will they meet?",
    options: ["10 days", "15 days", "21 days", "35 days"],
    answerIndex: 1,
    explanation: "Their closing speed is 9 + 5 = 14 yojanas/day, so time = 210 ÷ 14 = 15 days."
  },
  {
    question: "How is average velocity calculated?",
    options: ["Total distance divided by total time", "Speed multiplied by time", "Displacement divided by the time interval", "Change in speed divided by distance"],
    answerIndex: 2,
    explanation: "Average velocity = displacement ÷ time interval, including the sign/direction of displacement."
  },
  {
    question: "Sarang swims 25 m to the other end of a pool and 25 m back in 50 s. What are average speed and average velocity?",
    options: ["0 m/s and 1 m/s", "0.5 m/s and 0.5 m/s", "2 m/s and 1 m/s", "1 m/s and 0 m/s"],
    answerIndex: 3,
    explanation: "Distance = 50 m, so average speed = 50/50 = 1 m/s. Net displacement is zero, so average velocity is zero."
  },
  {
    question: "When can average velocity be zero while average speed is non-zero?",
    options: ["When an object returns to its starting point after travelling a non-zero distance", "Only when the object never moves", "Whenever the object moves at constant speed in a straight line", "Only when time is zero"],
    answerIndex: 0,
    explanation: "A round trip has non-zero distance but zero net displacement."
  },
  {
    question: "Which expression gives average acceleration over a time interval?",
    options: ["a = distance ÷ time", "a = (v − u) ÷ (t₂ − t₁)", "a = displacement ÷ time", "a = (v + u) × time"],
    answerIndex: 1,
    explanation: "Average acceleration is change in velocity divided by the elapsed time."
  },
  {
    question: "If a vehicle is slowing down while moving in a chosen positive direction, what is true of its acceleration?",
    options: ["It must be zero", "It must be positive", "It is directed opposite to its velocity", "It is always equal to its speed"],
    answerIndex: 2,
    explanation: "For motion in a positive direction, slowing down means velocity decreases, so acceleration is negative and opposite to velocity."
  },
  {
    question: "A bus speeds up from 36 km/h (10 m/s) to 54 km/h (15 m/s) in 10 s. What is its average acceleration?",
    options: ["5 m/s²", "2.5 m/s²", "−0.5 m/s²", "0.5 m/s²"],
    answerIndex: 3,
    explanation: "a = (15 − 10)/10 = 0.5 m/s²."
  },
  {
    question: "A bus moving at 54 km/h (15 m/s) comes to rest in 5 s. What is its average acceleration?",
    options: ["−3 m/s²", "3 m/s²", "−15 m/s²", "0 m/s²"],
    answerIndex: 0,
    explanation: "a = (0 − 15)/5 = −3 m/s². The negative sign indicates acceleration opposite to the chosen positive direction."
  },
  {
    question: "What is the approximate magnitude of acceleration due to gravity near Earth's surface used in the chapter?",
    options: ["0.98 m/s²", "9.8 m/s²", "98 m/s²", "9.8 m/s"],
    answerIndex: 1,
    explanation: "The chapter uses g ≈ 9.8 m/s²; direction is downward near Earth's surface."
  },
  {
    question: "What does a vehicle's speedometer approximately show at a given instant?",
    options: ["Average velocity over the whole trip", "Displacement since starting", "The magnitude of its instantaneous velocity (speed)", "Its acceleration"],
    answerIndex: 2,
    explanation: "A speedometer gives the vehicle's speed at that instant, not its direction."
  },
  {
    question: "What does a horizontal position–time graph represent?",
    options: ["Constant positive acceleration", "Constant non-zero velocity", "An object moving faster each second", "An object at rest relative to the chosen reference point"],
    answerIndex: 3,
    explanation: "A horizontal position–time graph means position does not change as time passes, so its slope and velocity are zero."
  },
  {
    question: "What does the slope of a position–time graph represent?",
    options: ["Velocity over the interval represented by the slope", "Acceleration in every case", "Displacement multiplied by time", "The object's mass"],
    answerIndex: 0,
    explanation: "Slope = change in position ÷ change in time, which gives average velocity between two points; a local tangent interpretation is an extension."
  },
  {
    question: "What does a curved position–time graph generally indicate in this chapter's examples?",
    options: ["The object is necessarily at rest", "Velocity is changing with time", "Position is always zero", "The object's speed must be infinite"],
    answerIndex: 1,
    explanation: "A changing slope means velocity changes with time, so the motion is accelerated."
  },
  {
    question: "What physical quantity is represented by the slope of a velocity–time graph?",
    options: ["Distance", "Average speed", "Acceleration", "Position"],
    answerIndex: 2,
    explanation: "Slope = change in velocity ÷ change in time = acceleration."
  },
  {
    question: "How can displacement be obtained from a velocity–time graph?",
    options: ["By reading only the highest velocity", "By calculating the graph's slope only", "By adding the time-axis values", "By finding the signed area between the graph and the time axis"],
    answerIndex: 3,
    explanation: "Area above the time axis contributes positive displacement; area below it contributes negative displacement."
  },
  {
    question: "Which kinematic equation relates u, v, a and s without using time?",
    options: ["v² = u² + 2as", "v = u + at", "s = ut + ½at²", "a = s/t"],
    answerIndex: 0,
    explanation: "v² = u² + 2as eliminates time and applies to straight-line motion with constant acceleration."
  },
  {
    question: "After one complete revolution around a circle of radius R, what are distance travelled and net displacement?",
    options: ["Distance 0; displacement 2πR", "Distance 2πR; displacement 0", "Distance πR; displacement R", "Distance and displacement both equal 2πR"],
    answerIndex: 1,
    explanation: "The path length is the circumference 2πR, but the final position equals the initial position."
  },
  {
    question: "For uniform circular motion of radius R and period T, what is the speed?",
    options: ["R/T", "2πT/R", "2πR/T", "T/(2πR)"],
    answerIndex: 2,
    explanation: "One revolution covers 2πR in time T, so speed = distance/time = 2πR/T."
  },
  {
    question: "Why is uniform circular motion accelerated even when speed stays constant?",
    options: ["Because the radius must increase", "Because the object stops at each point", "Because its distance travelled becomes zero", "Because the direction of velocity changes continuously"],
    answerIndex: 3,
    explanation: "Velocity includes direction. A continuous change in direction means velocity changes, so acceleration is non-zero."
  }
];

export default chapter4Quiz;
