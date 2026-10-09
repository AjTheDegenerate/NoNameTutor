const chapter7Derivations = [
{title:"1. Kinetic energy from work and motion",mode:"paper",setup:"Derive the kinetic-energy expression for an object of mass m moving at speed v, using the constant-force assumption in the chapter.",steps:[
"Start with the kinematic equation v² = u² + 2as.",
"Rearrange: s = (v² − u²)/(2a).",
"Work done by the constant force is W = F × s.",
"Use Newton's second law F = ma: W = ma × s.",
"Substitute s: W = ma × (v² − u²)/(2a).",
"Cancel a: W = ½m(v² − u²).",
"If the object starts from rest, u = 0, so the gained kinetic energy is K = ½mv²."
],result:"K = ½mv²; ΔK = ½m(v² − u²)",graph:"Positive work that increases speed increases kinetic energy; negative work that reduces speed decreases it."},
{title:"2. Gravitational potential energy near Earth",mode:"paper",setup:"Find the potential energy gained by raising an object slowly through vertical height h near Earth's surface.",steps:[
"Take the ground as the zero potential-energy reference.",
"The upward force for slow lifting is equal to the weight mg in the chapter's setup.",
"Work done by the applied force is W = force × displacement.",
"Substitute force mg and vertical displacement h: W = mg × h.",
"By the work–energy theorem, the work appears as a change in potential energy."
],result:"U = mgh",graph:"At fixed m and g, raising the object farther increases U in direct proportion to height."},
{title:"3. Work as the area under an F–s graph",mode:"graph",setup:"Interpret the force–displacement graph shown in the textbook.",steps:[
"Read force on the vertical axis and displacement on the horizontal axis.",
"For a constant force, the plotted region is a rectangle.",
"Rectangle area is height × width = force × displacement.",
"The chapter defines that product as work done by the force.",
"For a varying force, use the area under the graph between the positions."
],result:"W = area under the F–s graph",graph:"The chapter's 10 N over 1 m rectangle gives area 10 J."},
{title:"4. Mechanical energy during ideal free fall",mode:"graph",setup:"Show how the mechanical-energy sum stays constant in the chapter's gravity-only model.",steps:[
"At height h from rest, U = mgh and K = 0.",
"After falling to height h′, U = mgh′.",
"Use v = gt and h′ = h − ½gt² for the source's ideal free-fall setup.",
"Then K = ½mv² = ½m(gt)² = ½mg²t².",
"Adding U + K cancels the decrease in potential energy with the increase in kinetic energy."
],result:"K + U = mgh (constant in the ideal model)",graph:"Potential energy decreases while kinetic energy increases; friction and air resistance make a real pendulum lose mechanical energy."},
{title:"5. Speed at the bottom after a frictionless drop",mode:"paper",setup:"Derive the bottom speed for an object dropped from height h, neglecting friction as in the chapter's slide example.",steps:[
"At the top, take speed zero: K₁ = 0 and U₁ = mgh.",
"At the bottom, take U₂ = 0 and K₂ = ½mv².",
"Use conservation of mechanical energy for the ideal setup: mgh = ½mv².",
"Cancel mass m from both sides.",
"Rearrange to obtain the speed."
],result:"v = √(2gh)",graph:"The ideal result depends on height h, not on the mass or path shape, under the conditions stated in the chapter."},
{title:"6. Mechanical advantage of an inclined plane",mode:"paper",setup:"Derive MA = L/h for the smooth ramp described in Section 7.6.2.",steps:[
"Let the load be mg and the effort along ramp be F′.",
"The distance along the ramp is L; vertical height is h.",
"Work supplied along the ramp is F′L.",
"Potential energy gained is mgh; ignoring friction, F′L = mgh.",
"Rearrange: mg/F′ = L/h.",
"Since mg is the load and F′ is effort, MA = load/effort = L/h."
],result:"MA = L/h",graph:"Increasing ramp length for the same height lowers required effort and increases mechanical advantage."},
{title:"7. The law of the lever",mode:"paper",setup:"Use the coin-pan activity and the balance condition around the fulcrum.",steps:[
"At balance, the effort-side moment in this simple model matches the load-side moment.",
"The chapter expresses this as number of effort coins × effort arm = number of load coins × load arm.",
"For forces, this is effort × effort arm = load × load arm.",
"Divide both sides by effort and load arm as needed to find the missing value.",
"Mechanical advantage then follows from load/effort = effort arm/load arm."
],result:"F₁d₁ = F₂d₂; MA = effort arm/load arm",graph:"A longer effort arm can balance a larger load at a shorter load arm."},
{title:"8. Power required to lift a mass",mode:"paper",setup:"Derive the average power for slowly lifting a mass m through height h in time t.",steps:[
"Work done against gravity in the chapter's lifting model is W = mgh.",
"Average power is work divided by time.",
"Substitute the lifting work into P = W/t.",
"Keep mass in kg, g in m/s², height in m and time in s."
],result:"P = mgh/t",graph:"For the same lifting work, taking less time requires greater average power."},
{title:"9. From speed change to power in the car example",mode:"paper",setup:"Follow the method used in Example 7.11 for a car starting from rest.",steps:[
"Convert the final speed to m/s.",
"Calculate the kinetic-energy change: ΔK = ½m(v² − u²).",
"For a start from rest, u = 0, so ΔK = ½mv².",
"Treat the engine's work in the source example as the gained kinetic energy.",
"Divide work by the time interval to find average power."
],result:"P = ΔK/t",graph:"The example finds work from kinetic-energy change first, then finds the average rate of doing work."}
];
export default chapter7Derivations;