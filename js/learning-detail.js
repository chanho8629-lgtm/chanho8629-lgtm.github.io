const page = document.body.dataset.learning;
const mount = document.querySelector('#learning-detail');
const metaStyles = document.createElement('link');
metaStyles.rel = 'stylesheet';
metaStyles.href = 'css/learning-meta.css';
document.head.append(metaStyles);
const metadata = {
  web: {category:'WEB FOUNDATION',tags:['HTML','CSS','JavaScript','DOM · Fetch'],intro:'웹 요청·응답 구조를 이해하고 문서 구조, 반응형 레이아웃, DOM 이벤트와 비동기 통신을 순서대로 학습했습니다. 화면의 입력 데이터가 서버 요청으로 이어지는 흐름을 익혀 작품 등록·상세 조회와 경매·결제 인터랙션을 구현하는 기반으로 연결했습니다.'},
  java: {category:'BACKEND FOUNDATION',tags:['Java','OOP','Collection','JDBC'],intro:'Java 기본 문법에서 객체지향 모델링, 컬렉션 처리, 예외·스레드·파일 처리와 JDBC까지 확장했습니다. 도메인 객체의 책임을 나누고 데이터를 안정적으로 처리하는 방법을 익혀 Spring Boot 백엔드 구현의 기반으로 활용했습니다.'},
  db: {category:'DATA & WEB SERVER',tags:['MySQL','PostgreSQL','Servlet','MyBatis'],intro:'관계형 데이터 모델링과 SQL을 학습한 뒤 Servlet·JSP·MyBatis로 요청부터 데이터베이스까지 이어지는 흐름을 구현했습니다. PK·FK·정규화·JOIN을 바탕으로 작품·예술관·경매·결제 데이터 관계를 설계하는 역량으로 확장했습니다.'},
  spring: {category:'SPRING BACKEND',tags:['Spring Boot','REST API','Security · JWT','AWS S3'],intro:'의존성 주입과 MVC에서 시작해 계층형 CRUD, 인증·인가, 파일 저장과 외부 API 연동까지 기능을 누적해 학습했습니다. 작품·예술관 CRUD와 경매·결제·S3 저장을 실제 서비스 흐름으로 구현하는 데 적용했습니다.'},
  data: {category:'DATA & MACHINE LEARNING',tags:['Python','Pandas','Scikit-learn','Prediction · TF-IDF'],intro:'Python 문법과 데이터 정제·시각화를 익힌 뒤 분류·회귀·추천 모델의 학습과 평가를 실습했습니다. 조회수·낙찰 확률·팔로워 예측과 TF-IDF·벡터 유사도 기반 추천 기능의 데이터 처리 기반으로 연결했습니다.'},
  ai: {category:'AI · API · DEPLOY',tags:['LLM · RAG','FastAPI','Docker · Nginx','AWS · Git'],intro:'LLM과 RAG 파이프라인, FastAPI 추론 API, Git 협업과 AWS 배포 흐름을 학습했습니다. AI 결과를 노트북에 머물게 하지 않고 Spring Boot 서비스에서 호출할 수 있는 독립 API로 제공하는 구조를 이해하고 적용했습니다.'}
};

fetch('curriculum.html')
  .then(response => {
    if (!response.ok) throw new Error('학습 내용을 불러오지 못했습니다.');
    return response.text();
  })
  .then(html => {
    const documentCopy = new DOMParser().parseFromString(html, 'text/html');
    const section = documentCopy.querySelector(`#${page}`);
    if (!section) throw new Error('학습 분야를 찾지 못했습니다.');
    const info = metadata[page];
    const meta = document.createElement('section');
    meta.className = 'learning-meta';
    meta.innerHTML = `<div class="meta-label">CATEGORY</div><div class="meta-value">${info.category}</div><div class="meta-label">TAG</div><div class="meta-tags">${info.tags.map(tag => `<span>${tag}</span>`).join('')}</div><div class="meta-label">INTRODUCTION</div><p class="meta-intro">${info.intro}</p>`;
    section.querySelector('.phase-head').after(meta);
    mount.replaceChildren(section);
    document.title = `${section.querySelector('h2')?.textContent || '학습 상세'} | JCH Portfolio`;
  })
  .catch(error => {
    mount.innerHTML = `<section class="load-error"><h1>학습 페이지를 불러오지 못했습니다.</h1><p>${error.message}</p><a href="index.html#learning">포트폴리오로 돌아가기</a></section>`;
  });
