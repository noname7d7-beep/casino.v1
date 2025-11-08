// Language data
const translations = {
  en: {
    title: "MONEY TALKS — iSignal",
    loading: "Loading...",
    accuracy: "ACCURACY 99.8%",
    free: "FOR FREE!",
    games: {
      aviator: "Aviator",
      mines: "Mines",
      plinko: "Plinko",
      chicken: "Chicken Road",
      footballx: "FootballX",
      thimbles: "Thimbles",
    },
  },
  es: {
    title: "MONEY TALKS — iSignal",
    loading: "Cargando...",
    accuracy: "PRECISIÓN 99.8%",
    free: "¡GRATIS!",
    games: {
      aviator: "Aviador",
      mines: "Minas",
      plinko: "Plinko",
      chicken: "Camino del Pollo",
      footballx: "FootballX",
      thimbles: "Vasos",
    },
  },
  tr: {
    title: "MONEY TALKS — iSignal",
    loading: "Yükleniyor...",
    accuracy: "DOĞRULUK %99.8",
    free: "ÜCRETSİZ!",
    games: {
      aviator: "Uçak",
      mines: "Mayınlar",
      plinko: "Plinko",
      chicken: "Tavuk Yolu",
      footballx: "FootballX",
      thimbles: "Bardaklar",
    },
  },
  ru: {
    title: "MONEY TALKS — iSignal",
    loading: "Загрузка...",
    accuracy: "ТОЧНОСТЬ 99.8%",
    free: "БЕСПЛАТНО!",
    games: {
      aviator: "Авиатор",
      mines: "Мины",
      plinko: "Плинко",
      chicken: "Куриная Дорога",
      footballx: "ФутболХ",
      thimbles: "Напёрстки",
    },
  },
};

// Set the language
function setLanguage(lang) {
  localStorage.setItem("language", lang);

  // Update text content dynamically
  document.title = translations[lang].title;
  document.querySelector(".loading-dots").textContent = translations[lang].loading;
  document.querySelector(".accuracy").textContent = translations[lang].accuracy;
  document.querySelector(".free").textContent = translations[lang].free;

  // Update game titles
  document.querySelector('[data-game="aviator"] .card-title').textContent = translations[lang].games.aviator;
  document.querySelector('[data-game="mines"] .card-title').textContent = translations[lang].games.mines;
  document.querySelector('[data-game="plinko"] .card-title').textContent = translations[lang].games.plinko;
  document.querySelector('[data-game="chicken"] .card-title').textContent = translations[lang].games.chicken;
  document.querySelector('[data-game="footballx"] .card-title').textContent = translations[lang].games.footballx;
  document.querySelector('[data-game="thimbles"] .card-title').textContent = translations[lang].games.thimbles;
}

// Initialize language
function initLanguage() {
  const langSelect = document.getElementById("langSelect");
  const savedLang = localStorage.getItem("language") || "en";

  // Set the dropdown to the saved language
  langSelect.value = savedLang;

  // Apply the saved language
  setLanguage(savedLang);

  // Add event listener for language change
  langSelect.addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", initLanguage);
