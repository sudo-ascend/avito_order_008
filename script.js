const coordinateStyles=document.createElement('link');
coordinateStyles.rel='stylesheet';
coordinateStyles.href='coordinate-overrides.css';
document.head.append(coordinateStyles);
const footerStyles=document.createElement('link');
footerStyles.rel='stylesheet';
footerStyles.href='footer-pdf.css';
document.head.append(footerStyles);
const footerTune=document.createElement('link');
footerTune.rel='stylesheet';
footerTune.href='footer-tune.css';
document.head.append(footerTune);
document.querySelector('.consultation img').src='assets/hero-teacher.png';
document.querySelector('.footer-socials').innerHTML=
  '<a class="tiktok" href="#footer" aria-label="TikTok"><img src="assets/icon-tiktok.png" alt=""></a>'+
  '<a class="telegram" href="#footer" aria-label="Telegram"><img src="assets/icon-telegram.png" alt=""></a>'+
  '<a class="youtube" href="#footer" aria-label="Youtube"><img src="assets/icon-youtube.png" alt=""></a>';
document.querySelector('main').insertAdjacentHTML('afterend','<div class="ticker footer-ticker">○ ПОДГОТОВКА К ОГЭ | ЕГЭ ПО ХИМИИ 2026 ○ АЛЕКС МЕНДЕЛЕЕВ ○</div>');
const faqStyles=document.createElement('link');
faqStyles.rel='stylesheet';
faqStyles.href='faq-tune.css';
document.head.append(faqStyles);
document.querySelector('.faq-grid').innerHTML=`
  <details><summary>Я ничего не знаю по химии, подойдёт ли курс для занятий с 0?</summary><p>Да, курс начинается с базы и подойдёт для подготовки с нуля.</p></details>
  <details><summary>Не знаю, смогу ли присутствовать на всех занятиях онлайн. Что делать?</summary><p>Все занятия сохраняются в записи.</p></details>
  <details><summary>Обязательно ли делать домашние задания?</summary><p>Да, домашние задания помогают закреплять материал.</p></details>
  <details><summary>Где проходит курс?</summary><p>Курс проходит в онлайн-формате.</p></details>
  <details><summary>Оплатил курс и не могу зайти. Как быть?</summary><p>Напишите в поддержку — мы поможем войти в личный кабинет.</p></details>
  <details><summary>Алекс Катион самый крутой препод в мире?</summary><p>Ученики говорят, что да :)</p></details>`;
const pricingStyles=document.createElement('link');
pricingStyles.rel='stylesheet';
pricingStyles.href='pricing.css';
document.head.append(pricingStyles);
const pricing=document.createElement('section');
pricing.className='pricing shell';
pricing.id='pricing';
pricing.hidden=true;
pricing.setAttribute('aria-hidden','true');
pricing.innerHTML=`<h2>Цена занятий по программе ЕГЭ (10–11 класс)</h2><article class="pricing-card"><h3>МенделеевPro</h3><ul><li>3 урока по 2 часа в неделю</li><li>Домашние задания с проверкой и разбором ошибок</li><li>Авторские рабочие тетради</li><li>Средняя цена часа занятия 330 ₽</li><li>Пробник каждый месяц</li><li>Учебный чат с оперативными ответами на вопросы</li><li>Личный учебный чат с Алексом</li><li>Чаты с мотивацией и поддержкой</li></ul><span class="price-bubble">Средняя цена<br>часа занятия<br>330 ₽</span><div class="prices"><p><strong>22 000₽</strong> / 36 уроков</p><p><strong>7890₽</strong> / 12 уроков</p></div><div class="pricing-actions"><button class="pink-btn open-modal">Оплатить 24 урока →</button><button class="pink-btn outline-pay open-modal">Оплатить 8 уроков →</button></div></article></section>`;
document.querySelector('#faq').before(pricing);
const pricingHeading=pricing.querySelector('h2');
const pricingTitles={
  '\u041e\u0413\u042d':'\u0426\u0435\u043d\u0430 \u0437\u0430\u043d\u044f\u0442\u0438\u0439 \u043f\u043e \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0435 \u041e\u0413\u042d (8-9 \u043a\u043b\u0430\u0441\u0441)',
  '\u0415\u0413\u042d':'\u0426\u0435\u043d\u0430 \u0437\u0430\u043d\u044f\u0442\u0438\u0439 \u043f\u043e \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0435 \u0415\u0413\u042d (10-11 \u043a\u043b\u0430\u0441\u0441)'
};
document.querySelectorAll('#exams article button').forEach(button=>{
  const exam=button.closest('article')?.querySelector('b')?.textContent?.trim();
  if(!exam)return;
  button.classList.remove('open-modal');
  button.addEventListener('click',()=>{
    pricingHeading.textContent=pricingTitles[exam]||pricingTitles['\u0415\u0413\u042d'];
    pricing.hidden=false;
    pricing.setAttribute('aria-hidden','false');
    pricing.scrollIntoView({behavior:'smooth',block:'start'});
  });
});
const dialog=document.querySelector('dialog');
document.querySelectorAll('.open-modal').forEach(b=>b.addEventListener('click',()=>dialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelector('form').addEventListener('submit',e=>{e.preventDefault();e.currentTarget.innerHTML='<strong>Спасибо! Заявка отправлена.</strong>';});
const nav=[...document.querySelectorAll('.side-nav a')];
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}),{rootMargin:'-40% 0px -52% 0px'});
document.querySelectorAll('main section[id]').forEach(x=>observer.observe(x));
document.querySelectorAll('.ticker').forEach(ticker=>{
  const words=['ПОДГОТОВКА К ОГЭ','ЕГЭ ПО ХИМИИ 2026','АЛЕКС МЕНДЕЛЕЕВ'];
  const phrase=words.map(word=>`<span>○ ${word}</span>`).join('');
  ticker.innerHTML=`<div aria-label="Подготовка к ОГЭ и ЕГЭ по химии">${phrase.repeat(10)}</div>`;
});

