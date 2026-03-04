const cloud = document.querySelector("#cloud");
const cloudAnimation = document.querySelector(".cloud-animation");

const h = gsap.fromTo("#cloud", {x:100, y:50}, {x:-300, y:-700, duration: 3});