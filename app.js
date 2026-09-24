document.documentElement.classList.add("js");

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

// Photos that are not in assets/images yet: hide them, and if a chapter has
// no photos left, show its text as a single centred card.
function refreshChapter(chapter) {
  if (!chapter.querySelector(".chapter-photos figure")) {
    chapter.classList.add("no-photos");
  }
}

document.querySelectorAll(".chapter").forEach((chapter) => {
  chapter.querySelectorAll(".chapter-photos img").forEach((img) => {
    const drop = () => {
      img.closest("figure")?.remove();
      refreshChapter(chapter);
    };
    if (img.complete && img.naturalWidth === 0) {
      drop();
    } else {
      img.addEventListener("error", drop, { once: true });
    }
  });
  refreshChapter(chapter);
});
