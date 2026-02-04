// 1. 교육 상세 일정 데이터
const fullSchedule = [
    { date: "2/12, 2/20, 2/26", track: "영업/마케팅", tutor: "박윤재", content: "사료 영업 전략 최적화: 농장주 데이터(F001~F012) RAG 연동 및 제안서 자동화 [cite: 35, 37]" },
    { date: "2/24, 2/26", track: "경영지원", tutor: "김안나", content: "행정 자동화 & 규정 응대: 인사/전결 규정 학습 Gems 및 회의록 Action Item 추출 [cite: 56, 58]" },
    { date: "2/24", track: "IT 직무", tutor: "신윤섭", content: "코딩 및 문서화 생산성: 레거시 코드 리뷰, API 명세서 및 기술 문서 자동 생성 [cite: 41, 43]" },
    { date: "2/25", track: "생산 품질", tutor: "전경아", content: "현장 이슈 리포팅: 설비 매뉴얼 기반 장애 조치 봇 및 작업 일보 요약 정리 [cite: 50, 52]" },
    { date: "2/25", track: "R&D", tutor: "박윤재", content: "연구 가속화: 글로벌 기술 문헌/특허 실시간 요약 및 실험 데이터(CSV) 해석 보조 [cite: 46, 48]" }
];

// 2. 결과물 예시 데이터 (실제 데이터 없을 시 샘플)
const gemSamples = [
    { category: "영업", title: "농장주별 영업 전략 생성기", desc: "농장 규모 및 질병 이력을 분석하여 맞춤형 제안서 초안을 작성합니다.", author: "영업팀 A", link: "#" },
    { category: "경영", title: "사내 규정 Q&A 마스터", desc: "복잡한 인사/전결 규정을 학습하여 직원 질문에 즉시 응대합니다.", author: "인사팀 B", link: "#" },
    { category: "IT", title: "코드 리뷰 자동화 툴", desc: "레거시 코드를 분석하여 주석을 생성하고 성능 개선안을 제안합니다.", author: "IT센터 C", link: "#" },
    { category: "RD", title: "기술 논문 핵심 요약 봇", desc: "수십 페이지의 영문 논문을 결론-근거-기대효과 위주로 요약합니다.", author: "연구소 D", link: "#" }
];

// 섹션 전환 함수
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// 일정 렌더링
const scheduleBody = document.getElementById('scheduleBody');
fullSchedule.forEach(s => {
    scheduleBody.innerHTML += `<tr>
        <td>${s.date}</td>
        <td><strong>${s.track}</strong></td>
        <td>${s.tutor}</td>
        <td>${s.content}</td>
    </tr>`;
});

// Gems 필터 및 렌더링
function filterGems(category) {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = '';
    
    // 필터 버튼 상태 변경
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText === (category === 'all' ? '전체' : category));
    });

    const filtered = category === 'all' ? gemSamples : gemSamples.filter(g => g.category === category);
    
    filtered.forEach(g => {
        grid.innerHTML += `
            <div class="card" onclick="location.href='${g.link}'">
                <span class="tag">#${g.category}</span>
                <h4>${g.title}</h4>
                <p>${g.desc}</p>
                <div style="margin-top:20px; font-size:0.8rem; color:#999;">제작: ${g.author}</div>
            </div>
        `;
    });
}

// 초기 로드
filterGems('all');
