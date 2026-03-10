const cloud = document.querySelector("#cloud");
const cloudAnimation = document.querySelector(".cloud-animation");
const heroSection = document.querySelector(".section-hero");
const heroContent = document.querySelector(".section-1-content");
const switchSection = document.querySelector(".section-the-switch");
const bush = document.querySelector(".bush-svg");
const namingThingsSection = document.querySelector(".section-naming-things");
const openingSection = document.querySelector(".section-opening");
const listeningSection = document.querySelector(".section-listening");
const backpack = document.querySelector(".backpack-svg");
const rock = document.querySelector(".rock-svg");
const memorySection = document.querySelector(".section-the-memory");
const listeningSun = document.querySelector(".listening-sun-svg");
const listeningBoot = document.querySelector(".listening-boot-svg");
const listeningArrows = document.querySelector(".listening-arrows-merge-svg");
const sectionCards = document.querySelectorAll(".section-content");
const memoryRowItems = document.querySelectorAll(".memory-row-item");

const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

if (hasScrollTrigger) {
	gsap.registerPlugin(ScrollTrigger);
} else {
	console.warn("ScrollTrigger plugin is not available.");
}

function createOnceScrollTrigger(triggerElement, startPosition, onEnterCallback) {
	if (!hasScrollTrigger || !triggerElement) {
		return;
	}

	ScrollTrigger.create({
		trigger: triggerElement,
		start: startPosition,
		onEnter: onEnterCallback,
		once: true,
	});
}

if (sectionCards.length > 0) {
	sectionCards.forEach((cardElement) => {
		const paragraph = cardElement.querySelector("p");

		createOnceScrollTrigger(cardElement, "top 72%", () => {
			gsap.fromTo(
				cardElement,
				{ scale: 1 },
				{ scale: 1.1, duration: 1.2, ease: "sine.out" }
			);
			if (paragraph) {
				gsap.fromTo(
					paragraph,
					{ autoAlpha: 0, y: 15 },
					{ autoAlpha: 1, y: 0, duration: 0.9, delay: 0.2, ease: "power2.out" }
				);
			}
		});
	});
}

const allTrailMarkers = document.querySelectorAll(".trail-marker, .trail-marker2");
if (hasScrollTrigger && allTrailMarkers.length > 0) {
	allTrailMarkers.forEach((marker) => {
		gsap.fromTo(
			marker,
			{ scale: 0.5, autoAlpha: 0 },
			{
				scale: 1,
				autoAlpha: 1,
				duration: 0.8,
				ease: "back.out(1.7)",
				scrollTrigger: {
					trigger: marker,
					start: "top 85%",
					once: true
				}
			}
		);
	});
}

if (heroSection && heroContent) {
	createOnceScrollTrigger(heroSection, "top 99%", () => {
		gsap.fromTo(
			heroContent,
			{ autoAlpha: 0 },
			{ autoAlpha: 1, duration: 0.8, ease: "sine.out" }
		);
		gsap.fromTo(
			"#hero-description",
			{ autoAlpha: 0, y: 20 },
			{ autoAlpha: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
		);
	});
}

const cloudTween = gsap.fromTo(
	"#cloud",
	{ x: -300, y: -100 },
	{ x: -450, y: -900, duration: 3, paused: true }
);

if (cloud && switchSection) {
	createOnceScrollTrigger(switchSection, "top 82%", () => {
		cloudTween.restart();
	});
}

/* backpack slide animation [ AI helped ] */
if (backpack && openingSection) {
	const backpackTimeline = gsap.timeline({ paused: true });

	backpackTimeline
		.fromTo(
			".backpack-svg",
			{ x: -320, autoAlpha: 0, scale: 1 },
			{ x: 0, autoAlpha: 1, duration: 2.05, ease: "power3.out" }
		)
		.to(".backpack-svg", { scale: 1.08, duration: 0.25, ease: "power1.out" });

	createOnceScrollTrigger(openingSection, "top 78%", () => {
		backpackTimeline.restart();
	});
}

/* bush shake animation [ AI helped ] */
const bushShake = gsap.timeline({ paused: true });

bushShake
	.to(".bush-svg", {
		x: -8,
		duration: 0.08,
		repeat: 9,
		yoyo: true,
		ease: "power1.inOut",
	})
	.to(".bush-svg", { x: 0, duration: 0.08, ease: "power1.out" });

if (bush && namingThingsSection) {
	createOnceScrollTrigger(namingThingsSection, "top 76%", () => {
		bushShake.restart();
	});
}

/* listening icon row animation */
if (listeningSection && listeningSun && listeningBoot && listeningArrows) {
	const listeningTimeline = gsap.timeline({ paused: true });

	listeningTimeline
		.fromTo(
			listeningSun,
			{ y: 20, autoAlpha: 0, scale: 0.9 },
			{ y: 0, autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.8)" }
		)
		.fromTo(
			listeningBoot,
			{ y: 16, autoAlpha: 0, rotate: -12 },
			{ y: 0, autoAlpha: 1, rotate: 0, duration: 0.6, ease: "power2.out" },
			"-=0.2"
		)
		.fromTo(
			listeningArrows,
			{ y: 16, autoAlpha: 0, scale: 0.92 },
			{ y: 0, autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" },
			"-=0.25"
		)
		.to(
			listeningSun,
			{ rotation: 12, duration: 0.8, yoyo: true, repeat: 3, ease: "sine.inOut" },
			0.45
		)
		.to(
			listeningBoot,
			{ x: 12, duration: 0.2, yoyo: true, repeat: 5, ease: "power1.inOut" },
			0.45
		)
		.to(
			listeningArrows,
			{ rotation: 360, duration: 1, repeat: 1, ease: "none", transformOrigin: "50% 50%" },
			0.45
		);

	createOnceScrollTrigger(listeningSection, "top 76%", () => {
		listeningTimeline.restart();
	});
}

/* rock shake + gravel fall animation */
function createGravelBurst(pieceCount = 18) {
	if (!rock) {
		return;
	}

	const rockRect = rock.getBoundingClientRect();
	const startX = rockRect.left + rockRect.width * 0.10;
	const startY = rockRect.top + rockRect.height * 0.9;
	const gravelColors = ["#14170C", "#353334", "#9C9C9C"];

	for (let index = 0; index < pieceCount; index += 1) {
		const gravelPiece = document.createElement("span");
		const pieceSize = gsap.utils.random(3, 8, 1);
		const pieceColor =
			gravelColors[Math.floor(Math.random() * gravelColors.length)];

		gravelPiece.style.position = "fixed";
		gravelPiece.style.left = `${startX}px`;
		gravelPiece.style.top = `${startY}px`;
		gravelPiece.style.width = `${pieceSize}px`;
		gravelPiece.style.height = `${pieceSize}px`;
		gravelPiece.style.backgroundColor = pieceColor;
		gravelPiece.style.borderRadius = "50%";
		gravelPiece.style.opacity = "0.95";
		gravelPiece.style.zIndex = "20";
		gravelPiece.style.pointerEvents = "none";

		document.body.appendChild(gravelPiece);

		gsap.to(gravelPiece, {
			x: gsap.utils.random(-95, 95, 1),
			y: gsap.utils.random(120, 260, 1),
			rotation: gsap.utils.random(-180, 180, 1),
			autoAlpha: 0,
			duration: gsap.utils.random(0.7, 1.8, 0.01),
			delay: gsap.utils.random(0, 0.1, 0.01),
			ease: "power2.in",
			onComplete: () => gravelPiece.remove(),
		});
	}
}

if (rock && memorySection) {
	const rockTimeline = gsap.timeline({ paused: true });

	rockTimeline
		.call(() => createGravelBurst(14), null, 0)
		.to(".rock-svg", {
			x: -10,
			duration: 0.07,
			repeat: 11,
			yoyo: true,
			ease: "power1.inOut",
		})
		.call(() => createGravelBurst(20), null, 0.22)
		.call(() => createGravelBurst(16), null, 0.5)
		.to(".rock-svg", { x: 0, duration: 0.08, ease: "power1.out" });

	createOnceScrollTrigger(memorySection, "top 74%", () => {
		rockTimeline.restart();
	});
}

if (memorySection && memoryRowItems.length > 0) {
	createOnceScrollTrigger(memorySection, "top 66%", () => {
		gsap.fromTo(
			memoryRowItems,
			{ y: 0 },
			{
				y: -22,
				duration: 0.5,
				yoyo: true,
				repeat: 1,
				stagger: 0.14,
				ease: "sine.inOut",
			}
		);
	});
}


/* trail marker reveal image [ AI helped ] */
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


/* animations done without AI help below */
/* cloud animation */

/* Hero Parallax Animation */
if (hasScrollTrigger && heroSection) {
	// A timeline for the entire hero section's scroll
	const heroParallaxTl = gsap.timeline({
		scrollTrigger: {
			trigger: heroSection,
			start: "top top",
			end: "bottom top",
			scrub: true,
			invalidateOnRefresh: true,
		}
	});

	// Layer 1 (Background): Stays still
	if (document.querySelector(".hero-layer-1")) {
		heroParallaxTl.to(".hero-layer-1", { scale: 1, transformOrigin: "50% 100%", ease: "none" }, 0);
	}

	// Layer 2 & 3 (Distant mountains/clouds): Very slight scale
	if (document.querySelector(".hero-layer-2")) {
		heroParallaxTl.to(".hero-layer-2", { scale: 1.05, transformOrigin: "50% 100%", ease: "none" }, 0);
	}
	if (document.querySelector(".hero-layer-3")) {
		heroParallaxTl.to(".hero-layer-3", { scale: 1.1, transformOrigin: "50% 100%", ease: "none" }, 0);
	}

	// Layer 4 & 5 (Mid ranges): Moderate scale
	if (document.querySelector(".hero-layer-4")) {
		heroParallaxTl.to(".hero-layer-4", { scale: 1.25, transformOrigin: "50% 100%", ease: "none" }, 0);
	}
	if (document.querySelector(".hero-layer-5")) {
		heroParallaxTl.to(".hero-layer-5", { scale: 1.45, transformOrigin: "50% 100%", ease: "none" }, 0);
	}

	// Layer 6 & 7 (Close ranges): Large scale, moving down slightly to stay grounded
	if (document.querySelector(".hero-layer-6")) {
		heroParallaxTl.to(".hero-layer-6", { scale: 1.75, transformOrigin: "50% 100%", ease: "none" }, 0);
	}
	if (document.querySelector(".hero-layer-7")) {
		heroParallaxTl.to(".hero-layer-7", { scale: 2.2, transformOrigin: "50% 100%", ease: "none" }, 0);
	}

	// Layer 8 (Immediate foreground left/right): Massive scale
	if (document.querySelector(".hero-layer-8")) {
		heroParallaxTl.to(".hero-layer-8", { scale: 3, transformOrigin: "50% 100%", ease: "none" }, 0);
	}

	// Sun SVG: Move up slightly
	if (document.querySelector(".sun-svg")) {
		heroParallaxTl.to(".sun-svg", { y: -50, transformOrigin: "50% 50%", ease: "none" }, 0);
	}
}

/* Chapter Titles Animation */
const chapterTitles = document.querySelectorAll(".chapter-title");

if (hasScrollTrigger && chapterTitles.length > 0) {
	chapterTitles.forEach((title) => {
		gsap.fromTo(
			title,
			{ y: 50, autoAlpha: 0 },
			{
				y: 0,
				autoAlpha: 1,
				duration: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: title,
					start: "top 85%",
					once: true
				}
			}
		);
	});
}