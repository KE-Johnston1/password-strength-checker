const passwordInput = document.getElementById("password-input");
const strengthText = document.getElementById("strength-text");
const strengthBar = document.querySelector(".strength-bar");
const feedbackList = document.getElementById("feedback-list");

const StrengthLevel = {
  VERY_WEAK: "Very weak",
  WEAK: "Weak",
  FAIR: "Fair",
  STRONG: "Strong",
  VERY_STRONG: "Very strong",
};

/**
 * Analyze a password and return score + label + basic reasons.
 * Score is 0–100.
 */
function evaluatePassword(password) {
  if (!password) {
    return {
      score: 0,
      label: "Waiting for input...",
      issues: [],
    };
  }

  let score = 0;
  const issues = [];

  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  // 1. Length scoring
  if (length < 8) {
    score += 5;
    issues.push("Too short. Aim for at least 12 characters.");
  } else if (length < 12) {
    score += 25;
  } else if (length < 16) {
    score += 40;
  } else {
    score += 50;
  }

  // 2. Character set diversity
  let varietyCount = 0;
  if (hasLower) varietyCount++;
  if (hasUpper) varietyCount++;
  if (hasDigit) varietyCount++;
  if (hasSymbol) varietyCount++;

  if (varietyCount === 1) {
    score += 5;
    issues.push("Try mixing upper/lowercase letters, numbers, and symbols.");
  } else if (varietyCount === 2) {
    score += 15;
  } else if (varietyCount === 3) {
    score += 25;
  } else if (varietyCount === 4) {
    score += 35;
  }

  // 3. Repetition penalty
  const repeatedCharMatch = /(.)\1{2,}/; // any character repeated 3+ times
  if (repeatedCharMatch.test(password)) {
    score -= 10;
    issues.push("Avoid repeating the same character several times in a row.");
  }

  // 4. Simple sequence penalty (e.g., 1234, abcd)
  const lowerPassword = password.toLowerCase();
  const commonSequences = ["1234", "abcd", "qwerty", "password"];
  if (commonSequences.some((seq) => lowerPassword.includes(seq))) {
    score -= 15;
    issues.push("Avoid common patterns like '1234', 'abcd', 'password', or 'qwerty'.");
  }

  // Clamp score between 0 and 100
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  // Map score to label
  let label;
  if (score === 0) {
    label = StrengthLevel.VERY_WEAK;
  } else if (score <= 25) {
    label = StrengthLevel.VERY_WEAK;
  } else if (score <= 45) {
    label = StrengthLevel.WEAK;
  } else if (score <= 65) {
    label = StrengthLevel.FAIR;
  } else if (score <= 85) {
    label = StrengthLevel.STRONG;
  } else {
    label = StrengthLevel.VERY_STRONG;
  }

  return { score, label, issues };
}

function renderFeedback(issues, label) {
  feedbackList.innerHTML = "";

  if (label === StrengthLevel.STRONG || label === StrengthLevel.VERY_STRONG) {
    const li = document.createElement("li");
    li.textContent =
      "This looks strong for most everyday use. Still use unique passwords per site and a password manager.";
    feedbackList.appendChild(li);
  }

  issues.forEach((issue) => {
    const li = document.createElement("li");
    li.textContent = issue;
    feedbackList.appendChild(li);
  });
}

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const { score, label, issues } = evaluatePassword(password);

  // Update strength bar
  strengthBar.style.width = `${score}%`;

  // Update label
  strengthText.textContent = label;

  // Update feedback list
  renderFeedback(issues, label);

  // If empty, reset label text for clarity
  if (!password) {
    strengthText.textContent = "Waiting for input...";
  }
});

