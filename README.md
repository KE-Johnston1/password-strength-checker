Password Strength Tester
A clear, practical tool for assessing password strength directly in the browser.
It provides real‑time feedback based on length, character variety, entropy, and common weaknesses such as repetition or predictable patterns.

Everything runs locally — nothing is stored or transmitted.

Live Demo
🔗 https://ke-johnston1.github.io/password-strength-checker

Screenshot
markdown
![Screenshot of the Password Strength Tester](./screenshot.jpg)
Why I Built This
I created this project to demonstrate practical cybersecurity thinking and to show how password strength can be explained clearly without overwhelming users.
It’s intentionally simple, lightweight, and focused on usability — the sort of tool that helps people understand why strong passwords matter, not just whether theirs is “good enough”.

Key Features at a Glance
Real‑time strength analysis

Entropy calculation (bits)

Crack‑time estimation

Requirement checklist

Pattern detection

Show/Hide password toggle

Modern, responsive interface

No libraries, no backend, no tracking

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

What I Learned
How to design a user‑centred interface for a security‑focused tool

How to calculate entropy and explain it in a way non‑technical users can understand

How to detect common password weaknesses without relying on external libraries

How to structure a small project cleanly and make it easy to maintain

How to present technical work clearly for recruiters and hiring managers

Future Improvements
Add a built‑in password generator

Add keyboard‑walk detection (e.g., qwertyuiop)

Add light/dark mode toggle

Add accessibility improvements (ARIA labels, high‑contrast mode)

Add optional “export report” feature

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
