(() => {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const putText = (selector, value) => {
    if (!value) return;
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  putText("[data-brand]", config.name);
  putText("[data-descriptor]", config.descriptor);
  putText("[data-city]", config.city);
  putText("[data-district]", config.district);
  putText("[data-address]", config.address);
  putText("[data-city-line]", config.postalCity);
  putText("[data-phone]", config.phoneDisplay);
  putText("[data-email]", config.email);
  putText("[data-year]", String(new Date().getFullYear()));

  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    if (config.phoneHref) link.href = "tel:" + config.phoneHref;
  });
  document.querySelectorAll("[data-email-link]").forEach((link) => {
    if (config.email) {
      link.href = "mailto:" + config.email;
      link.textContent = config.email;
    }
  });
  document.querySelectorAll("[data-map-link]").forEach((link) => {
    if (config.mapQuery) {
      link.href = "https://maps.google.com/?q=" + encodeURIComponent(config.mapQuery);
    }
  });

  const serviceButtons = Array.from(document.querySelectorAll("[data-service-mode]"));
  if (serviceButtons.length) {
    const modes = {
      midi: {
        title: "Un bon midi",
        emphasis: "change tout.",
        copy: "Une assiette de saison, une vraie pause pour souffler au milieu de la journée.",
        image: "assets/assiette-pasta.webp",
        alt: "Assiette colorée de pâtes et légumes pour le déjeuner",
        label: "PAUSE DU MARCHÉ",
        note: "Le midi, on recharge les idées.",
        cta: "Réserver ce midi",
        hours: "La bonne pause, de 12h à 14h",
        service: "Déjeuner"
      },
      soir: {
        title: "Le soir",
        emphasis: "on partage.",
        copy: "Des assiettes au milieu, des verres qui tintent et le temps de rester.",
        image: "assets/ambiance-table.webp",
        alt: "Grande salle chaleureuse dressée pour un dîner entre amis",
        label: "LES BELLES TABLÉES",
        note: "Le soir, on se retrouve.",
        cta: "Réserver ce soir",
        hours: "La table se prolonge, de 19h à 22h",
        service: "Dîner"
      }
    };
    const hero = document.querySelector(".hero");
    const image = document.querySelector("[data-mode-image]");
    const bookingLink = document.querySelector("[data-mode-booking]");
    const showMode = (key) => {
      const mode = modes[key];
      if (!mode) return;
      serviceButtons.forEach((button) => {
        const active = button.dataset.serviceMode === key;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      if (hero) {
        hero.classList.toggle("is-evening", key === "soir");
        hero.classList.add("is-changing");
        window.setTimeout(() => hero.classList.remove("is-changing"), 180);
      }
      document.querySelector("[data-mode-title]").textContent = mode.title;
      document.querySelector("[data-mode-emphasis]").textContent = mode.emphasis;
      document.querySelector("[data-mode-copy]").textContent = mode.copy;
      document.querySelector("[data-mode-label]").textContent = mode.label;
      document.querySelector("[data-mode-note]").textContent = mode.note;
      document.querySelector("[data-mode-cta]").textContent = mode.cta;
      document.querySelector("[data-mode-footnote]").textContent = mode.hours;
      if (image) {
        image.src = mode.image;
        image.alt = mode.alt;
      }
      if (bookingLink) {
        bookingLink.href = "reservation.html?service=" + encodeURIComponent(mode.service);
      }
    };
    serviceButtons.forEach((button) => {
      button.addEventListener("click", () => showMode(button.dataset.serviceMode));
    });
  }

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Ouvrir le menu");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    };
    toggle.addEventListener("click", () => {
      const opening = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(opening));
      toggle.setAttribute("aria-label", opening ? "Fermer le menu" : "Ouvrir le menu");
      nav.classList.toggle("is-open", opening);
      document.body.classList.toggle("nav-open", opening);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const tabs = Array.from(document.querySelectorAll("[data-menu-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-menu-panel]"));
  const activateTab = (key, moveFocus) => {
    const tab = tabs.find((item) => item.dataset.menuTab === key);
    const panel = panels.find((item) => item.dataset.menuPanel === key);
    if (!tab || !panel) return;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((item) => {
      const active = item === panel;
      item.classList.toggle("is-active", active);
      item.hidden = !active;
    });
    if (moveFocus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab.dataset.menuTab, false));
    tab.addEventListener("keydown", (event) => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[next].dataset.menuTab, true);
    });
  });
  if (tabs.length && location.hash) {
    const target = location.hash.toLowerCase();
    const panel = panels.find((item) => "#" + item.id === target);
    if (panel) activateTab(panel.dataset.menuPanel, false);
  }

  const form = document.getElementById("booking-form");
  if (form) {
    const dateField = document.getElementById("booking-date");
    const serviceField = document.getElementById("booking-service");
    const timeField = document.getElementById("booking-time");
    const guestsField = document.getElementById("booking-guests");
    const feedback = document.getElementById("form-feedback");
    const closedDays = Array.isArray(config.closedDays) ? config.closedDays : [0, 1];
    const serviceTimes = {
      Déjeuner: ["12:00", "12:30", "13:00", "13:30"],
      Dîner: ["19:00", "19:30", "20:00", "20:30", "21:00"]
    };

    const localDateString = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return year + "-" + month + "-" + day;
    };
    const nextOpenDate = () => {
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() + 1);
      while (closedDays.includes(date.getDay())) date.setDate(date.getDate() + 1);
      return date;
    };
    const formatTime = (value) => value ? value.replace(":00", "h00").replace(":30", "h30") : "12h00";
    const refreshTimes = () => {
      const options = serviceTimes[serviceField.value] || serviceTimes.Déjeuner;
      const priorValue = timeField.value;
      timeField.replaceChildren();
      options.forEach((time) => {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = formatTime(time);
        timeField.append(option);
      });
      if (options.includes(priorValue)) timeField.value = priorValue;
    };
    const refreshSummary = () => {
      const rawDate = dateField.value;
      if (rawDate) {
        const parsedDate = new Date(rawDate + "T12:00:00");
        document.getElementById("summary-date").textContent = new Intl.DateTimeFormat("fr-FR", {
          weekday: "long", day: "numeric", month: "long"
        }).format(parsedDate);
      } else {
        document.getElementById("summary-date").textContent = "Choisissez votre date";
      }
      document.getElementById("summary-service").textContent = serviceField.value;
      document.getElementById("summary-time").textContent = formatTime(timeField.value);
      const count = Number(guestsField.value);
      document.getElementById("summary-guests").textContent = count + (count > 1 ? " personnes" : " personne");
    };
    const validateOpeningDay = () => {
      const selected = dateField.value ? new Date(dateField.value + "T12:00:00") : null;
      const closed = selected && closedDays.includes(selected.getDay());
      dateField.setCustomValidity(closed ? "Le restaurant est fermé ce jour-là. Choisissez une date du mardi au samedi." : "");
      return !closed;
    };

    dateField.min = localDateString(new Date());
    dateField.value = localDateString(nextOpenDate());
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (requestedService === "Déjeuner" || requestedService === "Dîner") {
      serviceField.value = requestedService;
    }
    refreshTimes();
    refreshSummary();
    dateField.addEventListener("change", () => {
      validateOpeningDay();
      refreshSummary();
    });
    serviceField.addEventListener("change", () => {
      refreshTimes();
      refreshSummary();
    });
    timeField.addEventListener("change", refreshSummary);
    guestsField.addEventListener("change", refreshSummary);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateOpeningDay()) {
        dateField.reportValidity();
        return;
      }
      if (!form.reportValidity()) return;

      const values = new FormData(form);
      const dateLabel = document.getElementById("summary-date").textContent;
      const lines = [
        "Bonjour,",
        "",
        "Je souhaite demander une réservation au " + (config.name || "restaurant") + " :",
        "Date : " + dateLabel,
        "Service : " + values.get("service") + " à " + formatTime(values.get("time")),
        "Convives : " + values.get("guests"),
        "Nom : " + values.get("name"),
        "E-mail : " + values.get("email"),
        "Téléphone : " + (values.get("phone") || "non renseigné"),
        "Occasion : " + (values.get("occasion") || "non précisée"),
        "Précisions : " + (values.get("note") || "aucune"),
        "",
        "Merci de me confirmer si cette demande est possible."
      ];
      const mailto = "mailto:" + encodeURIComponent(config.reservationEmail || config.email || "") +
        "?subject=" + encodeURIComponent("Demande de réservation — " + (config.name || "Le restaurant")) +
        "&body=" + encodeURIComponent(lines.join("\n"));

      feedback.replaceChildren();
      const message = document.createElement("p");
      message.textContent = "Votre demande est prête. Ouvrez votre logiciel de messagerie pour nous l’envoyer ; la réservation sera confirmée après notre réponse.";
      const link = document.createElement("a");
      link.href = mailto;
      link.textContent = "Ouvrir l’e-mail prérempli";
      feedback.append(message, link);
      feedback.hidden = false;
      feedback.focus();
    });
  }
})();
