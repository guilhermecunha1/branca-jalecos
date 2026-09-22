const logoutButton = document.getElementById("logoutButton");
const logoutConfirm = document.getElementById("logoutConfirm");
const overlay = document.getElementById("overlay");
const cancelLogout = document.getElementById("cancelLogout");
const userMenuToggle = document.getElementById("userMenuToggle");
const userMenuDropdown = document.getElementById("userMenuDropdown");

function closeUserMenu() {
  if (!userMenuToggle || !userMenuDropdown) return;
  userMenuDropdown.hidden = true;
  userMenuToggle.setAttribute("aria-expanded", "false");
}

function openLogoutConfirmation() {
  closeUserMenu();
  if (!logoutConfirm || !overlay) return;

  logoutConfirm.hidden = false;
  overlay.hidden = false;
  requestAnimationFrame(() => {
    logoutConfirm.classList.add("show");
    overlay.classList.add("show");
  });
  cancelLogout?.focus();
}

function closeLogout() {
  if (!logoutConfirm || !overlay) return;
  logoutConfirm.classList.remove("show");
  overlay.classList.remove("show");
  window.setTimeout(() => {
    logoutConfirm.hidden = true;
    overlay.hidden = true;
  }, 250);
}

if (userMenuToggle && userMenuDropdown) {
  userMenuToggle.addEventListener("click", () => {
    const isOpen = userMenuToggle.getAttribute("aria-expanded") === "true";
    userMenuDropdown.hidden = isOpen;
    userMenuToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".user-menu")) closeUserMenu();
  });
}

logoutButton?.addEventListener("click", openLogoutConfirmation);
cancelLogout?.addEventListener("click", closeLogout);
overlay?.addEventListener("click", closeLogout);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeUserMenu();
    closeLogout();
  }
});
