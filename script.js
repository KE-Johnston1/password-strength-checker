const passwordInput = document.getElementById("password-input");
const strengthText = document.getElementById("strength-text");
const strengthBar = document.querySelector(".strength-bar");
const feedbackList = document.getElementById("feedback-list");
const entropyValue = document.getElementById("entropy-value");
const crackTimeValue = document.getElementById("crack-time");
const toggleVisibilityButton = document.getElementById("toggle-visibility");

// Requirement elements
const reqLength = document.getElementById("req-length");
const reqLower = document.getElementById("req-lower");
const reqUpper = document.getElementById("req-upper");
const reqNumber = document.getElementById("req-number");
const reqSymbol = document.getElementById("req-symbol");

const StrengthLevel = {
  VERY_WEAK: "Very weak",
  WEAK: "Weak",
  FAIR: "Fair",
  STRONG: "Strong",
  VERY_STRONG: "Very strong",
};

// -------------------------------
// PASSWORD STRENGTH EVALUATION
// -------------------------------
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

  // Update requirement checkmarks
  reqLength.classList.toggle("valid", length >= 12);
  reqLower.classList.toggle("valid", hasLower);
  reqUpper.classList.toggle("valid", hasUpper);
  reqNumber.classList.toggle("valid", hasDigit);
  reqSymbol.classList.toggle("valid", hasSymbol);

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
  const repeatedCharMatch = /(.)\1{2,}/;
  if (repeatedCharMatch.test(password)) {
    score -= 10;
    issues.push("Avoid repeating the same character several times in a row.");
  }

  // 4. Simple sequence penalty
  const lowerPassword = password.toLowerCase();
  const commonSequences = ["1234", "abcd", "qwerty", "password"];
  if (commonSequences.some((seq) => lowerPassword.includes(seq))) {
    score -= 15;
    issues.push("Avoid common patterns like '1234', 'abcd', 'password', or 'qwerty'.");
  }

  // Clamp score
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  // Map score to label
  let label;
  if (score <= 25) label = StrengthLevel.VERY_WEAK;
  else if (score <= 45) label = StrengthLevel.WEAK;
  else if (score <= 65) label = StrengthLevel.FAIR;
  else if (score <= 85) label = StrengthLevel.STRONG;
  else label = StrengthLevel.VERY_STRONG;

  return { score, label, issues };
}

// -------------------------------
// ENTROPY CALCULATION
// -------------------------------
function calculateEntropy(password) {
  if (!password) return 0;

  let charsetSize = 0;

  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/\d/.test(password)) charsetSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) charsetSize += 33;

  const length = password.length;
  const entropy = length * Math.log2(charsetSize);

  return Math.round(entropy);
}

// -------------------------------
// CRACK TIME ESTIMATION
// -------------------------------
function estimateCrackTime(entropy) {
  if (entropy === 0) return "N/A";

  const guessesPerSecond = 1e9; // 1 billion guesses/sec
  const totalGuesses = Math.pow(2, entropy - 1);
  const seconds = totalGuesses / guessesPerSecond;

  if (seconds < 1) return "less than 1 second";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31557600) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31557600 * 100) return `${Math.round(seconds / 31557600)} years`;

  return "centuries or more";
}

// -------------------------------
// RENDER FEEDBACK
// -------------------------------
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

// -------------------------------
// MAIN INPUT HANDLER
// -------------------------------
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  const { score, label, issues } = evaluatePassword(password);

  // Update strength bar + label
  strengthBar.style.width = `${score}%`;
  strengthText.textContent = label;

  // Update feedback
  renderFeedback(issues, label);

  // Update entropy + crack time
  const entropy = calculateEntropy(password);
  const crackTime = estimateCrackTime(entropy);

  entropyValue.textContent = `${entropy} bits`;
  crackTimeValue.textContent = crackTime;

  // Reset when empty
  if (!password) {
    strengthText.textContent = "Waiting for input...";
    entropyValue.textContent = "0 bits";
    crackTimeValue.textContent = "N/A";
  }
});

// -------------------------------
// TOGGLE PASSWORD VISIBILITY
// -------------------------------
toggleVisibilityButton.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  toggleVisibilityButton.textContent = isPassword ? "Hide" : "Show";
});
