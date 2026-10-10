const chapter4Formulas = [
  {
    topic: "Position, distance & displacement",
    numeric: [
      ["Displacement", "Δx = x₂ − x₁", "Change in position. SI unit: m."],
      ["Distance", "total distance = sum of path lengths", "Total length of the path travelled. SI unit: m."],
      ["Signed position", "x = +d or x = −d", "Choose a positive direction first. Use +d on the positive side of the origin and −d on the opposite side; position is not found by adding a direction to a distance."]
    ],
    graphical: [
      ["Position–time graph", "average velocity = Δposition / Δtime", "Slope of a straight segment gives average velocity."],
      ["Stationary object", "slope = 0", "A horizontal position–time line means position is not changing with time."]
    ],
    use: "Use these when the question gives positions, path lengths, directions, or a position–time graph."
  },
  {
    topic: "Speed & velocity",
    numeric: [
      ["Average speed", "average speed = total distance / time interval", "Scalar quantity. SI unit: m/s."],
      ["Average velocity", "average velocity = displacement / time interval", "Vector quantity. Direction follows the displacement."],
      ["Speed conversion", "1 km/h = 5/18 m/s", "For km/h → m/s, multiply by 5/18. For m/s → km/h, multiply by 18/5."]
    ],
    graphical: [
      ["Position–time slope", "v_avg = (x₂ − x₁) / (t₂ − t₁)", "The slope between two points gives average velocity."],
      ["Steeper position–time line", "|slope| larger → |velocity| larger", "For the same time interval, the steeper line represents greater velocity magnitude."]
    ],
    use: "Check whether the problem asks for path length (speed) or net change in position (velocity)."
  },
  {
    topic: "Average acceleration",
    numeric: [
      ["Average acceleration", "a = (v − u) / (t₂ − t₁)", "Change in velocity divided by the time interval. SI unit: m/s²."],
      ["Special case from rest", "a = v / t", "Only when the initial velocity u = 0."],
      ["Direction", "sign of a follows the chosen direction convention", "A negative value can indicate acceleration opposite to the chosen positive direction."]
    ],
    graphical: [
      ["Velocity–time slope", "a_avg = Δv / Δt", "Slope of a velocity–time graph gives average acceleration."],
      ["Horizontal v–t line", "slope = 0 → a = 0", "Constant velocity means zero acceleration in this straight-line motion case."]
    ],
    use: "For a v–t graph, calculate rise/run. Keep the sign; do not replace acceleration with speed."
  },
  {
    topic: "Velocity–time graph",
    numeric: [
      ["Displacement from graph", "displacement = area between v–t graph and time axis", "Use geometric areas such as rectangles and triangles for the textbook's straight-line graphs."],
      ["Rectangle area", "A = v × Δt", "For constant velocity over the interval."],
      ["Triangle area", "A = 1/2 × base × height", "Useful for a velocity changing uniformly from zero or when decomposing the graph."]
    ],
    graphical: [
      ["Constant velocity", "horizontal v–t line", "Velocity is constant; slope is zero."],
      ["Increasing velocity", "straight line with positive slope", "Constant positive acceleration when the slope is constant."],
      ["Negative slope", "negative acceleration in the chosen sign convention", "Whether speed increases or decreases depends on the sign of velocity; negative acceleration does not always mean slowing down."],
      ["Area under v–t", "area = displacement", "The signed area over the chosen time interval gives displacement."]
    ],
    use: "For graphical numericals, first read the axes and time interval, then calculate slope or area."
  },
  {
    topic: "Kinematic equations",
    condition: "Valid in this chapter for straight-line motion with constant acceleration.",
    numeric: [
      ["First equation", "v = u + at", "Use when u, a, t and v are related."],
      ["Second equation", "s = ut + 1/2 at²", "Use when displacement, time and acceleration are involved."],
      ["Third equation", "v² = u² + 2as", "Useful when time is not given or is not needed."],
      ["Average velocity for constant acceleration", "s = ((u + v)/2)t", "Follows from the area/average-velocity idea for constant acceleration."],
      ["Displacement using final velocity", "s = vt − 1/2 at²", "Derived by substituting u = v − at into s = ut + 1/2 at². Use signed quantities consistently."],
      ["Displacement using average velocity", "s = 1/2 (u + v)t", "For constant acceleration, average velocity is (u + v)/2; multiplying by time gives displacement."]
    ],
    graphical: [
      ["v–t graph intercept", "initial velocity = u", "At t = 0, the graph starts at u."],
      ["v–t graph slope", "slope = a", "For constant acceleration, the graph is a straight line."],
      ["v–t graph area", "area = s", "Rectangle + triangle gives the displacement used to obtain the second kinematic equation."]
    ],
    use: "Choose the equation that contains the known quantities and the unknown you need."
  },
  {
    topic: "Gravity / free fall",
    numeric: [
      ["Acceleration due to gravity", "g ≈ 9.8 m/s²", "The chapter uses 9.8 m/s² for free-fall examples."],
      ["Free-fall substitution", "a = g", "For an object falling under gravity, use the acceleration due to gravity with the chosen sign convention."]
    ],
    graphical: [
      ["Velocity–time under constant g", "straight line with slope ±g", "The sign depends on the chosen positive direction."]
    ],
    use: "Always define the positive direction before substituting g into a kinematic equation."
  },
  {
    topic: "Uniform circular motion",
    numeric: [
      ["Average speed for one revolution", "v_avg = 2πR / T", "One revolution covers circumference 2πR in time T. For uniform circular motion, this average speed equals the constant speed."],
      ["Distance and displacement after one revolution", "distance = 2πR; displacement = 0", "The path length is the circumference; the final position is the starting position."],
      ["Speed", "speed = constant", "Uniform circular motion has constant speed."],
      ["Velocity direction", "velocity is tangent to the circle", "The chapter states that velocity at a point is along the tangent in the direction of motion."]
    ],
    graphical: [
      ["Circular path", "constant speed + changing direction", "Even with constant speed, velocity changes because its direction continuously changes."],
      ["Tangent", "velocity direction = tangent at the point", "A tangent meets the circle at one point in the textbook's discussion."]
    ],
    use: "Do not say acceleration is zero just because the speedometer reading is constant; velocity can change by direction."
  }
];

export default chapter4Formulas;
