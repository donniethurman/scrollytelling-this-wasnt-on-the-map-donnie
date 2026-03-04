const cloud = document.querySelector("#cloud");
const cloudAnimation = document.querySelector(".cloud-animation");

const h = gsap.fromTo("#cloud", {x:-300, y:-100}, {x:-450, y:-900, duration: 3});


/* trail marker reveal image [ AI helped ]*/
const trailMarkers = document.querySelectorAll(".trail-marker, .trail-marker2");
const revealImage = document.createElement("img");
const markerImageMap = {
	".section-first-contact": "assets/console-log.png",
	".section-naming-things": "assets/variables.png",
	".section-the-switch": "assets/conditionals.png",
	".section-listening": "assets/event-listener.png",
	".section-the-memory": "assets/local-storage.png",
};

revealImage.src = "assets/background-LITS.jpg";
revealImage.alt = "Trail memory image";
revealImage.style.position = "fixed";
revealImage.style.display = "none";
revealImage.style.width = "min(62rem, 80vw)";
revealImage.style.maxHeight = "75vh";
revealImage.style.objectFit = "cover";
revealImage.style.borderRadius = "1rem";
revealImage.style.zIndex = "50";

document.body.appendChild(revealImage);

let activeMarker = null;

function getMarkerImageSource(markerElement) {
	const matchedSectionSelector = Object.keys(markerImageMap).find((sectionSelector) => {
		return markerElement.closest(sectionSelector);
	});

	if (!matchedSectionSelector) {
		return null;
	}

	return markerImageMap[matchedSectionSelector];
}

function hideRevealImage() {
	revealImage.style.display = "none";
	activeMarker = null;
}

function positionRevealImage() {
	revealImage.style.left = "50%";
	revealImage.style.top = "50%";
	revealImage.style.transform = "translate(-50%, -50%)";
}

trailMarkers.forEach((markerElement) => {
	const isDisabledSection = markerElement.closest(".section-opening, .section-closing");

	if (isDisabledSection) {
		markerElement.style.cursor = "default";
		return;
	}

	markerElement.style.cursor = "pointer";

	markerElement.addEventListener("click", (event) => {
		event.stopPropagation();
		const imageSource = getMarkerImageSource(markerElement);

		if (!imageSource) {
			return;
		}

		if (activeMarker === markerElement && revealImage.style.display === "block") {
			hideRevealImage();
			return;
		}

		revealImage.src = imageSource;
		positionRevealImage();
		revealImage.style.display = "block";
		activeMarker = markerElement;
	});
});

document.addEventListener("click", hideRevealImage);

window.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		hideRevealImage();
	}
});

window.addEventListener("resize", () => {
	if (activeMarker) {
		positionRevealImage();
	}
});