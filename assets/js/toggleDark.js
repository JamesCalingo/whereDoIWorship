//@ts-check
const toggleBtn = document.querySelector("#toggle");

function toggleDark() {
  const body = document.querySelector("body");
  body.classList.toggle("dark");
  console.log(body.classList.contains("dark"))
}


toggleBtn.addEventListener("click", toggleDark);
