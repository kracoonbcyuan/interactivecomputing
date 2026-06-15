const currentYear = document.querySelector("#current-year");
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

currentYear.textContent = new Date().getFullYear();

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});
