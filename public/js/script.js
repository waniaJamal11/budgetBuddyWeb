document.addEventListener("DOMContentLoaded", () => {
  const alerts = Array.from(document.querySelectorAll(".custom-alert"));
  if (!alerts.length) return;

  alerts.forEach((alert) => {
    // force layout so transition from base -> show runs
    void alert.offsetWidth;
    alert.classList.add("show");

    // auto-hide after 3 seconds
    const AUTO_HIDE_MS = 3000;
    const TRANSITION_MS = 360; // match CSS transition duration

    setTimeout(() => {
      // start hide animation
      alert.classList.remove("show");
      alert.classList.add("hide");

      // remove after transition finishes
      setTimeout(() => {
        if (alert && alert.parentNode) alert.parentNode.removeChild(alert);
      }, TRANSITION_MS + 20);
    }, AUTO_HIDE_MS);
  });
});

//logo
window.addEventListener("load", () => {
  const loader = document.getElementById("logo-loader");

  // Check if animation already played in this session
  const animationPlayed = sessionStorage.getItem("logoAnimationPlayed");

  if (!animationPlayed) {
    loader.style.display = "flex";

    setTimeout(() => {
      loader.style.display = "none";
      // Mark animation as played in this session
      sessionStorage.setItem("logoAnimationPlayed", "true");
    }, 2800);
  } 
  else {
    // Skip loader if already played
    loader.style.display = "none";
  }
});




