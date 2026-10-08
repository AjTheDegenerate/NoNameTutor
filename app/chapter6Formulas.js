const chapter6Formulas = [
{topic:"Force & net force",numeric:[
["Same-direction forces","F_net = F1 + F2","Add magnitudes when forces point in the same direction."],
["Opposite forces","F_net = |F1 − F2|","The net direction follows the larger force."],
["Balanced forces","F_net = 0","Equal and opposite forces give zero net force."]
],graphical:[
["Force balance sketch","opposing vectors of equal length → net 0","Balanced forces can exist even while the object is moving at constant velocity."],
["Force comparison","larger vector − smaller vector","For opposite forces, the longer vector sets the net direction."]
],use:"Start here whenever several one-dimensional forces act on an object."},
{topic:"Newton's First Law & graphs",numeric:[
["Zero net force","F_net = 0","Then acceleration is zero and velocity remains unchanged."],
["Acceleration consequence","a = 0","For a net-force-free object in this chapter."]
],graphical:[
["Rest: position-time","horizontal x-t line","Position stays constant."],
["Rest: velocity-time","v = 0 horizontal line","Velocity remains zero."],
["Constant velocity: position-time","straight line with constant slope","Constant slope corresponds to constant velocity."],
["Constant velocity: velocity-time","horizontal line at v = constant","Zero slope means zero acceleration."]
],use:"Use when the question describes no net force, rest or uniform motion."},
{topic:"Newton's Second Law",numeric:[
["Core equation","F_net = ma","F is net force in the chapter's second-law calculations."],
["Acceleration","a = F_net / m","Use when force and mass are known."],
["Mass","m = F_net / a","Rearrangement for missing mass."],
["Force","F_net = ma","Direction of acceleration matches net-force direction."]
],graphical:[
["v-t to acceleration","a = Δv/Δt","Slope of a velocity-time graph gives acceleration."],
["v-t to force","F = m(Δv/Δt)","For a known mass, graph slope becomes force after multiplying by mass."]
],use:"Use after identifying the net force and mass."},
{topic:"Units & newton",numeric:[
["One newton","1 N = 1 kg m s⁻²","The SI force unit follows from F=ma."],
["Force unit check","kg × m s⁻² = N","Use this to verify numerical unit consistency."]
],graphical:[
["Unit sanity check","mass axis × acceleration axis → force","Useful when interpreting experimental relationships."]
],use:"Check every F=ma calculation before accepting the final number."},
{topic:"Gravity & weight",numeric:[
["Weight / gravitational force","F = mg","Near Earth's surface, use g ≈ 9.8 m s⁻²; 10 m s⁻² for quick estimates."],
["Acceleration due to gravity","g = 9.8 m s⁻²","The chapter says it is nearly constant near Earth's surface."]
],graphical:[
["Weight direction","downward","Gravity acts toward Earth in the chapter's examples."],
["Free-fall direction","a = g downward","Use the sign only after choosing a direction convention."]
],use:"Use when the force is specifically Earth's gravitational force."},
{topic:"Force from motion graphs",numeric:[
["Graph acceleration","a = (v2 − v1)/(t2 − t1)","Read the velocity values and times from the v-t graph."],
["Force from graph","F = ma","Multiply the graph-derived acceleration by mass."],
["Stopping-force route","a = (v − u)/t then F=ma","For a known change in velocity and stopping time."]
],graphical:[
["v-t slope","rise/run = acceleration","Positive slope gives positive acceleration; negative slope gives negative acceleration."],
["Horizontal v-t","slope = 0 → F = 0","For constant mass, no acceleration means no net force."],
["Piecewise v-t","calculate slope interval by interval","Example 6.6 changes force across three time intervals."]
],use:"Use for sports-car or similar graph-based force questions."},
{topic:"Systems of objects",numeric:[
["Two-box acceleration","a = F/(m1 + m2)","Valid for the chapter's two-box frictionless horizontal setup with external force F."],
["System mass","m_system = m1 + m2","Connected boxes share the system acceleration in the model."]
],graphical:[
["System free-body idea","external F versus internal tension","Internal tension is ignored when the full system is chosen."],
["Horizontal force balance","(m1+m2)g balanced by N1+N2","The chapter's horizontal setup has balanced vertical forces."]
],use:"Use when connected objects move together and the question asks for system acceleration."},
{topic:"Experiment relationships",numeric:[
["Activity 6.3 comparison","a1 T1² = a2 T2²","Both trials use the same distance from rest in the chapter's analysis."],
["Acceleration ratio","a1/a2 = T2²/T1²","Derived from the equal-distance comparison."],
["Ideal proportionality","a ∝ F for fixed m","Chapter conclusion from the force-variation activity."],
["Inverse relation","a ∝ 1/m for fixed F","Chapter conclusion from the mass-variation activity."]
],graphical:[
["Force vs acceleration","direct relationship for fixed mass","The chapter experimentally supports increasing acceleration with increasing force."],
["Acceleration vs mass","inverse relationship for fixed force","The revision set includes an acceleration-mass graph."]
],use:"Use to interpret the chapter's experiment and graph-based questions, not to invent extra friction laws."}
];
export default chapter6Formulas;