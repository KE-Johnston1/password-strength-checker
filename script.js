const passwordInput = document.getElementById("password-input");
const strengthText = document.getElementById("strength-text");
const strengthBar = document.querySelector(".strength-bar");
const feedbackList = document.getElementById("feedback-list");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  if (!password) {
    strengthText.textContent = "Waiting for input...";
    strengthBar.style.width = "0%";
    feedbackList.innerHTML = "";
    return;
  }

  // Temporary placeholder logic – we'll replace this with real analysis
  const lengthScore = Math.min(password.length * 5, 100);
  strengthBar.style.width = `${lengthScore}%`;

  if (password.length < 8) {
    strengthText.textContent = "Very weak";
  } else if (password.length < 12) {
    strengthText.textContent = "Weak";
  } else {
    strengthText.textContent = "Needs smarter logic (coming soon)";
  }

  feedbackList.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = "This is placeholder logic. We’ll add proper strength analysis next.";
  feedbackList.appendChild(li);
});
