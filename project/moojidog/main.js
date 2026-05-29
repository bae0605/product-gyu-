"use strict";

function startTrip() {
  document.getElementById("overlay").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeTrip() {
  document.getElementById("overlay").classList.remove("show");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeTrip();
});
