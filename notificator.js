// the notificator!#

var defaultSoundFile = 'calm.mp3';

var audio = new Audio(defaultSoundFile);
var isPlaying = false;
var countdownTimeout;

function playCustomSound() {
  if (!isPlaying) {
    isPlaying = true;
    updatePlayButtonIcon();
    playRandomNotification();
  } else {
    stopCustomSound();
  }
}

function stopCustomSound() {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  updatePlayButtonIcon();
  clearTimeout(countdownTimeout);
}

function playRandomNotification() {
  var minInterval = 5000; // 5 seconds
  var maxInterval = 25000; // 35 seconds

  var randomInterval = Math.random() * (maxInterval - minInterval) + minInterval;

  var countdownDisplay = document.querySelector('.seconds');

  function updateCountdown() {
    var secondsLeft = Math.ceil(randomInterval / 1000);
    countdownDisplay.textContent = `${secondsLeft} `;

    if (secondsLeft > 0 && isPlaying) {
      randomInterval -= 1000;
      countdownTimeout = setTimeout(updateCountdown, 1000);
    } else {
      countdownDisplay.textContent = '0';
      if (isPlaying) {
        audio.play();
        countdownTimeout = setTimeout(playRandomNotification, 0);
      }
    }
  }

  updateCountdown();
}

function updatePlayButtonIcon() {
  var playIcon = document.getElementById('playIcon');
  var stopIcon = document.getElementById('stopIcon');

  if (isPlaying) {
    playIcon.style.display = 'none';
    stopIcon.style.display = 'inline';
  } else {
    playIcon.style.display = 'inline';
    stopIcon.style.display = 'none';
  }
}

document.getElementById('playButton').addEventListener('click', function () {
  playCustomSound();
});
