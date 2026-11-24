export const CONCEPT_KNOWLEDGE_BASE = {
    "Slope of a Line (m = tan θ)": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 Mathematics (Ch 9)",
        overview: "The slope m of a non-vertical line is the tangent of its inclination θ with the positive x-axis. Given two points (x1, y1) and (x2, y2), slope is the ratio of vertical change to horizontal change.",
        formula: "m = tan θ = (y2 - y1) / (x2 - x1)  |  Parallel: m1 = m2  |  Perpendicular: m1 · m2 = -1",
        connection: "Connects 2D Cartesian geometry with trigonometry and derivative slopes (dy/dx) in calculus.",
        example: "Question: Find the slope of a line passing through P(2, 3) and Q(6, 11).\nSolution: m = (11 - 3) / (6 - 2) = 8 / 4 = 2. Inclination θ = arctan(2) ≈ 63.43°."
    },
    "Forms of Line Equations": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 Mathematics (Ch 9)",
        overview: "Lines in 2D space are represented using Slope-Intercept (y = mx + c), Point-Slope (y - y1 = m(x - x1)), Two-Point, Intercept (x/a + y/b = 1), and Normal Form (x cos ω + y sin ω = p).",
        formula: "Slope-Intercept: y = mx + c  |  Point-Slope: y - y1 = m(x - x1)  |  General: Ax + By + C = 0",
        connection: "Converts geometric line conditions directly into solvable algebraic equations.",
        example: "Question: Find the equation of the line passing through (3, -4) with slope m = -2.\nSolution: y - (-4) = -2(x - 3) ⇒ y + 4 = -2x + 6 ⇒ 2x + y - 2 = 0."
    },
    "Distance of Point from a Line": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 Mathematics (Ch 9)",
        overview: "The perpendicular distance d from a point (x1, y1) to a line Ax + By + C = 0 is the shortest spatial distance between the point and the line.",
        formula: "d = |A x1 + B y1 + C| / √(A² + B²)  |  Parallel lines: d = |C1 - C2| / √(A² + B²)",
        connection: "Crucial for determining tangent lines to circles, conics, and optimization boundaries.",
        example: "Question: Calculate the perpendicular distance from P(4, 1) to 3x - 4y + 12 = 0.\nSolution: d = |3(4) - 4(1) + 12| / √(3² + (-4)²) = 20 / 5 = 4 units."
    },
    "Angle Between Two Lines": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 Mathematics (Ch 9)",
        overview: "When two non-perpendicular lines with slopes m1 and m2 intersect, the acute angle θ between them is derived from the tangent subtraction identity.",
        formula: "tan θ = |(m2 - m1) / (1 + m1 m2)|  where 1 + m1 m2 ≠ 0",
        connection: "Used in determining vector directions, reflections, and intersection angles.",
        example: "Question: Find the acute angle between lines with slopes m1 = 3 and m2 = 1/2.\nSolution: tan θ = |(0.5 - 3) / (1 + 1.5)| = |-2.5 / 2.5| = 1 ⇒ θ = 45°."
    },
    "Path Length vs Displacement": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 Physics (Ch 2)",
        overview: "Path length (distance) is a scalar representing total trajectory length. Displacement is the shortest vector directed from initial position x1 to final position x2.",
        formula: "Displacement Δx = x_final - x_initial  |  Path Length ≥ |Δx|",
        connection: "Builds on 1D vector signs and distance basics; essential for instantaneous velocity.",
        example: "Question: An athlete completes 1 full circular lap of radius R = 7 m. Find path length and displacement.\nSolution: Path length = 2πR = 44 m. Displacement = 0 m (returns to start)."
    },
    "Average & Instantaneous Velocity": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 Physics (Ch 2)",
        overview: "Average velocity is total displacement divided by Δt. Instantaneous velocity is the limiting value of average velocity as Δt → 0 (the derivative dx/dt).",
        formula: "v_avg = Δx / Δt  |  v_inst = lim (Δt→0) Δx/Δt = dx/dt",
        connection: "Connects graph tangent slopes and calculus limits to exact motion at any instant t.",
        example: "Question: Position x(t) = 3t² + 2t + 1. Find instantaneous velocity at t = 2 s.\nSolution: v(t) = dx/dt = 6t + 2. At t = 2 s: v(2) = 14 m/s."
    },
    "Uniformly Accelerated Motion": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 Physics (Ch 2)",
        overview: "Motion where velocity changes at a constant rate over equal time intervals. Acceleration a = (v - u)/t is constant in magnitude and direction.",
        formula: "a = (v - u) / t = constant  |  a = dv/dt = d²x/dt²",
        connection: "Forms the foundational bridge for Newton's 2nd Law (F = ma) and work-energy derivations.",
        example: "Question: A car accelerates uniformly from 10 m/s to 30 m/s in 5 s. Find a.\nSolution: a = (30 - 10) / 5 = 4 m/s²."
    },
    "Kinematic Equations & Free Fall": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 Physics (Ch 2)",
        overview: "Three fundamental equations connecting initial velocity u, final velocity v, constant acceleration a, time t, and displacement s. In free fall, a = -g.",
        formula: "v = u + at  |  s = ut + ½at²  |  v² = u² + 2as",
        connection: "Applies 1D vector sign rules and algebraic substitution to free fall and braking problems.",
        example: "Question: A stone is dropped from rest (u=0) from 45 m (g = 10 m/s²). Find fall time.\nSolution: 45 = ½(10)t² ⇒ t² = 9 ⇒ t = 3 s."
    },
    "Jayant Narlikar Sci-Fi & History": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 English Hornbill (Ch 4)",
        overview: "Astrophysicist Jayant Narlikar blends speculative science fiction with Indian history, imagining an alternate timeline where the Marathas won the Third Battle of Panipat (1761).",
        formula: "Genre Fusion: Historical Counterfactual + Theoretical Physics (Catastrophe & Quantum Theory)",
        connection: "Demonstrates how narrative fiction can popularize abstract physics concepts through a relatable historian protagonist, Professor Gaitonde.",
        example: "Question: Who is the protagonist of 'The Adventure' and what is his profession?\nSolution: Professor Gangadharpant Gaitonde, a respected historian from Pune."
    },
    "Alternate Reality Battle of Panipat": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 English Hornbill (Ch 4)",
        overview: "In the alternate timeline Gaitonde visits, Vishwasrao narrowly escapes the bullet at Panipat in 1761, boosting Maratha morale and preventing British colonial dominance over India.",
        formula: "Bifurcation Point: 1761 Panipat → Vishwasrao survives → Maratha confederacy expands → East India Company stays confined to Bombay/Calcutta/Madras",
        connection: "Illustrates how a single microscopic event can trigger a dramatic macroscopic divergence in history.",
        example: "Question: What physical evidence did Gaitonde bring back from the alternate world?\nSolution: A torn page from Bakhar (Bhausahebanchi Bakhar) describing Vishwasrao's narrow escape."
    },
    "Catastrophe Theory & Quantum Physics Connection": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 English Hornbill (Ch 4)",
        overview: "Rajendra Deshpande explains Gaitonde's experience using two scientific theories: Catastrophe Theory (small cause → huge shift) and lack of determinism in Quantum Theory (many-worlds interpretation).",
        formula: "Catastrophe Theory (Panipat bifurcation) + Quantum Lack of Determinism (parallel realities)",
        connection: "Bridges Gaitonde's coma after a truck collision with the transition of his consciousness between two equally valid quantum realities.",
        example: "Question: Why did Gaitonde transition specifically to the alternate Panipat reality during his accident?\nSolution: At the moment of collision, his mind was intensely focused on the Battle of Panipat and catastrophe theory."
    },
    "Parallel Realities & Frame Narrative": {
        type: "Class 11 Subtopic",
        grade: "Grade 11 English Hornbill (Ch 4)",
        overview: "The story begins in medias res on the Jijamata Express to an unfamiliar Bombay (with British-run Forbes Building and Victoria Terminus) before framing the experience through Rajendra's scientific explanation.",
        formula: "Structure: Alternate Bombay Experience → Town Hall Library Discovery → Azad Maidan Incident → Rajendra's Scientific Framing",
        connection: "Uses first-hand historical details (East India House, Anglo-Indian clerks, untouched presidential chair) to ground the sci-fi twist.",
        example: "Question: Why did the crowd at Azad Maidan throw eggs and tomatoes at Professor Gaitonde?\nSolution: Because in that reality, people had abolished the custom of a chairperson, yet Gaitonde insisted on sitting in the empty presidential chair."
    }
};

export function getConceptData(conceptName, subject = "General", chapterTitle = "", isSubtopic = false) {
    if (CONCEPT_KNOWLEDGE_BASE[conceptName]) {
        return CONCEPT_KNOWLEDGE_BASE[conceptName];
    }
    const cleanName = conceptName || "NCERT Topic";
    const cleanChap = chapterTitle || "Class 11 Module";

    if (subject === 'Mathematics') {
        return {
            type: isSubtopic ? "Class 11 Subtopic" : "Base Prerequisite",
            grade: isSubtopic ? "Grade 11 Mathematics" : "Grade 9-10 Foundation",
            overview: `${cleanName} is a core mathematical concept in ${cleanChap}, focusing on symbolic formulation, geometric interpretation, and exact algebraic problem-solving.`,
            formula: `Mathematical Representation in ${cleanChap}: Apply standard NCERT definitions and domain constraints for ${cleanName}.`,
            connection: isSubtopic
                ? `Extends earlier coordinate, algebraic, and trigonometric rules into Class 11 ${cleanChap} derivations and exam problems.`
                : `Supplies the algebraic manipulation and foundational properties required before solving Class 11 ${cleanChap} problems.`,
            example: `Question: Apply ${cleanName} to simplify a standard ${cleanChap} expression.\nSolution: Identify given parameters, substitute into the governing ${cleanName} identity, and verify domain restrictions.`
        };
    } else if (subject === 'Physics') {
        return {
            type: isSubtopic ? "Class 11 Subtopic" : "Base Prerequisite",
            grade: isSubtopic ? "Grade 11 Physics" : "Grade 9-10 Physics",
            overview: `${cleanName} examines physical laws, SI relationships, and analytical modeling within ${cleanChap}.`,
            formula: `Physical Relation in ${cleanChap}: Verify SI units, vector directions, and limiting cases for ${cleanName}.`,
            connection: isSubtopic
                ? `Connects observable physical behavior in ${cleanChap} to quantitative equations and graph analysis.`
                : `Establishes unit consistency, vector sign conventions, and graphical reasoning needed for ${cleanChap}.`,
            example: `Question: Analyze a physical system governed by ${cleanName} in ${cleanChap}.\nSolution: Convert all quantities to SI units, apply the governing law for ${cleanName}, and check dimensional consistency.`
        };
    } else if (subject === 'Chemistry') {
        return {
            type: isSubtopic ? "Class 11 Subtopic" : "Base Prerequisite",
            grade: isSubtopic ? "Grade 11 Chemistry" : "Grade 9-10 Chemistry",
            overview: `${cleanName} explains chemical structure, energetics, or quantitative stoichiometry in ${cleanChap}.`,
            formula: `Chemical Principle in ${cleanChap}: Balance mass/charge and apply standard NCERT rules for ${cleanName}.`,
            connection: isSubtopic
                ? `Links atomic/molecular structure directly to macroscopic properties and reaction trends in ${cleanChap}.`
                : `Provides essential atomic, valency, and stoichiometry foundations required for ${cleanChap}.`,
            example: `Question: Apply ${cleanName} to predict the outcome of a Class 11 ${cleanChap} problem.\nSolution: Write the relevant species/balanced equation, apply ${cleanName}, and verify conservation of atoms and charge.`
        };
    } else if (subject === 'Computer Science') {
        return {
            type: isSubtopic ? "Class 11 Subtopic" : "Base Prerequisite",
            grade: isSubtopic ? "Grade 11 Computer Science" : "Grade 8-10 Computer Science",
            overview: `${cleanName} covers algorithmic logic, representation rules, or Python 3 implementation concepts in ${cleanChap}.`,
            formula: `Computing Rule in ${cleanChap}: Trace state step-by-step and verify edge cases for ${cleanName}.`,
            connection: isSubtopic
                ? `Enables writing clean, bug-free Python programs and tracing exact outputs for ${cleanChap}.`
                : `Builds core logical thinking, binary/data representation, and flow-control basics for ${cleanChap}.`,
            example: `Question: Trace an example demonstrating ${cleanName} in ${cleanChap}.\nSolution: Track each variable or bit state per step, apply Python/architecture rules, and verify the final output.`
        };
    } else {
        return {
            type: isSubtopic ? "Class 11 Subtopic" : "Base Prerequisite",
            grade: isSubtopic ? "Grade 11 English (Hornbill / Snapshots)" : "Grade 9-10 English",
            overview: `${cleanName} analyzes narrative craft, thematic significance, character arcs, and literary devices in ${cleanChap}.`,
            formula: `Literary Analysis Framework: Textual Evidence + Device/Technique + Thematic Impact`,
            connection: isSubtopic
                ? `Deepens critical interpretation of authorial intent, tone, and subtext in ${cleanChap}.`
                : `Strengthens close-reading, figurative language recognition, and inference skills needed for ${cleanChap}.`,
            example: `Question: Explain how ${cleanName} shapes the reader's understanding of ${cleanChap}.\nSolution: Cite a key textual moment, identify the literary technique, and connect it to the central theme.`
        };
    }
}
