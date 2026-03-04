const cloud = document.querySelector("#cloud");
const cloudAnimation = document.querySelector(".cloud-animation");
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

const cloudTween = gsap.fromTo(
	"#cloud",
	{ x: -300, y: -100 },
	{ x: -450, y: -900, duration: 3, paused: true }
);

if (cloud && switchSection) {
	const cloudObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				cloudTween.restart();
				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.45 }
	);

	cloudObserver.observe(switchSection);
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

	const backpackObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				backpackTimeline.restart();
				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.35 }
	);

	backpackObserver.observe(openingSection);
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
	const bushObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				bushShake.restart();
				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.45 }
	);

	bushObserver.observe(namingThingsSection);
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

	const listeningObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				listeningTimeline.restart();
				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.4 }
	);

	listeningObserver.observe(listeningSection);
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

	const rockObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				rockTimeline.restart();
				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.4 }
	);

	rockObserver.observe(memorySection);
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