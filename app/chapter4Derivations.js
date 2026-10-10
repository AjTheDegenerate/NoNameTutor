const chapter4Derivations = [
  {
    "title": "1. First kinematic equation: v = u + at",
    "mode": "paper",
    "setup": "Constant acceleration; initial velocity u at t = 0 and final velocity v at time t.",
    "steps": [
      "Start with average acceleration: a = (v − u) / t.",
      "For constant acceleration, acceleration at each instant equals the average acceleration.",
      "Multiply by t: at = v − u.",
      "Rearrange: v = u + at."
    ],
    "result": "v = u + at",
    "graph": "On a velocity–time graph, the initial value is u and the slope is a. After time t, the velocity is v.",
    "graphType": "velocity-time-line"
  },
  {
    "title": "2. Second kinematic equation: s = ut + 1/2 at²",
    "mode": "graph",
    "setup": "Use the velocity–time graph for constant acceleration.",
    "steps": [
      "Displacement is the area under the velocity–time graph.",
      "Split the area into a rectangle of height u and width t, plus a triangle.",
      "Rectangle area = ut.",
      "Triangle height = v − u and base = t, so triangle area = 1/2 (v − u)t.",
      "Therefore s = ut + 1/2 (v − u)t.",
      "From v − u = at, substitute to obtain s = ut + 1/2 at²."
    ],
    "result": "s = ut + 1/2 at²",
    "graph": "The rectangle represents ut; the triangular area represents the extra displacement caused by the increase in velocity.",
    "graphType": "velocity-time-area"
  },
  {
    "title": "3. Third kinematic equation: v² = u² + 2as",
    "mode": "paper",
    "setup": "Eliminate time t using the first two kinematic equations. This algebraic route divides by a, so it is shown for a ≠ 0; the final relation also holds for a = 0 because then v = u.",
    "steps": [
      "From v = u + at, t = (v − u) / a.",
      "Start with s = ut + 1/2 at².",
      "Substitute into s = ut + ½at²: s = u(v − u)/a + ½a[(v − u)/a]².",
      "Simplify the second term: s = u(v − u)/a + (v − u)²/(2a).",
      "Put the terms over a common denominator: 2as = 2u(v − u) + (v − u)².",
      "Expand: 2as = 2uv − 2u² + v² − 2uv + u² = v² − u².",
      "Rearrange to obtain v² = u² + 2as."
    ],
    "result": "v² = u² + 2as",
    "graph": "The same constant-acceleration velocity–time graph underlies the derivation; this form is especially useful when time is not given.",
    "graphType": "velocity-time-line"
  },
  {
    "title": "4. Average velocity from a position–time graph",
    "mode": "graph",
    "setup": "Take two points (t₁, x₁) and (t₂, x₂) on a position–time graph.",
    "steps": [
      "Read the change in position: Δx = x₂ − x₁.",
      "Read the change in time: Δt = t₂ − t₁.",
      "Average velocity is change in position divided by change in time.",
      "Therefore v_avg = (x₂ − x₁)/(t₂ − t₁).",
      "Geometrically, this is the slope of the line joining the two points."
    ],
    "result": "v_avg = slope of the position–time line between the two points",
    "graph": "A steeper position–time line has a larger velocity magnitude; a horizontal line represents rest.",
    "graphType": "position-time-line"
  },
  {
    "title": "5. Average acceleration from a velocity–time graph",
    "mode": "graph",
    "setup": "Take two points (t₁, u) and (t₂, v) on a velocity–time graph.",
    "steps": [
      "Read the change in velocity: Δv = v − u.",
      "Read the change in time: Δt = t₂ − t₁.",
      "Average acceleration is change in velocity divided by change in time.",
      "Therefore a_avg = (v − u)/(t₂ − t₁).",
      "Geometrically, this is the slope of the line joining the two points."
    ],
    "result": "a_avg = slope of the velocity–time line between the two points",
    "graph": "Positive slope means velocity increases algebraically; negative slope means velocity decreases algebraically. Speed may increase or decrease depending on the sign of velocity.",
    "graphType": "velocity-time-line"
  },
  {
    "title": "6. Displacement from a velocity–time graph",
    "mode": "graph",
    "setup": "For a constant-velocity interval, the v–t graph is a rectangle; for constant acceleration, it can be split into a rectangle and triangle.",
    "steps": [
      "Displacement equals the area enclosed by the velocity–time graph and the time axis over the interval.",
      "For constant velocity: area = v × t.",
      "For constant acceleration: area = rectangle + triangle.",
      "Rectangle area = ut.",
      "Triangle area = 1/2 (v − u)t.",
      "So s = ut + 1/2 (v − u)t = ut + 1/2 at²."
    ],
    "result": "Displacement = signed area under the v–t graph",
    "graph": "Areas above and below the time axis follow the sign of velocity; the textbook examples use the geometric area for the selected interval.",
    "graphType": "velocity-time-area"
  },
  {
    "title": "7. Instantaneous velocity — textbook extension",
    "mode": "extension",
    "setup": "The chapter introduces instantaneous velocity as a higher-grade extension.",
    "steps": [
      "Average velocity is change in position divided by a finite time interval.",
      "Make the time interval around an instant progressively smaller.",
      "The average velocity approaches a fixed value.",
      "That limiting value is called instantaneous velocity."
    ],
    "result": "Instantaneous velocity is the limiting value of average velocity as the time interval becomes very small.",
    "graph": "In higher grades, this is represented by the slope of the tangent to a position–time curve. The supplied chapter explicitly says this treatment is learned in higher grades.",
    "graphType": "position-time-tangent"
  },
  {
    "title": "8. Derive s = vt − 1/2 at²",
    "mode": "paper",
    "setup": "Use constant acceleration and the final velocity v to express the displacement without initial velocity u.",
    "steps": [
      "Start with the first equation: v = u + at.",
      "Rearrange to get u = v − at.",
      "Substitute this into s = ut + 1/2 at²: s = (v − at)t + 1/2 at².",
      "Expand: s = vt − at² + 1/2 at².",
      "Combine the acceleration terms: s = vt − 1/2 at²."
    ],
    "result": "s = vt − 1/2 at²",
    "graph": "This equation also applies only to straight-line motion with constant acceleration; use signed quantities consistently.",
    "graphType": "velocity-time-area"
  },
  {
    "title": "9. Derive s = 1/2 (u + v)t",
    "mode": "graph",
    "setup": "Use the area of the trapezium under a velocity–time graph for straight-line motion with constant acceleration.",
    "steps": [
      "The velocity–time graph is a straight line from initial velocity u to final velocity v over time t.",
      "Displacement s is the area under this graph.",
      "Treat the region as a trapezium with parallel sides u and v and height t.",
      "Area of a trapezium = 1/2 × (sum of parallel sides) × height.",
      "Therefore s = 1/2 × (u + v) × t."
    ],
    "result": "s = 1/2 (u + v)t",
    "graph": "This form uses the average of initial and final velocities, which equals average velocity for constant acceleration.",
    "graphType": "velocity-time-area"
  }
];

export default chapter4Derivations;
