const EXTRA_STYLES = [
  { id: "coordinate-overrides-css", href: "coordinate-overrides.css" },
  { id: "footer-pdf-css", href: "footer-pdf.css" },
  { id: "footer-tune-css", href: "footer-tune.css" },
  { id: "faq-tune-css", href: "faq-tune.css" },
  { id: "pricing-css", href: "pricing.css" },
];

const PRICING_TITLES = {
  "ОГЭ": "Цена занятий по программе ОГЭ (8-9 класс)",
  "ЕГЭ": "Цена занятий по программе ЕГЭ (10-11 класс)",
};

const PRICING_PAYMENT_LINKS = {
  "ОГЭ": {
    course: "https://cationschool.online/pl/lite/widget/widget?id=1545022",
    month: "https://cationschool.online/pl/lite/widget/widget?id=1545020",
  },
  "ЕГЭ": {
    course: "https://cationschool.online/pl/lite/widget/widget?id=1545031",
    month: "https://cationschool.online/pl/lite/widget/widget?id=1545025",
  },
};

const PRICING_CARD_TEMPLATE = `
  <article class="pricing-card">
    <h3>МенделеевPro</h3>
    <ul>
      <li>3 урока по 2 часа в неделю</li>
      <li>Домашние задания с проверкой и разбором ошибок</li>
      <li>Авторские рабочие тетради</li>
      <li>Средняя цена часа занятия 330 ₽</li>
      <li>Пробник каждый месяц</li>
      <li>Учебный чат с оперативными ответами на вопросы</li>
      <li>Личный учебный чат с Алексом</li>
      <li>Чаты с мотивацией и поддержкой</li>
    </ul>
    <span class="price-bubble">Средняя цена<br>часа занятия<br>330 ₽</span>
    <div class="prices">
      <p><strong>22 000₽</strong> / 36 уроков</p>
      <p><strong>7890₽</strong> / 12 уроков</p>
    </div>
    <div class="pricing-actions">
      <a class="pink-btn pricing-pay-link" data-payment-plan="course" href="#">Оплатить 24 урока →</a>
      <a class="pink-btn outline-pay pricing-pay-link" data-payment-plan="month" href="#">Оплатить 8 уроков →</a>
    </div>
  </article>
`;

function ensureExtraStyles() {
  EXTRA_STYLES.forEach(({ id, href }) => {
    if (document.head.querySelector(`[data-extra-style="${id}"]`)) {
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.extraStyle = id;
    document.head.append(link);
  });
}

function normalizeTickers() {
  const words = [
    "ПОДГОТОВКА К ОГЭ",
    "ЕГЭ ПО ХИМИИ 2026",
    "АЛЕКС МЕНДЕЛЕЕВ",
  ];
  const phrase = words.map((word) => `<span>◦ ${word}</span>`).join("");

  document.querySelectorAll(".ticker").forEach((ticker) => {
    ticker.innerHTML = `<div aria-label="Подготовка к ОГЭ и ЕГЭ по химии">${phrase.repeat(
      10
    )}</div>`;
  });
}

function restoreFaqItems() {
  const faqGrid = document.querySelector(".faq-grid");
  if (!faqGrid) {
    return;
  }

  faqGrid.innerHTML = `
    <details><summary>Я ничего не знаю по химии, подойдёт ли курс для занятий с 0?</summary><p>Да, курс начинается с базы и подойдёт для подготовки с нуля.</p></details>
    <details><summary>Не знаю, смогу ли присутствовать на всех занятиях онлайн. Что делать?</summary><p>Все занятия сохраняются в записи.</p></details>
    <details><summary>Обязательно ли делать домашние задания?</summary><p>Да, домашние задания помогают закреплять материал.</p></details>
    <details><summary>Где проходит курс?</summary><p>Курс проходит в онлайн-формате.</p></details>
    <details><summary>Оплатил курс и не могу зайти. Как быть?</summary><p>Напишите в поддержку - мы поможем войти в личный кабинет.</p></details>
    <details><summary>Алекс Катион самый крутой препод в мире?</summary><p>Ученики говорят, что да :)</p></details>
  `;
}

function setupSideNav() {
  const navLinks = [...document.querySelectorAll(".side-nav a")];
  if (!navLinks.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-40% 0px -52% 0px" }
  );

  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer.observe(section));
}

function setupDialog() {
  const dialog = document.querySelector("dialog");
  const trigger = document.querySelector(".consultation-trigger");
  const closeButton = document.querySelector(".dialog-close");
  const form = dialog?.querySelector("form");

  if (!dialog || !closeButton || !form) {
    return null;
  }

  const openDialog = () => dialog.showModal();

  if (trigger) {
    trigger.addEventListener("click", openDialog);
  }

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const insideDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!insideDialog) {
      dialog.close();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.innerHTML = "<strong>Спасибо! Заявка отправлена.</strong>";
  });

  return openDialog;
}

function setupMobileMenu() {
  const burger = document.querySelector(".hamburger");
  const menu = document.querySelector("#mobile-menu");
  const backdrop = document.querySelector(".mobile-menu-backdrop");

  if (!burger || !menu || !backdrop) {
    return;
  }

  let hideTimer = null;

  const setExpanded = (expanded) => {
    burger.setAttribute("aria-expanded", String(expanded));
    burger.classList.toggle("is-active", expanded);
    document.body.classList.toggle("menu-open", expanded);
  };

  const openMenu = () => {
    clearTimeout(hideTimer);
    backdrop.hidden = false;
    menu.hidden = false;

    requestAnimationFrame(() => {
      backdrop.classList.add("is-open");
      menu.classList.add("is-open");
      setExpanded(true);
    });
  };

  const closeMenu = () => {
    backdrop.classList.remove("is-open");
    menu.classList.remove("is-open");
    setExpanded(false);

    hideTimer = window.setTimeout(() => {
      backdrop.hidden = true;
      menu.hidden = true;
    }, 240);
  };

  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener("click", closeMenu);

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800 && burger.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });
}

function renderPricing(selectedExam) {
  const pricing = document.querySelector("#pricing");
  if (!pricing) {
    return;
  }

  const title = PRICING_TITLES[selectedExam] || PRICING_TITLES["ЕГЭ"];
  const paymentLinks =
    PRICING_PAYMENT_LINKS[selectedExam] || PRICING_PAYMENT_LINKS["ЕГЭ"];

  pricing.innerHTML = `<h2>${title}</h2>${PRICING_CARD_TEMPLATE}`;
  pricing.hidden = false;
  pricing.setAttribute("aria-hidden", "false");

  pricing.querySelectorAll("[data-payment-plan]").forEach((link) => {
    const plan = link.dataset.paymentPlan;
    link.href = paymentLinks[plan] || paymentLinks.course;
  });
}

function setupPricing() {
  const pricing = document.querySelector("#pricing");
  const buttons = [...document.querySelectorAll("#exams [data-exam]")];

  if (!pricing || !buttons.length) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const exam = button.dataset.exam || "ЕГЭ";

      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      renderPricing(exam);
      pricing.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

ensureExtraStyles();
normalizeTickers();
restoreFaqItems();
setupSideNav();
setupDialog();
setupMobileMenu();
setupPricing();
