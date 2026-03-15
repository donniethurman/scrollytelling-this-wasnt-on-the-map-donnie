/* -------------------------------------------------------------------------- */
/*                                Initialization                              */
/* -------------------------------------------------------------------------- */

const hasGSAP = typeof gsap !== "undefined";
const hasScrollTrigger = typeof ScrollTrigger !== "undefined";
const hasScrollSmoother = typeof ScrollSmoother !== "undefined";

if (hasGSAP && hasScrollTrigger) {
	gsap.registerPlugin(ScrollTrigger);
	if (hasScrollSmoother) {
		gsap.registerPlugin(ScrollSmoother);
	}
} else {
	console.warn("GSAP or ScrollTrigger plugin is not available.");
}

// Global Smoother Instance
let smoother;

/* -------------------------------------------------------------------------- */
/*                                  Main Setup                                */
/* -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
	initApp();
});

function initApp() {
	// 1. Accessibility Check (Reduced Motion)
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// 2. Initialize ScrollSmoother (if available and no reduced motion)
	if (hasScrollSmoother && !prefersReducedMotion) {
		smoother = ScrollSmoother.create({
			wrapper: "#smooth-wrapper",
			content: "#smooth-content",
			smooth: 1.5,
			effects: true,
		});
	}

	// 3. Register Animations
	initHeroParallax(prefersReducedMotion);
	initSectionTransitions();
	initMarkerAnimations();
	initNarrativeAnimations(prefersReducedMotion);
	initMarkerReveal();
	initThemeToggle();
	initCampfireShowpiece(prefersReducedMotion);
}

/* -------------------------------------------------------------------------- */
/*                                Theme Toggle                                */
/* -------------------------------------------------------------------------- */

function initThemeToggle() {
	const toggleBtn = document.querySelector("#theme-toggle");
	if (!toggleBtn) return;

	// Load saved theme
	const savedTheme = localStorage.getItem("theme") || "dark";
	document.body.classList.add(savedTheme + "-mode");

	toggleBtn.addEventListener("click", () => {
		const isDark = document.body.classList.contains("dark-mode");
		const newTheme = isDark ? "light" : "dark";

		document.body.classList.remove(isDark ? "dark-mode" : "light-mode");
		document.body.classList.add(newTheme + "-mode");
		localStorage.setItem("theme", newTheme);

		// Animate toggle
		gsap.fromTo(toggleBtn, 
			{ rotate: 0 }, 
			{ rotate: 360, duration: 0.5, ease: "back.out(1.5)" }
		);
	});
}

function initCampfireShowpiece(reducedMotion) {
	const campfireSection = document.querySelector(".section-campfire");
	if (!campfireSection || reducedMotion) return;

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: campfireSection,
			start: "top top",
			end: "+=2000",
			scrub: 1,
			pin: true,
			anticipatePin: 1
		}
	});

	// Animate campfire flicker (Slowed down and softened)
	gsap.to(".campfire-svg", {
		scale: 1.05,
		filter: "drop-shadow(0 0 25px #ff8800)",
		duration: 0.8,
		repeat: -1,
		yoyo: true,
		ease: "sine.inOut"
	});

	// Timeline animations
	tl.from(".campfire-text", { autoAlpha: 0, y: 50, duration: 1 })
	  .to(".sky-background", { background: "radial-gradient(circle at 50% 100%, #1a0a0a 0%, #000000 100%)", duration: 1 }, "-=0.5")
	  .to(".campfire-svg", { scale: 1.5, duration: 1 }, "-=0.5")
	  .to(".campfire-text", { autoAlpha: 0, y: -50, duration: 1, delay: 1 });
}

/* -------------------------------------------------------------------------- */
/*                                  Animations                                */
/* -------------------------------------------------------------------------- */

function initHeroParallax(reducedMotion) {
	const heroSection = document.querySelector(".section-hero");
	if (!heroSection) return;

	// Content fade in
	gsap.fromTo(
		".section-1-content",
		{ autoAlpha: 0, y: 30 },
		{ autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.5 }
	);

	if (reducedMotion) return;

	const heroParallaxTl = gsap.timeline({
		scrollTrigger: {
			trigger: heroSection,
			start: "top top",
			end: "bottom top",
			scrub: true,
		}
	});

	const layers = [
		{ selector: ".hero-layer-2", scale: 1.05 },
		{ selector: ".hero-layer-3", scale: 1.1 },
		{ selector: ".hero-layer-4", scale: 1.25 },
		{ selector: ".hero-layer-5", scale: 1.45 },
		{ selector: ".hero-layer-6", scale: 1.75 },
		{ selector: ".hero-layer-7", scale: 2.2 },
		{ selector: ".hero-layer-8", scale: 3 },
	];

	layers.forEach(layer => {
		if (document.querySelector(layer.selector)) {
			heroParallaxTl.to(layer.selector, { scale: layer.scale, transformOrigin: "50% 100%", ease: "none" }, 0);
		}
	});

	if (document.querySelector(".sun-svg")) {
		heroParallaxTl.to(".sun-svg", { y: -100, ease: "none" }, 0);
	}
}

function initSectionTransitions() {
	const sectionCards = document.querySelectorAll(".section-content");
	sectionCards.forEach((card) => {
		const paragraph = card.querySelector("p");
		
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: card,
				start: "top 85%",
				toggleActions: "play none none reverse"
			}
		});

		tl.fromTo(card, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" });
		
		if (paragraph) {
			tl.fromTo(paragraph, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "-=0.6");
		}
	});
}

function initMarkerAnimations() {
	const markers = document.querySelectorAll(".trail-marker, .trail-marker2");
	markers.forEach((marker) => {
		gsap.fromTo(
			marker,
			{ scale: 0.5, autoAlpha: 0, rotate: -15 },
			{
				scale: 1,
				autoAlpha: 1,
				rotate: 0,
				duration: 1,
				ease: "back.out(1.7)",
				scrollTrigger: {
					trigger: marker,
					start: "top 90%",
					toggleActions: "play none none reverse"
				}
			}
		);
	});

	const chapterTitles = document.querySelectorAll(".chapter-title h2, .chapter-title h3");
	chapterTitles.forEach(title => {
		gsap.fromTo(title, 
			{ autoAlpha: 0, x: title.classList.contains('opening-title-text') ? -50 : 50 },
			{ 
				autoAlpha: 1, 
				x: 0, 
				duration: 1, 
				ease: "power2.out",
				scrollTrigger: {
					trigger: title,
					start: "top 90%",
					toggleActions: "play none none reverse"
				}
			}
		);
	});
}

function initNarrativeAnimations(reducedMotion) {
	if (reducedMotion) return;

	// Backpack (Opening)
	if (document.querySelector(".backpack-svg")) {
		gsap.fromTo(".backpack-svg", 
			{ x: 100, autoAlpha: 0 },
			{ 
				x: 0, 
				autoAlpha: 1, 
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".section-opening",
					start: "top 70%",
					end: "bottom 30%",
					scrub: 1
				}
			}
		);
	}

	// Bush (Naming Things)
	if (document.querySelector(".bush-svg")) {
		gsap.to(".bush-svg", {
			x: 10,
			repeat: -1,
			yoyo: true,
			duration: 0.1,
			ease: "sine.inOut",
			scrollTrigger: {
				trigger: ".section-naming-things",
				start: "top 50%",
				end: "bottom 50%",
				toggleActions: "play pause resume pause"
			}
		});
	}

	// Cloud (The Switch)
	if (document.querySelector("#cloud")) {
		gsap.fromTo("#cloud", 
			{ x: -100, autoAlpha: 0 },
			{ 
				x: 200, 
				y: -200,
				autoAlpha: 1,
				scrollTrigger: {
					trigger: ".section-the-switch",
					start: "top 80%",
					end: "bottom 20%",
					scrub: 2
				}
			}
		);
	}

	// Listening Icons
	const listeningIcons = document.querySelectorAll(".listening-icons-row img");
	if (listeningIcons.length > 0) {
		gsap.fromTo(listeningIcons, 
			{ scale: 0, autoAlpha: 0 },
			{ 
				scale: 1, 
				autoAlpha: 1, 
				stagger: 0.2, 
				ease: "back.out(1.7)",
				scrollTrigger: {
					trigger: ".listening-icons-row",
					start: "top 85%",
					toggleActions: "play none none reverse"
				}
			}
		);
	}

	// Rock (Memory)
	if (document.querySelector(".rock-svg")) {
		gsap.to(".rock-svg", {
			rotation: 5,
			repeat: -1,
			yoyo: true,
			duration: 0.2,
			ease: "sine.inOut",
			scrollTrigger: {
				trigger: ".section-the-memory",
				start: "top 50%",
				toggleActions: "play pause resume pause"
			}
		});
	}
}

/* -------------------------------------------------------------------------- */
/*                               Marker Reveal                                */
/* -------------------------------------------------------------------------- */

function initMarkerReveal() {
	const markers = document.querySelectorAll(".trail-marker, .trail-marker2");
	const revealImage = createRevealOverlay();

	const markerImageMap = {
		".section-first-contact": "assets/console-log.png",
		".section-naming-things": "assets/variables.png",
		".section-the-switch": "assets/conditionals.png",
		".section-listening": "assets/event-listener.png",
		".section-the-memory": "assets/local-storage.png",
	};

	markers.forEach((marker) => {
		const section = marker.closest("section");
		if (!section || section.classList.contains("section-opening") || section.classList.contains("section-closing")) {
			return;
		}

		marker.style.cursor = "pointer";
		marker.setAttribute("role", "button");
		marker.setAttribute("tabindex", "0");
		marker.setAttribute("aria-label", "Show memory for this section");

		const showImage = () => {
			const sectionClass = "." + section.className.split(" ")[0];
			const imgSrc = markerImageMap[sectionClass];
			if (imgSrc) {
				revealImage.querySelector("img").src = imgSrc;
				gsap.to(revealImage, { autoAlpha: 1, display: "flex", duration: 0.4 });
				revealImage.querySelector(".close-btn").focus();
			}
		};

		marker.addEventListener("click", showImage);
		marker.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				showImage();
			}
		});
	});
}

function createRevealOverlay() {
	const overlay = document.createElement("div");
	overlay.id = "reveal-overlay";
	overlay.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.85);
		display: none;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		opacity: 0;
		backdrop-filter: blur(5px);
	`;

	const content = document.createElement("div");
	content.style.cssText = `
		position: relative;
		width: min(80vw, 800px);
		background: var(--cream-color);
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0 10px 30px rgba(0,0,0,0.5);
	`;

	const img = document.createElement("img");
	img.style.cssText = "width: 100%; height: auto; border-radius: 0.5rem; display: block;";
	
	const closeBtn = document.createElement("button");
	closeBtn.className = "close-btn";
	closeBtn.innerText = "×";
	closeBtn.setAttribute("aria-label", "Close overlay");
	closeBtn.style.cssText = `
		position: absolute;
		top: -20px;
		right: -20px;
		width: 40px;
		height: 40px;
		background: var(--orange-50);
		color: white;
		border: none;
		border-radius: 50%;
		font-size: 24px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 10px rgba(0,0,0,0.3);
	`;

	content.appendChild(img);
	content.appendChild(closeBtn);
	overlay.appendChild(content);
	document.body.appendChild(overlay);

	const hide = () => gsap.to(overlay, { autoAlpha: 0, display: "none", duration: 0.3 });

	closeBtn.addEventListener("click", hide);
	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) hide();
	});

	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && overlay.style.display === "flex") hide();
	});

	return overlay;
}