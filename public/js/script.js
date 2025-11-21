// ---------------- Custom Alerts ----------------
(function () {
  const alerts = Array.from(document.querySelectorAll(".custom-alert"));
  if (!alerts.length) return;

  alerts.forEach((alert) => {
    // trigger CSS transition
    void alert.offsetWidth;
    alert.classList.add("show");

    const AUTO_HIDE_MS = 3000;
    const TRANSITION_MS = 360; // match CSS

    setTimeout(() => {
      alert.classList.remove("show");
      alert.classList.add("hide");

      setTimeout(() => {
        if (alert && alert.parentNode) alert.parentNode.removeChild(alert);
      }, TRANSITION_MS + 20);
    }, AUTO_HIDE_MS);
  });
})();

// ----------------log out---------------------
(function () {
  function initLogoutBox() {
    const logoutBox = document.getElementById("logoutBox");
    const logoutCancel = document.getElementById("logoutCancel");
    const logoutConfirm = document.getElementById("logoutConfirm");

    if (!logoutBox || !logoutCancel || !logoutConfirm) return;

    // Open logout popup
    document.querySelectorAll(".logout-btn").forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        logoutBox.style.display = "flex";
        logoutConfirm.focus();
      });
    });

    // Cancel hides popup
    logoutCancel.addEventListener("click", () => {
      logoutBox.style.display = "none";
    });

    // Confirm logout
    logoutConfirm.addEventListener("click", () => {
      window.location.href = "/logout"; // perform logout
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        logoutBox.style.display = "none";
      }
    });

    // Click outside to close
    logoutBox.addEventListener("click", (e) => {
      if (e.target === logoutBox) {
        logoutBox.style.display = "none";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLogoutBox);
  } else {
    initLogoutBox();
  }
})();

