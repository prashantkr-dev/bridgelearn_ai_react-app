/**
 * Returns curated PW (Physics Wallah) and Khan Academy search/video links
 * for a given subject, chapter, and concept.
 *
 * PW uses YouTube so we can deep-link to their channel search.
 * Khan Academy has topic pages that map well to subjects.
 */

// PW Channel IDs per subject
const PW_CHANNELS = {
  Physics: 'UCiUWMSMhJcU6wGMFNCLv67w',       // Alakh Pandey (Physics Wallah)
  Chemistry: 'UCiUWMSMhJcU6wGMFNCLv67w',
  Mathematics: 'UCWZ8rKLEuSHIEPeHJ7HKgcw',    // PW Math
  'Computer Science': 'UCiUWMSMhJcU6wGMFNCLv67w',
  English: 'UCiUWMSMhJcU6wGMFNCLv67w',
};

// Khan Academy topic URLs per subject
const KHAN_BASE_URLS = {
  Physics: 'https://www.khanacademy.org/science/physics',
  Chemistry: 'https://www.khanacademy.org/science/chemistry',
  Mathematics: 'https://www.khanacademy.org/math',
  'Computer Science': 'https://www.khanacademy.org/computing',
  English: 'https://www.khanacademy.org/ela',
};

/**
 * @param {string} subject
 * @param {string} chapterTitle
 * @param {string} conceptName
 * @returns {{ pw: string, khan: string, pwLabel: string, khanLabel: string }}
 */
export function getVideoLinks(subject, chapterTitle, conceptName) {
  const query = `Class 11 ${subject} ${chapterTitle} ${conceptName} NCERT`;
  const pwQuery = `${conceptName} ${subject} class 11 PW`;

  // PW YouTube channel search
  const pwChannelId = PW_CHANNELS[subject] || PW_CHANNELS.Physics;
  const pwUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(pwQuery + ' Physics Wallah')}`;

  // Khan Academy search
  const khanUrl = `https://www.khanacademy.org/search?page_search_query=${encodeURIComponent(query)}`;

  // Fallback: generic YT search with PW filter
  return {
    pw: pwUrl,
    pwLabel: 'PW (Physics Wallah)',
    khan: khanUrl,
    khanLabel: 'Khan Academy',
  };
}

/**
 * Returns well-known PW / Khan video timestamps for specific Class 11 topic+concept combos.
 * Extend this map to add more. When a match is found, the direct video URL is returned.
 */
const CURATED_VIDEOS = {
  // Physics
  'Motion in a Straight Line|Path Length vs Displacement': {
    pw: 'https://www.youtube.com/watch?v=jLV0frOhDXs&t=0s',
    khan: 'https://www.khanacademy.org/science/ap-physics-1/ap-one-dimensional-motion/displacement-velocity-and-time/v/introduction-to-vectors-and-scalars',
  },
  'Motion in a Straight Line|Kinematic Equations & Free Fall': {
    pw: 'https://www.youtube.com/watch?v=A0FPXt2KHFI&t=0s',
    khan: 'https://www.khanacademy.org/science/ap-physics-1/ap-one-dimensional-motion/kinematic-formulas/v/kinematic-formulas-and-projectile-motion',
  },
  'Laws of Motion|Newton\'s First, Second & Third Laws': {
    pw: 'https://www.youtube.com/watch?v=4PnLYm4IKe4&t=0s',
    khan: 'https://www.khanacademy.org/science/ap-physics-1/ap-forces-newtons-laws/newtons-second-law/v/newton-s-second-law-of-motion',
  },
  'Work, Energy and Power|Work-Energy Theorem': {
    pw: 'https://www.youtube.com/watch?v=JGO_zDWmkvk&t=0s',
    khan: 'https://www.khanacademy.org/science/ap-physics-1/ap-work-and-energy/work-and-energy-ap/v/work-energy-theorem',
  },
  'Gravitation|Universal Law of Gravitation': {
    pw: 'https://www.youtube.com/watch?v=F3YjPp9v_Fs&t=0s',
    khan: 'https://www.khanacademy.org/science/ap-physics-1/ap-centripetal-force-and-gravitation/newtons-law-of-gravitation-ap/v/newton-s-law-of-gravitation',
  },
  'Thermodynamics|Zeroth & First Laws of Thermodynamics': {
    pw: 'https://www.youtube.com/watch?v=APWCKTi8kKs&t=0s',
    khan: 'https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:thermodynamics/x2eef969c74e0d802:internal-energy-heat-and-work/v/first-law-of-thermodynamics',
  },
  // Mathematics
  'Straight Lines|Slope of a Line (m = tan θ)': {
    pw: 'https://www.youtube.com/watch?v=nFrFT4fvzP4&t=0s',
    khan: 'https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-linear-equations-functions/cc-8th-slope/v/introduction-to-slope',
  },
  'Trigonometric Functions|Compound Angle Identities': {
    pw: 'https://www.youtube.com/watch?v=xJ8JqPAzUuM&t=0s',
    khan: 'https://www.khanacademy.org/math/trigonometry/trig-equations-and-identities/using-trig-identities/v/proof-trig-identities',
  },
  'Limits and Derivatives|Derivative as Tangent Slope': {
    pw: 'https://www.youtube.com/watch?v=SyPYSxFpE0M&t=0s',
    khan: 'https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-1/v/derivative-as-a-concept',
  },
  'Sequences and Series|Arithmetic Progression (AP) nth term & Sum': {
    pw: 'https://www.youtube.com/watch?v=4jRMWMRkuLw&t=0s',
    khan: 'https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences/x2f8bb11595b61c86:introduction-to-arithmetic-sequences/v/arithmetic-sequences',
  },
  // Chemistry
  'Structure of Atom|Quantum Numbers (n, l, ml, ms)': {
    pw: 'https://www.youtube.com/watch?v=JjJMk6GjFy4&t=0s',
    khan: 'https://www.khanacademy.org/science/ap-chemistry/electronic-structure-of-atoms-ap/bohr-model-hydrogen-ap/v/bohr-model-of-hydrogen',
  },
  'Chemical Bonding and Molecular Structure|VSEPR Theory & Molecular Geometry': {
    pw: 'https://www.youtube.com/watch?v=4g4TBmHDTT0&t=0s',
    khan: 'https://www.khanacademy.org/science/ap-chemistry/chemical-bonds/vsepr/v/vsepr',
  },
};

/**
 * Get curated or fallback video links for a question.
 */
export function getVideoLinksForQuestion(subject, chapterTitle, conceptName) {
  const curatedKey = `${chapterTitle}|${conceptName}`;
  const curated = CURATED_VIDEOS[curatedKey];

  const fallback = getVideoLinks(subject, chapterTitle, conceptName);

  return {
    pw: curated?.pw || fallback.pw,
    khan: curated?.khan || fallback.khan,
    pwLabel: 'PW (Physics Wallah)',
    khanLabel: 'Khan Academy',
    isCurated: Boolean(curated),
  };
}
