Password Strength Tester
A clear, practical tool for assessing password strength directly in the browser.
It provides real‑time feedback based on length, character variety, entropy, and common weaknesses such as repetition or predictable patterns.

Everything runs locally — nothing is stored or transmitted.

Live Demo
🔗 https://ke-johnston1.github.io/password-strength-checker (ke-johnston1.github.io in Bing)

Overview
This project was built to demonstrate practical cybersecurity thinking, clean front‑end development, and user‑centred design.
The aim is simple: help users understand what makes a password strong, without overwhelming them with jargon.

It’s lightweight, responsive, and works entirely offline once loaded.

Features
Real‑time strength analysis
The strength bar updates instantly as the user types, using a weighted scoring model.

Entropy calculation
Displays estimated entropy (in bits), based on password length and detected character set.

Crack‑time estimation
Provides an approximate time for an offline brute‑force attack, assuming one billion guesses per second.

Requirement checklist
Live indicators showing whether the password includes:

At least 12 characters

Lowercase letters

Uppercase letters

Numbers

Symbols

Pattern detection
Highlights common issues such as:

Repeated characters

Sequential patterns (e.g., 1234, abcd, qwerty)

Over‑reliance on a single character type

Show/Hide password toggle
Improves usability when testing long or complex passwords.

Modern, responsive interface
A clean dark theme with subtle animations, designed to feel polished without being distracting.

Technology
HTML5

CSS3

JavaScript (ES6+)

No frameworks, no libraries, no backend.

How It Works
Strength scoring
Points are assigned for:

Length

Character diversity

Avoiding repetition

Avoiding predictable sequences

Scores map to:

Very weak

Weak

Fair

Strong

Very strong

Entropy
Calculated using:

Code
entropy = length × log2(character_set_size)
Crack‑time estimation
A conservative model assuming one billion guesses per second.

Running Locally
Clone the repository:

Code
git clone https://github.com/KE-Johnston1/password-strength-checker
cd password-strength-checker
open index.html
No build steps required.

Security Notice
This tool is intended for testing example passwords only.
It runs entirely in your browser and does not send or store any data.

Author
Created by K. Johnston, with a focus on practical cybersecurity, clarity, and user‑centred design.
