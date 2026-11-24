export function checkFillAnswer(userVal, q) {
  if (userVal === undefined || userVal === null) return false;
  const uStr = String(userVal).trim().toLowerCase().replace(/\s+/g, ' ');
  if (!uStr) return false;
  const expectedStr = String(q.correctAnswer || '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (uStr === expectedStr) return true;

  if (Array.isArray(q.acceptableAnswers)) {
    if (
      q.acceptableAnswers.some(
        (ans) => String(ans).trim().toLowerCase().replace(/\s+/g, ' ') === uStr
      )
    ) {
      return true;
    }
  }

  const uNum = parseFloat(uStr);
  const expNum = parseFloat(expectedStr);
  if (!Number.isNaN(uNum) && !Number.isNaN(expNum) && /^[-+]?\d*\.?\d+(?:e[-+]?\d+)?/.test(uStr)) {
    const tol = Math.max(0.05, Math.abs(expNum) * 0.01);
    return Math.abs(uNum - expNum) <= tol;
  }
  return false;
}

export function gradeQuiz(quiz, quizAnswers) {
  let score = 0;
  let secAScore = 0;
  let secBScore = 0;
  const mcqCount = quiz.filter((q) => q.type === 'mcq').length || 10;
  const fillCount = quiz.filter((q) => q.type !== 'mcq').length || 10;
  const weakIndices = [];

  quiz.forEach((q, idx) => {
    const userAns = quizAnswers[idx];
    const isCorrect =
      q.type === 'mcq' ? userAns === q.correctIndex : checkFillAnswer(userAns, q);
    if (isCorrect) {
      score += 1;
      if (q.type === 'mcq') secAScore += 1;
      else secBScore += 1;
    } else {
      weakIndices.push(idx);
    }
  });

  const total = quiz.length || 20;
  return {
    score,
    total,
    accuracy: Math.round((score / total) * 100),
    secAScore,
    mcqCount,
    secAPct: Math.round((secAScore / mcqCount) * 100),
    secBScore,
    fillCount,
    secBPct: Math.round((secBScore / fillCount) * 100),
    weakIndices,
  };
}
