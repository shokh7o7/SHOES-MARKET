
const products = [
  { id: 1, name: 'Aero Run X', type: 'Yugurish', tags: ['erkak', 'sport'], price: 1290000, old: 1590000, isNew: true, img: '1606107557195-0e29a4b5b4aa' },
  { id: 2, name: 'Urban Low', type: 'Kundalik', tags: ['erkak', 'ayol'], price: 890000, isNew: false, img: '1595950653106-6c9ebd614d3a' },
  { id: 3, name: 'Classic Oxford', type: 'Klassik', tags: ['erkak'], price: 1150000, isNew: false, img: '1549298916-b41d501d3772' },
  { id: 4, name: 'Trail Pro', type: 'Sport', tags: ['erkak', 'sport'], price: 1040000, old: 1490000, isNew: false, img: '1600185365483-26d7a4cc7519' },
  { id: 5, name: 'Flame Runner', type: 'Yugurish', tags: ['ayol', 'sport'], price: 1190000, isNew: true, img: '1542291026-7eec264c27ff' },
  { id: 6, name: 'City Glide', type: 'Kundalik', tags: ['ayol'], price: 790000, old: 990000, isNew: false, img: '1543163521-1bf539c55dd2' },
  { id: 7, name: 'Mini Canvas', type: 'Kundalik', tags: ['bola'], price: 420000, isNew: true, img: '1525966222134-fcfa99b8ae77' },
  { id: 8, name: 'Speed Kid', type: 'Sport', tags: ['bola', 'sport'], price: 560000, old: 690000, isNew: false, img: '1460353581641-37baddab0fa2' }
];

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const money = (n) => n.toLocaleString('uz-UZ') + " so'm";
const img = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

let count = Number(localStorage.getItem('count')) || 0;
let filter = 'all';

function render() {
  const list = products.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'sale') return p.old;
    return p.tags.includes(filter);
  });

  $('#products').innerHTML = list.map((p) => `
    <article class="product" data-id="${p.id}">
      <div class="product-img img-box">
        ${p.old ? `<span class="tag">−${Math.round((1 - p.price / p.old) * 100)}%</span>` : p.isNew ? '<span class="tag">Yangi</span>' : ''}
        <img src="${img(p.img)}" alt="${p.name}">
      </div>
      <div class="product-info">
        <div>
          <small>${p.type}</small>
          <h3>${p.name}</h3>
        </div>
        <div class="price">
          ${money(p.price)}
          ${p.old ? `<s>${money(p.old)}</s>` : ''}
        </div>
      </div>
      <button class="add-btn">Savatga qo'shish</button>
    </article>
  `).join('');

  $$('#products img').forEach((el) => {
    if (el.complete) {
      el.classList.add('loaded');
    } else {
      el.addEventListener('load', () => el.classList.add('loaded'), { once: true });
    }
  });
}

function showCount() {
  $('.cart-count').textContent = count;
  localStorage.setItem('count', count);
}

$('#products').addEventListener('click', (e) => {
  if (!e.target.closest('.add-btn')) return;

  count++;
  showCount();

  const cart = $('.cart');
  cart.classList.remove('bump');
  void cart.offsetWidth;
  cart.classList.add('bump');

  $('.toast')?.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = "Savatga qo'shildi";
  document.body.append(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
});

$$('[data-filter]').forEach((el) => {
  el.addEventListener('click', () => {
    filter = el.dataset.filter;
    render();
  });
});

$('.search-toggle').addEventListener('click', () => {
  $('.search-bar').classList.toggle('open');
});

$('.burger').addEventListener('click', () => {
  $('.nav').classList.toggle('open');
});

window.addEventListener('scroll', () => {
  $('.header').classList.toggle('scrolled', window.scrollY > 10);
  $('.to-top').classList.toggle('show', window.scrollY > 600);
}, { passive: true });

$('.to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

render();
showCount();
