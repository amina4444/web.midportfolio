const themeToggle = document.getElementById('themeToggle');
const themeText = document.getElementById('themeText');
const body = document.body;

// Проверяем сохраненную тему
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);// применяем тему (ставим атрибут data-theme)
updateButtonText(savedTheme);

themeToggle.addEventListener('click', function () {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';// если светлая — переключаем на тёмную, и наоборот

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateButtonText(newTheme);

});

function updateButtonText(theme) {
  themeText.textContent = theme === '' ? '' : '';
}

const burger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));// меняем значение на противоположное
  menu.classList.toggle('open');
});

// Закрыть меню по клику на пункт (на мобиле)
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && window.matchMedia('(max-width: 768px)').matches) {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// Закрыть по Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
});
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();// отменяем стандартную отправку формы (чтобы страница не перезагружалась)
  const email = form.querySelector('input[type="email"]').value;
  if (!email.includes('@')) {
    alert('Пожалуйста, введите корректный email!');
  } else {
    alert('Спасибо за сообщение!');
    form.reset();
  }
});
const elements = document.querySelectorAll('.hidden');

function checkVisibility() {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();// получаем позицию элемента относительно окна
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');// если элемент почти виден добавляем класс visible (CSS
    }
  });
}

window.addEventListener('scroll', checkVisibility);
window.scrollTo({ top: 0, behavior: 'smooth' });

const g = document.getElementById('greeting');
const btn = document.getElementById('askName');


function showGreeting(name) {
  g.textContent = name
    ? `Привет, ${name}!`
    : 'Добро пожаловать!';
}

// Функция спрашивает имя
function askName() {
  const name = prompt('Как тебя зовут?');
  if (name) {
    localStorage.setItem('visitorName', name);
  } else {
    localStorage.removeItem('visitorName');
  }
  showGreeting(localStorage.getItem('visitorName'));
}

// Когда нажимаем кнопку — спрашиваем имя
btn.addEventListener('click', askName);

// Если имя уже сохранено — показываем сразу
showGreeting(localStorage.getItem('visitorName'));


// Кнопка «Наверх»
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Порог появления (в пикселях)
const SHOW_AFTER = 300;

// Следим за прокруткой и показываем/скрываем кнопку
window.addEventListener('scroll', () => {
  if (window.scrollY > SHOW_AFTER) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

// Плавно прокручиваем к началу страницы
 scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
 });
// Плавная прокрутка без подсветки активного пункта
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id); // обновляем адрес в строке браузера (без перезагрузки)
    if (!target) return;
    e.preventDefault();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });
});

// При открытии страницы с хэшем (#) — плавно скроллим к секции
window.addEventListener('load', () => {
  const { hash } = window.location;
  if (hash) {
    const target = document.querySelector(hash); // находим секцию
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

document.addEventListener('copy', () => {
  alert('Текст скопирован!');
});


