/* ==========================================================
   SIEMIRAN — Application Logic
   Loaded after products-data.js. Handles search, filters, cart,
   product modal, mega menu, theme/lang switch, banner, animations.
========================================================== */

let cart = [];
let currentFilter = 'ALL';
let currentSeries = null;
let currentSubfamily = null;
let visibleCount = 6;
let searchQuery = '';

/* ============== SEARCH HELPERS ============== */
function normalizeDigits(str){
  const map = {'۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9',
               '٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'};
  return str.replace(/[۰-۹٠-٩]/g, d => map[d] || d);
}
const CATEGORY_LABELS = {
  PLC:'PLC CPU پی ال سی کنترل منطقی',
  IO:'IO I/O ماژول ورودی خروجی SM',
  CP:'CP کارت ارتباطی communication processor Ethernet PROFIBUS',
  FM:'FM کارت تابعی function module شمارنده counter موقعیت‌دهی positioning',
  IM:'IM کارت رابط interface module ET200',
  HMI:'HMI پنل لمسی touch panel',
  DRIVE:'درایو drive inverter SINAMICS اینورتر سروو servo',
  POWER:'برق صنعتی LV MV power کلید',
  INST:'ابزار دقیق instrumentation'
};
function matchesSearch(p, q){
  if(!q) return true;
  const needle = normalizeDigits(q.trim().toLowerCase());
  const haystack = normalizeDigits([
    p.code, p.nameFa, p.nameEn, p.descFa, p.descEn, p.series||'', p.subfamily||'', CATEGORY_LABELS[p.cat]||''
  ].join(' ').toLowerCase());
  // Exact/substring match first (fast path, also matches full part codes precisely)
  if(haystack.includes(needle)) return true;
  // Fuzzy fallback: split query into tokens: every token must appear somewhere
  // in the haystack (any order) — lets "300 fail safe" or "S7 1200" match naturally.
  const tokens = needle.split(/\s+/).filter(Boolean);
  if(tokens.length <= 1) return false; // already covered by substring check above
  return tokens.every(t => haystack.includes(t));
}

/* ============== RENDER PRODUCTS ============== */
/* ============== HIERARCHICAL SUB-FILTERS (series / subfamily) ==============
   For PLC: shows a row of series (S7-300/400/1200/1500), then once a series
   is picked, a second row of subfamilies (Standard/Compact/Fail-Safe/Technology)
   scoped to that series — mirroring Siemens' own catalog structure.
   For HMI: shows subfamilies directly (Basic/Comfort/Mobile/Panel PC), no series step. */
function renderSubFilters(){
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'fa';
  const seriesRow = document.getElementById('series-filter-row');
  const subfamilyRow = document.getElementById('subfamily-filter-row');

  const seriesCategories = ['PLC','IO','CP','FM','IM'];

  if(seriesCategories.includes(currentFilter)){
    const seriesList = [...new Set(PRODUCTS.filter(p => p.cat===currentFilter && p.series).map(p => p.series))]
      .sort((a,b) => a.localeCompare(b, undefined, {numeric:true}));
    if(seriesList.length === 0){
      seriesRow.classList.add('d-none'); seriesRow.classList.remove('d-flex'); seriesRow.innerHTML = '';
    } else {
      seriesRow.classList.remove('d-none'); seriesRow.classList.add('d-flex');
      seriesRow.innerHTML = seriesList.map(s => `
        <button class="subfilter-chip ${currentSeries===s?'active':''}" onclick="setSeries('${s}')">${s}</button>
      `).join('') + (currentSeries ? `<button class="subfilter-chip" onclick="setSeries(null)">${lang==='fa'?'× پاک کردن':'× Clear'}</button>` : '');
    }

    if(currentSeries){
      const subfamilies = [...new Set(PRODUCTS.filter(p => p.cat===currentFilter && p.series===currentSeries).map(p => p.subfamily))];
      subfamilyRow.classList.remove('d-none'); subfamilyRow.classList.add('d-flex');
      subfamilyRow.innerHTML = subfamilies.map(sf => `
        <button class="subfilter-chip ${currentSubfamily===sf?'active':''}" onclick="setSubfamily('${sf}')">${sf}</button>
      `).join('');
    } else {
      subfamilyRow.classList.add('d-none'); subfamilyRow.classList.remove('d-flex');
      subfamilyRow.innerHTML = '';
    }
  } else if(currentFilter === 'HMI'){
    seriesRow.classList.add('d-none'); seriesRow.classList.remove('d-flex'); seriesRow.innerHTML = '';
    const subfamilies = [...new Set(PRODUCTS.filter(p => p.cat==='HMI').map(p => p.subfamily))];
    subfamilyRow.classList.remove('d-none'); subfamilyRow.classList.add('d-flex');
    subfamilyRow.innerHTML = subfamilies.map(sf => `
      <button class="subfilter-chip ${currentSubfamily===sf?'active':''}" onclick="setSubfamily('${sf}')">${sf}</button>
    `).join('');
  } else {
    seriesRow.classList.add('d-none'); seriesRow.classList.remove('d-flex'); seriesRow.innerHTML = '';
    subfamilyRow.classList.add('d-none'); subfamilyRow.classList.remove('d-flex'); subfamilyRow.innerHTML = '';
  }
}
function setSeries(series){
  currentSeries = series;
  currentSubfamily = null;
  visibleCount = 6;
  renderProducts();
}
function setSubfamily(sf){
  currentSubfamily = (currentSubfamily === sf) ? null : sf;
  visibleCount = 6;
  renderProducts();
}

function renderProducts(){
  const grid = document.getElementById('product-grid');
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'fa';

  let list = currentFilter === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.cat === currentFilter);
  if(currentSeries) list = list.filter(p => p.series === currentSeries);
  if(currentSubfamily) list = list.filter(p => p.subfamily === currentSubfamily);
  if(searchQuery.trim()){
    list = list.filter(p => matchesSearch(p, searchQuery));
  }

  renderSubFilters();

  const meta = document.getElementById('search-meta');
  if(searchQuery.trim()){
    meta.style.display = 'block';
    meta.innerHTML = lang === 'fa'
      ? `<strong>${list.length}</strong> نتیجه برای «${searchQuery.trim()}»`
      : `<strong>${list.length}</strong> result${list.length===1?'':'s'} for &ldquo;${searchQuery.trim()}&rdquo;`;
  } else {
    meta.style.display = 'none';
  }

  const visible = list.slice(0, visibleCount);
  grid.innerHTML = '';

  if(list.length === 0){
    grid.innerHTML = `<div class="col-12 no-results">
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <p>${lang==='fa'
        ? 'محصولی با این مشخصات پیدا نشد.<br>می‌تونید مستقیم از طریق فرم تماس درخواست استعلام بدید.'
        : 'No products matched your search.<br>You can still request a quote directly via the contact form.'}</p>
    </div>`;
    document.getElementById('show-more-btn').style.display = 'none';
    return;
  }

  visible.forEach((p) => {
    const realIdx = PRODUCTS.indexOf(p);
    const inCart = cart.some(c => c.code === p.code);
    const catLabel = {PLC:'PLC/CPU', IO:lang==='fa'?'ماژول I/O':'I/O Module', CP:lang==='fa'?'کارت CP':'CP Module', FM:lang==='fa'?'کارت FM':'FM Module', IM:lang==='fa'?'کارت IM':'IM Module', HMI:'HMI', DRIVE:lang==='fa'?'درایو':'Drive', POWER:lang==='fa'?'برق صنعتی':'Power', INST:lang==='fa'?'ابزار دقیق':'Instrumentation'}[p.cat];
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="pcard card-sm rounded-4">
        <div class="pcard-image" onclick="openProductDetail(${realIdx})" role="button" tabindex="0" aria-label="${lang==='fa'?p.nameFa:p.nameEn}">
          ${productImageHtml(p)}
        </div>
        <div class="d-flex justify-content-between align-items-start mb-3">
          <span class="pcard-cat">${catLabel}</span>
          <span class="stock-dot"><span class="dot"></span>${lang==='fa'?'موجود':'In stock'}</span>
        </div>
        <h4 class="pcard-title-link" onclick="openProductDetail(${realIdx})" role="button" tabindex="0">${lang==='fa'?p.nameFa:p.nameEn}</h4>
        <div class="code">${p.code}</div>
        <div class="desc">${lang==='fa'?p.descFa:p.descEn}</div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="add-btn ${inCart?'added':''}" onclick="toggleCart(${realIdx})">
            ${inCart ? (lang==='fa'?'✓ افزوده شد':'✓ Added') : (lang==='fa'?'+ افزودن به سبد':'+ Add to cart')}
          </button>
          <button class="detail-btn" onclick="openProductDetail(${realIdx})">
            ${lang==='fa'?'مشاهده جزئیات':'View details'}
          </button>
        </div>
      </div>`;
    grid.appendChild(col);
  });

  document.getElementById('show-more-btn').style.display = visibleCount >= list.length ? 'none' : 'inline-block';
}

/* ============== PRODUCT IMAGE (placeholder system) ==============
   Every product has an `image` field. When it's null/undefined (the
   current default for all products), we render the Siemiran logo as a
   placeholder so the layout/spacing is final and ready — replacing a
   product photo later is a one-line change: just set `image:'path/to/photo.jpg'`
   on that product object in the PRODUCTS array above, and this function
   automatically swaps to a real <img> instead of the logo placeholder. */
function productImageHtml(p){
  if(p.image){
    return `<img src="${p.image}" alt="${p.nameEn}" loading="lazy">`;
  }
  return `<div class="pcard-image-placeholder">
    <svg viewBox="0 0 517 659" width="56" height="72">
      <path d="M 254.0 79.0 L 12.0 217.0 L 8.0 255.0 L 399.0 477.0 L 415.0 497.0 L 255.0 588.0 L 75.0 485.0 L 62.0 471.0 L 62.0 381.0 L 8.0 350.0 L 8.0 509.0 L 262.0 651.0 L 507.0 511.0 L 509.0 473.0 L 118.0 253.0 L 101.0 233.0 L 262.0 142.0 L 443.0 246.0 L 455.0 260.0 L 456.0 348.0 L 508.0 371.0 L 509.0 222.0 Z" fill="var(--sm-text-faint)" opacity="0.35"/>
      <path d="M 232.0 387.0 L 232.0 570.0 L 230.0 571.0 L 255.0 585.0 L 262.0 585.0 L 285.0 572.0 L 283.0 570.0 L 284.0 416.0 Z M 8.0 260.0 L 8.0 347.0 L 19.0 351.0 L 62.0 377.0 L 63.0 290.0 L 15.0 262.0 Z M 255.0 145.0 L 231.0 159.0 L 232.0 312.0 L 284.0 342.0 L 283.0 172.0 L 286.0 158.0 L 262.0 145.0 Z M 259.0 8.0 L 235.0 20.0 L 234.0 22.0 L 234.0 43.0 L 235.0 46.0 L 237.0 46.0 L 239.0 48.0 L 252.0 54.0 L 254.0 56.0 L 263.0 57.0 L 275.0 51.0 L 277.0 49.0 L 281.0 48.0 L 286.0 44.0 L 286.0 21.0 L 281.0 17.0 L 279.0 17.0 L 271.0 12.0 L 267.0 11.0 L 265.0 9.0 Z" fill="var(--sm-teal)" opacity="0.5"/>
    </svg>
    <span class="pcard-image-note">Siemiran</span>
  </div>`;
}

function showMore(){ visibleCount += 6; renderProducts(); }
function clearSearch(){
  searchQuery = '';
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear').classList.remove('show');
  visibleCount = 6;
  renderProducts();
}
document.getElementById('search-input').addEventListener('input', e => {
  searchQuery = e.target.value;
  document.getElementById('search-clear').classList.toggle('show', searchQuery.length > 0);
  visibleCount = 6;
  renderProducts();
});
function filterAndScroll(cat){
  const validCats = ['PLC','IO','CP','FM','IM','HMI','DRIVE','POWER','INST'];
  currentFilter = validCats.includes(cat) ? cat : 'ALL';
  currentSeries = null;
  currentSubfamily = null;
  visibleCount = 6;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  const chip = document.querySelector(`.filter-chip[data-filter="${currentFilter}"]`);
  if(chip) chip.classList.add('active');
  renderProducts();
  closeMegaMenu();
  const mobileMenuEl = document.getElementById('mobileMenu');
  const mobileMenuInst = bootstrap.Offcanvas.getInstance(mobileMenuEl);
  if(mobileMenuInst) mobileMenuInst.hide();
  document.getElementById('products').scrollIntoView({behavior:'smooth'});
}
document.getElementById('filter-row').addEventListener('click', e => {
  const btn = e.target.closest('.filter-chip');
  if(!btn) return;
  currentFilter = btn.dataset.filter;
  currentSeries = null;
  currentSubfamily = null;
  visibleCount = 6;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
});

/* ============== CART ============== */
/* ============== PRODUCT DETAIL MODAL (with hash-routing for deep links / SEO) ============== */
function slugifyCode(code){
  return code.replace(/[^a-zA-Z0-9-]/g, '');
}
function openProductDetail(idx){
  const p = PRODUCTS[idx];
  if(!p) return;
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'fa';
  const inCart = cart.some(c => c.code === p.code);

  document.getElementById('productModalCode').textContent = p.code;

  const specsRows = (p.specs || []).map(s => `
    <tr><td>${lang==='fa'?s.faK:s.enK}</td><td>${lang==='fa'?s.faV:s.enV}</td></tr>
  `).join('');

  const catLabel = {PLC:'PLC/CPU', IO:lang==='fa'?'ماژول I/O':'I/O Module', CP:lang==='fa'?'کارت CP':'CP Module', FM:lang==='fa'?'کارت FM':'FM Module', IM:lang==='fa'?'کارت IM':'IM Module', HMI:'HMI', DRIVE:lang==='fa'?'درایو':'Drive', POWER:lang==='fa'?'برق صنعتی':'Power', INST:lang==='fa'?'ابزار دقیق':'Instrumentation'}[p.cat];

  // Related products: bidirectional. Forward links (p.related -> those products),
  // PLUS reverse links (any product whose own `related` array names this product's
  // code — e.g. an I/O module lists a CPU as related, so the CPU's page should also
  // show that I/O module). Falls back to same-subfamily items only if still short.
  let relatedProducts = [];
  if(p.related && p.related.length){
    relatedProducts = p.related.map(code => PRODUCTS.find(x => x.code === code)).filter(Boolean);
  }
  const reverseLinks = PRODUCTS.filter(x => x.code !== p.code && x.related && x.related.includes(p.code) && !relatedProducts.includes(x));
  relatedProducts = relatedProducts.concat(reverseLinks);
  if(relatedProducts.length < 4){
    const sameGroup = PRODUCTS.filter(x => x.code !== p.code && x.cat === p.cat && x.subfamily === p.subfamily && !relatedProducts.includes(x));
    relatedProducts = relatedProducts.concat(sameGroup.slice(0, 4 - relatedProducts.length));
  }
  relatedProducts = relatedProducts.slice(0, 4);

  const relatedHtml = relatedProducts.length ? relatedProducts.map(rp => {
    const rIdx = PRODUCTS.indexOf(rp);
    return `<div class="related-item" onclick="openProductDetail(${rIdx})">
      <div class="related-item-img">${productImageHtml(rp)}</div>
      <div class="related-item-name">${lang==='fa'?rp.nameFa:rp.nameEn}</div>
      <div class="related-item-code mono">${rp.code}</div>
    </div>`;
  }).join('') : `<p style="color:var(--sm-text-faint);font-size:13px;">${lang==='fa'?'محصول مرتبطی یافت نشد.':'No related products found.'}</p>`;

  document.getElementById('productModalBody').innerHTML = `
    <div>
      <div class="product-modal-image">${productImageHtml(p)}</div>
    </div>
    <div>
      <span class="pcard-cat">${catLabel}</span>
      <h3 class="mt-3 mb-2" style="font-family:'Space Grotesk','Vazirmatn',sans-serif;font-weight:700;font-size:24px;">${lang==='fa'?p.nameFa:p.nameEn}</h3>
      <p style="color:var(--sm-text-dim);font-size:14.5px;line-height:1.75;">${lang==='fa'?p.descFa:p.descEn}</p>

      <div class="product-modal-tabs">
        <button class="pm-tab active" data-tab="specs" onclick="switchModalTab('specs')">${lang==='fa'?'مشخصات فنی':'Specifications'}</button>
        <button class="pm-tab" data-tab="datasheet" onclick="switchModalTab('datasheet')">${lang==='fa'?'دیتاشیت':'Datasheet'}</button>
        <button class="pm-tab" data-tab="related" onclick="switchModalTab('related')">${lang==='fa'?'محصولات مرتبط':'Related Products'}</button>
      </div>

      <div class="pm-tab-panel" data-panel="specs">
        ${specsRows ? `<table class="product-modal-specs">${specsRows}</table>` : `<p style="color:var(--sm-text-faint);font-size:13px;margin-top:1rem;">${lang==='fa'?'مشخصات فنی این محصول به‌زودی تکمیل می‌شود.':'Technical specifications for this product will be added soon.'}</p>`}
      </div>
      <div class="pm-tab-panel d-none" data-panel="datasheet">
        ${p.datasheetUrl ? `
          <p style="color:var(--sm-text-dim);font-size:13.5px;line-height:1.75;margin-top:1rem;">${lang==='fa'?'دیتاشیت رسمی این محصول مستقیماً از سایت پشتیبانی زیمنس در دسترس است.':'The official datasheet for this product is available directly from the Siemens support site.'}</p>
          <a class="product-modal-datasheet-link" href="${p.datasheetUrl}" target="_blank" rel="noopener noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
            <span>${lang==='fa'?'دیتاشیت رسمی زیمنس (PDF)':'Official Siemens Datasheet (PDF)'}</span>
          </a>` : `<p style="color:var(--sm-text-faint);font-size:13px;margin-top:1rem;">${lang==='fa'?'لینک دیتاشیت این محصول به‌زودی اضافه می‌شود.':'Datasheet link for this product will be added soon.'}</p>`}
      </div>
      <div class="pm-tab-panel d-none" data-panel="related">
        <div class="related-grid">${relatedHtml}</div>
      </div>

      <div class="product-modal-actions">
        <button class="add-btn ${inCart?'added':''}" onclick="toggleCart(${idx}); openProductDetail(${idx});">
          ${inCart ? (lang==='fa'?'✓ افزوده شد':'✓ Added') : (lang==='fa'?'+ افزودن به سبد':'+ Add to cart')}
        </button>
        <a href="#contact" class="btn btn-sm-primary" onclick="closeProductDetail()">
          ${lang==='fa'?'ثبت درخواست / استعلام قیمت':'Request Quote / Place Order'}
        </a>
        <a href="product-${slugifyCode(p.code)}.html" target="_blank" rel="noopener" class="btn btn-sm-outline">
          ${lang==='fa'?'صفحه اختصاصی محصول ↗':'Full product page ↗'}
        </a>
      </div>
    </div>
  `;

  document.getElementById('productModalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  const newHash = '#product-' + slugifyCode(p.code);
  if(window.location.hash !== newHash){
    history.pushState(null, '', newHash);
  }
}
function switchModalTab(tab){
  document.querySelectorAll('.pm-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.pm-tab-panel').forEach(p => p.classList.toggle('d-none', p.dataset.panel !== tab));
}
function closeProductDetail(){
  document.getElementById('productModalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  if(window.location.hash.startsWith('#product-')){
    history.pushState(null, '', window.location.pathname + window.location.search);
  }
}
function checkHashForProduct(){
  const hash = window.location.hash;
  if(hash.startsWith('#product-')){
    const slug = hash.replace('#product-', '');
    const idx = PRODUCTS.findIndex(p => slugifyCode(p.code) === slug);
    if(idx >= 0) openProductDetail(idx);
  }
}
document.getElementById('productModalClose').addEventListener('click', closeProductDetail);
document.getElementById('productModalBackdrop').addEventListener('click', e => {
  if(e.target.id === 'productModalBackdrop') closeProductDetail();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && document.getElementById('productModalBackdrop').classList.contains('open')) closeProductDetail();
});
window.addEventListener('hashchange', checkHashForProduct);

/* ============== FULL SEARCH PAGE (DigiKala-style) ============== */
let spSearchQuery = '';
let spCatFilter = 'ALL';
let spSeriesFilter = null;
let spVisibleCount = 6;

const SP_CAT_LIST = ['PLC','IO','CP','FM','IM','HMI','DRIVE','POWER','INST'];

function spCatLabel(cat, lang){
  return {
    PLC:'PLC/CPU', IO:lang==='fa'?'ماژول I/O':'I/O Modules', CP:lang==='fa'?'کارت CP':'CP Modules',
    FM:lang==='fa'?'کارت FM':'FM Modules', IM:lang==='fa'?'کارت IM':'IM Modules', HMI:'HMI',
    DRIVE:lang==='fa'?'درایو':'Drives', POWER:lang==='fa'?'برق صنعتی':'Power', INST:lang==='fa'?'ابزار دقیق':'Instrumentation'
  }[cat];
}

function renderSearchPage(){
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'fa';

  // Category filter list (with live counts based on current search query, not current cat/series selection)
  const catCounts = {};
  SP_CAT_LIST.forEach(c => {
    catCounts[c] = PRODUCTS.filter(p => p.cat === c && (!spSearchQuery.trim() || matchesSearch(p, spSearchQuery))).length;
  });
  const catContainer = document.getElementById('sp-cat-filters');
  catContainer.innerHTML = `
    <div class="sp-filter-item ${spCatFilter==='ALL'?'active':''}" onclick="setSpCat('ALL')">
      <span>${lang==='fa'?'همه':'All'}</span><span class="sp-count">${PRODUCTS.filter(p => !spSearchQuery.trim() || matchesSearch(p, spSearchQuery)).length}</span>
    </div>
  ` + SP_CAT_LIST.map(c => `
    <div class="sp-filter-item ${spCatFilter===c?'active':''}" onclick="setSpCat('${c}')">
      <span>${spCatLabel(c, lang)}</span><span class="sp-count">${catCounts[c]}</span>
    </div>
  `).join('');

  // Series filter list (only meaningful ones for currently selected category; hidden if none apply)
  const seriesContainer = document.getElementById('sp-series-filters');
  const relevantProducts = spCatFilter === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.cat === spCatFilter);
  const seriesList = [...new Set(relevantProducts.filter(p => p.series).map(p => p.series))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
  if(seriesList.length === 0){
    seriesContainer.innerHTML = `<p style="font-size:12px;color:var(--sm-text-faint);margin:0;">${lang==='fa'?'فیلتر سری برای این دسته وجود ندارد.':'No series filter for this category.'}</p>`;
  } else {
    seriesContainer.innerHTML = seriesList.map(s => `
      <div class="sp-filter-item ${spSeriesFilter===s?'active':''}" onclick="setSpSeries('${s}')">
        <span>${s}</span>
      </div>
    `).join('');
  }

  // Compute final filtered list
  let list = spCatFilter === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.cat === spCatFilter);
  if(spSeriesFilter) list = list.filter(p => p.series === spSeriesFilter);
  if(spSearchQuery.trim()) list = list.filter(p => matchesSearch(p, spSearchQuery));

  document.getElementById('sp-result-count').innerHTML = lang==='fa'
    ? `<strong style="color:var(--sm-teal);">${list.length}</strong> نتیجه`
    : `<strong style="color:var(--sm-teal);">${list.length}</strong> results`;

  const visibleList = list.slice(0, spVisibleCount);
  const grid = document.getElementById('sp-product-grid');
  grid.innerHTML = '';
  if(list.length === 0){
    grid.innerHTML = `<div class="col-12 no-results">
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <p>${lang==='fa'?'محصولی با این مشخصات پیدا نشد.':'No products matched your search.'}</p>
    </div>`;
    document.getElementById('sp-show-more-btn').style.display = 'none';
    return;
  }
  visibleList.forEach(p => {
    const realIdx = PRODUCTS.indexOf(p);
    const inCart = cart.some(c => c.code === p.code);
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="pcard card-sm rounded-4">
        <div class="pcard-image" onclick="openProductDetail(${realIdx})" role="button" tabindex="0">${productImageHtml(p)}</div>
        <div class="d-flex justify-content-between align-items-start mb-3">
          <span class="pcard-cat">${spCatLabel(p.cat, lang)}</span>
          <span class="stock-dot"><span class="dot"></span>${lang==='fa'?'موجود':'In stock'}</span>
        </div>
        <h4 class="pcard-title-link" onclick="openProductDetail(${realIdx})">${lang==='fa'?p.nameFa:p.nameEn}</h4>
        <div class="code">${p.code}</div>
        <div class="desc">${lang==='fa'?p.descFa:p.descEn}</div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="add-btn ${inCart?'added':''}" onclick="toggleCart(${realIdx})">
            ${inCart ? (lang==='fa'?'✓ افزوده شد':'✓ Added') : (lang==='fa'?'+ افزودن به سبد':'+ Add to cart')}
          </button>
          <button class="detail-btn" onclick="openProductDetail(${realIdx})">${lang==='fa'?'مشاهده جزئیات':'View details'}</button>
        </div>
      </div>`;
    grid.appendChild(col);
  });
  document.getElementById('sp-show-more-btn').style.display = spVisibleCount >= list.length ? 'none' : 'inline-block';
}
function spShowMore(){
  spVisibleCount += 6;
  renderSearchPage();
}
function setSpCat(cat){
  spCatFilter = cat;
  spSeriesFilter = null;
  spVisibleCount = 6;
  renderSearchPage();
}
function setSpSeries(series){
  spSeriesFilter = (spSeriesFilter === series) ? null : series;
  spVisibleCount = 6;
  renderSearchPage();
}
function clearSearchPage(){
  spSearchQuery = '';
  document.getElementById('sp-search-input').value = '';
  document.getElementById('sp-search-clear').classList.remove('show');
  spVisibleCount = 6;
  renderSearchPage();
}
document.getElementById('sp-search-input').addEventListener('input', e => {
  spSearchQuery = e.target.value;
  document.getElementById('sp-search-clear').classList.toggle('show', spSearchQuery.length > 0);
  spVisibleCount = 6;
  renderSearchPage();
});

function toggleCart(idx){
  const p = PRODUCTS[idx];
  const existing = cart.findIndex(c => c.code === p.code);
  if(existing >= 0){ cart.splice(existing,1); } else { cart.push(p); }
  updateCartUI();
  renderProducts();
}
function removeFromCart(code){
  cart = cart.filter(c => c.code !== code);
  updateCartUI();
  renderProducts();
}
function updateCartUI(){
  document.getElementById('cartCount').textContent = cart.length;
  renderSearchPage();
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'fa';

  const body = document.getElementById('drawer-body');
  if(cart.length === 0){
    body.innerHTML = `<div class="empty-cart">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 005.6 19H17"/></svg>
      <p>${lang==='fa'?'سبد شما خالی است':'Your cart is empty'}</p>
    </div>`;
  } else {
    body.innerHTML = cart.map(c => `
      <div class="drawer-item">
        <div><div class="di-name">${lang==='fa'?c.nameFa:c.nameEn}</div><div class="di-code">${c.code}</div></div>
        <button onclick="removeFromCart('${c.code}')">×</button>
      </div>
    `).join('');
  }

  const summary = document.getElementById('cart-summary');
  if(cart.length === 0){
    summary.className = 'cart-summary empty';
    summary.innerHTML = `<span data-fa>سبد شما خالیه — می‌تونید بدون انتخاب محصول هم فرم رو ارسال کنید.</span><span data-en>Your cart is empty — you can still submit the form without selecting products.</span>`;
  } else {
    summary.className = 'cart-summary';
    summary.innerHTML = `<div style="font-size:12.5px;color:var(--sm-text-faint);margin-bottom:8px;font-family:'JetBrains Mono',monospace;">${lang==='fa'?cart.length+' قلم در سبد':cart.length+' items in cart'}</div>` +
      cart.map(c => `<div class="cart-line"><span>${lang==='fa'?c.nameFa:c.nameEn}</span><button onclick="removeFromCart('${c.code}')">×</button></div>`).join('');
  }
  if(lang === 'en'){
    document.querySelectorAll('#cart-summary [data-en]').forEach(el => el.style.display = 'inline');
    document.querySelectorAll('#cart-summary [data-fa]').forEach(el => el.style.display = 'none');
  }
}

/* ============== FORM ============== */
function submitForm(){
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'fa';
  if(!name || !phone){
    alert(lang==='fa' ? 'لطفاً نام و شماره تماس را وارد کنید.' : 'Please enter your name and phone number.');
    return;
  }
  alert(lang==='fa'
    ? 'درخواست شما با موفقیت ثبت شد. تیم ما ظرف ۲۴ ساعت با شما تماس می‌گیرد.\n(این فرم نمایشی است — برای فعال‌سازی ارسال واقعی، باید به ایمیل یا سرور وصل شود.)'
    : 'Your request has been submitted. Our team will contact you within 24 hours.\n(This is a demo form — connect it to email or a server to enable real submissions.)');
}

/* ============== HEADER SEARCH ============== */
function openHeaderSearch(){
  document.getElementById('header-search-overlay').classList.add('open');
  const input = document.getElementById('header-search-input');
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'fa';
  input.placeholder = lang === 'fa' ? input.dataset.faPh : input.dataset.enPh;
  setTimeout(() => input.focus(), 50);
}
function closeHeaderSearch(){
  document.getElementById('header-search-overlay').classList.remove('open');
}
function runHeaderSearch(){
  const q = document.getElementById('header-search-input').value.trim();
  if(!q) return;
  searchQuery = q;
  document.getElementById('search-input').value = q;
  document.getElementById('search-clear').classList.toggle('show', q.length > 0);
  currentFilter = 'ALL';
  currentSeries = null;
  currentSubfamily = null;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  const allChip = document.querySelector('.filter-chip[data-filter="ALL"]');
  if(allChip) allChip.classList.add('active');
  visibleCount = 6;
  renderProducts();
  closeHeaderSearch();
  document.getElementById('products').scrollIntoView({behavior:'smooth'});
}
function quickSearch(term){
  document.getElementById('header-search-input').value = term;
  runHeaderSearch();
}
document.getElementById('headerSearchBtn').addEventListener('click', openHeaderSearch);
document.getElementById('hsCloseBtn').addEventListener('click', closeHeaderSearch);
document.getElementById('header-search-input').addEventListener('keydown', e => {
  if(e.key === 'Enter') runHeaderSearch();
  if(e.key === 'Escape') closeHeaderSearch();
});
document.getElementById('header-search-overlay').addEventListener('click', e => {
  if(e.target.id === 'header-search-overlay') closeHeaderSearch();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeHeaderSearch();
  if((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){
    e.preventDefault();
    openHeaderSearch();
  }
});

/* ============== MEGA MENU ============== */
function toggleMegaMenu(){
  const panel = document.getElementById('megaPanel');
  const overlay = document.getElementById('megaOverlay');
  const trigger = document.getElementById('megaTrigger');
  const isOpen = panel.classList.contains('open');
  if(isOpen){ closeMegaMenu(); }
  else{
    panel.classList.add('open'); overlay.classList.add('open'); trigger.classList.add('open');
  }
}
function closeMegaMenu(){
  const panel = document.getElementById('megaPanel');
  const overlay = document.getElementById('megaOverlay');
  const trigger = document.getElementById('megaTrigger');
  if(panel) panel.classList.remove('open');
  if(overlay) overlay.classList.remove('open');
  if(trigger) trigger.classList.remove('open');
}
document.getElementById('megaTrigger').addEventListener('click', toggleMegaMenu);
document.getElementById('megaOverlay').addEventListener('click', closeMegaMenu);
document.querySelectorAll('.mega-col a').forEach(a => {
  a.addEventListener('click', closeMegaMenu);
});

/* ============== THEME SWITCH ============== */
function setTheme(theme){
  const html = document.documentElement;
  if(theme === 'light'){
    html.setAttribute('data-bs-theme','light');
    document.getElementById('btn-theme-light').classList.add('active');
    document.getElementById('btn-theme-dark').classList.remove('active');
  } else {
    html.setAttribute('data-bs-theme','dark');
    document.getElementById('btn-theme-dark').classList.add('active');
    document.getElementById('btn-theme-light').classList.remove('active');
  }
}

/* ============== LANG SWITCH ============== */
function setLang(lang){
  const html = document.documentElement;
  const body = document.body;
  const searchInput = document.getElementById('search-input');
  const headerSearchInput = document.getElementById('header-search-input');
  const spSearchInput = document.getElementById('sp-search-input');
  const messageInput = document.getElementById('f-message');
  const allFaBtns = document.querySelectorAll('[id^="btn-fa"]');
  const allEnBtns = document.querySelectorAll('[id^="btn-en"]');
  const bsRtlCss = document.getElementById('bs-rtl-css');
  const bsLtrCss = document.getElementById('bs-ltr-css');
  if(lang === 'fa'){
    html.setAttribute('lang','fa'); html.setAttribute('dir','rtl');
    bsRtlCss.disabled = false; bsLtrCss.disabled = true;
    body.classList.remove('lang-en'); body.classList.add('lang-fa');
    allFaBtns.forEach(b => b.classList.add('active'));
    allEnBtns.forEach(b => b.classList.remove('active'));
    searchInput.placeholder = searchInput.dataset.faPh;
    headerSearchInput.placeholder = headerSearchInput.dataset.faPh;
    spSearchInput.placeholder = spSearchInput.dataset.faPh;
    messageInput.placeholder = messageInput.dataset.faPh;
  } else {
    html.setAttribute('lang','en'); html.setAttribute('dir','ltr');
    bsLtrCss.disabled = false; bsRtlCss.disabled = true;
    body.classList.remove('lang-fa'); body.classList.add('lang-en');
    allEnBtns.forEach(b => b.classList.add('active'));
    allFaBtns.forEach(b => b.classList.remove('active'));
    searchInput.placeholder = searchInput.dataset.enPh;
    headerSearchInput.placeholder = headerSearchInput.dataset.enPh;
    spSearchInput.placeholder = spSearchInput.dataset.enPh;
    messageInput.placeholder = messageInput.dataset.enPh;
  }
  renderProducts();
  updateCartUI();
}

/* ============== EXPLODED PART SCROLL ANIMATION ============== */
function initExplodedParts(){
  const targets = document.querySelectorAll('[data-exploded]');
  if(!targets.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add('in-view'); }
      else{ entry.target.classList.remove('in-view'); }
    });
  }, { threshold: 0.35 });
  targets.forEach(t => observer.observe(t));
}

/* ============== 3-SLIDE ROTATING BANNER (independent async timers) ============== */
const BANNER_SLIDES = [
  [ // Column 0 slides
    {icon:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/>', eyFa:'نمایندگی رسمی', eyEn:'Official Partner', tFa:'PLC و HMI زیمنس', tEn:'Siemens PLC & HMI', dFa:'کنترلرهای S7-300/1200/1500 و پنل‌های لمسی، مستقیم از نمایندگی رسمی.', dEn:'S7-300/1200/1500 controllers and touch panels, direct from the official channel.', cat:'PLC'},
    {icon:'<rect x="3" y="5" width="18" height="13" rx="2"/><path d="M3 16h18M8 21h8"/>', eyFa:'کاتالوگ کامل', eyEn:'Full Catalog', tFa:'پنل‌های لمسی HMI', tEn:'HMI Touch Panels', dFa:'از ۴ تا ۲۲ اینچ — Basic، Comfort و Mobile، برای هر محیط صنعتی.', dEn:'From 4" to 22" — Basic, Comfort and Mobile, for every industrial setting.', cat:'HMI'},
    {icon:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>', eyFa:'کیفیت تضمینی', eyEn:'Quality Guaranteed', tFa:'۱۰۰٪ قطعات اورجینال', tEn:'100% Genuine Parts', dFa:'هر قطعه با گارانتی اصالت، مستقیم از کانال رسمی برند.', dEn:'Every part with an authenticity guarantee, direct from the official brand channel.', cat:'PLC'}
  ],
  [ // Column 1 slides
    {icon:'<path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>', eyFa:'موجودی انبار', eyEn:'Warehouse Stock', tFa:'۲۰۰+ قطعه آماده تحویل', tEn:'200+ parts ready to ship', dFa:'برق صنعتی، کلیدهای حفاظتی و ابزار دقیق در انبار، بدون انتظار طولانی واردات.', dEn:'Power gear, breakers and instrumentation in stock — no long import wait.', cat:'POWER'},
    {icon:'<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>', eyFa:'برق صنعتی', eyEn:'Industrial Power', tFa:'کلیدهای ACB / MCB / MCCB', tEn:'ACB / MCB / MCCB Breakers', dFa:'محافظت کامل تابلوهای برق فشار ضعیف و متوسط.', dEn:'Complete protection for LV/MV switchgear panels.', cat:'POWER'},
    {icon:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', eyFa:'پاسخگویی سریع', eyEn:'Fast Response', tFa:'استعلام قیمت ظرف ۲۴ ساعت', tEn:'Quote within 24 hours', dFa:'تیم فنی ما سریع بررسی می‌کند و بهترین قیمت را اعلام می‌کند.', dEn:'Our technical team reviews quickly and shares the best price.', cat:'POWER'}
  ],
  [ // Column 2 slides
    {icon:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>', eyFa:'نمایندگی رسمی', eyEn:'Official Partner', tFa:'ابزار دقیق Endress+Hauser', tEn:'Endress+Hauser Instrumentation', dFa:'اندازه‌گیری دبی، سطح، فشار و دما با دقت سوئیسی، برای فرآیندهای حساس.', dEn:'Flow, level, pressure and temperature measurement with Swiss precision.', cat:'INST'},
    {icon:'<path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-6"/>', eyFa:'تحلیل فرآیند', eyEn:'Process Analysis', tFa:'ترانسمیترهای صنعتی دقیق', tEn:'Precision Industrial Transmitters', dFa:'داده دقیق فرآیند برای تصمیم‌گیری بهتر و کاهش خطای تولید.', dEn:'Accurate process data for better decisions and less production error.', cat:'INST'},
    {icon:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>', eyFa:'ابزار دقیق تست', eyEn:'Test Instruments', tFa:'مولتی‌متر و ابزار Fluke', tEn:'Fluke Multimeters & Tools', dFa:'عیب‌یابی دقیق تابلوهای برق با ابزار حرفه‌ای Fluke.', dEn:'Precise switchgear diagnostics with professional Fluke tools.', cat:'INST'}
  ]
];
const bannerState = [0,0,0];
const bannerTimers = [];
function renderBannerSlide(colIdx){
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'fa';
  const col = document.getElementById('bannerCol'+colIdx);
  const slideIdx = bannerState[colIdx];
  const s = BANNER_SLIDES[colIdx][slideIdx];
  let slideEl = col.querySelector('.banner-slide');
  if(!slideEl){
    slideEl = document.createElement('div');
    slideEl.className = 'banner-slide';
    col.insertBefore(slideEl, col.firstChild);
  }
  slideEl.classList.remove('active');
  void slideEl.offsetWidth; // reflow to restart transition
  slideEl.innerHTML = `
    <svg class="banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${s.icon}</svg>
    <div class="banner-eyebrow">${lang==='fa'?s.eyFa:s.eyEn}</div>
    <div class="banner-title">${lang==='fa'?s.tFa:s.tEn}</div>
    <p class="banner-desc">${lang==='fa'?s.dFa:s.dEn}</p>
    <a href="#products" class="btn btn-sm-outline btn-sm align-self-start" onclick="filterAndScroll('${s.cat}')">${lang==='fa'?'مشاهده محصولات':'View products'}</a>
  `;
  requestAnimationFrame(() => slideEl.classList.add('active'));

  const dotsWrap = col.querySelector('.banner-dots');
  if(dotsWrap){
    dotsWrap.innerHTML = BANNER_SLIDES[colIdx].map((_,i) => `<span class="${i===slideIdx?'active':''}"></span>`).join('');
  }
}
function advanceBanner(colIdx){
  bannerState[colIdx] = (bannerState[colIdx] + 1) % BANNER_SLIDES[colIdx].length;
  renderBannerSlide(colIdx);
}
function initBanner(){
  // Each column renders its first slide and gets its OWN independent interval
  // with a slightly different duration so they drift out of sync (async feel).
  const durations = [5200, 6100, 4700];
  for(let i=0;i<3;i++){
    renderBannerSlide(i);
    bannerTimers[i] = setInterval(() => advanceBanner(i), durations[i]);
  }
}

/* ============== INIT ============== */
document.getElementById('search-input').placeholder = document.getElementById('search-input').dataset.faPh;
renderProducts();
updateCartUI();
initExplodedParts();
initBanner();
checkHashForProduct();
document.getElementById('sp-search-input').placeholder = document.getElementById('sp-search-input').dataset.faPh;
renderSearchPage();
