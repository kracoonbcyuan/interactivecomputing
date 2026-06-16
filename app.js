let sketches = [];
let activeSketchId = null;
let activeScript = null;

const body = document.body;
const pageTitle = document.querySelector(".class-title");
const menuButton = document.querySelector(".hamburger");
const closeButton = document.querySelector(".close-btn");
const sidebar = document.querySelector(".sidebar");
const sketchList = document.querySelector(".sketch-list");
const sketchTitle = document.querySelector(".sketch-title");
const appRoot = document.querySelector("#app");

function setMenuOpen(isOpen) {
  body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  sidebar.setAttribute("aria-hidden", String(!isOpen));
}

function setActiveButton(sketchId) {
  document.querySelectorAll(".sketch-list button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.sketchId === sketchId);
  });
}

function moveCanvasIntoApp() {
  const canvas = document.querySelector("canvas");

  if (!canvas) {
    return;
  }

  if (!appRoot.contains(canvas)) {
    appRoot.append(canvas);
  }

  canvas.style.setProperty("--sketch-ratio", canvas.width / canvas.height);
}

function startGlobalP5Sketch() {
  if (typeof window.p5 === "function") {
    new window.p5();
    window.setTimeout(moveCanvasIntoApp, 0);
    window.setTimeout(moveCanvasIntoApp, 100);
  }
}

function loadSketchScript(sketch) {
  return new Promise((resolve, reject) => {
    if (!sketch.script || activeScript === sketch.script) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `./${sketch.script}`;
    script.onload = () => {
      activeScript = sketch.script;
      startGlobalP5Sketch();
      resolve();
    };
    script.onerror = reject;
    document.body.append(script);
  });
}

async function loadSketch(sketch) {
  if (sketch.enabled === false) {
    return;
  }

  if (activeSketchId && activeSketchId !== sketch.id) {
    const url = new URL(window.location.href);
    url.searchParams.set("sketch", sketch.id);
    window.location.href = url.toString();
    return;
  }

  activeSketchId = sketch.id;
  sketchTitle.textContent = sketch.title;
  body.classList.add("has-sketch");
  setActiveButton(sketch.id);
  setMenuOpen(false);

  try {
    await loadSketchScript(sketch);
  } catch (error) {
    console.warn(`Could not load ${sketch.script}.`, error);
  }
}

function showHome() {
  sketchTitle.textContent = "";
  body.classList.remove("has-sketch");
  setActiveButton("");
  setMenuOpen(false);

  const url = new URL(window.location.href);
  url.searchParams.delete("sketch");
  window.history.replaceState({}, "", url.toString());
}

function renderSketchList() {
  sketchList.replaceChildren();

  sketches.forEach((sketch) => {
    const item = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = sketch.title;
    button.dataset.sketchId = sketch.id;
    button.dataset.nodeId = sketch.nodeId || "";
    button.addEventListener("click", () => loadSketch(sketch));

    item.append(button);
    sketchList.append(item);
  });
}

async function loadMenuConfig() {
  try {
    const response = await fetch("./figma-menu.json", { cache: "no-store" });
    const config = await response.json();

    if (Array.isArray(config.items)) {
      sketches = config.items.map((item) => ({
        id: item.frameName || item.title,
        title: item.title || item.frameName,
        script: item.script || `${item.frameName || item.title}.js`,
        nodeId: item.nodeId,
        enabled: item.enabled !== false,
      }));
    }
  } catch (error) {
    console.warn("Using fallback menu.", error);
  }

  renderSketchList();

  const selectedId = new URLSearchParams(window.location.search).get("sketch");
  const selectedSketch = sketches.find((sketch) => sketch.id === selectedId);

  if (selectedSketch) {
    loadSketch(selectedSketch);
  }
}

menuButton.addEventListener("click", () => {
  setMenuOpen(!body.classList.contains("menu-open"));
});

closeButton.addEventListener("click", () => {
  setMenuOpen(false);
});

pageTitle.addEventListener("click", showHome);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

loadMenuConfig();
setMenuOpen(false);