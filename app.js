/* ===== NBMob — 데이터 + 렌더링 =====
 * 콘텐츠 정책: NBA/구단 로고, 공식 영상·사진은 직접 호스팅하지 않는다.
 * 뉴스는 요약 + 원문 링크, 영상은 임베드 허용 출처만, 이미지는 자체 제작/라이선스 확인 소스만 사용.
 */

const CATEGORY = { news:"뉴스", transfer:"트레이드/계약", draft:"드래프트/루키" };

// 실제 운영 시 title/summary/link/reporter 를 실제 출처로 교체할 것 (아래는 샘플 구조)
const NEWS = [
  { id:1, category:CATEGORY.news, reporter:"Shams Charania", title:"리그 인사이트: 오늘 가장 뜨거운 이야기",
    summary:"계약 분위기, 선발 경쟁, 부상 복귀 시점 등 덕후가 먼저 체크할 포인트 위주로 정리.",
    link:"https://example.com/news/1", time:"2시간 전" },
  { id:2, category:CATEGORY.transfer, reporter:"Adrian Wojnarowski", title:"계약·이적 뉴스 한눈에 보기",
    summary:"FA 시장, 트레이드 루머, 계약 연장 등 전력 변동 소식을 간결하게 정리하고 원문으로 연결.",
    link:"https://example.com/news/2", time:"5시간 전" },
  { id:3, category:CATEGORY.draft, reporter:"NBMob 리서치", title:"드래프트·루키 흐름: 지금 눈여겨볼 이름들",
    summary:"루키 시즌 성과, 개발형 선수 이야기에 초점. 숫자보다 '왜 지금 이 선수인지'를 짧게.",
    link:"https://example.com/news/3", time:"12시간 전" },
  { id:4, category:CATEGORY.news, reporter:"NBMob 에디터", title:"동부 컨퍼런스: 오늘 밤 승부처를 바꾼 한 장면",
    summary:"경기 흐름을 바꾼 플레이, 전술 변화, 로테이션 이야기 중심의 읽을거리.",
    link:"https://example.com/news/4", time:"1일 전" },
  { id:5, category:CATEGORY.transfer, reporter:"NBMob 에디터", title:"루머와 확정 소식을 분리해서 보는 구조",
    summary:"확정 전 이야기와 이미 정리된 이야기를 구분해 표시. 루머는 과장 없이, 확정은 출처와 함께.",
    link:"https://example.com/news/5", time:"2일 전" }
];

const MIX = [
  { id:101, type:"video", src:"https://www.youtube.com/embed/dQw4w9WgXcQ", thumb:"assets/thumb-video.svg",
    label:"해설/하이라이트", title:"경기 흐름을 읽는 해설 영상",
    desc:"전술·공간 활용이 궁금할 때 빠르게 돌려볼 수 있는 영상 큐레이션.", author:"NBMob 큐레이션", time:"최근" },
  { id:102, type:"image", src:"assets/court-concept.svg",
    label:"이미지/그래픽", title:"코트 위 디테일: 놓치기 쉬운 장면들",
    desc:"플레이를 숫자보다 장면으로 보면 보이는 것들.", author:"NBMob 그래픽", time:"최근" },
  { id:103, type:"video", src:"https://www.youtube.com/embed/dQw4w9WgXcQ", thumb:"assets/thumb-video.svg",
    label:"하이라이트", title:"경기 후 꼭 보면 좋은 하이라이트",
    desc:"긴 경기 중 포인트만 짧게 다시 보고 싶을 때.", author:"NBMob 큐레이션", time:"최근" },
  { id:104, type:"image", src:"assets/team-palette.svg",
    label:"이미지/그래픽", title:"팀 컬러로 보는 NBA 감성 가이드",
    desc:"로고 대신 색채와 분위기로 팀을 이야기하는 코너.", author:"NBMob 그래픽", time:"최근" }
];

function renderTrending(box, items){
  box.innerHTML = items.slice(0,3).map(n => `
    <a href="${n.link}" target="_blank" rel="noopener noreferrer">
      <div class="card">
        <span class="tag">${n.category}</span>
        <h3>${n.title}</h3>
        <p>${n.summary}</p>
        <div class="meta"><span>${n.reporter}</span><span>${n.time}</span></div>
      </div>
    </a>`).join("");
}

function renderNews(box, items){
  box.innerHTML = items.map(n => `
    <a href="${n.link}" target="_blank" rel="noopener noreferrer">
      <article class="card">
        <div class="body">
          <span class="label">${n.category}</span>
          <h3>${n.title}</h3>
          <p>${n.summary}</p>
          <div class="meta"><span class="author">${n.reporter}</span><span class="dot"></span><span>${n.time}</span></div>
        </div>
      </article>
    </a>`).join("");
}

function renderMix(box, items){
  box.innerHTML = "";
  items.forEach(m => {
    const isVideo = m.type === "video";
    const card = document.createElement("article");
    card.className = `card mix ${isVideo ? "is-video" : ""}`;
    card.innerHTML = `
      <div class="thumb">
        <img src="${isVideo ? m.thumb : m.src}" alt="" />
        <div class="overlay"></div>
        ${isVideo ? '<div class="play"></div>' : ""}
      </div>
      <div class="body">
        <span class="label">${m.label}</span>
        <h3>${m.title}</h3>
        <p>${m.desc}</p>
        <div class="meta"><span class="author">${m.author}</span><span class="dot"></span><span>${m.time}</span></div>
      </div>`;
    if (isVideo) {
      card.addEventListener("click", () => window.open(m.src, "_blank", "noopener"));
    }
    box.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTrending(document.getElementById("trending"), NEWS);
  renderNews(document.getElementById("newsList"), NEWS);
  renderMix(document.getElementById("mixList"), MIX);
  document.getElementById("genTime").textContent = "마지막 갱신: " + new Date().toLocaleString("ko-KR");
});
