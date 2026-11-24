import { shuffleMcqOptions } from '../services/aiService';

function buildOfflineStraightLinesQuiz(setIndex = 1) {
    const k = Math.max(1, ((setIndex - 1) % 4) + 1);
    const p1 = 2 * k + 1;
    const p2 = 3 * k + 2;

    const mcqs = [
        {
            conceptName: 'Slope & Perpendicular Lines', difficulty: 'Hard / JEE Level',
            question: `A line passes through P(${p1}, ${p2}) and Q(${p1 + 4}, ${p2 + 8}). What is the equation of the line perpendicular to PQ passing through the origin?`,
            options: [`x + 2y = 0`, `2x + y = 0`, `x - 2y = 0`, `2x - y = 0`], correctIndex: 0,
            explanation: `Slope of PQ = (${p2 + 8} - ${p2}) / (${p1 + 4} - ${p1}) = 8/4 = 2. Perpendicular slope m₂ = -1/2. Through (0,0): y = -½x ⇒ x + 2y = 0.`
        },
        {
            conceptName: 'Distance of Point from a Line', difficulty: 'Hard / JEE Level',
            question: `Find the perpendicular distance from point P(${2 * k}, ${k}) to the line 3x - 4y + ${8 * k} = 0:`,
            options: [`${2 * k} units`, `${3 * k} units`, `${4 * k} units`, `${5 * k} units`], correctIndex: 0,
            explanation: `d = |3(${2*k}) - 4(${k}) + ${8*k}| / √(3² + (-4)²) = |6k - 4k + 8k| / 5 = 10k / 5 = ${2*k} units.`
        },
        {
            conceptName: 'Angle Between Two Lines', difficulty: 'Hard / JEE Level',
            question: `What is the acute angle θ between the lines y = √3 x + ${k + 2} and y = (1/√3)x - ${k}?`,
            options: [`30°`, `45°`, `60°`, `15°`], correctIndex: 0,
            explanation: `m₁ = √3 (60°) and m₂ = 1/√3 (30°). Acute angle = |60° - 30°| = 30°.`
        },
        {
            conceptName: 'Intercept Form of a Line', difficulty: 'Hard / JEE Level',
            question: `A line cuts off equal positive intercepts on both axes and passes through (${k + 1}, ${k + 3}). What is its equation?`,
            options: [`x + y = ${2 * k + 4}`, `x - y = ${2}`, `x + y = ${k + 4}`, `2x + y = ${3 * k + 5}`], correctIndex: 0,
            explanation: `Equal intercepts mean x/a + y/a = 1 ⇒ x + y = a. Substituting (${k+1}, ${k+3}) gives a = ${2*k + 4}.`
        },
        {
            conceptName: 'Point-Slope Form', difficulty: 'Hard / JEE Level',
            question: `Find the equation of the line passing through (${k}, ${2 * k}) making an angle of 135° with the positive x-axis:`,
            options: [`x + y = ${3 * k}`, `x - y = ${k}`, `x + y = ${k}`, `y - x = ${3 * k}`], correctIndex: 0,
            explanation: `Slope m = tan(135°) = -1. Using y - ${2*k} = -1(x - ${k}) gives x + y = ${3*k}.`
        },
        {
            conceptName: 'Collinearity Condition', difficulty: 'Hard / JEE Level',
            question: `For what value of p are the points (1, 2), (3, p), and (5, ${2 * k + 4}) collinear?`,
            options: [`${k + 3}`, `${k + 2}`, `${2 * k + 2}`, `${k + 4}`], correctIndex: 0,
            explanation: `Equating slopes: (p - 2)/(3 - 1) = (${2*k + 4} - 2)/(5 - 1) ⇒ (p - 2)/2 = (${2*k + 2})/4 ⇒ p = ${k + 3}.`
        },
        {
            conceptName: 'Normal Form of a Line', difficulty: 'Hard / JEE Level',
            question: `Reduce x + √3 y + ${4 * k} = 0 to normal form x cos ω + y sin ω = p. What is the perpendicular distance p from the origin?`,
            options: [`${2 * k} units`, `${4 * k} units`, `${k} units`, `${8 * k} units`], correctIndex: 0,
            explanation: `Divide by √(1² + (√3)²) = 2: (-½)x + (-√3/2)y = ${2*k}. Hence p = ${2*k} units.`
        },
        {
            conceptName: 'Distance Between Parallel Lines', difficulty: 'Hard / JEE Level',
            question: `Find the distance between the parallel lines 3x + 4y - ${5 * k} = 0 and 3x + 4y + ${15 * k} = 0:`,
            options: [`${4 * k} units`, `${2 * k} units`, `${5 * k} units`, `${3 * k} units`], correctIndex: 0,
            explanation: `d = |C₁ - C₂| / √(A² + B²) = |(-5k) - (15k)| / 5 = 20k / 5 = ${4*k} units.`
        },
        {
            conceptName: 'Foot of Perpendicular', difficulty: 'Hard / JEE Level',
            question: `The foot of the perpendicular drawn from the origin to a line is (2, -3). What is the slope of that line?`,
            options: [`2/3`, `-2/3`, `3/2`, `-3/2`], correctIndex: 0,
            explanation: `Slope of the perpendicular segment from (0,0) to (2,-3) is -3/2. The line's slope is -1 / (-3/2) = 2/3.`
        },
        {
            conceptName: 'Area of Triangle with Axes', difficulty: 'Hard / JEE Level',
            question: `Find the area of the triangle bounded by the coordinate axes and the line ${k}x + 2y = ${4 * k}:`,
            options: [`${4 * k} sq units`, `${2 * k} sq units`, `${8 * k} sq units`, `${k} sq units`], correctIndex: 0,
            explanation: `x-intercept = 4, y-intercept = ${2*k}. Area = ½ × 4 × ${2*k} = ${4*k} sq units.`
        }
    ].map(q => shuffleMcqOptions({ type: 'mcq', section: 'Section A • MCQ', ...q }));

    const fills = [
        {
            conceptName: 'Two-Point Slope', difficulty: 'Hard / Numerical',
            question: `Compute the slope m of the line passing through P(3, ${5 * k}) and Q(7, ${5 * k + 12}).`,
            correctAnswer: `3`, acceptableAnswers: [`3`, `3.0`], unitHint: `number`,
            explanation: `m = (${5*k + 12} - ${5*k}) / (7 - 3) = 12 / 4 = 3.`
        },
        {
            conceptName: 'x-Intercept', difficulty: 'Hard / Numerical',
            question: `Find the x-intercept of the straight line 4x + 3y = ${24 * k}.`,
            correctAnswer: `${6 * k}`, acceptableAnswers: [`${6 * k}`, `${6 * k}.0`], unitHint: `units`,
            explanation: `Set y = 0: 4x = ${24*k} ⇒ x = ${6*k}.`
        },
        {
            conceptName: 'Distance from Origin', difficulty: 'Hard / Numerical',
            question: `Find the perpendicular distance from (0, 0) to the line 6x + 8y - ${50 * k} = 0.`,
            correctAnswer: `${5 * k}`, acceptableAnswers: [`${5 * k}`, `${5 * k}.0`], unitHint: `units`,
            explanation: `d = |-${50*k}| / √(6² + 8²) = ${50*k} / 10 = ${5*k} units.`
        },
        {
            conceptName: 'Inclination Angle', difficulty: 'Hard / Numerical',
            question: `If a straight line has slope m = 1, what is its inclination θ with the positive x-axis (in degrees)?`,
            correctAnswer: `45`, acceptableAnswers: [`45`, `45°`, `45 deg`], unitHint: `degrees`,
            explanation: `tan θ = 1 ⇒ θ = 45°.`
        },
        {
            conceptName: 'Perpendicular Slope Product', difficulty: 'Hard / Numerical',
            question: `Line L1 has slope 0.25 (1/4). What is the slope of line L2 perpendicular to L1?`,
            correctAnswer: `-4`, acceptableAnswers: [`-4`, `-4.0`], unitHint: `number`,
            explanation: `m₁ · m₂ = -1 ⇒ (1/4) · m₂ = -1 ⇒ m₂ = -4.`
        },
        {
            conceptName: 'y-Intercept', difficulty: 'Hard / Numerical',
            question: `Determine the y-intercept c of the line 2x - 5y + ${15 * k} = 0.`,
            correctAnswer: `${3 * k}`, acceptableAnswers: [`${3 * k}`, `${3 * k}.0`], unitHint: `units`,
            explanation: `Set x = 0: -5y + ${15*k} = 0 ⇒ y = ${3*k}.`
        },
        {
            conceptName: 'Parallel Line Parameter', difficulty: 'Hard / Numerical',
            question: `Find the value of p so that 2x + 3y = 7 is parallel to px + 6y = 10.`,
            correctAnswer: `4`, acceptableAnswers: [`4`, `4.0`], unitHint: `number`,
            explanation: `Parallel lines have equal slope ratios: 2/p = 3/6 = 1/2 ⇒ p = 4.`
        },
        {
            conceptName: 'Midpoint x-Coordinate', difficulty: 'Hard / Numerical',
            question: `What is the x-coordinate of the midpoint of segment joining A(${2 * k}, 4) and B(${8 * k}, 10)?`,
            correctAnswer: `${5 * k}`, acceptableAnswers: [`${5 * k}`, `${5 * k}.0`], unitHint: `coordinate`,
            explanation: `x_mid = (${2*k} + ${8*k}) / 2 = ${5*k}.`
        },
        {
            conceptName: 'Intersection x-Coordinate', difficulty: 'Hard / Numerical',
            question: `Find the x-coordinate of the intersection point of x + y = ${10 * k} and x - y = ${2 * k}.`,
            correctAnswer: `${6 * k}`, acceptableAnswers: [`${6 * k}`, `${6 * k}.0`], unitHint: `coordinate`,
            explanation: `Adding both equations: 2x = ${12*k} ⇒ x = ${6*k}.`
        },
        {
            conceptName: 'Distance Between Two Points', difficulty: 'Hard / Numerical',
            question: `Calculate the distance between points (0, 0) and (${3 * k}, ${4 * k}).`,
            correctAnswer: `${5 * k}`, acceptableAnswers: [`${5 * k}`, `${5 * k}.0`], unitHint: `units`,
            explanation: `d = √((${3*k})² + (${4*k})²) = √(${25*k*k}) = ${5*k} units.`
        }
    ].map(q => ({ type: 'fill', section: 'Section B • Fill-in', ...q }));

    return [...mcqs, ...fills];
}

function buildOfflineKinematicsQuiz(setIndex = 1) {
    const k = Math.max(1, ((setIndex - 1) % 4) + 1);

    const mcqs = [
        {
            conceptName: 'Instantaneous Acceleration', difficulty: 'Hard / JEE Level',
            question: `The position of a particle moving in a straight line is x(t) = ${2 * k}t³ - ${9 * k}t² + ${12 * k}t + 4. At what time t does its acceleration become zero?`,
            options: [`1.5 s`, `2.0 s`, `1.0 s`, `3.0 s`], correctIndex: 0,
            explanation: `v(t) = dx/dt = ${6*k}t² - ${18*k}t + ${12*k}. a(t) = dv/dt = ${12*k}t - ${18*k} = 0 ⇒ t = 1.5 s.`
        },
        {
            conceptName: 'Stopping Distance Scaling', difficulty: 'Hard / JEE Level',
            question: `A car moving at speed v stops in distance S under maximum braking. If its speed becomes 3v under the same retardation, what is the new stopping distance?`,
            options: [`9 S`, `3 S`, `6 S`, `12 S`], correctIndex: 0,
            explanation: `From v² = u² + 2as with v = 0, stopping distance S = u² / (2|a|) ∝ u². Tripling u multiplies S by 3² = 9.`
        },
        {
            conceptName: 'Galileo Law of Odd Numbers', difficulty: 'Hard / JEE Level',
            question: `A stone dropped from rest falls distances h1, h2, and h3 in the 1st, 2nd, and 3rd consecutive seconds. What is the ratio h1 : h2 : h3?`,
            options: [`1 : 3 : 5`, `1 : 2 : 3`, `1 : 4 : 9`, `1 : 3 : 6`], correctIndex: 0,
            explanation: `Distance in nth second from rest is ½g(2n - 1), giving consecutive ratios 1 : 3 : 5.`
        },
        {
            conceptName: 'Harmonic Mean Average Speed', difficulty: 'Hard / JEE Level',
            question: `A cyclist covers the first half of a straight track at 30 m/s and the second half at 60 m/s. What is the average speed for the whole trip?`,
            options: [`40 m/s`, `45 m/s`, `50 m/s`, `36 m/s`], correctIndex: 0,
            explanation: `For equal distances, v_avg = 2 v₁ v₂ / (v₁ + v₂) = 2(30)(60) / 90 = 40 m/s.`
        },
        {
            conceptName: 'Relative Velocity in 1D', difficulty: 'Hard / JEE Level',
            question: `Two trains of lengths 100 m and 150 m move toward each other on parallel tracks at 54 km/h and 36 km/h. How long do they take to completely cross each other?`,
            options: [`10 s`, `15 s`, `20 s`, `12.5 s`], correctIndex: 0,
            explanation: `Relative speed = 54 + 36 = 90 km/h = 25 m/s. Total length = 250 m. Time = 250 / 25 = 10 s.`
        },
        {
            conceptName: 'Position-Time Graph Curvature', difficulty: 'Hard / JEE Level',
            question: `If a particle's position-time (x–t) graph is a downward-opening (concave down) parabola, what is true about its acceleration?`,
            options: [`Acceleration is negative`, `Acceleration is positive`, `Acceleration is zero`, `Velocity is constant`], correctIndex: 0,
            explanation: `Concave down curvature corresponds to d²x/dt² < 0, meaning negative acceleration.`
        },
        {
            conceptName: 'Displacement vs Path Length', difficulty: 'Hard / JEE Level',
            question: `A runner moves ${10 * k} m east and then ${6 * k} m west along a straight road. What is the ratio of path length to the magnitude of displacement?`,
            options: [`4 : 1`, `2 : 1`, `8 : 3`, `5 : 2`], correctIndex: 0,
            explanation: `Path length = 10k + 6k = 16k. Displacement magnitude = |10k - 6k| = 4k. Ratio = 16k / 4k = 4 : 1.`
        },
        {
            conceptName: 'Velocity-Time Graph Area', difficulty: 'Hard / JEE Level',
            question: `What physical quantity is represented by the signed area enclosed between a velocity-time (v–t) curve and the time axis?`,
            options: [`Net displacement`, `Average acceleration`, `Instantaneous jerk`, `Rate of change of speed`], correctIndex: 0,
            explanation: `Since v = dx/dt, integrating velocity over time ∫v dt yields net displacement Δx.`
        },
        {
            conceptName: 'Vertical Throw Symmetry', difficulty: 'Hard / JEE Level',
            question: `A ball is thrown vertically upward with speed u. Neglecting air resistance, what is its acceleration at the highest point of its trajectory?`,
            options: [`g downward`, `Zero`, `g upward`, `u / t upward`], correctIndex: 0,
            explanation: `Velocity is momentarily zero at the peak, but gravitational acceleration remains constant at g downward throughout flight.`
        },
        {
            conceptName: 'Equal-Time Average Speed', difficulty: 'Hard / JEE Level',
            question: `A particle travels in a straight line at 20 m/s for the first 10 s and at 40 m/s for the next 10 s. What is its average velocity?`,
            options: [`30 m/s`, `26.7 m/s`, `35 m/s`, `25 m/s`], correctIndex: 0,
            explanation: `For equal time intervals, v_avg = (v₁ + v₂) / 2 = (20 + 40) / 2 = 30 m/s.`
        }
    ].map(q => shuffleMcqOptions({ type: 'mcq', section: 'Section A • MCQ', ...q }));

    const fills = [
        {
            conceptName: 'Free Fall Displacement', difficulty: 'Hard / Numerical',
            question: `A stone is dropped from rest (g = 10 m/s²). Calculate its downward displacement in meters after t = ${2 * k} s.`,
            correctAnswer: `${20 * k * k}`, acceptableAnswers: [`${20 * k * k}`, `${20 * k * k}.0`, `${20 * k * k} m`], unitHint: `meters`,
            explanation: `s = ½gt² = ½(10)(${2*k})² = ${20*k*k} m.`
        },
        {
            conceptName: 'Free Fall Impact Speed', difficulty: 'Hard / Numerical',
            question: `Find the speed (in m/s) of a body dropped from rest after falling 45 m (take g = 10 m/s²).`,
            correctAnswer: `30`, acceptableAnswers: [`30`, `30.0`, `30 m/s`], unitHint: `m/s`,
            explanation: `v² = 2gh = 2(10)(45) = 900 ⇒ v = 30 m/s.`
        },
        {
            conceptName: 'Uniform Acceleration', difficulty: 'Hard / Numerical',
            question: `A car accelerates uniformly from 10 m/s to 40 m/s in 6 s. Calculate its acceleration in m/s².`,
            correctAnswer: `5`, acceptableAnswers: [`5`, `5.0`, `5 m/s²`], unitHint: `m/s²`,
            explanation: `a = (40 - 10) / 6 = 5 m/s².`
        },
        {
            conceptName: 'Instantaneous Velocity Derivative', difficulty: 'Hard / Numerical',
            question: `Position is given by x(t) = ${k}t² + 4t + 5. Find the instantaneous velocity (in m/s) at t = 3 s.`,
            correctAnswer: `${6 * k + 4}`, acceptableAnswers: [`${6 * k + 4}`, `${6 * k + 4}.0`], unitHint: `m/s`,
            explanation: `v(t) = dx/dt = ${2*k}t + 4. At t = 3 s, v = ${6*k + 4} m/s.`
        },
        {
            conceptName: 'Maximum Height in Vertical Throw', difficulty: 'Hard / Numerical',
            question: `A ball is thrown vertically upward at u = ${10 * k} m/s (g = 10 m/s²). What maximum height (in meters) does it reach?`,
            correctAnswer: `${5 * k * k}`, acceptableAnswers: [`${5 * k * k}`, `${5 * k * k}.0`], unitHint: `meters`,
            explanation: `H = u² / (2g) = (${10*k})² / 20 = ${5*k*k} m.`
        },
        {
            conceptName: 'Total Time of Flight', difficulty: 'Hard / Numerical',
            question: `A ball is thrown straight up at u = ${20 * k} m/s (g = 10 m/s²). Calculate its total time of flight (in seconds) until it returns to launch height.`,
            correctAnswer: `${4 * k}`, acceptableAnswers: [`${4 * k}`, `${4 * k}.0`], unitHint: `seconds`,
            explanation: `T = 2u / g = 2(${20*k}) / 10 = ${4*k} s.`
        },
        {
            conceptName: 'Displacement in nth Second', difficulty: 'Hard / Numerical',
            question: `A particle starts from rest with constant acceleration a = 4 m/s². How many meters does it travel during the 3rd second (t = 2 s to t = 3 s)?`,
            correctAnswer: `10`, acceptableAnswers: [`10`, `10.0`, `10 m`], unitHint: `meters`,
            explanation: `s_n = u + (a/2)(2n - 1) = 0 + 2(5) = 10 m.`
        },
        {
            conceptName: 'Braking Deceleration', difficulty: 'Hard / Numerical',
            question: `A train moving at 20 m/s is brought to rest uniformly over 50 m. Find the magnitude of its retardation in m/s².`,
            correctAnswer: `4`, acceptableAnswers: [`4`, `4.0`, `-4`], unitHint: `m/s²`,
            explanation: `0 = 20² - 2a(50) ⇒ 100a = 400 ⇒ a = 4 m/s².`
        },
        {
            conceptName: 'Relative Speed Same Direction', difficulty: 'Hard / Numerical',
            question: `Car A travels at ${25 + 5 * k} m/s and Car B travels ahead in the same direction at ${15 + 5 * k} m/s. What is the speed of A relative to B (in m/s)?`,
            correctAnswer: `10`, acceptableAnswers: [`10`, `10.0`, `10 m/s`], unitHint: `m/s`,
            explanation: `v_AB = v_A - v_B = (${25 + 5*k}) - (${15 + 5*k}) = 10 m/s.`
        },
        {
            conceptName: 'Average Velocity from x(t)', difficulty: 'Hard / Numerical',
            question: `A particle is at x = 4 m at t = 1 s and at x = ${4 + 8 * k} m at t = 5 s. Find its average velocity (in m/s) over this interval.`,
            correctAnswer: `${2 * k}`, acceptableAnswers: [`${2 * k}`, `${2 * k}.0`], unitHint: `m/s`,
            explanation: `v_avg = Δx / Δt = (${4 + 8*k} - 4) / (5 - 1) = ${8*k} / 4 = ${2*k} m/s.`
        }
    ].map(q => ({ type: 'fill', section: 'Section B • Fill-in', ...q }));

    return [...mcqs, ...fills];
}

function buildOfflineAdventureQuiz() {
    const mcqs = [
        {
            conceptName: 'Protagonist & Profession', difficulty: 'Exam Level',
            question: `Who is the protagonist of Jayant Narlikar's "The Adventure", and what is his academic field?`,
            options: [`Professor Gangadharpant Gaitonde, a historian`, `Rajendra Deshpande, an archaeologist`, `Khan Sahib, a railway historian`, `Vinay Gaitonde, a quantum physicist`], correctIndex: 0,
            explanation: `Professor Gangadharpant Gaitonde is an eminent historian from Pune invited to chair a seminar.`
        },
        {
            conceptName: 'Alternate Reality Divergence', difficulty: 'Hard / Analytical',
            question: `What single turning point in the Third Battle of Panipat (1761) altered history in the alternate reality Gaitonde experienced?`,
            options: [`Vishwasrao narrowly missed being hit by a bullet, rallying the Marathas to victory`, `Abdali surrendered before reaching Panipat due to famine`, `The East India Company allied militarily with the Peshwas`, `Sadashivrao Bhau signed a permanent peace treaty with the Mughals`], correctIndex: 0,
            explanation: `According to the alternate Bhausahebanchi Bakhar, the bullet brushed past Vishwasrao's ear, boosting Maratha morale and turning the tide.`
        },
        {
            conceptName: 'Bombay in the Alternate Timeline', difficulty: 'Exam Level',
            question: `When Gaitonde arrives at Victoria Terminus in the alternate Bombay, what surprising sign does he notice on the carriages and buildings?`,
            options: [`Greater Bombay Metropolitan Railway with Union Jacks and British-owned East India House`, `Maratha Imperial Express painted in saffron with Peshwa emblems`, `French East India Company banners along Hornby Road`, `An abandoned station destroyed during the 1857 uprising`], correctIndex: 0,
            explanation: `The British never ruled India as a whole, yet retained commercial leases in Bombay, where the East India Company still operated.`
        },
        {
            conceptName: 'Town Hall Library Discovery', difficulty: 'Hard / Analytical',
            question: `Which volume of Professor Gaitonde's own five-volume history series first showed a divergence from the history he knew?`,
            options: [`Volume 5, covering the period after the death of Aurangzeb`, `Volume 1, covering the Mauryan Empire`, `Volume 3, covering the reign of Akbar`, `Volume 2, covering the Gupta Golden Age`], correctIndex: 0,
            explanation: `Volumes 1–4 matched known history up to Aurangzeb's death; Volume 5 recorded the Maratha victory at Panipat.`
        },
        {
            conceptName: 'Physical Evidence', difficulty: 'Exam Level',
            question: `What tangible proof did Professor Gaitonde accidentally bring back in his coat pocket from the alternate reality?`,
            options: [`A torn page from Bhausahebanchi Bakhar describing Vishwasrao's escape`, `A silver coin minted by the Peshwa in 1900`, `A train ticket from the Greater Bombay Metropolitan Railway`, `A brochure from the East India House on Hornby Road`], correctIndex: 0,
            explanation: `Gaitonde had inadvertently slipped the Bakhar page into his pocket at the Town Hall library before leaving.`
        },
        {
            conceptName: 'Azad Maidan Incident', difficulty: 'Hard / Analytical',
            question: `Why did the audience at Azad Maidan react angrily and pelt Professor Gaitonde with eggs and tomatoes?`,
            options: [`He insisted on occupying the unoccupied presidential chair despite the crowd having abolished chairpersons`, `He criticized the Maratha generals who fought at Panipat`, `He tried to speak in English instead of Marathi`, `He interrupted a political rally led by the East India Company`], correctIndex: 0,
            explanation: `In that reality, audiences were tired of ceremonial introductions and had abolished the custom of a chairperson.`
        },
        {
            conceptName: 'Catastrophe Theory', difficulty: 'Hard / Conceptual',
            question: `How does Rajendra Deshpande use Catastrophe Theory to explain the outcome of the Battle of Panipat?`,
            options: [`A tiny change in an initial event (the bullet missing Vishwasrao) triggered a massive shift in historical behavior`, `Military empires inevitably collapse after exactly 100 years`, `Weather catastrophes determined every major battle in Indian history`, `Human consciousness always jumps during road accidents`], correctIndex: 0,
            explanation: `Catastrophe Theory models how a small continuous change in conditions can cause a sudden, dramatic jump in system state.`
        },
        {
            conceptName: 'Quantum Theory Connection', difficulty: 'Hard / Conceptual',
            question: `Which concept from quantum physics does Rajendra invoke to explain why multiple versions of reality can exist simultaneously?`,
            options: [`Lack of determinism in quantum theory (many-worlds interpretation)`, `Heisenberg's thermal equilibrium law`, `Classical Newtonian determinism`, `Conservation of relativistic mass`], correctIndex: 0,
            explanation: `Rajendra explains that just as an electron's path isn't uniquely determined in quantum theory, reality can branch into coexisting worlds.`
        },
        {
            conceptName: 'Trigger for Transition', difficulty: 'Hard / Analytical',
            question: `What real-world event coincided with Professor Gaitonde's two-day transition into the parallel universe?`,
            options: [`A collision with a truck that left him unconscious in a hospital`, `Falling asleep while reading in the Pune university library`, `An electrical storm while boarding the Jijamata Express`, `A fainting spell during his 1000th presidential address`], correctIndex: 0,
            explanation: `Gaitonde was struck by a truck while thinking deeply about Panipat and catastrophe theory, remaining unconscious for two days.`
        },
        {
            conceptName: 'Resolution & Character Arc', difficulty: 'Exam Level',
            question: `What decision does Professor Gaitonde make at the end of the story regarding his upcoming 1000th presidential address?`,
            options: [`He cancels his Panipat seminar address, deciding he has already experienced his 1000th address at Azad Maidan`, `He travels back to Bombay to find Vinay Gaitonde at Forbes Building`, `He publishes Volume 6 of his history series immediately`, `He resigns from teaching history to study physics with Rajendra`], correctIndex: 0,
            explanation: `Shaken by the Azad Maidan experience, Gaitonde tells Rajendra he has already delivered—and survived—his 1000th address.`
        }
    ].map(q => shuffleMcqOptions({ type: 'mcq', section: 'Section A • MCQ', ...q }));

    const fills = [
        {
            conceptName: 'Author', difficulty: 'Recall',
            question: `Name the Indian astrophysicist and author who wrote "The Adventure".`,
            correctAnswer: `Jayant Narlikar`, acceptableAnswers: [`Jayant Narlikar`, `Narlikar`, `Jayant V. Narlikar`], unitHint: `author name`,
            explanation: `Dr. Jayant Narlikar wrote "The Adventure", combining Indian history with theoretical physics.`
        },
        {
            conceptName: 'Historical Year', difficulty: 'Recall',
            question: `In which year was the Third Battle of Panipat fought?`,
            correctAnswer: `1761`, acceptableAnswers: [`1761`], unitHint: `year`,
            explanation: `The Third Battle of Panipat took place on 14 January 1761.`
        },
        {
            conceptName: 'Train Name', difficulty: 'Recall',
            question: `What was the name of the train Professor Gaitonde boarded from Pune to Bombay?`,
            correctAnswer: `Jijamata Express`, acceptableAnswers: [`Jijamata Express`, `Jijamata`], unitHint: `train name`,
            explanation: `The story opens aboard the faster-than-Deccan-Queen Jijamata Express.`
        },
        {
            conceptName: 'Scientific Friend', difficulty: 'Recall',
            question: `Who is the physicist friend to whom Professor Gaitonde narrates his strange experience?`,
            correctAnswer: `Rajendra Deshpande`, acceptableAnswers: [`Rajendra Deshpande`, `Rajendra`, `Deshpande`], unitHint: `character name`,
            explanation: `Rajendra Deshpande rationalizes Gaitonde's experience using Catastrophe Theory and Quantum Theory.`
        },
        {
            conceptName: 'Historical Chronicle', difficulty: 'Exam Level',
            question: `What is the Marathi historical chronicle from which Gaitonde tore a page in the Town Hall library?`,
            correctAnswer: `Bhausahebanchi Bakhar`, acceptableAnswers: [`Bhausahebanchi Bakhar`, `Bakhar`], unitHint: `book title`,
            explanation: `Bhausahebanchi Bakhar contained the account of the bullet brushing past Vishwasrao's ear.`
        },
        {
            conceptName: 'Protagonist Son', difficulty: 'Recall',
            question: `What is the name of Professor Gaitonde's son whom he tried to locate at Forbes Building in Bombay?`,
            correctAnswer: `Vinay Gaitonde`, acceptableAnswers: [`Vinay Gaitonde`, `Vinay`], unitHint: `character name`,
            explanation: `The receptionist at Forbes Building had no record of Vinay Gaitonde in that alternate reality.`
        },
        {
            conceptName: 'Maratha Leader', difficulty: 'Exam Level',
            question: `Which Maratha heir survived the bullet at Panipat in the alternate timeline?`,
            correctAnswer: `Vishwasrao`, acceptableAnswers: [`Vishwasrao`, `Vishwas Rao`], unitHint: `historical figure`,
            explanation: `Vishwasrao's survival prevented the collapse of Maratha morale.`
        },
        {
            conceptName: 'Public Ground', difficulty: 'Recall',
            question: `At which famous Bombay ground did Gaitonde try to take the empty presidential chair?`,
            correctAnswer: `Azad Maidan`, acceptableAnswers: [`Azad Maidan`], unitHint: `location`,
            explanation: `Gaitonde walked into a lecture at Azad Maidan and climbed onto the stage to occupy the empty chair.`
        },
        {
            conceptName: 'Address Milestone', difficulty: 'Recall',
            question: `How many presidential addresses had Professor Gaitonde already chaired before the Panipat seminar? (Enter number)`,
            correctAnswer: `999`, acceptableAnswers: [`999`], unitHint: `number`,
            explanation: `He had chaired 999 meetings and was looking forward to his 1000th address.`
        },
        {
            conceptName: 'Duration in Alternate World', difficulty: 'Recall',
            question: `For how many days did Professor Gaitonde live in the alternate reality (matching his coma duration)?`,
            correctAnswer: `2`, acceptableAnswers: [`2`, `2 days`, `two`, `two days`], unitHint: `days`,
            explanation: `He spent two days in the alternate reality while unconscious after the truck collision.`
        }
    ].map(q => ({ type: 'fill', section: 'Section B • Fill-in', ...q }));

    return [...mcqs, ...fills];
}

export function generateOfflineChapter20Questions(subject, chapterTitle, prereqList, topicList, setIndex = 1) {
    const titleLower = (chapterTitle || '').toLowerCase();
    if (subject === 'Mathematics' && titleLower.includes('straight line')) {
        return buildOfflineStraightLinesQuiz(setIndex);
    }
    if (subject === 'Physics' && titleLower.includes('motion in a straight line')) {
        return buildOfflineKinematicsQuiz(setIndex);
    }
    if (subject === 'English' && titleLower.includes('the adventure')) {
        return buildOfflineAdventureQuiz();
    }

    // Chapter-aware, 20-distinct-question offline generator for any other chapter
    // Ensures all 20 questions have unique stems, unique focus angles, and shuffled options.
    const topics = (topicList || []).map(t => typeof t === 'string' ? t : t.title);
    const prereqs = (prereqList || []).map(p => typeof p === 'string' ? p : p.title);
    const safeTopics = topics.length >= 4 ? topics : [
        `${chapterTitle} Core Definitions`,
        `${chapterTitle} Governing Laws`,
        `${chapterTitle} Analytical Methods`,
        `${chapterTitle} Exam Applications`
    ];
    const safePrereqs = prereqs.length >= 4 ? prereqs : [
        `Foundational ${subject} Terminology`,
        `Prior Grade Quantitative Skills`,
        `Graphical & Structural Reasoning`,
        `Problem-Solving Verification`
    ];

    const mcqTemplates = [
        {
            concept: safeTopics[0], diff: 'Conceptual',
            q: `In Class 11 ${subject} ("${chapterTitle}"), which statement best describes the primary purpose of "${safeTopics[0]}"?`,
            opts: [
                `It establishes the core NCERT definition and framework used across "${chapterTitle}"`,
                `It is an optional historical footnote never used in problem solving`,
                `It replaces all earlier-grade ${subject} rules with contradictory assumptions`,
                `It applies exclusively to Grade 12 topics outside "${chapterTitle}"`
            ],
            exp: `"${safeTopics[0]}" is the foundational pillar of "${chapterTitle}" in Class 11 ${subject}.`
        },
        {
            concept: safeTopics[1], diff: 'Application',
            q: `When solving an exam problem on "${safeTopics[1]}" in "${chapterTitle}", what is the most reliable first step?`,
            opts: [
                `Identify given conditions, state the governing principle of "${safeTopics[1]}", and check boundary constraints`,
                `Skip the governing rule and guess a final value directly from memory`,
                `Apply an unrelated formula from a different unit without checking units or context`,
                `Ignore all constraints and assume every variable equals zero`
            ],
            exp: `Structured NCERT solutions for "${safeTopics[1]}" always begin by listing givens and verifying applicable constraints.`
        },
        {
            concept: safeTopics[2], diff: 'Analytical',
            q: `How does "${safeTopics[2]}" extend earlier concepts from "${safeTopics[0]}" within "${chapterTitle}"?`,
            opts: [
                `It builds directly on "${safeTopics[0]}" to handle multi-step or more general cases in "${chapterTitle}"`,
                `It completely invalidates "${safeTopics[0]}" under standard NCERT conditions`,
                `It is strictly identical to "${safeTopics[0]}" with no additional methods`,
                `It removes the need for any prerequisite knowledge from earlier grades`
            ],
            exp: `NCERT chapters progress sequentially: "${safeTopics[2]}" generalizes and applies the foundations of "${safeTopics[0]}".`
        },
        {
            concept: safeTopics[3], diff: 'Hard / Exam Level',
            q: `Which common mistake most frequently causes students to lose marks on "${safeTopics[3]}" in "${chapterTitle}"?`,
            opts: [
                `Overlooking sign conventions, domain/unit limits, or specific conditions required by "${safeTopics[3]}"`,
                `Writing out intermediate reasoning steps clearly before concluding`,
                `Cross-checking the final result against the definitions in "${chapterTitle}"`,
                `Connecting the problem to its prerequisite "${safePrereqs[3]}"`
            ],
            exp: `Most exam errors in "${safeTopics[3]}" stem from neglecting boundary conditions, signs, or units.`
        },
        {
            concept: safePrereqs[0], diff: 'Bridge / Prerequisite',
            q: `Why is the earlier-grade prerequisite "${safePrereqs[0]}" essential before studying "${chapterTitle}"?`,
            opts: [
                `It provides the baseline language and mechanics directly invoked when learning "${safeTopics[0]}"`,
                `It is only tested in primary school and never appears in Class 11 ${subject}`,
                `It contradicts the Class 11 NCERT treatment of "${chapterTitle}"`,
                `It is only needed for laboratory attendance rather than theory`
            ],
            exp: `"${safePrereqs[0]}" is the direct lower-grade bridge into "${safeTopics[0]}".`
        },
        {
            concept: safePrereqs[1], diff: 'Bridge / Prerequisite',
            q: `If a student struggles with "${safeTopics[1]}" in "${chapterTitle}", which earlier-grade foundation should they remediate first?`,
            opts: [
                `${safePrereqs[1]}`,
                `Unrelated geography map scales`,
                `Rote memorization of chapter page numbers`,
                `Skipping worked examples entirely`
            ],
            exp: `Mastery of "${safePrereqs[1]}" directly unlocks problem-solving fluency in "${safeTopics[1]}".`
        },
        {
            concept: safeTopics[0], diff: 'Comparative',
            q: `Within "${chapterTitle}", how do "${safeTopics[0]}" and "${safeTopics[1]}" work together in a full-length NCERT question?`,
            opts: [
                `"${safeTopics[0]}" sets up the representation while "${safeTopics[1]}" drives the core derivation or evaluation`,
                `They belong to completely separate subjects and never appear in the same question`,
                `"${safeTopics[1]}" must always be solved before understanding "${safeTopics[0]}"`,
                `Neither topic contributes to numerical or analytical reasoning`
            ],
            exp: `Combined exam questions typically use "${safeTopics[0]}" to frame the problem and "${safeTopics[1]}" to solve it.`
        },
        {
            concept: safeTopics[2], diff: 'Verification',
            q: `After completing a derivation or analysis in "${safeTopics[2]}", what is the best sanity check?`,
            opts: [
                `Test limiting/extreme cases and verify consistency with "${safeTopics[0]}" and "${safePrereqs[2]}"`,
                `Assume the first draft is always exact without checking`,
                `Change the question's given data to match your answer`,
                `Remove all justifications from the final response`
            ],
            exp: `Checking limiting cases and consistency with foundational rules catches algebraic and conceptual slips.`
        },
        {
            concept: safePrereqs[2], diff: 'Bridge / Synthesis',
            q: `In "${chapterTitle}", which pair correctly matches a Class 11 subtopic with its supporting prerequisite?`,
            opts: [
                `"${safeTopics[2]}" supported by "${safePrereqs[2]}"`,
                `"${safeTopics[2]}" supported by memorizing random dates`,
                `"${safeTopics[3]}" supported by ignoring all definitions`,
                `"${safeTopics[0]}" supported by skipping unit checks`
            ],
            exp: `"${safePrereqs[2]}" provides the foundational toolkit needed for "${safeTopics[2]}".`
        },
        {
            concept: safeTopics[3], diff: 'Synthesis',
            q: `To achieve full mastery of "${chapterTitle}" (${subject}), what sequence of study is recommended by the BridgeLearn two-stage model?`,
            opts: [
                `Verify Stage 1 prerequisites (${safePrereqs[0]} → ${safePrereqs[3]}) first, then master Stage 2 subtopics (${safeTopics[0]} → ${safeTopics[3]})`,
                `Attempt only the hardest synthesis questions without reviewing prerequisites`,
                `Memorize final answers without understanding "${safeTopics[1]}" or "${safeTopics[2]}"`,
                `Study only one subtopic and skip the remaining three`
            ],
            exp: `Closing Stage 1 prerequisite gaps first makes Stage 2 Class 11 subtopics significantly faster to master.`
        }
    ].map(item => shuffleMcqOptions({
        type: 'mcq',
        section: 'Section A • MCQ',
        conceptName: item.concept,
        difficulty: item.diff,
        question: item.q,
        options: item.opts,
        correctIndex: 0,
        explanation: item.exp
    }));

    const fillItems = [
        {
            conceptName: safeTopics[0], difficulty: 'Recall',
            question: `What is the exact name of this Class 11 ${subject} chapter?`,
            correctAnswer: chapterTitle, acceptableAnswers: [chapterTitle, chapterTitle.toLowerCase()], unitHint: `chapter title`,
            explanation: `The active chapter is "${chapterTitle}" in Class 11 ${subject}.`
        },
        {
            conceptName: safeTopics[0], difficulty: 'Structure',
            question: `Which Stage 2 subtopic is listed first in "${chapterTitle}"? (Hint: starts with "${safeTopics[0].slice(0, 6)}...")`,
            correctAnswer: safeTopics[0], acceptableAnswers: [safeTopics[0], safeTopics[0].split(' ')[0]], unitHint: `subtopic name`,
            explanation: `Subtopic #1 of "${chapterTitle}" is "${safeTopics[0]}".`
        },
        {
            conceptName: safeTopics[1], difficulty: 'Structure',
            question: `Name the second core Class 11 subtopic of "${chapterTitle}". (Hint: starts with "${safeTopics[1].slice(0, 6)}...")`,
            correctAnswer: safeTopics[1], acceptableAnswers: [safeTopics[1], safeTopics[1].split(' ')[0]], unitHint: `subtopic name`,
            explanation: `Subtopic #2 of "${chapterTitle}" is "${safeTopics[1]}".`
        },
        {
            conceptName: safeTopics[2], difficulty: 'Structure',
            question: `Name the third core Class 11 subtopic of "${chapterTitle}". (Hint: starts with "${safeTopics[2].slice(0, 6)}...")`,
            correctAnswer: safeTopics[2], acceptableAnswers: [safeTopics[2], safeTopics[2].split(' ')[0]], unitHint: `subtopic name`,
            explanation: `Subtopic #3 of "${chapterTitle}" is "${safeTopics[2]}".`
        },
        {
            conceptName: safeTopics[3], difficulty: 'Structure',
            question: `Name the fourth core Class 11 subtopic of "${chapterTitle}". (Hint: starts with "${safeTopics[3].slice(0, 6)}...")`,
            correctAnswer: safeTopics[3], acceptableAnswers: [safeTopics[3], safeTopics[3].split(' ')[0]], unitHint: `subtopic name`,
            explanation: `Subtopic #4 of "${chapterTitle}" is "${safeTopics[3]}".`
        },
        {
            conceptName: safePrereqs[0], difficulty: 'Prerequisite',
            question: `Identify Base Prerequisite #1 needed before studying "${chapterTitle}". (Hint: starts with "${safePrereqs[0].slice(0, 6)}...")`,
            correctAnswer: safePrereqs[0], acceptableAnswers: [safePrereqs[0], safePrereqs[0].split(' ')[0]], unitHint: `prerequisite name`,
            explanation: `Base Prerequisite #1 is "${safePrereqs[0]}".`
        },
        {
            conceptName: safePrereqs[1], difficulty: 'Prerequisite',
            question: `Identify Base Prerequisite #2 needed for "${chapterTitle}". (Hint: starts with "${safePrereqs[1].slice(0, 6)}...")`,
            correctAnswer: safePrereqs[1], acceptableAnswers: [safePrereqs[1], safePrereqs[1].split(' ')[0]], unitHint: `prerequisite name`,
            explanation: `Base Prerequisite #2 is "${safePrereqs[1]}".`
        },
        {
            conceptName: safePrereqs[2], difficulty: 'Prerequisite',
            question: `Identify Base Prerequisite #3 needed for "${chapterTitle}". (Hint: starts with "${safePrereqs[2].slice(0, 6)}...")`,
            correctAnswer: safePrereqs[2], acceptableAnswers: [safePrereqs[2], safePrereqs[2].split(' ')[0]], unitHint: `prerequisite name`,
            explanation: `Base Prerequisite #3 is "${safePrereqs[2]}".`
        },
        {
            conceptName: safePrereqs[3], difficulty: 'Prerequisite',
            question: `Identify Base Prerequisite #4 needed for "${chapterTitle}". (Hint: starts with "${safePrereqs[3].slice(0, 6)}...")`,
            correctAnswer: safePrereqs[3], acceptableAnswers: [safePrereqs[3], safePrereqs[3].split(' ')[0]], unitHint: `prerequisite name`,
            explanation: `Base Prerequisite #4 is "${safePrereqs[3]}".`
        },
        {
            conceptName: 'Curriculum Alignment', difficulty: 'Recall',
            question: `Which Class 11 subject does "${chapterTitle}" belong to?`,
            correctAnswer: subject, acceptableAnswers: [subject, subject.toLowerCase()], unitHint: `subject name`,
            explanation: `"${chapterTitle}" is part of Class 11 ${subject}. Tip: Configure a Gemini or OpenAI API key to generate deep exam-grade numericals & literary questions for every chapter!`
        }
    ].map(q => ({ type: 'fill', section: 'Section B • Fill-in', ...q }));

    return [...mcqTemplates, ...fillItems];
}
