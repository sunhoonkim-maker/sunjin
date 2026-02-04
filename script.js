// 1. 상세 교육 일정 데이터 (제안서 기반)
const fullSchedule = [
    { date: "2/12, 2/20, 2/26", track: "영업/마케팅", tutor: "박윤재", content: "사료 영업 전략 최적화: 농장주 더미 데이터(F001~F012) RAG 연동 및 제안서 초안 작성" },
    { date: "2/24, 2/26", track: "경영지원", tutor: "김안나", content: "행정 자동화 & 규정 응대: 인사/전결 규정 학습 Gems 제작 및 회의록 Action Item 추출" },
    { date: "2/24", track: "IT 직무", tutor: "신윤섭", content: "코딩 및 문서화 생산성: 레거시 코드 리뷰, API 명세서 및 기술 문서 자동 생성" },
    { date: "2/25", track: "생산 품질", tutor: "전경아", content: "현장 이슈 리포팅: 설비 매뉴얼 기반 장애 조치 봇 및 작업 일보 요약 정리" },
    { date: "2/25", track: "R&D", tutor: "박윤재", content: "연구 가속화: 글로벌 기술 문헌/특허 실시간 요약 및 실험 데이터(CSV) 해석 보조" }
];

// 2. 결과물 예시 데이터 (실제 데이터 수집 전 샘플)
const gemSamples = [
    { category: "영업", title: "농장주별 맞춤 영업 전략 봇", desc: "농장주 프로필 데이터를 학습하여 다음 액션 및 제안 상품을 추천합니다.", author: "영업팀 1분반", link: "https://example.com/demo1" },
    { category: "경영", title: "HR 규정 Q&A 마스터", desc: "사내 복리후생 및 휴가 규정을 즉시 답변해주는 인사 전용 비서입니다.", author: "경영지원팀 2분반", link: "https://example.com/demo2" },
    { category: "IT", title: "API 명세서 자동 생성 봇", desc: "복잡한 소스 코드를 분석하여 README.md 및 API 가이드를 생성합니다.", author: "IT센터 1분반", link: "https://example.com/demo3" },
    { category: "RD", title: "글로벌 기술 트렌드 요약기", desc: "축산 관련 외신 및 논문을 선진 보고 양식에 맞춰 국문 요약합니다.", author: "R&D 연구소 1분반", link: "https://example.com/demo4" }
];

// 탭 전환 함수 (SPA 방식)
function showSection(sectionId) {
    // 모든 섹션 숨기기
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    // 선택한 섹션만 보이기
    document.getElementById(sectionId).classList.add('active');
    
    // 네비게이션 버튼 활성화 상태 변경
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(sectionId));
    });
}

// 일정 테이블 주입
const scheduleBody = document.getElementById('scheduleBody');
fullSchedule.forEach(s => {
    const row = `<tr>
        <td style="white-space:nowrap">${s.date}</td>
        <td><strong>${s.track}</strong></td>
        <td>${s.tutor}</td>
        <td>${s.content}</td>
    </tr>`;
    scheduleBody.innerHTML += row;
});

// Gems 결과물 필터링 및 렌더링
function filterGems(category) {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = '';
    
    // 필터 버튼 강조 처리
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const btnText = btn.innerText === 'IT 직무' ? 'IT' : (btn.innerText === 'R&D' ? 'RD' : btn.innerText);
        btn.classList.toggle('active', category === 'all' ? btn.innerText === '전체' : btn.getAttribute('onclick').includes(category));
    });

    const filtered = category === 'all' ? gemSamples : gemSamples.filter(g => g.category === category);
    
    filtered.forEach(g => {
        grid.innerHTML += `
            <div class="card" onclick="window.open('${g.link}', '_blank')">
                <span class="tag">#${g.category}</span>
                <h4>${g.title}</h4>
                <p>${g.desc}</p>
                <div style="margin-top:20px; font-size:0.85rem; color:#999; display:flex; justify-content:space-between;">
                    <span>제작: ${g.author}</span>
                    <span style="color:var(--sj-red); font-weight:bold;">상세보기 →</span>
                </div>
            </div>
        `;
    });
}

// 초기 로딩 시 전시회 전체 표시
filterGems('all');
