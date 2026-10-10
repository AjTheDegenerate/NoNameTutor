const chapter7Formulas = [
{topic:"Work done by a constant force",condition:"Use W = F × s when displacement is in the direction of the force, as introduced in this chapter.",numeric:[
["Work","W = F × s","F in newtons, s in metres, W in joules."],
["Force from work","F = W/s","Rearranged from the chapter's work relation."],
["Displacement from work","s = W/F","For non-zero constant force in the stated direction."]
],graphical:[
["Force–displacement graph","Work = area under F–s graph","Find the area between the graph and displacement axis over the requested interval."],
["Constant force","W = rectangle area = F × s","For a horizontal force line, height is force and width is displacement."]
],use:"Use force and displacement in the same direction or area under the force–displacement graph."},
{topic:"Zero, positive and negative work",numeric:[
["Zero work: no force","F = 0 → W = 0","For the specified force."],
["Zero work: no displacement","s = 0 → W = 0","Pushing an unmoving rigid wall is the textbook example."],
["Perpendicular force","W = 0","If force is perpendicular to displacement, it has no component along that displacement in the chapter's treatment."],
["Positive work","W > 0","Force and displacement are in the same direction."],
["Negative work","W < 0","Force and displacement are in opposite directions."]
],graphical:[
["Sign of work","same direction: +; opposite: −","Use labelled force and displacement arrows to determine sign."]
],use:"Name the force and object first; then compare the force direction with the displacement."},
{topic:"Work–energy theorem",numeric:[
["NCERT chapter wording","W = change in energy","This is the supplied chapter’s wording for its energy-transfer discussion. In standard mechanics, the net-work theorem is W_net = ΔK (change in kinetic energy)."],
["Standard work–energy theorem","W_net = ΔK","Net work done on an object equals its change in kinetic energy. Keep this distinct from the chapter’s broader energy-transfer wording."],
["Kinetic-energy change","ΔK = ½m(v² − u²)","From the chapter's constant-force derivation, where u and v are initial/final speeds along the modelled motion."]
],graphical:[
["Energy state comparison","work input → energy change","Compare initial and final energy rather than analysing every point in between."]
],use:"Use when work or force effects are linked to a change of energy."},
{topic:"Kinetic energy",numeric:[
["Kinetic energy","K = ½mv²","m in kg and v in m/s gives K in J."],
["Speed scaling","K₂/K₁ = (v₂/v₁)²","Only when mass is unchanged."],
["Mass scaling","K₂/K₁ = m₂/m₁","Only when speed is unchanged."],
["General work-related change","W = ½m(v² − u²)","In the textbook's constant-force derivation."]
],graphical:[
["Motion and kinetic energy","higher speed → larger K","Kinetic energy depends on the square of speed, not direction."]
],use:"Use the object's mass and velocity magnitude. Convert km/h to m/s first if needed."},
{topic:"Gravitational potential energy",condition:"The expression U = mgh is given for heights near Earth's surface, where g is treated as constant.",numeric:[
["Gravitational potential energy","U = mgh","Use the chosen reference level for height."],
["Work to lift slowly","W = mgh","For the textbook setup lifting against gravity at steady speed."],
["Height","h = U/(mg)","Rearranged from U = mgh."]
],graphical:[
["Height comparison","U ∝ h","At fixed mass and g, doubling height doubles U."]
],use:"Use vertical height change, not the length of the path used to reach the height."},
{topic:"Mechanical energy and conservation",numeric:[
["Mechanical energy","E = K + U","Sum of kinetic and potential energy."],
["Ideal mechanical-energy conservation","K₁ + U₁ = K₂ + U₂","Applies in the chapter's ideal model when no other external forces act."],
["Free-fall special case","mgh = ½mv²","At the top from rest and at the bottom with PE reference zero, neglecting energy dissipation."]
],graphical:[
["Free fall","PE decreases as KE increases","The sum remains constant in the ideal model."],
["Ideal pendulum","turning point: K = 0; bottom: K maximum","Real motion gradually loses mechanical energy due to friction and air resistance."]
],use:"State the ideal condition. Do not assume conservation of mechanical energy in real frictional cases without qualification."},
{topic:"Power",numeric:[
["Average power","P = W/t","Work W divided by the time interval t."],
["Lifting power","P = mgh/t","For lifting a mass slowly through height h during time t."],
["Power from energy change","P = ΔE/t","Average rate of the energy change over the interval."],
["Watt","1 W = 1 J/s","SI unit of power."],
["Horsepower","1 hp = 746 W","Conversion printed in the chapter's curiosity note."]
],graphical:[
["Same work, different time","shorter time → greater average power","Compare work/time, not total work alone."]
],use:"Calculate the work or energy change first, then divide by the time taken."},
{topic:"Effort, load and mechanical advantage",numeric:[
["Mechanical advantage","MA = load/effort","Use the magnitudes of the load force and effort force."],
["Effort from MA","effort = load/MA","Rearranged from MA = load/effort."],
["Ideal work trade-off","effort × effort distance = load × load distance","As expressed in the chapter for ideal machines while ignoring friction."]
],graphical:[
["Machine trade-off","less effort ↔ more distance","Simple machines change force magnitude or direction; they do not create energy."]
],use:"Keep force ratio separate from work and power."},
{topic:"Pulleys",numeric:[
["Fixed pulley MA","MA = 1","In the textbook's ideal fixed pulley, effort and load magnitudes are equal."],
["Fixed pulley relation","effort = load","Its main benefit is changing the direction of the pull."],
["Movable pulley system","MA can be > 1","The chapter states this qualitatively; no pulley-count formula is introduced here."]
],graphical:[
["Fixed pulley","pull down → load moves up","Direction changes."],
["Movable pulley","load attached to movable pulley","The textbook identifies the qualitative arrangement; see Fig. 7.25."]
],use:"Do not invent a numerical pulley-count rule not stated in the supplied chapter."},
{topic:"Inclined plane",numeric:[
["Mechanical advantage","MA = L/h","L is ramp length and h is vertical height, ignoring friction."],
["Ideal work trade-off","F′ × L = mgh","From the work-energy relation for the ramp setup in the chapter."],
["Ramp example","MA = 50 cm / 30 cm ≈ 1.67","Chapter Example 7.12."]
],graphical:[
["Ramp shallower","required effort decreases; distance increases","Compare ramps that reach the same height."]
],use:"Use the slanted ramp length in the numerator and vertical height in the denominator."},
{topic:"Lever",numeric:[
["Balanced lever","effort × effort arm = load × load arm","The relation in Eq. 7.15."],
["Mechanical advantage","MA = effort arm/load arm","The ideal relationship stated in Eq. 7.16."],
["Unknown load arm","load arm = (effort × effort arm)/load","Rearranged from the balance relation."]
],graphical:[
["Lever balance","F₁d₁ = F₂d₂","Measure each arm from the fulcrum."],
["Lever class","identify the middle part","Class I: fulcrum; Class II: load; Class III: effort."]
],use:"Mark the fulcrum first, then identify the force arms and use the balance relation."}
];
export default chapter7Formulas;