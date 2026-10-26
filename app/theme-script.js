export const THEME_KEY = "freeapi-theme";

// Runs before first paint: a saved choice wins, otherwise follow the system setting
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;
