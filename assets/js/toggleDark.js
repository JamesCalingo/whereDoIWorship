const toggleBtn = document.querySelector("#toggle");

function toggleDark() {
  const body = document.querySelector("body");
  body.classList.toggle("dark");
}

toggleBtn.addEventListener("click", toggleDark);
