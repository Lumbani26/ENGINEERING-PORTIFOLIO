const fadeIns = document.querySelectorAll(".fade-in");

function checkFadeIns() {
  fadeIns.forEach((fadeIn) => {
    const rect = fadeIn.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      fadeIn.style.opacity = 1;
      fadeIn.style.transform = "translateY(0)";
    }
  });
}
window.addEventListener("scroll", checkFadeIns);
checkFadeIns();
