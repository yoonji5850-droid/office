// ============================================================
//  나의 AI 회사 설정 — 여기 한 파일만 고치면 됩니다
// ============================================================
//  회사 이름, 부서 이름, 직원 이름·성격·머리색까지 전부 여기 있어요.
//  다른 파일은 건드리지 않아도 됩니다.
//
//  ⚠️ 딱 2가지 규칙
//   1. 부서 id(research, brand, ...)는 절대 바꾸지 마세요. 시뮬레이션 엔진이
//      이 id로 움직입니다. 바꾸면 캐릭터가 길을 잃어요.
//      → 바꿔도 되는 건 name(부서 이름) · icon · short 입니다.
//   2. 부서 개수를 바꾸면(추가/삭제) app/game/world.ts의 DEPT_COLS도 함께
//      맞춰야 사무실 배치가 안 깨집니다 (지금은 5열 2행 = 10칸).
//
//  직원 수는 자유롭게 늘리고 줄여도 됩니다. 한 팀에 팀장(lead) 1명은 두세요.
// ============================================================

/** 회사 기본 정보 */
export const COMPANY = {
  /** 좌측 상단 헤더에 뜨는 회사 이름 */
  name: "MY AI COMPANY",
  /** 헤더 로고 배지에 들어갈 글자 1개 (이모지도 됩니다) */
  logoLetter: "M",
  /** 화면 상단 큰 제목 (앞부분) */
  titlePrefix: "나의",
  /** 화면 상단 큰 제목 (강조되는 뒷부분) */
  titleAccent: "AI Office",
  /** 브라우저 탭 제목 */
  pageTitle: "My AI Company — 나의 AI 사무실",
  /** 검색·공유될 때 뜨는 설명 */
  description: "10개 AI 팀이 조사·기획·제작·보고까지 돌아가는 1인 크리에이터용 AI 오피스",
  /** 창 하단 파일명 느낌의 라벨 */
  windowLabel: "my_ai_company.exe — 대표실",
  /** 일일 브리핑 제목에 들어갈 이름 */
  reportName: "AI Office",
} as const;

/** 대표(나) — 사무실 대표실에 앉아 있는 캐릭터 */
export const CEO_PROFILE = {
  name: "이대표",
  callsign: "대표님",
  role: "대표 · 최종 의사결정",
  hair: "#42283a",
  shirt: "#ff8fc0",
  accent: "#fff3b0",
  skin: "#ffdcc4",
  thoughts: [
    "AI는 비서, 최종 결정은 내가 해요.",
    "오늘 결정할 건 딱 1개만 남기자.",
    "저장될 만한 콘텐츠인지부터 본다.",
  ],
};

/**
 * 부서 10개.
 * id = 고정(엔진용) / name·short·icon = 자유롭게 변경
 * task = 오늘 하는 일 / report = 팀장 한줄보고
 */
export const DEPARTMENTS = [
  {
    id: "research",
    name: "데일리 이슈팀",
    short: "daily.issue",
    icon: "🌐",
    task: "연예계 밖 신규 이슈·밈·숏폼 포맷·기념일 수집, 활용 가능성 평가",
    report: "오늘의 신규 이슈 10개 중 활용 3개, 주의 이슈 2개 추렸어요.",
  },
  {
    id: "brand",
    name: "아티스트 분석팀",
    short: "artist.lab",
    icon: "🧬",
    task: "아티스트 정체성·매력·활동 일정 분석과 팬·대중 반응 파악",
    report: "아티스트 기준과 팬 반응 포인트를 함께 정리했어요.",
  },
  {
    id: "strategy1",
    name: "숏폼 기획팀",
    short: "short.studio",
    icon: "💡",
    task: "이슈·아티스트 분석을 연결해 숏폼 아이디어와 추천 점수 산출",
    report: "화제성·적합도 높은 안으로 오늘의 추천을 좁혔어요.",
  },
  {
    id: "qa",
    name: "품질 검수팀",
    short: "qa.check",
    icon: "🛡️",
    task: "출처·중복·아티스트 적합성·논란 가능성 검사 후 승인/반려 판정",
    report: "승인·조건부 승인·반려를 사유와 함께 남겼어요.",
  },
  {
    id: "strategy2",
    name: "콘텐츠 초안팀",
    short: "draft.team",
    icon: "✍️",
    task: "승인안을 대본·장면·자막·캡션·카드문안 등 제작용 초안으로 확장",
    report: "대중형·팬반응형·밈형 세 버전으로 나눠 작성했어요.",
  },
  {
    id: "reels",
    name: "연예계 모니터링팀",
    short: "industry.watch",
    icon: "🎤",
    task: "아이돌·가수·배우 이슈, 화제 콘텐츠, 평판 위험 모니터링",
    report: "오늘의 연예계 이슈 10개 중 참고할 콘텐츠 5개를 골랐어요.",
  },
  {
    id: "carousel",
    name: "디자인 제작팀",
    short: "design.studio",
    icon: "🖼️",
    task: "승인 원고를 카드뉴스·썸네일·SNS 시안과 이미지 프롬프트로 변환",
    report: "아티스트별 톤앤매너에 맞춰 시안을 뽑았어요.",
  },
  {
    id: "review",
    name: "성과 학습팀",
    short: "growth.data",
    icon: "📈",
    task: "조회수·완주율·저장·공유·댓글 반응 분석",
    report: "잘된 요소는 다음 기획에 바로 반영해요.",
  },
  {
    id: "ops",
    name: "자동화 운영팀",
    short: "automation.ops",
    icon: "⚙️",
    task: "정해진 시간에 팀별 작업 실행, 실패·누락·중복 관리",
    report: "실패하면 재시도하고 로그를 남겨요.",
  },
  {
    id: "secretary",
    name: "콘텐츠 비서실",
    short: "secretary.hq",
    icon: "📋",
    task: "전 팀 결과 취합, 확인·결정 필요한 것만 브리핑",
    report: "오늘 결정할 항목만 골라서 올렸어요.",
  },
] as const;

/**
 * 직원 명단.
 * dept = 위 부서 id / rank: "lead"(팀장) 또는 "member"(팀원)
 * colors = [머리색, 옷색, 포인트색]
 * thoughts = 자리를 비웠을 때 머리 위에 뜨는 혼잣말
 */
export type StaffEntry = {
  dept: string;
  rank: "lead" | "member";
  name: string;
  role: string;
  colors: [string, string, string];
  thoughts: string[];
  callsign?: string;
};

export const STAFF_LIST: StaffEntry[] = [
  // ① 데일리 이슈팀
  { dept: "research", rank: "lead", name: "김서연", role: "데일리이슈 팀장", callsign: "김이슈",
    colors: ["#6b3d34", "#fff3b0", "#ff8fc0"],
    thoughts: ["이 기사, 공식 출처가 있나 확인해야 해.", "발표일이 7일 넘었으면 후보에서 빼자.", "원문부터 다시 본다."] },
  { dept: "research", rank: "member", name: "오태윤", role: "뉴스 리서처",
    colors: ["#2f2a3d", "#c9b8ff", "#b8f0dd"],
    thoughts: ["신규 업로드인데 반응 0이면 인기 아님.", "우리나라에서 되는 기능인지 체크."] },
  { dept: "research", rank: "member", name: "하은채", role: "동향 조사",
    colors: ["#8a4a3c", "#b8f0dd", "#ff8fc0"],
    thoughts: ["이번 주 사람들이 뭘 저장했지?", "재포장 기사는 원문으로 안 쳐요."] },

  // ② 아티스트 분석팀 (아티스트 분석 + 팬덤 인사이트 통합)
  { dept: "brand", rank: "lead", name: "박보라", role: "아티스트 분석 팀장", callsign: "박아티",
    colors: ["#372b4a", "#c9b8ff", "#c9b8ff"],
    thoughts: ["지표 연동 전엔 수치를 지어내지 않아요.", "아직 안 알려진 매력도 놓치지 않고 챙겨요."] },
  { dept: "brand", rank: "member", name: "신재원", role: "아티스트 활동·콘텐츠 흐름 분석",
    colors: ["#3c3a4f", "#ffe6f2", "#c9b8ff"],
    thoughts: ["음원·공연·작품 일정부터 다시 그려보자.", "과거 성과 좋았던 유형부터 확인해요."] },
  { dept: "brand", rank: "member", name: "임다혜", role: "아티스트 정체성·금지소재 관리",
    colors: ["#5a3450", "#fff3b0", "#ff8fc0"],
    thoughts: ["우리가 안 쓰기로 한 프레임이에요.", "이 소재는 이 아티스트한텐 안 맞아요."] },
  { dept: "brand", rank: "member", name: "유세아", role: "팬덤 반응·매력 포인트 정리",
    colors: ["#7a3f58", "#c9b8ff", "#ff8fc0"],
    thoughts: ["이 표정에 팬들이 제일 크게 반응해요.", "신규 팬이 궁금해할 포인트도 같이 챙겨요."] },

  // ③ 숏폼 기획팀
  { dept: "strategy1", rank: "lead", name: "최아름", role: "숏폼기획 팀장", callsign: "최숏폼",
    colors: ["#c26e4b", "#ff8fc0", "#fff3b0"],
    thoughts: ["오늘도 정확히 10개, 예외 없어요.", "기준 점수부터 채우고 시작.", "각도가 겹치면 프레임을 바꾼다."] },
  { dept: "strategy1", rank: "member", name: "정유진", role: "아이디어 발굴",
    colors: ["#7b4a2f", "#b8f0dd", "#ff8fc0"],
    thoughts: ["제목을 좀 더 구체적으로 바꿔볼까.", "오늘 행동 1개가 빠졌다."] },
  { dept: "strategy1", rank: "member", name: "배시현", role: "후킹 카피",
    colors: ["#2c2638", "#fff3b0", "#c9b8ff"],
    thoughts: ["훅 3초 안에 안 걸리면 다시 써요.", "단정형으로 닫자, 권유형 금지."] },

  // ④ 품질 검수팀
  { dept: "qa", rank: "lead", name: "윤규아", role: "품질 검수 팀장", callsign: "윤큐아",
    colors: ["#2d4b46", "#b8f0dd", "#b8f0dd"],
    thoughts: ["금칙어 스캔 돌립니다.", "근거 링크 없는 안은 반려예요."] },
  { dept: "qa", rank: "member", name: "강태오", role: "중복·근거 검사",
    colors: ["#463227", "#ffe6f2", "#b8f0dd"],
    thoughts: ["최근 7일 안에 40% 겹쳤네.", "바로 써먹을 실물이 있는지 확인."] },
  { dept: "qa", rank: "member", name: "문세라", role: "톤 검수",
    colors: ["#6c3a55", "#c9b8ff", "#fff3b0"],
    thoughts: ["과장된 표현은 바로 빼요.", "우리 톤 유지하는지 본다."] },

  // ⑤ 콘텐츠 초안팀
  { dept: "strategy2", rank: "lead", name: "한도빈", role: "콘텐츠초안 팀장", callsign: "한초안",
    colors: ["#8b534a", "#fff3b0", "#ff8fc0"],
    thoughts: ["승인된 안만 원고로 씁니다.", "결론은 하나로 닫아야 해요."] },
  { dept: "strategy2", rank: "member", name: "조민서", role: "영상 대본",
    colors: ["#33304a", "#ff8fc0", "#b8f0dd"],
    thoughts: ["구조부터 잡고 들어간다.", "30초 안에 끝나야 해요."] },
  { dept: "strategy2", rank: "member", name: "백가온", role: "카드 원고",
    colors: ["#5d3a2c", "#b8f0dd", "#c9b8ff"],
    thoughts: ["3장에서 원인을 다시 정의합니다.", "마지막 장은 댓글 유도로."] },

  // ⑥ 연예계 모니터링팀
  { dept: "reels", rank: "lead", name: "송리원", role: "연예계 모니터링 팀장", callsign: "송연예",
    colors: ["#2c2638", "#ff8fc0", "#ff8fc0"],
    thoughts: ["오늘 화제된 무대·인터뷰부터 훑어요.", "평판 위험 신호는 먼저 표시해둡니다."] },
  { dept: "reels", rank: "member", name: "권지호", role: "화제 콘텐츠·직캠 모니터링",
    colors: ["#4a3a2a", "#fff3b0", "#b8f0dd"],
    thoughts: ["다른 아티스트 숏폼 포맷도 참고해둘게요.", "확산 이유부터 파악해야 다음에 써먹죠."] },

  // ⑦ 디자인 제작팀
  { dept: "carousel", rank: "lead", name: "이가림", role: "디자인 제작 팀장", callsign: "이캐리",
    colors: ["#d88d68", "#c9b8ff", "#c9b8ff"],
    thoughts: ["원본 템플릿은 복제만, 수정 금지.", "필요한 장수만 뽑아요."] },
  { dept: "carousel", rank: "member", name: "남주하", role: "레이아웃",
    colors: ["#3a2f4d", "#ffe6f2", "#ff8fc0"],
    thoughts: ["글자 밀도 맞추는 중.", "표지 3안부터 만들자."] },
  { dept: "carousel", rank: "member", name: "표하늘", role: "텍스트 교체",
    colors: ["#274a44", "#fff3b0", "#b8f0dd"],
    thoughts: ["마지막 장 CTA 빠지면 반려예요.", "복제본에만 손댑니다."] },

  // ⑧ 성과 학습팀
  { dept: "review", rank: "lead", name: "강성아", role: "성과학습 팀장", callsign: "강성과",
    colors: ["#9c5c72", "#ff8fc0", "#ff8fc0"],
    thoughts: ["잘된 이유를 패턴으로 남겨야 해요.", "저장·댓글이 진짜 지표입니다."] },
  { dept: "review", rank: "member", name: "마지훈", role: "지표 수집",
    colors: ["#2e3a4a", "#ffe6f2", "#b8f0dd"],
    thoughts: ["도달·저장·공유 다시 긁어옵니다.", "연동되면 자동화돼요."] },
  { dept: "review", rank: "member", name: "여름", role: "학습점 정리",
    colors: ["#6b4a2f", "#c9b8ff", "#fff3b0"],
    thoughts: ["반복할 패턴 1개, 중단할 패턴 1개.", "다음 기획팀에 넘길 학습점 정리 중."] },

  // ⑨ 자동화 운영팀
  { dept: "ops", rank: "lead", name: "안도현", role: "자동화 운영 팀장", callsign: "안오토",
    colors: ["#3b3b49", "#b8f0dd", "#b8f0dd"],
    thoughts: ["오전 스케줄 정상입니다.", "실패하면 재시도하고 로그 남겨요."] },
  { dept: "ops", rank: "member", name: "천유나", role: "연동 모니터링",
    colors: ["#573049", "#fff3b0", "#ff8fc0"],
    thoughts: ["연결 안 된 서비스를 성공으로 안 씁니다.", "연동 대기 중이에요."] },

  // ⑩ 콘텐츠 비서실
  { dept: "secretary", rank: "lead", name: "김세리", role: "콘텐츠비서실장", callsign: "김비서",
    colors: ["#7a453c", "#c9b8ff", "#c9b8ff"],
    thoughts: ["대표가 결정할 것만 추립니다.", "중복 설명은 다 지워요."] },
  { dept: "secretary", rank: "member", name: "홍보람", role: "브리핑 정리",
    colors: ["#334a3a", "#ffe6f2", "#fff3b0"],
    thoughts: ["상태별로 묶어서 올릴게요.", "막힌 건 먼저 보고해요."] },
];

/**
 * 외부 연동을 아직 안 붙인 팀 → 화면에 "연동 대기"로 표시됩니다.
 * 지금은 없음 — 새로 추가할 연동 대기 팀이 생기면 { id: "이유" } 형태로 채우세요.
 */
export const PENDING_INTEGRATIONS: Record<string, string> = {};

/**
 * 결과 보관함 링크 (Notion 등). 비워두면 화면에서 링크 버튼이 숨겨집니다.
 * 예: "https://www.notion.so/내페이지주소"
 */
export const STORAGE_LINK = "";
