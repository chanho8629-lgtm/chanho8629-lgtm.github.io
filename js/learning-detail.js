const page = document.body.dataset.learning;
const mount = document.querySelector('#learning-detail');

fetch('curriculum.html')
  .then(response => {
    if (!response.ok) throw new Error('학습 내용을 불러오지 못했습니다.');
    return response.text();
  })
  .then(html => {
    const documentCopy = new DOMParser().parseFromString(html, 'text/html');
    const section = documentCopy.querySelector(`#${page}`);
    if (!section) throw new Error('학습 분야를 찾지 못했습니다.');
    mount.replaceChildren(section);
    document.title = `${section.querySelector('h2')?.textContent || '학습 상세'} | JCH Portfolio`;
  })
  .catch(error => {
    mount.innerHTML = `<section class="load-error"><h1>학습 페이지를 불러오지 못했습니다.</h1><p>${error.message}</p><a href="index.html#learning">포트폴리오로 돌아가기</a></section>`;
  });
