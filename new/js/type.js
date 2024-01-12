document.addEventListener("DOMContentLoaded", function () {
	const strings = [
		`TODAY IS ${currentDate}`,
		`We're ${progress}% through the year`,
		`and ${daysRemaining} days remain in the year`
		// "Hello, World!",
		// "My name is Vincent",
		// "I am a frontend developer",
		// "I like to draw and make clay sculptures"
	];

	const typingDelay = 100;
	const backspaceDelay = 100;
	const pauseBetweenStringsDelay = 2500;
	const promptFlash = 500; // typingDelay * 5;

	let index = 0;
	let charIndex = 0;
	let isDeleting = false;

	const element = document.querySelector(".output");
	const prompt = document.createElement("span");
	prompt.className = "prompt";
	element.parentNode.appendChild(prompt);

	function typeText() {
		const currentString = strings[index];

		if (isDeleting) {
			element.textContent = currentString.substring(0, charIndex - 1);
			charIndex--;
		} else {
			element.textContent = currentString.substring(0, charIndex + 1);
			charIndex++;
		}

		if (charIndex === currentString.length && !isDeleting) {
			isDeleting = true;
			setTimeout(pauseBetweenStrings, pauseBetweenStringsDelay);
		} else if (charIndex === 0 && isDeleting) {
			isDeleting = false;
			index = (index + 1) % strings.length;
			setTimeout(typeText, typingDelay);
		} else {
			setTimeout(typeText, isDeleting ? backspaceDelay : typingDelay);
		}
	}

	typeText();

	function pauseBetweenStrings() {
		setTimeout(typeText, typingDelay);
	}

	function flashingPrompt() {
		prompt.style.visibility =
			prompt.style.visibility === "hidden" ? "visible" : "hidden";
		setTimeout(flashingPrompt, promptFlash);
	}

	flashingPrompt();
});
