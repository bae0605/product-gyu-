"use strict";

/* =========================================================================
 *  수비학(Numerology) 기반 로또 6/45 번호 생성기
 *  - 보너스 번호 없이 메인 6개만 추천
 *  - 최근 당첨내역(빈도) + 개인 수비학수를 결합해 가중 추첨
 *  - 단순 패턴(연속수/한쪽 치우침 등)을 배제
 *  - 각 조합이 왜 그 사람에게 어울리는지 풀이 제공
 * ========================================================================= */

/* ----------------------------- 수비학 코어 ----------------------------- */

// 한 자리 또는 마스터수(11,22,33)가 될 때까지 자릿수 합산
function reduceNumber(n, keepMaster = true) {
  const isMaster = (x) => x === 11 || x === 22 || x === 33;
  n = Math.abs(Math.trunc(n));
  while (n > 9 && !(keepMaster && isMaster(n))) {
    n = String(n)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  }
  return n;
}

// 피타고라스 문자→숫자 매핑 (로마자/영문 이름 기준)
const PYTHAGOREAN = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};
const VOWELS = new Set(["a", "e", "i", "o", "u"]);

function lettersOnly(name) {
  return (name || "").toLowerCase().replace(/[^a-z]/g, "");
}

// 인생경로수: 연/월/일을 각각 줄인 뒤 합산하고 다시 축약 (마스터수 보존)
function lifePathNumber(y, m, d) {
  const ry = reduceNumber(y);
  const rm = reduceNumber(m);
  const rd = reduceNumber(d);
  return reduceNumber(ry + rm + rd);
}

// 생일수: 태어난 '일'을 축약
function birthdayNumber(d) {
  return reduceNumber(d);
}

// 표현수(운명수): 이름 전체 글자 합
function expressionNumber(name) {
  const s = lettersOnly(name);
  if (!s) return null;
  const sum = [...s].reduce((a, c) => a + (PYTHAGOREAN[c] || 0), 0);
  return reduceNumber(sum);
}

// 영혼수: 모음 합
function soulUrgeNumber(name) {
  const s = lettersOnly(name);
  if (!s) return null;
  const sum = [...s]
    .filter((c) => VOWELS.has(c))
    .reduce((a, c) => a + (PYTHAGOREAN[c] || 0), 0);
  return sum ? reduceNumber(sum) : null;
}

// 성격수: 자음 합
function personalityNumber(name) {
  const s = lettersOnly(name);
  if (!s) return null;
  const sum = [...s]
    .filter((c) => !VOWELS.has(c))
    .reduce((a, c) => a + (PYTHAGOREAN[c] || 0), 0);
  return sum ? reduceNumber(sum) : null;
}

// 숫자별 풀이 텍스트
const LIFE_PATH_MEANING = {
  1: "리더십과 독립의 길. 스스로 길을 개척하는 선구자형입니다.",
  2: "협력과 조화의 길. 섬세한 중재자이며 관계 속에서 빛납니다.",
  3: "창의성과 표현의 길. 밝고 사교적이며 예술·소통의 재능이 있습니다.",
  4: "안정과 성실의 길. 체계적으로 쌓아 올리는 건설가형입니다.",
  5: "자유와 변화의 길. 모험을 즐기는 다재다능한 활동가입니다.",
  6: "책임과 사랑의 길. 돌봄과 헌신으로 주변을 보살피는 사람입니다.",
  7: "탐구와 통찰의 길. 사색을 즐기며 진리와 내면을 추구합니다.",
  8: "성취와 추진의 길. 현실 감각과 야망을 갖춘 실행가입니다.",
  9: "박애와 이상의 길. 따뜻한 인도주의자로 큰 그림을 봅니다.",
  11: "직관과 영감의 마스터수. 예민한 통찰을 지닌 영적 메신저형입니다.",
  22: "마스터 빌더. 큰 비전을 현실로 구현해내는 강한 힘이 있습니다.",
  33: "마스터 티처. 헌신과 치유, 조건 없는 사랑을 나누는 사람입니다.",
};

const NUMBER_TRAIT = {
  1: "주도적인",
  2: "조화로운",
  3: "창의적인",
  4: "견실한",
  5: "자유로운",
  6: "헌신적인",
  7: "통찰력 있는",
  8: "추진력 있는",
  9: "이타적인",
  11: "영감을 주는",
  22: "비전을 실현하는",
  33: "치유하는",
};

function buildNumerologyProfile(name, y, m, d) {
  const life = lifePathNumber(y, m, d);
  const bday = birthdayNumber(d);
  const expr = expressionNumber(name);
  const soul = soulUrgeNumber(name);
  const pers = personalityNumber(name);

  return {
    name: name || null,
    year: y,
    month: m,
    day: d,
    lifePath: life,
    birthday: bday,
    expression: expr,
    soulUrge: soul,
    personality: pers,
    text: {
      lifePath: LIFE_PATH_MEANING[life] || "특별한 길을 걷는 사람입니다.",
      birthday: `타고난 기질은 '${NUMBER_TRAIT[bday] || ""}' 면모로 드러납니다.`,
      expression:
        expr != null
          ? `당신의 재능과 삶의 목적은 '${NUMBER_TRAIT[expr] || ""}' 방향을 향합니다.`
          : null,
      soulUrge:
        soul != null
          ? `마음 깊은 곳의 욕구는 '${NUMBER_TRAIT[soul] || ""}' 삶을 원합니다.`
          : null,
      personality:
        pers != null
          ? `남들에게 비치는 첫인상은 '${NUMBER_TRAIT[pers] || ""}' 모습입니다.`
          : null,
    },
  };
}

/* ----------------------------- 난수(시드) ----------------------------- */

// 문자열 → 32bit 시드 (cyrb53 단순화)
function hashSeed(str) {
  let h1 = 0xdeadbeef ^ 0,
    h2 = 0x41c6ce57 ^ 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)) >>> 0;
}

// mulberry32 PRNG
function makeRng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ----------------------- 최근 당첨내역 파싱/빈도 ----------------------- */

// 텍스트(여러 줄) → 회차별 6개 번호 배열
function parseRecentDraws(text) {
  const draws = [];
  const lines = (text || "").split(/\r?\n/);
  for (const line of lines) {
    const nums = (line.match(/\d{1,2}/g) || [])
      .map(Number)
      .filter((n) => n >= 1 && n <= 45);
    const uniq = [...new Set(nums)];
    if (uniq.length >= 6) draws.push(uniq.slice(0, 6)); // 보너스 번호 무시
  }
  return draws;
}

// 1~45 출현 빈도
function frequencyTable(draws) {
  const freq = {};
  for (let n = 1; n <= 45; n++) freq[n] = 0;
  for (const d of draws) for (const n of d) freq[n]++;
  return freq;
}

/* --------------------------- 가중치 계산 --------------------------- */

// 개인 수비학수 → 1~45 번호별 친화도(affinity)
function numerologyAffinity(profile) {
  const aff = {};
  for (let n = 1; n <= 45; n++) aff[n] = 0;

  const core = [
    { v: profile.lifePath, w: 3.0 }, // 인생경로수: 가장 중요
    { v: profile.birthday, w: 2.0 },
    { v: profile.expression, w: 1.5 },
    { v: profile.soulUrge, w: 1.2 },
    { v: profile.personality, w: 1.0 },
  ].filter((c) => c.v != null);

  for (let n = 1; n <= 45; n++) {
    const rn = reduceNumber(n); // n의 수비학 축약값
    for (const c of core) {
      // 디지털 루트가 일치하면 '공명'
      if (rn === reduceNumber(c.v)) aff[n] += c.w;
      // 코어 숫자 자체와 정확히 같으면 가산
      if (n === c.v) aff[n] += c.w * 0.8;
    }
  }

  // 생년월일 자릿수도 약한 친화도로 반영
  const digits = `${profile.year}${profile.month}${profile.day}`
    .split("")
    .map(Number);
  for (let n = 1; n <= 45; n++) {
    const lastDigit = n % 10;
    if (digits.includes(lastDigit)) aff[n] += 0.4;
  }
  return aff;
}

// 테마별 가중치 맵 생성
function buildWeightMap(theme, freq, aff, draws) {
  const counts = Object.values(freq);
  const maxF = Math.max(1, ...counts);
  const totalDraws = draws.length || 1;

  const w = {};
  for (let n = 1; n <= 45; n++) {
    const f = freq[n];
    const hot = f / maxF; // 0~1, 자주 나올수록 ↑
    const cold = 1 - f / maxF; // 자주 안 나올수록 ↑ (미출현=과열대기)
    const a = aff[n]; // 수비학 친화도

    let base = 1; // 스무딩 바닥값(콜드넘버도 가능성 유지)
    switch (theme.key) {
      case "lifepath": // 인생경로수 중심
        w[n] = base * (1 + a * 1.4) * (1 + hot * 0.4);
        break;
      case "hot": // 최근 핫넘버 중심
        w[n] = base * (1 + hot * 1.6) * (1 + a * 0.4);
        break;
      case "cold": // 콜드넘버 반등 기대
        w[n] = base * (1 + cold * 1.4) * (1 + a * 0.5);
        break;
      case "name": // 이름/생일수 중심
        w[n] = base * (1 + a * 1.2) * (1 + hot * 0.3 + cold * 0.3);
        break;
      case "balance": // 균형 조합
      default:
        w[n] = base * (1 + a * 0.7) * (1 + hot * 0.5 + cold * 0.3);
        break;
    }
  }
  return w;
}

/* --------------------------- 가중 추첨 --------------------------- */

function weightedSampleNoReplace(weightMap, k, rng) {
  const pool = [];
  for (let n = 1; n <= 45; n++) pool.push({ n, w: Math.max(1e-6, weightMap[n]) });
  const picked = [];
  for (let i = 0; i < k; i++) {
    const total = pool.reduce((a, o) => a + o.w, 0);
    let r = rng() * total;
    let idx = 0;
    for (; idx < pool.length; idx++) {
      r -= pool[idx].w;
      if (r <= 0) break;
    }
    if (idx >= pool.length) idx = pool.length - 1;
    picked.push(pool[idx].n);
    pool.splice(idx, 1);
  }
  return picked.sort((a, b) => a - b);
}

// 구간 인덱스: 1-9 / 10-19 / 20-29 / 30-39 / 40-45
function rangeIndex(n) {
  if (n <= 9) return 0;
  if (n <= 19) return 1;
  if (n <= 29) return 2;
  if (n <= 39) return 3;
  return 4;
}

// 단순 패턴 배제 제약 검사 → {ok, score, stats}
function evaluateCombo(combo) {
  const sum = combo.reduce((a, b) => a + b, 0);
  const odd = combo.filter((x) => x % 2 === 1).length;
  const low = combo.filter((x) => x <= 22).length;

  let maxRun = 1,
    run = 1;
  for (let i = 1; i < combo.length; i++) {
    if (combo[i] === combo[i - 1] + 1) {
      run++;
      maxRun = Math.max(maxRun, run);
    } else run = 1;
  }

  const ranges = [0, 0, 0, 0, 0];
  combo.forEach((x) => ranges[rangeIndex(x)]++);
  const rangesCovered = ranges.filter((r) => r > 0).length;
  const maxInRange = Math.max(...ranges);

  const lastDigits = new Set(combo.map((x) => x % 10));

  const checks = [
    sum >= 100 && sum <= 175, // 합계 적정대
    odd >= 2 && odd <= 4, // 홀짝 균형
    low >= 2 && low <= 4, // 저고 균형
    maxRun <= 2, // 3연속 이상 금지
    rangesCovered >= 3, // 최소 3개 구간 분산
    maxInRange <= 3, // 한 구간 몰림 금지
    lastDigits.size >= 4, // 끝자리 다양성
  ];
  const score = checks.filter(Boolean).length;
  return {
    ok: checks.every(Boolean),
    score,
    stats: { sum, odd, even: 6 - odd, low, high: 6 - low, maxRun, rangesCovered },
  };
}

function generateOneGame(weightMap, rng) {
  let best = null,
    bestScore = -1,
    bestEval = null;
  for (let attempt = 0; attempt < 600; attempt++) {
    const combo = weightedSampleNoReplace(weightMap, 6, rng);
    const ev = evaluateCombo(combo);
    if (ev.ok) return { combo, ev };
    if (ev.score > bestScore) {
      bestScore = ev.score;
      best = combo;
      bestEval = ev;
    }
  }
  return { combo: best, ev: bestEval };
}

/* --------------------------- 번호 풀이 --------------------------- */

// 한 번호가 왜 뽑혔는지 태그 부여
function tagNumber(n, profile, freq, draws, aff) {
  const tags = [];
  const counts = Object.values(freq);
  const maxF = Math.max(1, ...counts);
  const f = freq[n];

  // 수비학 공명
  const rn = reduceNumber(n);
  if (rn === reduceNumber(profile.lifePath)) tags.push(`인생경로수(${profile.lifePath}) 공명`);
  else if (rn === reduceNumber(profile.birthday)) tags.push(`생일수(${profile.birthday}) 공명`);
  else if (profile.expression != null && rn === reduceNumber(profile.expression))
    tags.push(`표현수(${profile.expression}) 공명`);
  else if (profile.soulUrge != null && rn === reduceNumber(profile.soulUrge))
    tags.push(`영혼수(${profile.soulUrge}) 공명`);

  // 빈도 태그
  if (draws.length > 0) {
    if (f >= maxF * 0.7) tags.push("최근 핫넘버");
    else if (f <= maxF * 0.25) tags.push("콜드(과열대기) 넘버");
  }

  if (tags.length === 0) tags.push("균형 보강수");
  return tags;
}

function explainGame(theme, combo, ev, profile, freq, draws, aff) {
  const perNumber = combo.map((n) => ({ n, tags: tagNumber(n, profile, freq, draws, aff) }));

  const resonant = perNumber.filter((p) =>
    p.tags.some((t) => t.includes("공명"))
  );
  const hot = perNumber.filter((p) => p.tags.includes("최근 핫넘버"));
  const cold = perNumber.filter((p) => p.tags.includes("콜드(과열대기) 넘버"));

  const parts = [];
  parts.push(`<b>${theme.label}</b> — ${theme.desc}`);

  if (resonant.length) {
    parts.push(
      `이 조합에는 당신의 수비학수와 공명하는 번호 <b>${resonant
        .map((p) => p.n)
        .join(", ")}</b> 가 들어 있어요. ` +
        `특히 인생경로수 ${profile.lifePath}(${(LIFE_PATH_MEANING[profile.lifePath] || "").replace(/\.$/, "")})의 기운을 담았습니다.`
    );
  }
  if (hot.length)
    parts.push(`최근 자주 등장한 핫넘버 <b>${hot.map((p) => p.n).join(", ")}</b> 로 흐름을 탔고,`);
  if (cold.length)
    parts.push(`한동안 잠잠했던 반등 기대 번호 <b>${cold.map((p) => p.n).join(", ")}</b> 로 균형을 맞췄습니다.`);

  parts.push(
    `숫자 구성은 합계 ${ev.stats.sum}, 홀:짝 ${ev.stats.odd}:${ev.stats.even}, ` +
      `저:고 ${ev.stats.low}:${ev.stats.high}, ${ev.stats.rangesCovered}개 구간에 분산되어 ` +
      `흔한 단순 패턴(연속수·한쪽 쏠림)을 피했습니다.`
  );

  return { perNumber, html: parts.join(" ") };
}

/* --------------------------- 전체 생성 --------------------------- */

const THEMES = [
  { key: "lifepath", label: "1게임 · 인생경로수 운", desc: "당신의 핵심 수비학수에 가장 강하게 공명하는 조합" },
  { key: "hot", label: "2게임 · 최근 흐름 운", desc: "최근 당첨내역에서 자주 나온 핫넘버 중심 조합" },
  { key: "cold", label: "3게임 · 반등 기대 운", desc: "한동안 안 나온 번호의 반등을 노리는 조합" },
  { key: "name", label: "4게임 · 이름·생일 운", desc: "이름수와 생일수의 기운을 담은 조합" },
  { key: "balance", label: "5게임 · 균형의 운", desc: "수비학과 통계를 고르게 섞은 안정형 조합" },
];

function generateAll(profile, recentText, salt) {
  const draws = parseRecentDraws(recentText);
  const freq = frequencyTable(draws);
  const aff = numerologyAffinity(profile);

  const seedBase = hashSeed(
    `${profile.name || ""}|${profile.year}-${profile.month}-${profile.day}|${salt}`
  );

  const games = THEMES.map((theme, i) => {
    const rng = makeRng(hashSeed(`${seedBase}|${theme.key}|${i}`));
    const wmap = buildWeightMap(theme, freq, aff, draws);
    const { combo, ev } = generateOneGame(wmap, rng);
    const explanation = explainGame(theme, combo, ev, profile, freq, draws, aff);
    return { theme, combo, ev, explanation };
  });

  // 핫/콜드 요약
  const sorted = Object.entries(freq)
    .map(([n, c]) => ({ n: +n, c }))
    .sort((a, b) => b.c - a.c);
  const summary = {
    drawCount: draws.length,
    hot: sorted.slice(0, 6).filter((x) => x.c > 0),
    cold: sorted.slice(-6).reverse(),
  };

  return { games, summary, freq };
}

/* ----------------------------- UI 연결 ----------------------------- */

const SAMPLE_DRAWS = `# 예시 데이터입니다 — 동행복권의 실제 최신 당첨번호로 교체하면 더 정확해집니다.
# 한 줄에 6개(메인 번호)만 적으세요. 보너스 번호는 무시됩니다.
8, 19, 25, 33, 38, 45
3, 12, 17, 24, 29, 40
5, 11, 20, 27, 36, 44
2, 9, 18, 23, 31, 42
7, 14, 22, 30, 35, 43
1, 16, 21, 28, 34, 41
6, 13, 19, 26, 33, 39
4, 10, 24, 29, 37, 45
8, 15, 20, 32, 38, 44
3, 11, 18, 25, 30, 40
9, 17, 23, 28, 35, 42
2, 12, 21, 27, 33, 43
5, 14, 19, 26, 34, 41
7, 13, 22, 31, 36, 45
1, 10, 18, 24, 29, 38
6, 16, 20, 27, 35, 44
4, 11, 17, 25, 32, 40
8, 15, 23, 30, 37, 42
3, 9, 21, 26, 33, 39
5, 13, 19, 28, 34, 43`;

function ballColorClass(n) {
  if (n <= 10) return "ball-yellow";
  if (n <= 20) return "ball-blue";
  if (n <= 30) return "ball-red";
  if (n <= 40) return "ball-gray";
  return "ball-green";
}

function renderBalls(combo) {
  return combo
    .map((n) => `<span class="ball ${ballColorClass(n)}">${n}</span>`)
    .join("");
}

function fmtNum(v) {
  return v == null ? "—" : String(v);
}

function renderProfile(p) {
  const rows = [
    ["인생경로수", p.lifePath, p.text.lifePath],
    ["생일수", p.birthday, p.text.birthday],
    ["표현수(운명수)", p.expression, p.text.expression],
    ["영혼수", p.soulUrge, p.text.soulUrge],
    ["성격수", p.personality, p.text.personality],
  ];
  const list = rows
    .filter((r) => r[1] != null)
    .map(
      (r) => `
      <div class="num-card">
        <div class="num-card-top">
          <span class="num-badge">${fmtNum(r[1])}</span>
          <span class="num-name">${r[0]}</span>
        </div>
        <p class="num-desc">${r[2] || ""}</p>
      </div>`
    )
    .join("");

  return `
    <h2>📜 당신의 수비학 프로필</h2>
    <p class="muted">${p.name ? `<b>${p.name}</b> · ` : ""}${p.year}년 ${p.month}월 ${p.day}일생</p>
    <div class="num-grid">${list}</div>`;
}

function renderResults(result, profile) {
  const games = result.games
    .map((g) => {
      return `
      <div class="game-card">
        <div class="game-balls">${renderBalls(g.combo)}</div>
        <p class="game-explain">${g.explanation.html}</p>
      </div>`;
    })
    .join("");

  let summaryHtml = "";
  if (result.summary.drawCount > 0) {
    const hot = result.summary.hot
      .map((x) => `<span class="chip hot">${x.n} <em>${x.c}회</em></span>`)
      .join("");
    const cold = result.summary.cold
      .map((x) => `<span class="chip cold">${x.n} <em>${x.c}회</em></span>`)
      .join("");
    summaryHtml = `
      <div class="freq-summary">
        <p class="muted">분석한 회차: <b>${result.summary.drawCount}</b>회</p>
        <div class="freq-row"><span class="freq-label">🔥 핫넘버</span><div>${hot}</div></div>
        <div class="freq-row"><span class="freq-label">❄️ 콜드넘버</span><div>${cold}</div></div>
      </div>`;
  }

  return `
    <h2>🎱 오늘의 추천 번호 (메인 6개)</h2>
    ${summaryHtml}
    <div class="games">${games}</div>`;
}

let lastProfile = null;
let regenSalt = 0;

function run() {
  const name = document.getElementById("name").value.trim();
  const birth = document.getElementById("birth").value;
  const recent = document.getElementById("recent").value;
  const errEl = document.getElementById("error");
  errEl.textContent = "";

  if (!birth) {
    errEl.textContent = "생년월일을 입력해 주세요.";
    return;
  }
  const [y, m, d] = birth.split("-").map(Number);
  if (!y || !m || !d) {
    errEl.textContent = "생년월일 형식이 올바르지 않습니다.";
    return;
  }

  const profile = buildNumerologyProfile(name, y, m, d);
  lastProfile = profile;

  const result = generateAll(profile, recent, regenSalt);

  document.getElementById("profile").innerHTML = renderProfile(profile);
  document.getElementById("results").innerHTML = renderResults(result, profile);
  document.getElementById("output").classList.add("visible");
  document.getElementById("regen").style.display = "inline-block";
}

function regenerate() {
  if (!lastProfile) return;
  regenSalt++;
  run();
}

/* ----------------------------- 테마 토글 ----------------------------- */

function applyThemeIcon(theme) {
  const icon = document.querySelector("#theme-toggle .theme-toggle-icon");
  if (icon) icon.textContent = theme === "light" ? "☀️" : "🌙";
}

function initThemeToggle() {
  const root = document.documentElement;
  // <head> 인라인 스크립트가 이미 data-theme를 적용해 둠 (FOUC 방지)
  applyThemeIcon(root.getAttribute("data-theme") || "dark");

  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const next =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    applyThemeIcon(next);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  document.getElementById("recent").value = SAMPLE_DRAWS;
  document.getElementById("go").addEventListener("click", () => {
    regenSalt = 0;
    run();
  });
  document.getElementById("regen").addEventListener("click", regenerate);
});
