document.addEventListener("DOMContentLoaded", () => {
  const page = document.body;
  const root = document.documentElement;
  const buttons = Array.from(document.querySelectorAll("[data-lang-button]"));

  if (!page || buttons.length === 0) {
    return;
  }

  const setLanguage = (lang) => {
    const nextLang = lang === "zh" ? "zh" : "en";
    page.setAttribute("data-current-lang", nextLang);
    root.setAttribute("data-current-lang", nextLang);
    root.lang = nextLang === "zh" ? "zh-Hans" : "en";

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

  setLanguage("en");
});
