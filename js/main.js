const progressBar = document.getElementById("year-in-progress");

const now = new Date();
const yearStart = new Date(now.getFullYear(), 0, 1);
const diff = now - yearStart;
const daysPassed = Math.ceil(diff / (1000 * 60 * 60 * 24));
const daysRemaining = 365 - daysPassed;
const progress = Math.floor((daysPassed / 365) * 100);
const barLength = Math.floor(progress / 2);
const bar = "▓".repeat(barLength) + "░".repeat(50 - barLength);

const currentDate = now.toDateString();
const progressText = `
  <p>Today is ${currentDate}</p>
  <p>Year in progress: ${progress}%</p>
  <p>
    <span class="bar">
      <span class="progress" style="width: ${progress}%">${bar}</span>
    </span>
  </p>
  <p>${daysRemaining} days remaining in the year.</p>
`;

progressBar.innerHTML = progressText;