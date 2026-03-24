/* MAMÃE ANGU TRATTORIA — script.js */

const PIX_KEY = 'INSERIR-CHAVE-PIX-AQUI';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('pixKey').textContent = PIX_KEY;
  initReveal();
});

function copyPix() {
  const key = document.getElementById('pixKey').textContent.trim();
  const btn = document.getElementById('btnCopy');
  const fb  = document.getElementById('feedback');
  if (!key || key === 'INSERIR-CHAVE-PIX-AQUI') { alert('Chave Pix não configurada.'); return; }

  const done = () => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Copiado!';
    btn.classList.add('copied');
    fb.classList.add('show');
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); fb.classList.remove('show'); }, 4000);
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(key).then(done).catch(() => fallback(key, done));
  } else { fallback(key, done); }
}

function fallback(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); cb(); } catch(e) {}
  document.body.removeChild(ta);
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.08 });
  els.forEach(e => io.observe(e));
}
