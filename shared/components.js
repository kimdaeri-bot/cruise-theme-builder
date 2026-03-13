/**
 * components.js
 * 공통 컴포넌트: 헤더, 푸터, 카드, 파트너 슬라이더
 * agency-config.js 값을 읽어 동적으로 렌더링
 */

const PARTNERS = [
  "MSC Cruises", "Norwegian Cruise Line", "Celebrity Cruises",
  "Royal Caribbean", "Carnival Cruise Line", "Costa Cruises",
  "Princess Cruises", "Holland America", "Cunard Line", "Disney Cruise Line"
];

/** 헤더 렌더링 */
function renderHeader() {
  const A = window.AGENCY;
  const logoHtml = A.logo
    ? `<img src="${A.logo}" alt="${A.name}" style="height:40px;">`
    : `<span class="site-logo">${A.name}</span>`;

  return `
    <header class="site-header">
      <div class="container">
        <a href="${A.homepage}" class="logo-wrap">${logoHtml}</a>
        <nav class="site-nav">
          <a href="#products">크루즈 상품</a>
          <a href="#partners">선사</a>
          <a href="#cta">여행 상담</a>
          <a href="tel:${A.phone}" class="btn-contact">${A.phone}</a>
        </nav>
      </div>
    </header>
  `;
}

/** 히어로 섹션 렌더링 */
function renderHero(bgStyle = '') {
  const A = window.AGENCY;
  return `
    <section class="hero" style="${bgStyle}">
      <div class="hero-bg-overlay"></div>
      <div class="hero-content">
        <h1>${A.tagline}</h1>
        <p>전 세계 최고의 크루즈 여행을 합리적인 가격으로 경험하세요</p>
        <div class="search-bar">
          <input type="text" placeholder="목적지, 선사, 출발일 검색..." />
          <button type="button">검색하기</button>
        </div>
      </div>
    </section>
  `;
}

/** 상품 카드 렌더링 */
function renderCruiseCards(count = 3) {
  const items = (window.CRUISE_DATA || []).slice(0, count);
  if (items.length === 0) return '<p style="text-align:center;opacity:0.5;">데이터를 불러오는 중...</p>';

  return items.map(cruise => `
    <div class="cruise-card">
      <div class="card-image">
        <img src="${cruise.image}" alt="${cruise.title}" loading="lazy">
        <span class="card-badge">${cruise.badge}</span>
      </div>
      <div class="card-body">
        <div class="card-meta">${cruise.line} · ${cruise.duration} · ${cruise.departure}</div>
        <h3>${cruise.title}</h3>
        <p class="card-route" style="font-size:0.82rem;opacity:0.6;margin-bottom:12px;">${cruise.route}</p>
        <div class="card-price">
          <span class="price-current">${cruise.price.toLocaleString()}원</span>
          <span class="price-original">${cruise.originalPrice.toLocaleString()}원</span>
          <span class="price-discount">${cruise.discount}% 할인</span>
        </div>
        <button class="card-btn" onclick="alert('상담 문의: ${window.AGENCY.phone}')">자세히 보기</button>
      </div>
    </div>
  `).join('');
}

/** 파트너 슬라이더 렌더링 */
function renderPartners() {
  const doubled = [...PARTNERS, ...PARTNERS];
  const items = doubled.map(p => `<span class="partner-item">${p}</span>`).join('');
  return `
    <section class="partners">
      <div class="container">
        <p class="partners-title">파트너 크루즈 선사</p>
        <div class="partners-slider">
          <div class="partners-track">${items}</div>
        </div>
      </div>
    </section>
  `;
}

/** CTA 섹션 렌더링 */
function renderCTA() {
  const A = window.AGENCY;
  return `
    <section class="cta-section" id="cta">
      <h2>지금 바로 크루즈 여행을 계획하세요</h2>
      <p>전문 상담원이 최적의 크루즈 일정을 추천해 드립니다</p>
      <div class="cta-buttons">
        <a href="tel:${A.phone}">
          <button class="cta-btn-primary">📞 ${A.phone} 전화 상담</button>
        </a>
        <a href="${A.kakao}" target="_blank">
          <button class="cta-btn-secondary">💬 카카오톡 상담</button>
        </a>
      </div>
    </section>
  `;
}

/** 푸터 렌더링 */
function renderFooter() {
  const A = window.AGENCY;
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <div class="logo">${A.name}</div>
            <p>${A.tagline}<br>
               Tel: ${A.phone}<br>
               Email: ${A.email}</p>
          </div>
          <div class="footer-col">
            <h4>크루즈 목적지</h4>
            <ul>
              <li><a href="#">지중해</a></li>
              <li><a href="#">카리브해</a></li>
              <li><a href="#">북유럽</a></li>
              <li><a href="#">알래스카</a></li>
              <li><a href="#">일본 근해</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>고객 서비스</h4>
            <ul>
              <li><a href="#">예약 문의</a></li>
              <li><a href="#">예약 변경</a></li>
              <li><a href="#">취소/환불</a></li>
              <li><a href="#">자주 묻는 질문</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>회사 정보</h4>
            <ul>
              <li><a href="#">회사 소개</a></li>
              <li><a href="#">공지사항</a></li>
              <li><a href="#">개인정보처리방침</a></li>
              <li><a href="${A.kakao}" target="_blank">카카오 채널</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} ${A.name}. All rights reserved.</span>
          <span>사업자등록번호: 000-00-00000 | 관광사업등록: 제0000호</span>
        </div>
      </div>
    </footer>
  `;
}

/** 페이지 전체 초기화 */
function initPage() {
  // agency-config.js의 primaryColor / accentColor를 CSS 변수로 주입
  const A = window.AGENCY;
  if (A.primaryColor) {
    document.documentElement.style.setProperty('--primary', A.primaryColor);
  }
  if (A.accentColor) {
    document.documentElement.style.setProperty('--accent', A.accentColor);
  }
  document.title = A.name + ' — ' + A.tagline;
}

// DOMContentLoaded 시 초기화
document.addEventListener('DOMContentLoaded', initPage);
