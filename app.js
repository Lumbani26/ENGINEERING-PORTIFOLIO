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

// Photos: hide any that are not in assets/images yet. A chapter left with no
// photos shows its text as a single centred card. A chapter with more than
// one surviving photo becomes an auto-advancing slideshow: one photo at a
// time, sliding to the next after SLIDE_INTERVAL_MS.
const SLIDE_INTERVAL_MS = 5000; // how long each photo stays on screen

function startCarousel(container, figures) {
  container.classList.add("carousel");
  const track = document.createElement("div");
  track.className = "carousel-track";
  figures.forEach((figure) => track.appendChild(figure));
  container.appendChild(track);

  let index = 0;
  setInterval(() => {
    index = (index + 1) % figures.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, SLIDE_INTERVAL_MS);
}

document.querySelectorAll(".chapter").forEach((chapter) => {
  const photosEl = chapter.querySelector(".chapter-photos");
  if (!photosEl) return;

  const figures = Array.from(photosEl.querySelectorAll("figure"));
  if (figures.length === 0) {
    chapter.classList.add("no-photos");
    return;
  }

  let pending = figures.length;
  function finish() {
    const remaining = Array.from(photosEl.querySelectorAll("figure"));
    if (remaining.length === 0) {
      chapter.classList.add("no-photos");
    } else if (remaining.length > 1) {
      startCarousel(photosEl, remaining);
    }
  }

  figures.forEach((figure) => {
    const img = figure.querySelector("img");
    const settle = () => {
      pending -= 1;
      if (pending <= 0) finish();
    };
    const drop = () => {
      figure.remove();
      settle();
    };
    if (img.complete) {
      img.naturalWidth === 0 ? drop() : settle();
    } else {
      img.addEventListener("load", settle, { once: true });
      img.addEventListener("error", drop, { once: true });
    }
  });
});
