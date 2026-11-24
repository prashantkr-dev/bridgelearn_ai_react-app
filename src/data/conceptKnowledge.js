/**
 * Authentic NCERT Knowledge Base for Class 11 Foundational Prerequisites & Chapter Subtopics.
 * Provides distinct, scientifically and mathematically accurate explanations, formulas,
 * worked step-by-step examples, and conceptual connections for every topic.
 */

export const CONCEPT_KNOWLEDGE_BASE = {
  // ═══════════════════════════════════════════════════════════════════════════
  // MATHEMATICS: CHAPTER 1 — SETS
  // ═══════════════════════════════════════════════════════════════════════════
  "Number Classification (N, Z, Q, R)": {
    type: "Base Prerequisite",
    grade: "Grade 9-10 Number Systems",
    overview: "Real numbers are hierarchically classified into nested number systems: Natural numbers N = {1, 2, 3...}, Whole numbers W = {0, 1, 2...}, Integers Z = {..., -2, -1, 0, 1, 2...}, Rational numbers Q = {p/q : p, q ∈ Z, q ≠ 0}, Irrational numbers T (non-terminating, non-repeating decimals such as √2, π), and Real numbers R = Q ∪ T.",
    formula: "N ⊂ W ⊂ Z ⊂ Q ⊂ R  |  R \\ Q = T (Irrationals)  |  Z⁺ = {1, 2, 3...}",
    connection: "Sets in Class 11 rely on standard universal sets (N, Z, Q, R) to define domain restrictions, roster elements, and interval solutions.",
    example: "Question: Express the set S = {x : x ∈ Z and -3 ≤ x < 4} in roster notation.\nSolution: Integers satisfying -3 ≤ x < 4 are -3, -2, -1, 0, 1, 2, 3.\nTherefore: S = {-3, -2, -1, 0, 1, 2, 3}."
  },
  "Prime & Composite Factors": {
    type: "Base Prerequisite",
    grade: "Grade 8-10 Arithmetic",
    overview: "A prime number is an integer greater than 1 whose only positive divisors are 1 and itself (e.g., 2, 3, 5, 7, 11). A composite number has more than two distinct positive factors. The number 1 is unique — neither prime nor composite. By the Fundamental Theorem of Arithmetic, every composite integer can be uniquely factored into prime powers.",
    formula: "Prime: divisors(p) = {1, p} (p > 1)  |  Canonical: n = p₁ᵃ¹ · p₂ᵃ² · ... · pₖᵃᵏ",
    connection: "Used in Class 11 to define finite sets, identify common factors for set intersections, and verify roster form listings.",
    example: "Question: Write set A = {x : x is a prime divisor of 60} in roster form.\nSolution: All divisors of 60: {1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60}.\nFiltering for prime numbers only gives: 2, 3, 5.\nTherefore: A = {2, 3, 5}."
  },
  "Logical Union & Intersection": {
    type: "Base Prerequisite",
    grade: "Grade 9-10 Logic & Sets",
    overview: "Logical 'OR' corresponds to Set Union (an element belongs to A ∪ B if it is in A, in B, or in both). Logical 'AND' corresponds to Set Intersection (an element belongs to A ∩ B only if it is simultaneously in A and in B). If two sets share no elements, their intersection is the empty set ∅ (disjoint sets).",
    formula: "Union: A ∪ B = {x : x ∈ A or x ∈ B}  |  Intersection: A ∩ B = {x : x ∈ A and x ∈ B}  |  Disjoint: A ∩ B = ∅",
    connection: "Directly bridges mathematical logic into Venn diagram proofs, probability addition theorems, and compound inequalities in Class 11.",
    example: "Question: Given A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, find A ∪ B and A ∩ B.\nSolution:\nUnion (all unique elements in either): A ∪ B = {1, 2, 3, 4, 5, 6}.\nIntersection (common elements only): A ∩ B = {3, 4}."
  },
  "Interval Notation": {
    type: "Base Prerequisite",
    grade: "Grade 10 Coordinate & Real Lines",
    overview: "Interval notation represents continuous segments of the real number line without listing infinite individual points. Round parentheses (a, b) denote open endpoints (strictly greater/less than), whereas square brackets [a, b] denote closed endpoints (greater than or equal to / less than or equal to).",
    formula: "Open: (a, b) = {x ∈ R : a < x < b}  |  Closed: [a, b] = {x ∈ R : a ≤ x ≤ b}  |  Half-Open: (a, b] = {x ∈ R : a < x ≤ b}",
    connection: "Essential throughout Class 11 for describing function domains, ranges, polynomial inequalities, and calculus limit boundaries.",
    example: "Question: Convert the set inequality {x ∈ R : -5 ≤ x < 2} into interval notation.\nSolution: -5 is included (use bracket '['), while 2 is strictly excluded (use parenthesis ')').\nInterval representation: [-5, 2)."
  },
  "Roster & Set-Builder Representation": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Mathematics (Ch 1)",
    overview: "A set is a well-defined collection of distinct objects. Roster (tabular) form lists all elements explicitly between curly braces { }, separated by commas, with order being immaterial and elements never repeated. Set-builder form characterizes all elements through a shared algebraic rule or property: {x : P(x)}.",
    formula: "Roster: A = {a₁, a₂, ...}  |  Set-Builder: A = {x : x satisfies property P(x)}",
    connection: "The foundational language of Class 11 mathematics used to specify relation domains, probability spaces, and geometric loci.",
    example: "Question: Express the set S = {1, 4, 9, 16, 25, 36} in set-builder form.\nSolution: Notice that each element is the square of an integer from 1 to 6 (1², 2², 3², 4², 5², 6²).\nSet-builder notation: S = {x : x = n², n ∈ N and 1 ≤ n ≤ 6}."
  },
  "Subsets & Power Sets": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Mathematics (Ch 1)",
    overview: "Set A is a subset of B (A ⊆ B) if every member of A is also in B. The empty set ∅ is a subset of every set. The Power Set P(A) is the set of all possible subsets of A. For any finite set with n elements, the total number of subsets is 2ⁿ, and the number of proper subsets is 2ⁿ - 1.",
    formula: "A ⊆ B ⇔ (x ∈ A ⇒ x ∈ B)  |  |P(A)| = 2ⁿ  |  Proper subsets: 2ⁿ - 1  |  ∅ ⊆ A",
    connection: "Directly determines the size of probability sample spaces and binary truth combination tables in advanced algebra.",
    example: "Question: Find the power set P(S) for S = {x, y}.\nSolution: Here n = 2 elements, so total subsets = 2² = 4.\nSubsets: ∅ (empty set), {x}, {y}, and {x, y}.\nPower set: P(S) = {∅, {x}, {y}, {x, y}}."
  },
  "Venn Diagrams & Operations": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Mathematics (Ch 1)",
    overview: "Venn diagrams visually represent sets as circles inside a universal set rectangle U. Key operations: Union (A ∪ B), Intersection (A ∩ B), Set Difference A - B (elements in A but not in B), and Complement A' = U - A (all elements in universal set outside A).",
    formula: "n(A ∪ B) = n(A) + n(B) - n(A ∩ B)  |  A - B = A ∩ B'  |  A ∪ A' = U, A ∩ A' = ∅",
    connection: "Provides visual and algebraic tools for solving complex surveying, demographic, and multi-event probability problems.",
    example: "Question: In a group of 60 students, 35 play cricket, 30 play football, and 15 play both. How many play neither sport?\nSolution: Total = 60. n(C) = 35, n(F) = 30, n(C ∩ F) = 15.\nn(C ∪ F) = 35 + 30 - 15 = 50 students play at least one sport.\nNeither = Total - n(C ∪ F) = 60 - 50 = 10 students."
  },
  "De Morgan's Laws": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Mathematics (Ch 1)",
    overview: "De Morgan's Laws describe the duality between set operations and complementation: The complement of the union of two sets is the intersection of their individual complements, and the complement of the intersection is the union of their complements.",
    formula: "(A ∪ B)' = A' ∩ B'  |  (A ∩ B)' = A' ∪ B'",
    connection: "Fundamental in digital electronics, Boolean algebra circuit minimization (NAND/NOR logic), and complementary probability.",
    example: "Question: Given U = {1, 2, 3, 4, 5, 6}, A = {2, 3}, B = {3, 4, 5}. Verify (A ∪ B)' = A' ∩ B'.\nSolution:\nA ∪ B = {2, 3, 4, 5} ⇒ (A ∪ B)' = U \\ {2, 3, 4, 5} = {1, 6}.\nA' = {1, 4, 5, 6} and B' = {1, 2, 6}.\nA' ∩ B' = {1, 4, 5, 6} ∩ {1, 2, 6} = {1, 6}.\nBoth sides equal {1, 6}, confirming (A ∪ B)' = A' ∩ B'."
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MATHEMATICS: CHAPTER 2 — RELATIONS AND FUNCTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  "Ordered Pairs & 2D Graphing": {
    type: "Base Prerequisite",
    grade: "Grade 9-10 Coordinate Geometry",
    overview: "An ordered pair (a, b) consists of two objects listed in a specific sequence, where (a, b) = (c, d) if and only if a = c and b = d. In the Cartesian coordinate plane, the first component represents horizontal displacement (abscissa x) and the second represents vertical displacement (ordinate y).",
    formula: "(a, b) = (c, d) ⇔ a = c and b = d  |  Origin: (0, 0)",
    connection: "Forms the foundational geometry required to define the Cartesian Product A × B and graph all relations and functions.",
    example: "Question: If (2x + 1, y - 3) = (7, 4), find the values of x and y.\nSolution: Equating respective coordinates:\n2x + 1 = 7 ⇒ 2x = 6 ⇒ x = 3.\ny - 3 = 4 ⇒ y = 7.\nTherefore, x = 3, y = 7."
  },
  "Polynomial Expressions": {
    type: "Base Prerequisite",
    grade: "Grade 9-10 Algebra",
    overview: "An algebraic expression P(x) = aₙxⁿ + ... + a₁x + a₀ with real coefficients and non-negative integer exponents. Quadratic polynomials ax² + bx + c have roots given by the quadratic formula, and their graphs are parabolas with vertex at x = -b/(2a).",
    formula: "P(x) = ∑ aᵢ xⁱ  |  Roots: x = [-b ± √(b² - 4ac)] / (2a)",
    connection: "Polynomials serve as standard prototype functions in Class 11 for exploring domain, range, continuity, and derivatives.",
    example: "Question: Find the zeros of the polynomial f(x) = x² - 5x + 6.\nSolution: Factorize: (x - 2)(x - 3) = 0.\nHence, the zeros are x = 2 and x = 3."
  },
  "Domain Inequality Restrictions": {
    type: "Base Prerequisite",
    grade: "Grade 10 Algebra & Real Numbers",
    overview: "Real functions f(x) require output values to remain strictly in R. Two universal restrictions apply: (1) Denominators can never equal zero (division by zero is undefined); (2) Quantities inside even roots (square roots) must be non-negative (≥ 0).",
    formula: "For f(x) = g(x)/h(x): h(x) ≠ 0  |  For f(x) = √(g(x)): g(x) ≥ 0",
    connection: "The fundamental algebraic method for determining valid domains and ranges of real-valued functions in Class 11.",
    example: "Question: Find the domain of f(x) = 1 / √(9 - x²).\nSolution: The term inside the square root in the denominator must be strictly positive:\n9 - x² > 0 ⇒ x² < 9 ⇒ -3 < x < 3.\nDomain: (-3, 3)."
  },
  "Mapping Diagrams": {
    type: "Base Prerequisite",
    grade: "Grade 10 Relations",
    overview: "A visual diagram showing two sets A and B with directed arrows from elements of A to elements of B. A relation is a function if and only if every element in domain set A has exactly one outgoing arrow to a unique element in codomain set B.",
    formula: "Function test: ∀ x ∈ A, ∃! y ∈ B such that (x, y) ∈ f",
    connection: "Builds intuitive visual understanding of one-one (injective), many-one, and onto (surjective) functions.",
    example: "Question: Does the relation R = {(1, 2), (2, 3), (1, 4)} define a function?\nSolution: The element 1 in the domain has two distinct outputs: 2 and 4 (two outgoing arrows from 1).\nTherefore, R is NOT a function."
  },
  "Cartesian Product A × B": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Mathematics (Ch 2)",
    overview: "Given two non-empty sets A and B, the Cartesian product A × B is the set of all ordered pairs (a, b) such that a ∈ A and b ∈ B. If set A has p elements and set B has q elements, then A × B has p × q elements. Any subset of A × B is called a relation from A to B.",
    formula: "A × B = {(a, b) : a ∈ A, b ∈ B}  |  |A × B| = |A| · |B| = p · q  |  Total relations: 2^(p·q)",
    connection: "Forms the mathematical backbone connecting pure set theory to analytic functions and matrix representations.",
    example: "Question: If A = {1, 2} and B = {x, y, z}, find A × B and the total number of relations from A to B.\nSolution: A × B = {(1, x), (1, y), (1, z), (2, x), (2, y), (2, z)}.\nNumber of elements: 2 × 3 = 6. Total possible relations = 2⁶ = 64."
  },
  "Domain, Codomain & Range": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Mathematics (Ch 2)",
    overview: "For a relation or function f: A → B, the Domain is the set of all first components of the ordered pairs (all valid inputs x). The Codomain is the entire target set B. The Range is the set of all actual output values (second components) produced by f, and is always a subset of the codomain.",
    formula: "Domain = {x ∈ A : (x, y) ∈ f}  |  Range = {f(x) : x ∈ Domain} ⊆ Codomain B",
    connection: "Essential for establishing invertible functions in Class 12 and evaluating derivative/integral limits.",
    example: "Question: For f: N → N defined by f(x) = 2x, determine its Domain, Codomain, and Range.\nSolution: Domain = N (all natural numbers {1, 2, 3...}).\nCodomain = N (given target set).\nRange = {2, 4, 6, 8...} (all positive even integers, which is a proper subset of N)."
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MATHEMATICS: CHAPTER 9 — STRAIGHT LINES
  // ═══════════════════════════════════════════════════════════════════════════
  "Distance & Section Formulas (Grade 10)": {
    type: "Base Prerequisite",
    grade: "Grade 10 Coordinate Geometry",
    overview: "The distance d between points (x₁, y₁) and (x₂, y₂) is derived from the Pythagorean theorem: d = √[(x₂ - x₁)² + (y₂ - y₁)²]. The Section Formula finds coordinates of point P dividing the segment between A and B in ratio m:n: P = ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n)).",
    formula: "Distance: d = √[(Δx)² + (Δy)²]  |  Section: ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n))",
    connection: "Directly utilized in deriving line equations, midpoints, centroids, and perpendicular distances in Class 11.",
    example: "Question: Find the distance between P(1, -2) and Q(4, 2).\nSolution: d = √[(4 - 1)² + (2 - (-2))²] = √[3² + 4²] = √[9 + 16] = √25 = 5 units."
  },
  "Linear Graphing (y = mx + c)": {
    type: "Base Prerequisite",
    grade: "Grade 9-10 Coordinate Geometry",
    overview: "A first-degree polynomial in two variables ax + by + c = 0 always graphs as a straight line. The slope-intercept form y = mx + c directly exposes the line's steepness/direction via slope m and its vertical crossing point (y-intercept) at (0, c).",
    formula: "y = mx + c  |  Slope m = rise / run  |  y-intercept = (0, c)",
    connection: "Forms the bridge between algebraic substitution and geometric line visualization across all coordinate geometry chapters.",
    example: "Question: Find the slope and y-intercept of the line 3x + 2y = 8.\nSolution: Rearrange to y = mx + c:\n2y = -3x + 8 ⇒ y = (-3/2)x + 4.\nSlope m = -3/2, y-intercept c = 4."
  },
  "Trigonometry Tangent Function": {
    type: "Base Prerequisite",
    grade: "Grade 10 Trigonometry",
    overview: "The tangent ratio in a right triangle is the ratio of opposite side to adjacent side: tan θ = opposite / adjacent. On the unit circle, tan θ = sin θ / cos θ. Key standard values: tan 0° = 0, tan 30° = 1/√3, tan 45° = 1, tan 60° = √3, and tan 90° is undefined (vertical line).",
    formula: "tan θ = sin θ / cos θ  |  tan(180° - θ) = -tan θ  |  tan 45° = 1, tan 135° = -1",
    connection: "Directly defines line inclination and slope m = tan θ, explaining why parallel lines share slopes and perpendicular slopes multiply to -1.",
    example: "Question: A line makes an inclination angle of 135° with the positive x-axis. Find its slope.\nSolution: Slope m = tan(135°) = tan(180° - 45°) = -tan(45°) = -1."
  },
  "Perpendicular Bisectors": {
    type: "Base Prerequisite",
    grade: "Grade 9-10 Geometry",
    overview: "The perpendicular bisector of a line segment AB is a line that passes through the exact midpoint of AB at a right angle (90°). Every point on the perpendicular bisector is equidistant from the two endpoints A and B.",
    formula: "Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)  |  Perpendicular slope: m_perp = -1 / m_AB",
    connection: "Key technique in Class 11 for finding the circumcenter of a triangle, reflections of points, and circle center equations.",
    example: "Question: Find the slope of the perpendicular bisector of the line joining (1, 2) and (3, 6).\nSolution: Slope of AB: m = (6 - 2) / (3 - 1) = 4 / 2 = 2.\nSlope of perpendicular bisector: m_perp = -1 / 2 = -0.5."
  },
  "Slope of a Line (m = tan θ)": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Mathematics (Ch 9)",
    overview: "The slope m of a non-vertical line is the tangent of its angle of inclination θ measured counter-clockwise from the positive x-axis. Given two distinct points (x₁, y₁) and (x₂, y₂), m is the ratio of vertical change (rise) to horizontal change (run).",
    formula: "m = tan θ = (y₂ - y₁) / (x₂ - x₁)  |  Parallel: m₁ = m₂  |  Perpendicular: m₁ · m₂ = -1",
    connection: "Connects 2D Cartesian geometry with trigonometry and derivative slopes (dy/dx) in calculus.",
    example: "Question: Find the slope of a line passing through P(2, 3) and Q(6, 11).\nSolution: m = (11 - 3) / (6 - 2) = 8 / 4 = 2. Inclination θ = arctan(2) ≈ 63.43°."
  },
  "Forms of Line Equations": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Mathematics (Ch 9)",
    overview: "Lines in 2D space are represented using Slope-Intercept (y = mx + c), Point-Slope (y - y₁ = m(x - x₁)), Two-Point, Intercept (x/a + y/b = 1), and Normal Form (x cos ω + y sin ω = p).",
    formula: "Slope-Intercept: y = mx + c  |  Point-Slope: y - y₁ = m(x - x₁)  |  General: Ax + By + C = 0",
    connection: "Converts geometric line conditions directly into solvable algebraic equations.",
    example: "Question: Find the equation of the line passing through (3, -4) with slope m = -2.\nSolution: y - (-4) = -2(x - 3) ⇒ y + 4 = -2x + 6 ⇒ 2x + y - 2 = 0."
  },
  "Distance of Point from a Line": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Mathematics (Ch 9)",
    overview: "The perpendicular distance d from a point (x₁, y₁) to a line Ax + By + C = 0 is the shortest spatial distance between the point and the line.",
    formula: "d = |A x₁ + B y₁ + C| / √(A² + B²)  |  Parallel lines: d = |C₁ - C₂| / √(A² + B²)",
    connection: "Crucial for determining tangent lines to circles, conics, and optimization boundaries.",
    example: "Question: Calculate the perpendicular distance from P(4, 1) to 3x - 4y + 12 = 0.\nSolution: d = |3(4) - 4(1) + 12| / √(3² + (-4)²) = 20 / 5 = 4 units."
  },
  "Angle Between Two Lines": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Mathematics (Ch 9)",
    overview: "When two non-perpendicular lines with slopes m₁ and m₂ intersect, the acute angle θ between them is derived from the tangent subtraction identity.",
    formula: "tan θ = |(m₂ - m₁) / (1 + m₁ m₂)|  where 1 + m₁ m₂ ≠ 0",
    connection: "Used in determining vector directions, reflections, and intersection angles.",
    example: "Question: Find the acute angle between lines with slopes m₁ = 3 and m₂ = 1/2.\nSolution: tan θ = |(0.5 - 3) / (1 + 1.5)| = |-2.5 / 2.5| = 1 ⇒ θ = 45°."
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHYSICS: CHAPTER 2 — MOTION IN A STRAIGHT LINE
  // ═══════════════════════════════════════════════════════════════════════════
  "Distance, Speed & Time Basics": {
    type: "Base Prerequisite",
    grade: "Grade 7-9 Motion & Kinematics",
    overview: "Scalar kinematics fundamentals: Distance is total ground covered regardless of direction (always non-negative). Average speed is total distance divided by total elapsed time. In SI units, distance is measured in meters (m), time in seconds (s), and speed in meters per second (m/s). Conversion: 1 km/h = 5/18 m/s.",
    formula: "Speed v = Distance / Time  |  Conversion: 1 km/h = 5/18 m/s ≈ 0.278 m/s",
    connection: "Forms the intuitive scalar baseline before introducing vector directions and displacement in 1D.",
    example: "Question: A train covers 72 km in 40 minutes. Find its speed in SI units (m/s).\nSolution: Distance = 72,000 m. Time = 40 × 60 = 2400 s.\nSpeed = 72,000 / 2400 = 30 m/s (or 72 × 5/18 = 30 m/s)."
  },
  "1D Vector Direction & Sign Convention": {
    type: "Base Prerequisite",
    grade: "Grade 9 Vectors & Forces",
    overview: "In one-dimensional motion, vectors lie along a single coordinate axis. Instead of complex angle notation, vector directions are completely captured by algebraic signs: motion to the right or upward is conventionally designated positive (+), while motion to the left or downward is designated negative (-).",
    formula: "Displacement Δx = x_final - x_initial  |  Free fall: a = -g = -9.8 m/s² (downward)",
    connection: "Essential for avoiding negative-sign errors in kinematic equations and vertical projectile free fall.",
    example: "Question: A ball is thrown upward at 20 m/s. Using standard sign convention (up = positive), state initial velocity u and acceleration a.\nSolution: u = +20 m/s (directed upward). Acceleration due to gravity a = -9.8 m/s² (directed downward)."
  },
  "Graph Slope & Area Interpretation": {
    type: "Base Prerequisite",
    grade: "Grade 9 Graphical Motion",
    overview: "In motion graphs: (1) The slope of a position-time (x-t) graph represents instantaneous velocity (v = dx/dt); (2) The slope of a velocity-time (v-t) graph represents acceleration (a = dv/dt); (3) The geometric area under a velocity-time graph equals displacement; (4) The area under an acceleration-time graph equals change in velocity.",
    formula: "Slope of x-t = Velocity v  |  Slope of v-t = Acceleration a  |  Area under v-t = Displacement Δx",
    connection: "The primary geometric method for deriving the three kinematic equations of motion without calculus.",
    example: "Question: A v-t graph forms a triangle with base = 6 s and height = 10 m/s. Find the displacement.\nSolution: Area under v-t graph = ½ × base × height = ½ × 6 × 10 = 30 meters."
  },
  "Linear Equations & Substitutions": {
    type: "Base Prerequisite",
    grade: "Grade 8-10 Algebra",
    overview: "Solving simultaneous linear equations by substitution or elimination. Given equations like v = u + at and s = ut + ½at², one variable is expressed in terms of others and substituted to derive timeless relations such as v² = u² + 2as.",
    formula: "Eliminating t from v = u + at into s = (u+v)/2 · t gives v² = u² + 2as",
    connection: "The algebraic mechanics used in all physics derivations, equilibrium force balance, and multi-body motion.",
    example: "Question: Solve for t: 0 = 30 - 9.8t.\nSolution: 9.8t = 30 ⇒ t = 30 / 9.8 ≈ 3.06 seconds."
  },
  "Path Length vs Displacement": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Physics (Ch 2)",
    overview: "Path length (distance) is a scalar quantity representing the total length of the trajectory traveled. Displacement is the shortest directed vector from the initial position x₁ to final position x₂. Path length is always greater than or equal to the magnitude of displacement.",
    formula: "Displacement Δx = x₂ - x₁  |  Path Length ≥ |Displacement|  |  Units: meters (m)",
    connection: "Distinguishes scalar motion from vector mechanics; fundamental for understanding average vs instantaneous velocity.",
    example: "Question: An athlete completes 1 full circular lap of radius R = 7 m. Find the path length and displacement.\nSolution: Path length = 2πR = 2 × (22/7) × 7 = 44 m.\nDisplacement = 0 m (athlete returns to the initial starting point)."
  },
  "Average & Instantaneous Velocity": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Physics (Ch 2)",
    overview: "Average velocity is total displacement divided by total time: v_avg = Δx / Δt. Instantaneous velocity is the limiting value of average velocity as the time interval approaches zero: v = lim(Δt→0) Δx/Δt = dx/dt, representing the derivative of position with respect to time.",
    formula: "v_avg = Δx / Δt  |  v_inst = dx / dt = lim(Δt→0) [x(t + Δt) - x(t)] / Δt",
    connection: "Connects coordinate geometry slope to calculus differentiation; used in speed traps and particle physics.",
    example: "Question: Position of a particle is given by x(t) = 3t² + 2t + 5 (in meters). Find instantaneous velocity at t = 3 s.\nSolution: v(t) = dx/dt = d/dt(3t² + 2t + 5) = 6t + 2.\nAt t = 3 s: v(3) = 6(3) + 2 = 20 m/s."
  },
  "Uniformly Accelerated Motion": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Physics (Ch 2)",
    overview: "Motion where velocity changes at a constant rate over equal intervals of time. Acceleration a = dv/dt is constant in magnitude and direction. The velocity-time graph is a straight line whose constant slope equals the acceleration.",
    formula: "a = (v - u) / t = constant  |  v_avg = (u + v) / 2  |  Units: m/s²",
    connection: "Serves as the foundation for Newton's 2nd Law F = ma and uniform circular motion centripetal acceleration.",
    example: "Question: A car accelerates uniformly from rest to 72 km/h in 10 seconds. Find its acceleration.\nSolution: Initial speed u = 0. Final speed v = 72 × (5/18) = 20 m/s.\nAcceleration a = (v - u) / t = (20 - 0) / 10 = 2 m/s²."
  },
  "Kinematic Equations & Free Fall": {
    type: "Class 11 Subtopic",
    grade: "Grade 11 Physics (Ch 2)",
    overview: "Three fundamental kinematic equations connect initial velocity u, final velocity v, constant acceleration a, time t, and displacement s. In vertical free fall near Earth's surface (neglecting air resistance), acceleration is downward: a = -g (where g ≈ 9.8 m/s² or 10 m/s²).",
    formula: "v = u + at  |  s = ut + ½at²  |  v² = u² + 2as  |  sₙ = u + ½a(2n - 1)",
    connection: "Universal mathematical equations applied to braking distances, rocket launches, ballistics, and vertical drops.",
    example: "Question: A ball is dropped from the top of a 45 m tall building (u = 0, g = 10 m/s²). How long does it take to reach the ground?\nSolution: Using s = ut + ½at² with downward as positive: 45 = 0 + ½(10)t² ⇒ 45 = 5t² ⇒ t² = 9 ⇒ t = 3 seconds."
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENGLISH: CHAPTER 4 — THE ADVENTURE (HORNBILL)
  // ═══════════════════════════════════════════════════════════════════════════
  "Sci-Fi Genre Conventions": {
    type: "Base Prerequisite",
    grade: "Grade 9-10 Literary Forms",
    overview: "Science fiction explores speculative 'what if' scenarios grounded in theoretical scientific principles (time travel, alternate histories, quantum realities, artificial intelligence). Unlike fantasy, sci-fi maintains internal rational consistency and plausibility through plausible scientific extrapolation.",
    formula: "Sci-Fi Core = Speculative Premise ('What if?') + Scientific Law/Extrapolation + Realistic Human Consequence",
    connection: "Provides the genre context needed to analyze Jayant Narlikar's blend of theoretical physics and Indian history in 'The Adventure'.",
    example: "Question: What distinguishes science fiction from pure fantasy?\nSolution: Science fiction grounds its world-building in theoretical scientific principles and logical extrapolation, whereas fantasy relies on magic or supernatural elements."
  },
  "Historical Turning Points Knowledge": {
    type: "Base Prerequisite",
    grade: "Grade 8-10 History",
    overview: "Historical bifurcation points: In actual history, the Third Battle of Panipat (1761) saw Ahmad Shah Abdali defeat the Maratha confederacy after the death of commander Sadashivrao Bhau and heir Vishwasrao, severely fracturing Maratha dominance and enabling the British East India Company to colonize India.",
    formula: "Actual History: 1761 Panipat defeat → Maratha fragmentation → British East India Company ascendancy",
    connection: "Essential background to recognize the alternate timeline Professor Gaitonde accidentally experiences in 'The Adventure'.",
    example: "Question: What was the historical outcome of the Third Battle of Panipat in 1761 in our real timeline?\nSolution: The Marathas were defeated by Afghan ruler Ahmad Shah Abdali, which halted their northward expansion and created a power vacuum exploited by the British."
  },
  "Parallel Universe Concept": {
    type: "Base Prerequisite",
    grade: "Grade 10 Physics & Literature",
    overview: "The Many-Worlds Interpretation of quantum mechanics suggests that every quantum decision or microscopic bifurcation creates parallel, non-interacting branch realities. In literature, parallel universes allow characters to explore alternate outcomes of pivotal life or historical events.",
    formula: "Bifurcation: Microscopic quantum event → Macroscopic historical branch A vs Branch B",
    connection: "Directly explains how Professor Gaitonde's consciousness traversed to an alternate Indian reality while remaining physically unconscious in hospital.",
    example: "Question: How does the parallel universe concept explain Professor Gaitonde's experience in 'The Adventure'?\nSolution: His mind transitioned into an alternate parallel reality where the Marathas won at Panipat, existing simultaneously with the real historical timeline."
  },
  "Narrative Flashback Framing": {
    type: "Base Prerequisite",
    grade: "Grade 9-10 Narrative Craft",
    overview: "Frame narrative structure: A story-within-a-story technique where an outer narrative provides context and a setting for an inner narrative. In 'The Adventure', the frame transitions between Gaitonde's journey, his library discoveries, and Rajendra Deshpande's final scientific explanation.",
    formula: "Structure: Outer Frame (Train journey & Pune return) → Inner Experience (Alternate Bombay) → Resolution (Scientific dialogue)",
    connection: "Helps analyze authorial pacing, reader suspense, and the logical resolution of mysterious events in modern prose.",
    example: "Question: Why did Narlikar frame the story around a scientific debrief between Gaitonde and Rajendra Deshpande?\nSolution: To provide a credible rational scientific framework that demystifies Gaitonde's strange experience using catastrophe theory and quantum mechanics."
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

/**
 * Intelligent topic analyzer and generator for any concept not explicitly in the static dictionary.
 * Extracts domain-specific keywords and produces genuine, non-repetitive educational content.
 */
function generateDynamicConceptData(conceptName, subject, chapterTitle, isSubtopic) {
  const name = String(conceptName || 'Fundamental Concept').trim();
  const lower = name.toLowerCase();
  const chap = String(chapterTitle || 'Class 11').trim();
  const kind = isSubtopic ? "Class 11 Subtopic" : "Base Prerequisite";

  // ── Mathematics ──────────────────────────────────────────────────────────
  if (subject === 'Mathematics') {
    if (lower.includes('trig') || lower.includes('angle') || lower.includes('radian') || lower.includes('sin') || lower.includes('cos') || lower.includes('tan')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Mathematics" : "Grade 10 Trigonometry",
        overview: `${name} governs angular measurement and trigonometric ratios. Degrees and radians are converted via π rad = 180°. Values across the 4 ASTC quadrants are determined by reference angles, and compound identities resolve multi-angle expressions.`,
        formula: `Conversion: θ_rad = θ_deg × (π/180)  |  sin²θ + cos²θ = 1  |  tan 2θ = 2tan θ / (1 - tan²θ)`,
        connection: `Forms the core analytical foundation for resolving coordinate projections, periodic wave motion, and complex number polar forms.`,
        example: `Question: Convert 150° into radians and evaluate sin(150°).\nSolution: Radians = 150 × (π / 180) = 5π/6 rad.\nsin(150°) = sin(180° - 30°) = +sin(30°) = 1/2.`
      };
    }
    if (lower.includes('limit') || lower.includes('derivative') || lower.includes('slope') || lower.includes('secant') || lower.includes('tangent')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Calculus" : "Grade 10 Algebra & Graphs",
        overview: `${name} explores rates of change and behavior near boundary values. The limit evaluates values as x approaches a target point c. The first principle derivative gives instantaneous tangent slope: f'(x) = lim(h→0) [f(x+h) - f(x)] / h.`,
        formula: `lim(x→a) (xⁿ - aⁿ)/(x - a) = n aⁿ⁻¹  |  Product Rule: (uv)' = u'v + uv'  |  d/dx(xⁿ) = n xⁿ⁻¹`,
        connection: `Bridges static algebra into dynamic calculus; directly enables instantaneous velocity and acceleration in mechanics.`,
        example: `Question: Evaluate the limit lim(x→2) (x² - 4) / (x - 2).\nSolution: Direct substitution gives indeterminate 0/0. Factor numerator: (x - 2)(x + 2) / (x - 2) = x + 2.\nLimit = 2 + 2 = 4.`
      };
    }
    if (lower.includes('complex') || lower.includes('imaginary') || lower.includes('modulus') || lower.includes('argand') || lower.includes('quadratic')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Algebra" : "Grade 10 Quadratic Equations",
        overview: `${name} extends real numbers to imaginary quantities where i = √(-1) and i² = -1. Any complex number z = a + ib has real part Re(z) = a, imaginary part Im(z) = b, modulus |z| = √(a² + b²), and conjugate z̄ = a - ib.`,
        formula: `z = a + ib  |  |z| = √(a² + b²)  |  z · z̄ = |z|² = a² + b²  |  Polar: z = r(cos θ + i sin θ)`,
        connection: `Guarantees every nth-degree polynomial has exactly n roots (Fundamental Theorem of Algebra); essential in AC electronics and quantum mechanics.`,
        example: `Question: Express z = (1 + 2i) / (1 - i) in standard a + ib form.\nSolution: Multiply numerator and denominator by conjugate (1 + i):\nz = [(1 + 2i)(1 + i)] / [(1 - i)(1 + i)] = (1 + 3i - 2) / (1 - i²) = (-1 + 3i) / 2 = -1/2 + (3/2)i.`
      };
    }
    if (lower.includes('permutation') || lower.includes('combination') || lower.includes('factorial') || lower.includes('counting')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Combinatorics" : "Grade 8-10 Arithmetic Logic",
        overview: `${name} deals with systematic counting and selection. The Fundamental Counting Principle states that consecutive independent operations multiply (m × n). Permutations (ⁿPᵣ) count ordered arrangements, while Combinations (ⁿCᵣ) count unordered subsets.`,
        formula: `n! = n · (n-1)...1  |  ⁿPᵣ = n! / (n - r)!  |  ⁿCᵣ = n! / [r! (n - r)!]  |  ⁿCᵣ = ⁿCₙ₋ᵣ`,
        connection: `Determines binomial expansion coefficients, probability sample space counts, and discrete algorithmic complexities.`,
        example: `Question: In how many ways can 3 students be selected from a group of 7?\nSolution: Order does not matter, so use combinations:\n⁷C₃ = 7! / (3! · 4!) = (7 × 6 × 5) / (3 × 2 × 1) = 35 ways.`
      };
    }
    if (lower.includes('progression') || lower.includes('series') || lower.includes('sequence') || lower.includes('ap') || lower.includes('gp') || lower.includes('mean')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Algebra" : "Grade 10 Arithmetic Progressions",
        overview: `${name} models ordered sequences following defined growth patterns. Arithmetic Progressions (AP) add a constant common difference d; Geometric Progressions (GP) multiply by a constant common ratio r. Infinite GP series with |r| < 1 converge to a finite sum.`,
        formula: `AP: aₙ = a + (n-1)d, Sₙ = n/2[2a + (n-1)d]  |  GP: aₙ = a rⁿ⁻¹, S_∞ = a / (1 - r) (|r| < 1)`,
        connection: `Essential for financial compound interest, physics harmonic decays, and infinite Taylor series expansions.`,
        example: `Question: Find the sum of the infinite geometric series: 6 + 2 + 2/3 + 2/9 + ...\nSolution: First term a = 6, common ratio r = 2/6 = 1/3 (|r| < 1).\nSum S_∞ = a / (1 - r) = 6 / (1 - 1/3) = 6 / (2/3) = 9.`
      };
    }
    if (lower.includes('probab') || lower.includes('event') || lower.includes('sample space') || lower.includes('random')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Statistics & Probability" : "Grade 10 Classical Probability",
        overview: `${name} measures quantitative likelihood. The sample space S contains all mutually exclusive outcomes. Axiomatic probability assigns P(E) ∈ [0, 1] with P(S) = 1. The addition theorem evaluates the likelihood of union events A ∪ B.`,
        formula: `P(E) = n(E) / n(S)  |  P(A ∪ B) = P(A) + P(B) - P(A ∩ B)  |  P(A') = 1 - P(A)`,
        connection: `Extends Venn diagrams and set theory into statistical modeling, risk assessment, and quantum probabilities.`,
        example: `Question: Two dice are rolled simultaneously. What is the probability of obtaining a sum equal to 7?\nSolution: Total outcomes n(S) = 6 × 6 = 36.\nFavorable outcomes summing to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) ⇒ n(E) = 6.\nP(Sum = 7) = 6 / 36 = 1/6.`
      };
    }
    if (lower.includes('stat') || lower.includes('deviation') || lower.includes('variance') || lower.includes('mean')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Statistics" : "Grade 10 Central Tendencies",
        overview: `${name} quantifies statistical dispersion and data variation around central tendencies (mean or median). Mean deviation measures average absolute differences, while variance (σ²) and standard deviation (σ) square deviations to penalize outliers.`,
        formula: `Mean: x̄ = (∑ xᵢ)/n  |  Variance: σ² = [∑ (xᵢ - x̄)²] / n  |  Std Dev: σ = √(Variance)`,
        connection: `The standard metric for data science, experimental uncertainty quantification, and machine learning error functions.`,
        example: `Question: Find the variance of the data set: 2, 4, 6, 8, 10.\nSolution: Mean x̄ = (2 + 4 + 6 + 8 + 10) / 5 = 30 / 5 = 6.\nDeviations: (2-6)² = 16, (4-6)² = 4, (6-6)² = 0, (8-6)² = 4, (10-6)² = 16.\nSum of squared deviations = 16 + 4 + 0 + 4 + 16 = 40. Variance σ² = 40 / 5 = 8.`
      };
    }
  }

  // ── Physics ──────────────────────────────────────────────────────────────
  if (subject === 'Physics') {
    if (lower.includes('newton') || lower.includes('force') || lower.includes('friction') || lower.includes('momentum') || lower.includes('body diagram')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Physics (Mechanics)" : "Grade 9 Laws of Motion",
        overview: `${name} governs Newtonian dynamics. Newton's 1st law defines inertia, 2nd law relates net external force to rate of change of momentum (F_net = ma), and 3rd law states forces occur in equal and opposite interaction pairs. Free body diagrams isolate all contact and field forces.`,
        formula: `F_net = dp/dt = m · a  |  Conservation of Momentum: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂  |  Friction: f_max = μ · N`,
        connection: `The core governing principle for all structural engineering, vehicular braking, orbital mechanics, and robotics.`,
        example: `Question: A 5 kg block rests on a horizontal surface with coefficient of static friction μ_s = 0.4. What minimum force is needed to start motion? (g = 10 m/s²)\nSolution: Normal force N = mg = 5 × 10 = 50 N.\nMaximum static friction: f_s(max) = μ_s × N = 0.4 × 50 = 20 N.\nA force greater than 20 N is required.`
      };
    }
    if (lower.includes('work') || lower.includes('energy') || lower.includes('power') || lower.includes('collision') || lower.includes('potential')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Physics" : "Grade 9 Work & Energy",
        overview: `${name} analyzes scalar mechanical energy exchanges. Work done by a force is the dot product of force and displacement vectors: W = F · d = F d cos θ. The Work-Energy Theorem states that the net work done on a body equals its change in kinetic energy: W_net = ΔK.`,
        formula: `Work: W = F · d cos θ  |  Kinetic Energy: K = ½mv²  |  Work-Energy Theorem: W_net = ½mv² - ½mu²`,
        connection: `Converts complex multi-stage path integrals into simple scalar conservation balance equations.`,
        example: `Question: A 2 kg object moving at 6 m/s is brought to rest by friction. Find the work done by friction.\nSolution: Initial K = ½(2)(6²) = 36 J. Final K = 0 J.\nWork-Energy Theorem: W_friction = K_final - K_initial = 0 - 36 = -36 Joules.`
      };
    }
    if (lower.includes('gravitat') || lower.includes('kepler') || lower.includes('satellite') || lower.includes('orbit') || lower.includes('planet')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Gravitation" : "Grade 9 Gravitation Basics",
        overview: `${name} describes the universal attractive interaction between masses. Newton's Universal Law of Gravitation states that attractive force is directly proportional to mass product and inversely proportional to distance squared. Kepler's laws govern elliptical planetary orbits.`,
        formula: `F = G (m₁ m₂) / r²  |  g = G M / R²  |  Escape Speed: v_e = √(2 g R) ≈ 11.2 km/s (Earth)`,
        connection: `Determines geosynchronous satellite orbits, planetary orbital periods, and tidal cycles across astrophysics.`,
        example: `Question: How does acceleration due to gravity g change if Earth's radius were halved with mass remaining constant?\nSolution: g = GM / R². If R becomes R/2:\ng' = GM / (R/2)² = 4 (GM / R²) = 4g (gravity becomes 4 times stronger).`
      };
    }
    if (lower.includes('fluid') || lower.includes('pressure') || lower.includes('bernoulli') || lower.includes('pascal') || lower.includes('viscosity') || lower.includes('buoyan')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Fluid Mechanics" : "Grade 9 Density & Buoyancy",
        overview: `${name} governs fluids at rest (hydrostatics) and in motion (hydrodynamics). Pascal's Law states pressure applied to an enclosed fluid transmits undiminished everywhere. Bernoulli's Principle states that for streamline flow, total energy (pressure + kinetic + potential) remains constant.`,
        formula: `Hydrostatic Pressure: P = P₀ + ρgh  |  Continuity: A₁v₁ = A₂v₂  |  Bernoulli: P + ½ρv² + ρgh = constant`,
        connection: `Underpins hydraulic lifts, aerodynamic airplane wing lift, venturimeter flow measurement, and cardiovascular blood flow.`,
        example: `Question: Water flows through a horizontal pipe where cross-sectional area narrows from 4 cm² to 2 cm². If initial speed is 3 m/s, find the speed in the narrow section.\nSolution: Continuity equation: A₁v₁ = A₂v₂.\n(4 cm²)(3 m/s) = (2 cm²) v₂ ⇒ v₂ = (4 × 3) / 2 = 6 m/s.`
      };
    }
    if (lower.includes('thermo') || lower.includes('heat') || lower.includes('temperature') || lower.includes('entropy') || lower.includes('calorimetr')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Thermodynamics" : "Grade 7-9 Heat Transfer",
        overview: `${name} examines heat, work, and internal energy conversion. The First Law of Thermodynamics expresses energy conservation: ΔQ = ΔU + ΔW (heat added = increase in internal energy + work done by system). The Second Law dictates entropy increases in spontaneous natural processes.`,
        formula: `1st Law: ΔQ = ΔU + P ΔV  |  Work: W = ∫ P dV  |  Ideal Gas: PV = nRT  |  Efficiency: η = 1 - T_cold/T_hot`,
        connection: `Governs car combustion engines, refrigerators, heat pumps, and cosmological thermal equilibrium.`,
        example: `Question: A gas absorbs 400 J of heat and performs 150 J of expansion work. What is the change in internal energy?\nSolution: First Law: ΔQ = ΔU + ΔW ⇒ ΔU = ΔQ - ΔW.\nΔU = 400 J - 150 J = +250 Joules.`
      };
    }
  }

  // ── Chemistry ────────────────────────────────────────────────────────────
  if (subject === 'Chemistry') {
    if (lower.includes('mole') || lower.includes('stoichiometr') || lower.includes('avogadro') || lower.includes('molar') || lower.includes('empirical')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Chemistry" : "Grade 9 Atoms & Molecules",
        overview: `${name} is the central quantitative counting unit in chemistry. 1 mole contains exactly 6.022 × 10²³ elementary particles (Avogadro's constant N_A). Stoichiometry uses balanced chemical equations to relate reactants and products by mole ratios.`,
        formula: `Moles n = mass (g) / molar mass (M) = N / N_A = Volume (L) / 22.4 at STP  |  Molarity M = moles / Volume (L)`,
        connection: `The universal quantitative bridge linking macroscopic laboratory weighings to microscopic atomic reactions.`,
        example: `Question: How many moles and grams are in 1.2044 × 10²⁴ molecules of water (H₂O)?\nSolution: Molar mass of H₂O = 2(1) + 16 = 18 g/mol.\nMoles n = (1.2044 × 10²⁴) / (6.022 × 10²³) = 2 moles.\nMass = 2 mol × 18 g/mol = 36 grams.`
      };
    }
    if (lower.includes('atom') || lower.includes('bohr') || lower.includes('quantum') || lower.includes('orbital') || lower.includes('electron') || lower.includes('configur')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Atomic Structure" : "Grade 9 Atomic Structure Basics",
        overview: `${name} governs subatomic architecture. Electrons exist in quantum mechanical orbitals described by four quantum numbers: Principal n (energy shell), Azimuthal l (subshell shape s, p, d, f), Magnetic m_l (orientation), and Spin m_s (±½). Aufbau, Pauli, and Hund's rules determine electron configurations.`,
        formula: `de Broglie: λ = h / (m v)  |  Bohr Radius: r_n = 0.529 n²/Z Å  |  Energy: E_n = -13.6 Z²/n² eV`,
        connection: `Explains atomic emission spectra, chemical bond geometry, and periodic table column trends.`,
        example: `Question: What are the possible values of l and m_l for principal quantum shell n = 3?\nSolution: For n = 3: l can be 0 (s), 1 (p), 2 (d).\nFor each l: m_l ranges from -l to +l.\nWhen l = 2: m_l = {-2, -1, 0, +1, +2} (5 distinct d-orbitals).`
      };
    }
    if (lower.includes('bond') || lower.includes('vsepr') || lower.includes('hybrid') || lower.includes('lewis') || lower.includes('molecular orbital')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Chemical Bonding" : "Grade 10 Chemical Bonding Basics",
        overview: `${name} describes the attractive forces holding atoms together. Lewis structures track valence octets. VSEPR theory predicts 3D spatial shapes by minimizing electron-pair repulsions. Valence Bond Hybridization (sp, sp², sp³) explains equivalent bond angles in molecules like methane and ethene.`,
        formula: `Hybridization Steric Number = (σ bonds) + (lone pairs)  |  sp³: 109.5°  |  sp²: 120°  |  sp: 180°`,
        connection: `Governs molecule polarity, intermolecular boiling points, pharmacological drug receptor binding, and DNA double-helix stability.`,
        example: `Question: Predict the hybridization and geometric shape of ammonia (NH₃).\nSolution: Nitrogen has 5 valence electrons: forms 3 single N-H bonds and has 1 lone pair.\nSteric number = 3 + 1 = 4 ⇒ sp³ hybridization.\nShape: Trigonal pyramidal (lone pair repels bond pairs, compressing angle to ≈ 107°).`
      };
    }
    if (lower.includes('redox') || lower.includes('oxidation') || lower.includes('reduction') || lower.includes('electrode') || lower.includes('electrochemical')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Redox Reactions" : "Grade 10 Chemical Reactions",
        overview: `${name} involves electron transfer between reacting chemical species. Oxidation is the loss of electrons (increase in oxidation number), while Reduction is the gain of electrons (decrease in oxidation number). Redox equations are balanced using the ion-electron (half-reaction) method.`,
        formula: `LEO says GER: Loss of Electrons = Oxidation | Gain of Electrons = Reduction  |  Oxidation State Sum = Net Charge`,
        connection: `The foundation of commercial batteries, metal corrosion, biological cellular respiration, and electroplating.`,
        example: `Question: Find the oxidation state of Chromium in the dichromate ion (Cr₂O₇²⁻).\nSolution: Oxygen has oxidation state -2. Let Cr = x.\n2(x) + 7(-2) = -2 ⇒ 2x - 14 = -2 ⇒ 2x = 12 ⇒ x = +6.`
      };
    }
  }

  // ── Computer Science ─────────────────────────────────────────────────────
  if (subject === 'Computer Science') {
    if (lower.includes('python') || lower.includes('variable') || lower.includes('token') || lower.includes('data type') || lower.includes('operator')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Computer Science" : "Grade 8-10 Computing Fundamentals",
        overview: `${name} establishes core Python programming building blocks. Python is a dynamically-typed, interpreted language. Core standard types include immutable types (int, float, bool, str, tuple) and mutable types (list, dict, set). Identifiers adhere to specific naming rules and reserved keywords.`,
        formula: `Dynamic Typing: type(var)  |  Operator Precedence: () > ** > * / // % > + - > Comparisons > Logical (not, and, or)`,
        connection: `Forms the computational syntax and memory model required to write efficient Python algorithms and data scripts.`,
        example: `Question: What is the output and data type of result in Python: result = 7 // 2 + 3 * 2 ** 3?\nSolution: Exponentiation first: 2 ** 3 = 8.\nInteger floor division: 7 // 2 = 3.\nMultiplication: 3 * 8 = 24.\nAddition: 3 + 24 = 27 (Type: int).`
      };
    }
    if (lower.includes('loop') || lower.includes('flow') || lower.includes('control') || lower.includes('if') || lower.includes('conditional')) {
      return {
        type: kind,
        grade: isSubtopic ? "Grade 11 Python Programming" : "Grade 8-10 Logic & Flowcharts",
        overview: `${name} directs program execution order. Conditional statements (if-elif-else) execute branches based on Boolean evaluation. Definite iteration loops over sequences using for ... in range(start, stop, step), while indefinite while loops repeat until a condition becomes false. Control keywords: break, continue, pass.`,
        formula: `range(start, stop, step) generates [start, stop)  |  break terminates loop  |  continue skips to next iteration`,
        connection: `Enables automated searching, list filtering, iterative approximations, and menu-driven command systems.`,
        example: `Question: What will this loop print: for i in range(1, 10, 3): print(i, end=' ')?\nSolution: Starts at 1, increments by 3, stops strictly before 10:\nValues: 1, 1+3=4, 4+3=7 (7+3=10 is excluded).\nOutput: 1 4 7`
      };
    }
  }

  // ── English ──────────────────────────────────────────────────────────────
  if (subject === 'English') {
    return {
      type: kind,
      grade: isSubtopic ? "Grade 11 English Literature" : "Grade 9-10 Reading & Literary Analysis",
      overview: `${name} is an important literary component in ${chap}. It examines character psychology, narrative point of view, thematic conflicts (individual vs society, past vs present), and distinctive rhetorical devices used to evoke reader resonance.`,
      formula: `Textual Quote/Action → Literary Technique (Irony/Imagery/Metaphor) → Character & Thematic Meaning`,
      connection: `Develops nuanced analytical reasoning and contextual textual evidence citation required in NCERT board exam questions.`,
      example: `Question: Analyze how ${name} contributes to the central conflict or character arc in ${chap}.\nSolution: The author introduces this element to contrast character motivations with external realities, highlighting the underlying thematic tension between perception and reality.`
    };
  }

  // ── Universal Subject-Aware Fallback ──────────────────────────────────────
  return {
    type: kind,
    grade: isSubtopic ? `Grade 11 ${subject}` : `Grade 9-10 ${subject} Foundation`,
    overview: `${name} is a foundational ${isSubtopic ? 'concept' : 'prerequisite'} for "${chap}". It establishes key principles, formal terminology, and qualitative relationships needed to understand and solve core problems in this unit.`,
    formula: `Principle in ${chap}: Apply standard scientific/mathematical rules and structural constraints for ${name}.`,
    connection: isSubtopic
      ? `Directly links theory to practical derivations, numerical computations, and board examination problems in ${chap}.`
      : `Provides the essential background terminology and problem-solving tools required before learning ${chap}.`,
    example: `Question: Explain the primary significance of ${name} in ${chap}.\nSolution: Identify the governing principle of ${name}, establish the relevant given conditions, and apply it systematically to deduce the final result.`
  };
}

/**
 * Main accessor function called by App.jsx, MapView.jsx, and PersonalisedLearnView.jsx.
 */
export function getConceptData(conceptName, subject = "General", chapterTitle = "", isSubtopic = false) {
  if (!conceptName) {
    return generateDynamicConceptData("Core Concept", subject, chapterTitle, isSubtopic);
  }

  // 1. Direct dictionary lookup
  if (CONCEPT_KNOWLEDGE_BASE[conceptName]) {
    return CONCEPT_KNOWLEDGE_BASE[conceptName];
  }

  // 2. Case-insensitive / trimmed lookup
  const cleanKey = conceptName.trim();
  for (const [key, val] of Object.entries(CONCEPT_KNOWLEDGE_BASE)) {
    if (key.toLowerCase() === cleanKey.toLowerCase()) {
      return val;
    }
  }

  // 3. Dynamic intelligent generator based on subject, chapter, and keyword semantics
  return generateDynamicConceptData(cleanKey, subject, chapterTitle, isSubtopic);
}
