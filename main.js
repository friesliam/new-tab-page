const searchElement = document.getElementById("search-element");
const clock = document.getElementById("clock");
const searchEngines = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    bing: "https://www.bing.com/search?q="
};
const searchEngineIcons = Array.from(document.getElementById("search-engine-selector").children);

let searchEngine = localStorage.getItem("searchEngine") || "google";


(function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit"
    });
    clock.textContent = time;

    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    setTimeout(updateTime, msToNextMinute);
})();


searchElement.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const query = searchElement.value.trim();

    if (/^(about:|chrome:\/\/|edge:\/\/|brave:\/\/)/i.test(query)) {
        location.href = query;
        return;
    }

    try {
        let url = new URL(query);
        location.href = url.href;
        return;
    } catch { }

    try {
        let url = new URL("https://" + query);
        location.href = url.href;
        return;
    } catch { }

    location.href = searchEngines[searchEngine] + encodeURIComponent(query);
});


searchEngineIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        searchEngineIcons.forEach(i => {
            i.style.marginTop = "unset"
        });
        icon.style.marginTop = "calc(-1.0 * var(--search-engine-icon-hover-height))";
        const name = icon.getAttribute("data-name");
        searchEngine = name;
        localStorage.setItem("searchEngine", name);
    });
});


searchEngineIcons.forEach(icon => {
    const name = icon.getAttribute("data-name");

    if (name === searchEngine) {
        icon.style.marginTop = "calc(-1.0 * var(--search-engine-icon-hover-height))";
    } else {
        icon.style.marginTop = "unset";
    }
});
