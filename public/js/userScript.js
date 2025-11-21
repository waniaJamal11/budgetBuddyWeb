// ---------------- Logo Loader ----------------
window.addEventListener("load", () => {
  const loader = document.getElementById("logo-loader");
  if (!loader) return;

  const animationPlayed = sessionStorage.getItem("logoAnimationPlayed");

  if (!animationPlayed) {
    loader.style.display = "flex";
    setTimeout(() => {
      loader.style.display = "none";
      sessionStorage.setItem("logoAnimationPlayed", "true");
    }, 2800);
  } else {
    loader.style.display = "none";
  }
});

// -----------eye icon for password feild-----------
function setupPasswordToggle(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    icon.addEventListener("click", () => {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";

        icon.classList.toggle("bi-eye");
        icon.classList.toggle("bi-eye-slash");
    });
}

setupPasswordToggle("passwordInput", "togglePassword");
setupPasswordToggle("confirmPasswordInput", "toggleConfirmPassword");

