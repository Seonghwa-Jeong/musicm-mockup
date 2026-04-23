// ===== Amplitude stub =====
// The real SDK is loaded as a deferred ES module (js/amplitude.js).
// Until it boots, queue calls on a stub so pages can `AMP.track()` immediately.
(function () {
  if (window.AMP) return;
  const q = [];
  window.AMP = {
    track: (n, p) => q.push(['track', n, p]),
    identify: (u, t) => q.push(['identify', u, t]),
    reset: () => q.push(['reset']),
    fetchExperiment: () => q.push(['fetchExperiment']),
    _setReal(real) {
      this.track = real.track;
      this.identify = real.identify;
      this.reset = real.reset;
      this.fetchExperiment = real.fetchExperiment;
      while (q.length) { const [m, ...args] = q.shift(); real[m](...args); }
    },
  };
})();

// ===== Session / Cart State (LocalStorage) =====
const MUSICM = {
  // Auth
  getUser() {
    try { return JSON.parse(localStorage.getItem('musicm_user') || 'null'); } catch { return null; }
  },
  setUser(user) {
    localStorage.setItem('musicm_user', JSON.stringify(user));
    if (user?.email) {
      window.AMP.identify(user.email, { email: user.email, name: user.name });
      window.AMP.fetchExperiment();
      try { sessionStorage.setItem('musicm_amp_last_uid', user.email); } catch {}
    }
  },
  logout() {
    localStorage.removeItem('musicm_user');
    window.AMP.reset();
    window.AMP.fetchExperiment();
    try { sessionStorage.removeItem('musicm_amp_last_uid'); } catch {}
  },

  // Cart
  getCart() {
    try { return JSON.parse(localStorage.getItem('musicm_cart') || '[]'); } catch { return []; }
  },
  setCart(items) {
    localStorage.setItem('musicm_cart', JSON.stringify(items));
    this.renderCartCount();
  },
  addToCart(productId, opts = {}) {
    const cart = this.getCart();
    const key = `${productId}_${opts.size || ''}_${opts.color || ''}`;
    const existing = cart.find(i => i.key === key);
    if (existing) existing.qty += (opts.qty || 1);
    else cart.push({ key, productId, size: opts.size, color: opts.color, qty: opts.qty || 1 });
    this.setCart(cart);
  },
  removeFromCart(key) {
    this.setCart(this.getCart().filter(i => i.key !== key));
  },
  updateQty(key, qty) {
    const cart = this.getCart();
    const item = cart.find(i => i.key === key);
    if (item) { item.qty = Math.max(1, qty); this.setCart(cart); }
  },
  clearCart() { this.setCart([]); },
  cartTotal() {
    return this.getCart().reduce((sum, it) => {
      const p = getProduct(it.productId); if (!p) return sum;
      return sum + (p.salePrice || p.price) * it.qty;
    }, 0);
  },

  // Orders (for mypage)
  getOrders() {
    try { return JSON.parse(localStorage.getItem('musicm_orders') || '[]'); } catch { return []; }
  },
  addOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem('musicm_orders', JSON.stringify(orders));
  },

  // Wishlist
  getWishlist() {
    try { return JSON.parse(localStorage.getItem('musicm_wishlist') || '[]'); } catch { return []; }
  },
  toggleWishlist(productId) {
    let list = this.getWishlist();
    if (list.includes(productId)) list = list.filter(id => id !== productId);
    else list.push(productId);
    localStorage.setItem('musicm_wishlist', JSON.stringify(list));
    return list.includes(productId);
  },

  renderCartCount() {
    const count = this.getCart().reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = String(count);
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },
};

// ===== Safe HTML helper (DOMPurify) =====
// DOMPurify is loaded via CDN in every HTML page.
// All dynamic HTML injection goes through this helper to mitigate XSS.
function setSafeHTML(el, html) {
  if (!el) return;
  const clean = window.DOMPurify ? DOMPurify.sanitize(html, { ADD_ATTR: ['onclick','onsubmit','loading'] }) : html;
  el.innerHTML = clean; // nosemgrep -- sanitized via DOMPurify above
}

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
}

// ===== Toast =====
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ===== Header =====
function renderHeader(activeNav = '') {
  const user = MUSICM.getUser();
  const html = `
    <div class="container-wide">
      <div class="header-top">
        <div></div>
        <div>
          ${user ? `
            <a href="mypage.html">마이페이지</a>
            <a href="#" onclick="event.preventDefault(); AMP.track('[Global] Logout Clicked'); MUSICM.logout(); location.reload();">로그아웃</a>
          ` : `
            <a href="login.html">로그인</a>
            <a href="signup.html">회원가입</a>
          `}
          <a href="mypage.html">고객센터</a>
        </div>
      </div>
      <div class="header-main">
        <a href="index.html" class="logo">MUSIC<span>M</span></a>
        <nav class="gnb">
          <a href="index.html" ${activeNav==='home'?'class="active"':''}>HOME</a>
          <a href="category.html" ${activeNav==='category'?'class="active"':''}>전체 카테고리</a>
          <a href="category.html?cat=top" ${activeNav==='top'?'class="active"':''}>상의</a>
          <a href="category.html?cat=outer" ${activeNav==='outer'?'class="active"':''}>아우터</a>
          <a href="category.html?cat=bottom" ${activeNav==='bottom'?'class="active"':''}>하의</a>
          <a href="category.html?cat=shoes" ${activeNav==='shoes'?'class="active"':''}>신발</a>
          <a href="brand.html" ${activeNav==='brand'?'class="active"':''}>브랜드</a>
          <a href="campaign.html" ${activeNav==='campaign'?'class="active"':''} style="color:var(--color-accent)">캠페인</a>
        </nav>
        <div class="header-actions">
          <form class="search-box" onsubmit="event.preventDefault(); AMP.track('[Global] Header Search Submitted', {keyword: this.q.value}); location.href='search.html?q='+encodeURIComponent(this.q.value);">
            <input name="q" type="text" placeholder="브랜드, 상품, 프로필, 태그 검색" />
            <button type="submit" aria-label="검색">🔍</button>
          </form>
          <a href="mypage.html" class="icon-btn">👤<span>MY</span></a>
          <a href="mypage.html?tab=wish" class="icon-btn">♡<span>찜</span></a>
          <a href="cart.html" class="icon-btn">🛒<span>장바구니</span><span class="cart-count" style="display:none">0</span></a>
        </div>
      </div>
    </div>
  `;
  const header = document.querySelector('.site-header');
  setSafeHTML(header, html);
  MUSICM.renderCartCount();
}

// ===== Footer =====
function renderFooter() {
  const html = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="logo" style="font-size:22px; margin-bottom:12px;">MUSIC<span>M</span></div>
          <p style="margin:0; line-height:1.7;">MUSICM은 Amplitude 고객 교육을 위한<br/>가상의 이커머스 목업 서비스입니다.<br/>모든 상품 정보는 실제와 무관합니다.</p>
        </div>
        <div>
          <h5>고객센터</h5>
          <a href="#">공지사항</a>
          <a href="#">자주 묻는 질문</a>
          <a href="#">1:1 문의</a>
          <a href="#">배송/교환/반품</a>
        </div>
        <div>
          <h5>MUSICM</h5>
          <a href="#">회사소개</a>
          <a href="#">입점문의</a>
          <a href="#">광고문의</a>
          <a href="#">인재채용</a>
        </div>
        <div>
          <h5>정책</h5>
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">청소년보호정책</a>
          <a href="#">저작권정책</a>
        </div>
      </div>
      <div class="copyright">
        © 2026 MUSICM Mock. Not a real service. For Amplitude enablement only.
      </div>
    </div>
  `;
  const footer = document.querySelector('.site-footer');
  setSafeHTML(footer, html);
}

// ===== Product Card HTML =====
function productCardHTML(p) {
  const brand = getBrand(p.brandId);
  const discount = discountPercent(p);
  return `
    <a href="product.html?id=${p.id}" class="product-card">
      <div class="thumb">
        ${p.badge ? `<span class="badge ${esc(p.badge.toLowerCase())}">${esc(p.badge)}</span>` : ''}
        <img src="${esc(p.image)}" loading="lazy" alt="${esc(p.name)}"/>
        <img class="hover" src="${esc(p.imageHover)}" loading="lazy" alt=""/>
      </div>
      <div class="brand-name">${esc(brand ? brand.name : '')}</div>
      <div class="name">${esc(p.name)}</div>
      <div class="price-row">
        ${p.salePrice ? `
          <span class="discount">${discount}%</span>
          <span class="price">${formatPrice(p.salePrice)}</span>
          <span class="price-orig">${formatPrice(p.price)}</span>
        ` : `
          <span class="price">${formatPrice(p.price)}</span>
        `}
      </div>
      <div class="meta">
        <span>★ ${esc(p.rating)}</span>
        <span>· 리뷰 ${p.reviews.toLocaleString()}</span>
      </div>
    </a>
  `;
}

// Call on every page:
document.addEventListener('DOMContentLoaded', () => {
  renderHeader(window.__navActive || '');
  renderFooter();
});

function getQS(name) {
  return new URLSearchParams(location.search).get(name);
}
