// MUSICM Mock Data
// Brands, Products, Campaigns

const BRANDS = [
  { id: 'musicm-standard', name: 'MUSICM Standard', nameKr: '뮤직엠 스탠다드', tag: '자체브랜드', desc: '기본에 충실한 데일리 웨어, MUSICM이 직접 만든 베이직 라인', hero: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=70' },
  { id: 'nike', name: 'Nike', nameKr: '나이키', tag: '스포츠', desc: 'Just Do It. 퍼포먼스와 스타일을 모두 갖춘 글로벌 스포츠 브랜드', hero: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=70' },
  { id: 'adidas', name: 'Adidas', nameKr: '아디다스', tag: '스포츠', desc: 'Impossible is Nothing. 3선 스트라이프의 오리지널', hero: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=1600&q=70' },
  { id: 'new-balance', name: 'New Balance', nameKr: '뉴발란스', tag: '애슬레저', desc: '메이드 인 USA 헤리티지와 러닝 퍼포먼스의 결합', hero: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=1600&q=70' },
  { id: 'the-north-face', name: 'The North Face', nameKr: '더노스페이스', tag: '아웃도어', desc: 'Never Stop Exploring. 익스플로러를 위한 아웃도어 퍼포먼스', hero: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1600&q=70' },
  { id: 'carhartt', name: 'Carhartt WIP', nameKr: '칼하트', tag: '워크웨어', desc: '1889년부터 이어진 아메리칸 워크웨어의 정수', hero: 'https://images.unsplash.com/photo-1516762381361-ce04d6a90d6b?w=1600&q=70' },
  { id: 'stussy', name: 'Stüssy', nameKr: '스투시', tag: '스트릿', desc: '1980년대 서핑 컬처에서 시작된 오리지널 스트리트웨어', hero: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&q=70' },
  { id: 'ralph-lauren', name: 'Polo Ralph Lauren', nameKr: '폴로 랄프로렌', tag: '클래식', desc: '아메리칸 클래식의 아이콘, 폴로 플레이어 로고', hero: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=1600&q=70' },
  { id: 'converse', name: 'Converse', nameKr: '컨버스', tag: '스니커즈', desc: '척테일러 올스타, 100년 넘은 아이코닉 스니커즈', hero: 'https://images.unsplash.com/photo-1514989940723-e8e51635289b?w=1600&q=70' },
  { id: 'vans', name: 'Vans', nameKr: '반스', tag: '스트릿', desc: 'Off the Wall. 스케이트보드 컬처의 오리지널', hero: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1600&q=70' },
  { id: 'puma', name: 'Puma', nameKr: '푸마', tag: '스포츠', desc: 'Forever Faster. 스피드와 스타일의 만남', hero: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1600&q=70' },
  { id: 'covernat', name: 'Covernat', nameKr: '커버낫', tag: '스트릿', desc: '한국을 대표하는 캐주얼 스트릿 브랜드', hero: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=70' },
  { id: 'mardi-mercredi', name: 'Mardi Mercredi', nameKr: '마르디 메크르디', tag: '컨템포러리', desc: '마르디 플라워 그래픽의 프렌치 무드 브랜드', hero: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=70' },
  { id: 'matin-kim', name: 'Matin Kim', nameKr: '마틴킴', tag: '컨템포러리', desc: '미니멀 실루엣과 시즌 컬러의 여성 컨템포러리', hero: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=70' },
];

const CATEGORIES = [
  { id: 'top', name: '상의' },
  { id: 'outer', name: '아우터' },
  { id: 'bottom', name: '하의' },
  { id: 'shoes', name: '신발' },
  { id: 'bag', name: '가방' },
  { id: 'acc', name: '액세서리' },
];

// Image seeds for picsum - updated to fashion-related
function img(seed, w = 500, h = 600) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

// Helper to make a product
let _pid = 1;
function P(brandId, category, name, price, salePrice, opts = {}) {
  const id = _pid++;
  return {
    id,
    brandId,
    category,
    name,
    price,
    salePrice: salePrice || null,
    rating: opts.rating || (4 + Math.random()).toFixed(1),
    reviews: opts.reviews || Math.floor(Math.random() * 3000) + 50,
    colors: opts.colors || ['블랙', '화이트'],
    sizes: opts.sizes || ['S', 'M', 'L', 'XL'],
    tags: opts.tags || [],
    image: img(`musicm-${id}`, 500, 600),
    imageHover: img(`musicm-h${id}`, 500, 600),
    images: [img(`musicm-${id}-a`, 800, 960), img(`musicm-${id}-b`, 800, 960), img(`musicm-${id}-c`, 800, 960), img(`musicm-${id}-d`, 800, 960)],
    badge: opts.badge || null, // 'NEW', 'BEST', 'SALE'
    desc: opts.desc || `${name} - 시즌 추천 아이템. 편안한 착용감과 트렌디한 디자인.`,
  };
}

const PRODUCTS = [
  // ===== MUSICM Standard (자체브랜드) =====
  P('musicm-standard', 'top',    '오버핏 코튼 티셔츠', 29000, 19900, { badge: 'BEST', colors: ['블랙','화이트','그레이','네이비','아이보리'], tags:['베이직','코튼100'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop', imageHover: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop' }),
  P('musicm-standard', 'top',    '스탠다드 헤비웨이트 맨투맨', 49000, 34900, { badge: 'NEW', colors:['차콜','크림','블랙'] }),
  P('musicm-standard', 'top',    '에센셜 피그먼트 후드', 69000, null, { colors:['머드','블랙','샌드'] }),
  P('musicm-standard', 'top',    '스탠다드 니트 풀오버', 79000, 59000, { colors:['오트밀','브라운','블랙'] }),
  P('musicm-standard', 'top',    '클래식 옥스포드 셔츠', 59000, null, { colors:['화이트','블루','스트라이프'] }),
  P('musicm-standard', 'outer',  '데일리 바시티 자켓', 159000, 119000, { badge:'SALE', colors:['블랙/크림','네이비/오렌지'] }),
  P('musicm-standard', 'outer',  '스탠다드 숏 패딩', 189000, null, { badge:'NEW', colors:['블랙','아이보리','올리브'] }),
  P('musicm-standard', 'outer',  '와이드 발마칸 코트', 229000, 169000, { colors:['베이지','차콜'] }),
  P('musicm-standard', 'bottom', '스탠다드 와이드 데님', 79000, null, { colors:['미드블루','인디고','블랙'], sizes:['28','30','32','34','36'] }),
  P('musicm-standard', 'bottom', '에센셜 스웨트팬츠', 69000, 49000, { colors:['차콜','블랙','크림'] }),
  P('musicm-standard', 'bottom', '스탠다드 치노 팬츠', 59000, null, { colors:['베이지','블랙','올리브'], sizes:['28','30','32','34'] }),
  P('musicm-standard', 'shoes',  'MM01 레트로 스니커즈', 119000, 89000, { badge:'NEW', colors:['화이트/검','크림/네이비'], sizes:['250','260','270','280'] }),
  P('musicm-standard', 'bag',    '스탠다드 에코백', 25000, null, { colors:['블랙','아이보리'] }),
  P('musicm-standard', 'bag',    '데일리 백팩', 89000, 69000, { colors:['블랙','차콜'] }),
  P('musicm-standard', 'acc',    '울 비니', 29000, null, { colors:['블랙','네이비','오트밀'] }),
  P('musicm-standard', 'acc',    '로고 볼캡', 35000, 25000, { badge:'SALE', colors:['블랙','화이트','베이지'] }),

  // ===== Nike =====
  P('nike', 'shoes', '에어포스 1 07 로우', 139000, null, { badge:'BEST', colors:['올화이트','블랙','트리플블랙'], sizes:['230','240','250','260','270','280'], tags:['스니커즈'], image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop', imageHover: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop' }),
  P('nike', 'shoes', '에어맥스 97 OG', 239000, 199000, { colors:['실버불렛','트리플블랙'] }),
  P('nike', 'shoes', '덩크 로우 레트로', 129000, null, { badge:'NEW', colors:['파나마','그레이포그','판다'] }),
  P('nike', 'shoes', '페가수스 41 러닝화', 169000, 139000, { colors:['블랙/볼트','화이트/블루'] }),
  P('nike', 'shoes', '블레이저 미드 77', 129000, null, { colors:['화이트/블랙','세일/네이비'] }),
  P('nike', 'top',   '스포츠웨어 클럽 티셔츠', 39000, 29000, { colors:['블랙','화이트','그레이'], tags:['드라이핏'] }),
  P('nike', 'top',   'NSW 플리스 후디', 99000, null, { badge:'NEW', colors:['블랙','그레이','네이비'] }),
  P('nike', 'top',   '드라이핏 트레이닝 티', 49000, 35000, { colors:['블랙','볼트','크림슨'] }),
  P('nike', 'outer', '윈드러너 자켓', 159000, 129000, { colors:['블랙/볼트','네이비/화이트'] }),
  P('nike', 'outer', 'NSW 테크 플리스 집업', 179000, null, { badge:'BEST', colors:['다크그레이','블랙'] }),
  P('nike', 'bottom','테크 플리스 조거팬츠', 159000, 119000, { colors:['블랙','그레이'] }),
  P('nike', 'bottom','드라이핏 러닝 쇼츠', 59000, null, { colors:['블랙','그레이','네이비'] }),
  P('nike', 'bag',   '헤리티지 백팩', 79000, 59000, { colors:['블랙','올리브'] }),
  P('nike', 'acc',   '클럽 스우시 볼캡', 39000, null, { colors:['블랙','화이트','네이비'] }),

  // ===== Adidas =====
  P('adidas', 'shoes', '삼바 OG', 149000, null, { badge:'BEST', colors:['블랙/화이트','화이트/검'], sizes:['240','250','260','270','280'], image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&h=600&fit=crop', imageHover: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&h=600&fit=crop' }),
  P('adidas', 'shoes', '가젤 인도어', 139000, 109000, { colors:['보나블루','레드','블랙'] }),
  P('adidas', 'shoes', '스탠스미스', 119000, null, { colors:['화이트/그린','화이트/네이비'] }),
  P('adidas', 'shoes', '컨츄리 OG', 129000, 99000, { badge:'SALE', colors:['화이트/네이비'] }),
  P('adidas', 'shoes', '슈퍼스타', 119000, null, { colors:['블랙/화이트','올화이트'] }),
  P('adidas', 'top',   '오리지널스 트레포일 티셔츠', 45000, 35000, { colors:['블랙','화이트','세이지'] }),
  P('adidas', 'top',   '파이어버드 트랙자켓', 119000, null, { badge:'NEW', colors:['블랙/화이트','레드/화이트'] }),
  P('adidas', 'top',   '에센셜 플리스 후디', 79000, 59000, { colors:['블랙','그레이'] }),
  P('adidas', 'bottom','파이어버드 트랙팬츠', 109000, null, { colors:['블랙','네이비','그린'] }),
  P('adidas', 'bottom','에센셜 3스트라이프 쇼츠', 49000, 35000, { colors:['블랙','네이비'] }),
  P('adidas', 'bag',   '클래식 백팩', 59000, null, { colors:['블랙','네이비'] }),
  P('adidas', 'acc',   '트레포일 볼캡', 35000, 25000, { colors:['블랙','화이트'] }),

  // ===== New Balance =====
  P('new-balance', 'shoes', '992 메이드인USA', 349000, null, { badge:'BEST', colors:['그레이','네이비','블랙'] }),
  P('new-balance', 'shoes', '530 레트로', 149000, 119000, { colors:['스틸그레이','화이트/실버'] }),
  P('new-balance', 'shoes', '574 코어', 119000, null, { colors:['그레이','네이비','블랙'] }),
  P('new-balance', 'shoes', '1906R 프로텍션팩', 239000, null, { badge:'NEW', colors:['그레이/실버','블랙/실버'] }),
  P('new-balance', 'shoes', '327 빈티지', 139000, 99000, { colors:['세이지','번트오렌지'] }),
  P('new-balance', 'shoes', '퓨얼셀 리벨 v4', 179000, 139000, { colors:['블랙/볼트','화이트/네이비'] }),
  P('new-balance', 'top',   '아카이브 스트라이프 티', 49000, null, { colors:['네이비/화이트','블랙/화이트'] }),
  P('new-balance', 'top',   '에센셜 스웻셔츠', 89000, 69000, { colors:['차콜','크림'] }),
  P('new-balance', 'bottom','에센셜 조거 팬츠', 89000, null, { colors:['블랙','그레이','네이비'] }),
  P('new-balance', 'bag',   'OPP 코어 백팩', 69000, null, { colors:['블랙'] }),

  // ===== The North Face =====
  P('the-north-face', 'outer', '눕시 1996 다운 자켓', 459000, 399000, { badge:'BEST', colors:['블랙','서밋골드','TNF레드'] }),
  P('the-north-face', 'outer', '데날리 플리스 자켓', 259000, 199000, { colors:['차콜그레이','블랙','TNF레드'] }),
  P('the-north-face', 'outer', '마운틴 라이트 자켓', 439000, null, { badge:'NEW', colors:['블랙','서밋네이비'] }),
  P('the-north-face', 'outer', '히말라얀 파카', 799000, 699000, { colors:['블랙','서밋골드'] }),
  P('the-north-face', 'top',   '하프돔 로고 티셔츠', 49000, 39000, { colors:['블랙','화이트','네이비','세이지'] }),
  P('the-north-face', 'top',   '100 글래시어 플리스', 119000, null, { colors:['차콜','네이비','베이지'] }),
  P('the-north-face', 'bottom','알파인 트레일 팬츠', 129000, null, { colors:['블랙','올리브'] }),
  P('the-north-face', 'shoes', '베스트레아 테크 Mid', 199000, 159000, { colors:['블랙','브라운'] }),
  P('the-north-face', 'bag',   '보레알리스 백팩', 149000, null, { badge:'BEST', colors:['블랙','네이비','올리브'] }),
  P('the-north-face', 'bag',   '베이스캠프 더플 M', 149000, 119000, { colors:['블랙','TNF레드'] }),

  // ===== Carhartt WIP =====
  P('carhartt', 'outer', '디트로이트 자켓', 359000, null, { badge:'BEST', colors:['해밀턴브라운','블랙','덕 올리브'] }),
  P('carhartt', 'outer', '액티브 자켓', 289000, 229000, { colors:['해밀턴브라운','블랙'] }),
  P('carhartt', 'bottom','싱글 니 팬츠', 149000, null, { colors:['해밀턴브라운','블랙','덕']}),
  P('carhartt', 'bottom','더블 니 워크 팬츠', 169000, 129000, { colors:['블랙','해밀턴브라운']}),
  P('carhartt', 'top',   '체이스 티셔츠', 59000, 45000, { badge:'BEST', colors:['블랙','화이트','네이비','크림','머스타드'] }),
  P('carhartt', 'top',   '체이스 스웻셔츠', 119000, null, { colors:['블랙','애쉬헤더','다크네이비'] }),
  P('carhartt', 'top',   '포켓 롱슬리브 티', 79000, null, { colors:['블랙','화이트','올리브'] }),
  P('carhartt', 'bag',   '에센셜 웨이스트백', 69000, 55000, { colors:['블랙','카모','올리브'] }),
  P('carhartt', 'acc',   '애크런 비니', 45000, null, { colors:['블랙','다크네이비','크림'] }),

  // ===== Stüssy =====
  P('stussy', 'top',   '베이직 스투시 티셔츠', 89000, null, { badge:'BEST', colors:['블랙','화이트','파인','네이비'] }),
  P('stussy', 'top',   '8볼 후드', 189000, 149000, { colors:['블랙','애쉬','피그먼트다이'] }),
  P('stussy', 'top',   '스투시 크루넥', 149000, null, { badge:'NEW', colors:['블랙','세이지','크림'] }),
  P('stussy', 'top',   '월드투어 롱슬리브', 99000, null, { colors:['블랙','화이트'] }),
  P('stussy', 'outer', '라인드 코치 자켓', 229000, 179000, { colors:['블랙','네이비'] }),
  P('stussy', 'outer', '워크 자켓', 259000, null, { colors:['올리브','블랙','스톤'] }),
  P('stussy', 'bottom','빅 올 스웻팬츠', 159000, null, { colors:['블랙','애쉬','피그먼트'] }),
  P('stussy', 'acc',   '스탁 로우 프로 캡', 69000, null, { badge:'BEST', colors:['블랙','화이트','네이비','피그먼트레드'] }),
  P('stussy', 'bag',   '스몰 크로스백', 89000, 69000, { colors:['블랙','올리브'] }),

  // ===== Polo Ralph Lauren =====
  P('ralph-lauren', 'top',   '커스텀 핏 폴로 셔츠', 139000, 99000, { badge:'BEST', colors:['화이트','블랙','네이비','레드','옐로우','민트'] }),
  P('ralph-lauren', 'top',   '옥스포드 셔츠', 189000, null, { colors:['화이트','블루','핑크','스트라이프'] }),
  P('ralph-lauren', 'top',   '빅포니 코튼 티셔츠', 89000, 69000, { colors:['화이트','블랙','네이비','그레이'] }),
  P('ralph-lauren', 'top',   '케이블 니트 스웨터', 259000, null, { badge:'NEW', colors:['크림','오트밀','네이비'] }),
  P('ralph-lauren', 'outer', '베이필드 윈드브레이커', 249000, 199000, { colors:['네이비','레드','블랙'] }),
  P('ralph-lauren', 'outer', '헤리티지 다운 베스트', 329000, null, { colors:['블랙','네이비','브라운'] }),
  P('ralph-lauren', 'bottom','스트레이트핏 치노', 159000, 119000, { colors:['카키','네이비','화이트'] }),
  P('ralph-lauren', 'bag',   '캔버스 토트', 119000, null, { colors:['네이비','블랙'] }),
  P('ralph-lauren', 'acc',   '클래식 폴로 캡', 69000, 49000, { colors:['네이비','블랙','화이트','레드'] }),

  // ===== Converse =====
  P('converse', 'shoes', '척테일러 올스타 클래식 하이', 79000, null, { badge:'BEST', colors:['블랙','화이트','레드','네이비'] }),
  P('converse', 'shoes', '척테일러 올스타 로우', 79000, 59000, { colors:['블랙','옵티컬화이트','네이비'] }),
  P('converse', 'shoes', '척 70 하이', 119000, null, { colors:['블랙','팍먼트','에그렛'] }),
  P('converse', 'shoes', '원스타 프로', 109000, 89000, { colors:['블랙/화이트','화이트/그린'] }),
  P('converse', 'shoes', '런스타 하이크', 119000, null, { badge:'NEW', colors:['블랙','화이트','그린'] }),
  P('converse', 'top',   '올스타 로고 티셔츠', 39000, 29000, { colors:['블랙','화이트','네이비'] }),
  P('converse', 'bag',   '올스타 백팩', 59000, null, { colors:['블랙','네이비'] }),

  // ===== Vans =====
  P('vans', 'shoes', '올드스쿨', 89000, null, { badge:'BEST', colors:['블랙/화이트','네이비/화이트'] }),
  P('vans', 'shoes', '어센틱', 79000, 59000, { colors:['블랙','화이트','네이비','레드'] }),
  P('vans', 'shoes', '에라', 79000, null, { colors:['블랙','화이트','체크'] }),
  P('vans', 'shoes', '놉필 LX', 149000, 119000, { badge:'NEW', colors:['블랙','화이트/블루','세이지'] }),
  P('vans', 'shoes', '슬립온 체커보드', 79000, null, { colors:['블랙체커','레드체커'] }),
  P('vans', 'top',   '클래식 로고 티셔츠', 35000, null, { colors:['블랙','화이트','네이비'] }),
  P('vans', 'outer', '토레이 MTE 자켓', 229000, 179000, { colors:['블랙','올리브'] }),
  P('vans', 'acc',   '언스트럭쳐 햇', 35000, null, { colors:['블랙','화이트','카모'] }),

  // ===== Puma =====
  P('puma', 'shoes', '스웨이드 클래식', 99000, 79000, { badge:'BEST', colors:['블랙/화이트','레드/화이트','네이비/화이트'] }),
  P('puma', 'shoes', '클라이드 올프로', 159000, null, { badge:'NEW', colors:['블랙/골드','화이트/블루'] }),
  P('puma', 'shoes', '팔레르모', 119000, null, { colors:['화이트/블루','바닐라/네이비'] }),
  P('puma', 'shoes', '스피드캣 OG', 129000, 99000, { colors:['블랙/화이트','레드/화이트'] }),
  P('puma', 'top',   '에센셜 로고 티셔츠', 39000, 29000, { colors:['블랙','화이트','레드'] }),
  P('puma', 'top',   'T7 트랙탑', 99000, null, { colors:['블랙','화이트','네이비'] }),
  P('puma', 'bottom','T7 트랙팬츠', 99000, 79000, { colors:['블랙','화이트','네이비'] }),
  P('puma', 'bag',   '페이스 백팩', 59000, null, { colors:['블랙','그린'] }),

  // ===== Covernat =====
  P('covernat', 'top',   '어센틱 로고 맨투맨', 79000, 59000, { badge:'BEST', colors:['블랙','차콜','크림','네이비'] }),
  P('covernat', 'top',   'C로고 후드', 89000, null, { colors:['블랙','차콜','크림'] }),
  P('covernat', 'top',   '베이직 티셔츠 2팩', 45000, 29000, { badge:'SALE', colors:['블랙+화이트','블랙+네이비'] }),
  P('covernat', 'outer', '립스탑 셔플 자켓', 189000, 139000, { colors:['블랙','크림','세이지'] }),
  P('covernat', 'outer', '헤비 덕다운 숏 파카', 329000, null, { badge:'NEW', colors:['블랙','샌드'] }),
  P('covernat', 'bottom','원셔츠 데님 팬츠', 89000, null, { colors:['미드블루','인디고','블랙'], sizes:['28','30','32','34'] }),
  P('covernat', 'bag',   '스퀘어 로고 백팩', 79000, 59000, { colors:['블랙','차콜'] }),
  P('covernat', 'acc',   '어센틱 볼캡', 39000, null, { colors:['블랙','크림','네이비'] }),

  // ===== Mardi Mercredi =====
  P('mardi-mercredi', 'top', '플라워 마르디 티셔츠', 79000, null, { badge:'BEST', colors:['화이트/블랙','크림/핑크','블랙/화이트'] }),
  P('mardi-mercredi', 'top', '플라워 마르디 맨투맨', 139000, 109000, { colors:['네이비/화이트','크림/핑크','블랙/화이트','그레이/블랙'] }),
  P('mardi-mercredi', 'top', '플라워 마르디 후드', 169000, null, { badge:'NEW', colors:['아이보리/베이지','블랙/화이트','핑크'] }),
  P('mardi-mercredi', 'outer','플라워 마르디 바시티', 229000, null, { colors:['크림/블랙','네이비/아이보리'] }),
  P('mardi-mercredi', 'bag', '플라워 마르디 에코백', 49000, null, { colors:['크림/네이비','블랙/핑크'] }),
  P('mardi-mercredi', 'acc', '플라워 볼캡', 59000, 45000, { colors:['크림','블랙','핑크'] }),

  // ===== Matin Kim =====
  P('matin-kim', 'top',   '로고 트위스트 티셔츠', 49000, null, { colors:['블랙','화이트','크림','라벤더'] }),
  P('matin-kim', 'top',   '로고 후드 집업', 129000, 99000, { badge:'SALE', colors:['블랙','그레이','크림'] }),
  P('matin-kim', 'top',   '스트라이프 크롭 니트', 89000, null, { badge:'NEW', colors:['블랙/화이트','네이비/크림'] }),
  P('matin-kim', 'outer', '라운드 퍼 자켓', 259000, 199000, { colors:['아이보리','블랙','브라운'] }),
  P('matin-kim', 'outer', '글로시 쇼트 패딩', 299000, null, { colors:['블랙','아이보리'] }),
  P('matin-kim', 'bottom','와이드 데님', 99000, null, { colors:['미드블루','블랙'], sizes:['S','M','L'] }),
  P('matin-kim', 'bag',   '글로시 하트 백', 169000, 129000, { badge:'BEST', colors:['블랙','아이보리','크림'] }),
  P('matin-kim', 'acc',   '로고 머플러', 69000, null, { colors:['블랙','크림','라벤더'] }),
];

const CAMPAIGNS = [
  {
    id: 'nike-week',
    title: 'NIKE WEEK',
    subtitle: '단독 최대 40% + 추가 쿠폰',
    brandId: 'nike',
    period: '04.21 - 04.28',
    hero: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1600&q=70',
    desc: '에어포스, 덩크, 에어맥스까지. 시즌 한정 특가로 만나보세요. MUSICM 단독 혜택으로 구매 시 즉시 10% 할인 쿠폰 자동 적용.',
    tagline: 'Just Do It — and save it.',
    featuredBrands: ['nike'],
  },
  {
    id: 'musicm-standard-launch',
    title: 'MUSICM STANDARD SS26',
    subtitle: '자체 브랜드 신상 런칭',
    brandId: 'musicm-standard',
    period: '04.15 - 05.15',
    hero: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=70',
    desc: '기본에 충실한 MUSICM Standard SS26 컬렉션. 에센셜 티셔츠부터 와이드 데님까지, 신규 가입 고객 전용 런칭 쿠폰 15% 제공.',
    tagline: '우리가 매일 입는 옷',
    featuredBrands: ['musicm-standard'],
  },
  {
    id: 'season-off',
    title: 'SEASON OFF SALE',
    subtitle: '최대 70% 시즌오프',
    brandId: null,
    period: '04.01 - 04.30',
    hero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=70',
    desc: '전 브랜드 겨울 상품 최대 70% 할인. 더노스페이스 눕시부터 MUSICM 패딩까지 놓치면 후회하는 특가.',
    tagline: 'Last chance, last winter',
    featuredBrands: ['the-north-face','musicm-standard','covernat'],
  },
  {
    id: 'new-member-coupon',
    title: '신규회원 쿠폰팩',
    subtitle: '가입 즉시 최대 25% 쿠폰 5장',
    brandId: null,
    period: '상시',
    hero: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=70',
    desc: 'MUSICM 첫 가입 시 즉시 사용 가능한 5장의 쿠폰팩 제공. 첫 구매 15% + 무료배송 + 카테고리별 10% 쿠폰.',
    tagline: '지금 가입하면 5장',
    featuredBrands: [],
  },
  {
    id: 'running-festival',
    title: 'RUNNING FESTIVAL',
    subtitle: '러닝화 & 러닝기어 특가',
    brandId: null,
    period: '04.20 - 05.05',
    hero: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=70',
    desc: '나이키 페가수스, 뉴발란스 퓨얼셀, 아디다스 까지. 러닝 시즌을 위한 러너 전용 특가.',
    tagline: 'Run your way',
    featuredBrands: ['nike','adidas','new-balance','puma'],
  },
  {
    id: 'musinsa-only',
    title: 'MUSICM 단독 특가',
    subtitle: '국내 브랜드 단독전',
    brandId: null,
    period: '04.18 - 04.30',
    hero: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=70',
    desc: '커버낫, 마르디 메크르디, 마틴킴까지. MUSICM에서만 만날 수 있는 국내 브랜드 단독 혜택.',
    tagline: 'Only here, only now',
    featuredBrands: ['covernat','mardi-mercredi','matin-kim'],
  },
  {
    id: 'outdoor-camp',
    title: 'OUTDOOR CAMP',
    subtitle: '봄 캠핑 룩북',
    brandId: 'the-north-face',
    period: '04.10 - 05.20',
    hero: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=70',
    desc: '캠핑 시즌을 위한 더노스페이스 픽업. 데날리 플리스부터 베스트레아 트레일 부츠까지.',
    tagline: 'Never Stop Exploring',
    featuredBrands: ['the-north-face'],
  },
  {
    id: 'stussy-collab',
    title: 'Stüssy x MUSICM',
    subtitle: '콜라보 캡슐 컬렉션',
    brandId: 'stussy',
    period: '04.25 한정 런칭',
    hero: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=70',
    desc: 'Stüssy와 MUSICM Standard의 첫 번째 콜라보. 단 3일, 한정 수량으로 선보입니다.',
    tagline: 'One Week Only',
    featuredBrands: ['stussy','musicm-standard'],
  },
];

// Pre-index for performance
const BRAND_MAP = Object.fromEntries(BRANDS.map(b => [b.id, b]));
const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

// Exposed helpers
function getProduct(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}
function getBrand(id) { return BRAND_MAP[id]; }
function getProductsByBrand(brandId) {
  return PRODUCTS.filter(p => p.brandId === brandId);
}
function getProductsByCategory(catId) {
  return PRODUCTS.filter(p => p.category === catId);
}
function getCampaign(id) { return CAMPAIGNS.find(c => c.id === id); }
function searchProducts(q) {
  if (!q) return [];
  const s = q.toLowerCase();
  return PRODUCTS.filter(p => {
    const b = BRAND_MAP[p.brandId];
    return p.name.toLowerCase().includes(s)
      || (b && (b.name.toLowerCase().includes(s) || b.nameKr.includes(q)))
      || (p.tags && p.tags.some(t => t.toLowerCase().includes(s)));
  });
}
function formatPrice(n) {
  return n.toLocaleString('ko-KR') + '원';
}
function discountPercent(p) {
  if (!p.salePrice) return 0;
  return Math.round((1 - p.salePrice / p.price) * 100);
}
