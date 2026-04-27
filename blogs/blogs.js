document.addEventListener("DOMContentLoaded", () => {
  const page = document.body;
  const root = document.documentElement;
  const buttons = Array.from(document.querySelectorAll("[data-lang-button]"));
  const langLinks = Array.from(document.querySelectorAll("[data-lang-link]"));

  if (!page || buttons.length === 0) {
    return;
  }

  const updateLangLinks = (lang) => {
    langLinks.forEach((link) => {
      const baseHref = link.getAttribute("data-base-href") || link.getAttribute("href") || "";
      const nextHref = lang === "zh" ? `${baseHref}?lang=zh` : baseHref;
      link.setAttribute("href", nextHref);
    });
  };

  const updateCurrentUrl = (lang) => {
    const url = new URL(window.location.href);
    if (lang === "zh") {
      url.searchParams.set("lang", "zh");
    } else {
      url.searchParams.delete("lang");
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const setLanguage = (lang) => {
    const nextLang = lang === "zh" ? "zh" : "en";
    page.setAttribute("data-current-lang", nextLang);
    root.setAttribute("data-current-lang", nextLang);
    root.lang = nextLang === "zh" ? "zh-Hans" : "en";
    updateLangLinks(nextLang);
    updateCurrentUrl(nextLang);

    buttons.forEach((button) => {
      const isActive = button.getAttribute("data-lang-button") === nextLang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.getAttribute("data-lang-button"));
    });
  });

  const initialLang = new URLSearchParams(window.location.search).get("lang") === "zh" ? "zh" : "en";
  setLanguage(initialLang);
});
