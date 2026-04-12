// js/menu.js

function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.style.width = menu.style.width === "250px" ? "0" : "250px";
}

function closeMenu() {
  document.getElementById("sideMenu").style.width = "0";
}
