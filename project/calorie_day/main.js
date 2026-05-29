/* =========================================================
   칼로리데이 (CalorieDay) v3
   ========================================================= */
const Store = (() => {
  let mem={}, ok=true;
  try{ localStorage.setItem('__t','1'); localStorage.removeItem('__t'); }catch(e){ ok=false; }
  return {
    get(k){ try{ return ok?localStorage.getItem(k):(mem[k]??null);}catch(e){return mem[k]??null;} },
    set(k,v){ try{ ok?localStorage.setItem(k,v):(mem[k]=v);}catch(e){mem[k]=v;} }
  };
})();
const KEY='calorieDay.v3';
function loadDB(){ try{ return JSON.parse(Store.get(KEY))||{profile:null,logs:{}}; }catch(e){ return {profile:null,logs:{}}; } }
function saveDB(db){ Store.set(KEY, JSON.stringify(db)); }
let DB=loadDB();

/* ---------- 음식 칼로리 평균 DB ---------- */
const FOODS={
  "공기밥(쌀밥)":300,
  "현미밥":310,
  "잡곡밥":300,
  "보리밥":280,
  "누룽지":180,
  "주먹밥":210,
  "컵밥":600,
  "비빔밥":600,
  "돌솥비빔밥":620,
  "산채비빔밥":520,
  "전주비빔밥":650,
  "김치볶음밥":550,
  "새우볶음밥":600,
  "볶음밥":620,
  "낙지볶음밥":600,
  "오므라이스":680,
  "카레라이스":700,
  "하이라이스":680,
  "제육덮밥":750,
  "불고기덮밥":700,
  "소고기덮밥":720,
  "규동":700,
  "회덮밥":520,
  "참치마요덮밥":650,
  "장어덮밥":750,
  "낙지덮밥":600,
  "오징어덮밥":620,
  "김치덮밥":550,
  "알밥":550,
  "콩나물국밥":450,
  "육회비빔밥":600,
  "순두부백반":500,
  "쌈밥(1인분)":650,
  "김밥(1줄)":480,
  "참치김밥":520,
  "치즈김밥":540,
  "돈까스김밥":600,
  "소고기김밥":540,
  "멸치김밥":500,
  "충무김밥":350,
  "꼬마김밥(1줄)":300,
  "유부초밥(1인분)":400,
  "초밥(8pc)":480,
  "연어초밥(8pc)":520,
  "장어초밥(8pc)":560,
  "군함말이(2pc)":150,
  "김치찌개":250,
  "된장찌개":200,
  "순두부찌개":280,
  "부대찌개":600,
  "청국장":250,
  "비지찌개":250,
  "동태찌개":300,
  "꽁치찌개":320,
  "참치찌개":350,
  "고추장찌개":280,
  "갈비탕":430,
  "설렁탕":480,
  "곰탕":450,
  "도가니탕":500,
  "삼계탕":900,
  "추어탕":400,
  "감자탕":700,
  "뼈해장국":550,
  "콩나물해장국":250,
  "황태해장국":250,
  "선지해장국":350,
  "육개장":350,
  "미역국":120,
  "콩나물국":80,
  "북엇국":150,
  "시래기국":150,
  "순대국밥":500,
  "떡국":470,
  "만둣국":450,
  "떡만둣국":500,
  "수제비":450,
  "어묵탕":280,
  "매운탕":400,
  "알탕":380,
  "대구탕":350,
  "메기매운탕":400,
  "닭개장":380,
  "우거지국":160,
  "갈비찜":700,
  "닭볶음탕":650,
  "찜닭":700,
  "안동찜닭":750,
  "보쌈(200g)":420,
  "수육(150g)":380,
  "두부조림":200,
  "감자조림":150,
  "메추리알장조림":200,
  "장조림":250,
  "코다리조림":320,
  "코다리찜":350,
  "아구찜":550,
  "해물찜":600,
  "갈치조림":350,
  "고등어조림":380,
  "꽁치조림":350,
  "우엉조림":120,
  "연근조림":130,
  "고등어구이":350,
  "갈치구이":280,
  "삼치구이":300,
  "꽁치구이":280,
  "조기구이":200,
  "굴비":220,
  "임연수구이":280,
  "가자미구이":250,
  "병어구이":300,
  "장어구이":500,
  "연어구이":350,
  "오징어구이":250,
  "쥐포구이":150,
  "황태구이":250,
  "오징어볶음":450,
  "낙지볶음":420,
  "주꾸미볶음":430,
  "갑오징어볶음":400,
  "오삼불고기":500,
  "새우튀김(3개)":300,
  "새우구이(5마리)":250,
  "깐풍새우":450,
  "버터새우":400,
  "감바스":450,
  "연어회(200g)":360,
  "광어회(200g)":220,
  "우럭회(200g)":230,
  "모둠회(1인분)":300,
  "물회":400,
  "회무침":350,
  "육회(1인분)":300,
  "낙지탕탕이":250,
  "산낙지":120,
  "해물파전":500,
  "굴전":300,
  "생선까스":550,
  "오징어순대":350,
  "골뱅이무침":260,
  "조개구이(1인분)":300,
  "꼬막무침":250,
  "멍게(1접시)":80,
  "전복죽":400,
  "전복구이(3개)":150,
  "간장게장(1마리)":200,
  "양념게장(1마리)":250,
  "대게(1마리)":400,
  "새우장(3마리)":180,
  "삼겹살(200g)":660,
  "오겹살(200g)":700,
  "목살(200g)":500,
  "항정살(200g)":540,
  "갈매기살(200g)":480,
  "소고기등심(200g)":540,
  "소고기안심(200g)":480,
  "차돌박이(150g)":450,
  "우삼겹(150g)":480,
  "양념갈비(200g)":600,
  "돼지갈비(200g)":580,
  "LA갈비(200g)":620,
  "소갈비살(200g)":560,
  "닭갈비":650,
  "제육볶음":550,
  "불고기":400,
  "소불고기":420,
  "두루치기":520,
  "주물럭(200g)":560,
  "곱창(150g)":480,
  "막창(150g)":500,
  "대창(100g)":450,
  "양(150g)":400,
  "닭발(1인분)":500,
  "족발(200g)":480,
  "닭가슴살(100g)":165,
  "닭안심(100g)":110,
  "닭다리(1개)":180,
  "닭한마리(백숙)":1100,
  "훈제오리(150g)":480,
  "오리주물럭":600,
  "떡갈비(1개)":250,
  "동그랑땡(3개)":200,
  "소세지(2개)":180,
  "스팸(1조각)":100,
  "햄구이(100g)":300,
  "베이컨(3줄)":150,
  "탕수육(1인분)":650,
  "깐풍기":600,
  "양장피":500,
  "유린기":550,
  "꿔바로우":700,
  "멘보샤":500,
  "라면":500,
  "진라면":500,
  "신라면":500,
  "짜파게티":600,
  "비빔면":530,
  "김치라면":550,
  "떡라면":650,
  "치즈라면":600,
  "해물라면":550,
  "라볶이":650,
  "우유라면":580,
  "짜장면":700,
  "간짜장":720,
  "삼선짜장":750,
  "짬뽕":680,
  "삼선짬뽕":720,
  "짬뽕밥":750,
  "울면":600,
  "기스면":500,
  "칼국수":500,
  "바지락칼국수":480,
  "들깨칼국수":550,
  "해물칼국수":520,
  "물냉면":550,
  "비빔냉면":600,
  "회냉면":580,
  "막국수":500,
  "콩국수":600,
  "열무국수":450,
  "잔치국수":420,
  "비빔국수":500,
  "우동":480,
  "유부우동":500,
  "가락국수":480,
  "쫄면":520,
  "스파게티(미트)":700,
  "크림파스타":750,
  "토마토파스타":600,
  "알리오올리오":550,
  "로제파스타":720,
  "카르보나라":800,
  "쌀국수":450,
  "팟타이":600,
  "분짜":500,
  "마라탕(1인분)":600,
  "마라샹궈":800,
  "우육면":600,
  "떡볶이":480,
  "국물떡볶이":450,
  "로제떡볶이":600,
  "치즈떡볶이":600,
  "마라떡볶이":550,
  "짜장떡볶이":520,
  "순대(200g)":380,
  "백순대":450,
  "튀김(1개)":120,
  "김말이튀김(1개)":130,
  "오징어튀김(1개)":150,
  "고구마튀김(1개)":140,
  "야채튀김(1개)":110,
  "만두(5개)":350,
  "군만두(5개)":400,
  "물만두(5개)":300,
  "왕만두(1개)":250,
  "김치만두(5개)":350,
  "고기만두(5개)":380,
  "갈비만두(5개)":420,
  "새우만두(5개)":340,
  "어묵(1개)":50,
  "핫도그(1개)":290,
  "치즈핫도그":350,
  "감자핫도그":400,
  "명랑핫도그":380,
  "계란빵(1개)":200,
  "붕어빵(1개)":140,
  "잉어빵(1개)":150,
  "호떡(1개)":230,
  "씨앗호떡":280,
  "풀빵(3개)":150,
  "떡꼬치(1개)":250,
  "닭꼬치(1개)":200,
  "길거리토스트":350,
  "계란말이":200,
  "계란찜":150,
  "삶은계란(1개)":78,
  "계란후라이(1개)":90,
  "스크램블에그":180,
  "두부김치":400,
  "두부(1/2모)":150,
  "순두부":120,
  "김치(1접시)":30,
  "깍두기":30,
  "총각김치":30,
  "파김치":40,
  "무생채":40,
  "오이무침":40,
  "겉절이":40,
  "콩나물무침":50,
  "시금치나물":60,
  "고사리나물":70,
  "도라지무침":80,
  "미역줄기볶음":90,
  "가지나물":50,
  "멸치볶음":120,
  "어묵볶음":150,
  "진미채무침":180,
  "감자채볶음":140,
  "김(1봉)":50,
  "김자반":100,
  "부추전":350,
  "김치전":400,
  "파전":450,
  "감자전":350,
  "호박전":250,
  "동태전":300,
  "깻잎전":200,
  "녹두전(빈대떡)":400,
  "잡채":400,
  "당면잡채":420,
  "인절미(3개)":210,
  "가래떡구이":200,
  "백설기(1조각)":200,
  "절편(3개)":180,
  "송편(5개)":250,
  "꿀떡(5개)":250,
  "약과(1개)":120,
  "식혜(1잔)":130,
  "수정과(1잔)":120,
  "치킨(1마리)":1900,
  "후라이드치킨(1조각)":240,
  "후라이드치킨(반마리)":950,
  "후라이드치킨(1마리)":1900,
  "양념치킨(1조각)":280,
  "양념치킨(반마리)":1100,
  "양념치킨(1마리)":2200,
  "간장치킨(1조각)":260,
  "마늘치킨(1조각)":270,
  "파닭(1조각)":260,
  "허니콤보(1조각)":290,
  "뿌링클(1조각)":300,
  "닭강정(1인분)":600,
  "순살치킨(1인분)":700,
  "치킨너겟(6개)":280,
  "핫윙(4개)":350,
  "식빵(1쪽)":70,
  "크루아상":230,
  "베이글":270,
  "모닝빵(1개)":100,
  "단팥빵":250,
  "소보로빵":280,
  "크림빵":280,
  "마늘바게트(1조각)":130,
  "샌드위치":350,
  "클럽샌드위치":500,
  "에그샌드위치":400,
  "햄치즈토스트":400,
  "케이크(1조각)":350,
  "치즈케이크(1조각)":400,
  "티라미수":350,
  "마카롱(1개)":100,
  "도넛(1개)":250,
  "츄러스(1개)":200,
  "와플":380,
  "크로플":350,
  "호두과자(5개)":200,
  "초콜릿(1개)":230,
  "아이스크림(1개)":200,
  "콘아이스크림":250,
  "빙수(1인분)":500,
  "팥빙수":550,
  "과자(1봉지)":400,
  "쿠키(1개)":80,
  "젤리(1봉)":150,
  "팝콘(중)":400,
  "감자칩(1봉)":350,
  "초코파이(1개)":170,
  "빼빼로(1갑)":250,
  "맛동산(1봉)":450,
  "새우깡(1봉)":400,
  "사과(1개)":95,
  "바나나(1개)":105,
  "오렌지(1개)":62,
  "귤(1개)":40,
  "포도(1송이)":110,
  "딸기(10개)":40,
  "수박(1조각)":90,
  "참외(1개)":110,
  "멜론(1조각)":60,
  "복숭아(1개)":70,
  "자두(1개)":30,
  "키위(1개)":42,
  "배(1개)":100,
  "감(1개)":120,
  "블루베리(100g)":57,
  "방울토마토(10개)":30,
  "토마토(1개)":22,
  "아보카도(1개)":240,
  "망고(1개)":200,
  "파인애플(1조각)":50,
  "체리(10개)":50,
  "무화과(1개)":40,
  "석류(1개)":105,
  "아메리카노":10,
  "카페라떼":130,
  "바닐라라떼":250,
  "카푸치노":120,
  "카페모카":290,
  "콜드브루":15,
  "녹차라떼":200,
  "초코라떼":280,
  "콜라(355ml)":150,
  "제로콜라":1,
  "사이다(355ml)":140,
  "환타":160,
  "오렌지주스(200ml)":90,
  "포도주스":120,
  "이온음료(500ml)":125,
  "우유(200ml)":130,
  "초코우유":200,
  "딸기우유":180,
  "바나나우유":165,
  "두유(190ml)":95,
  "에너지드링크":110,
  "버블티":350,
  "스무디":250,
  "요거트스무디":280,
  "아이스티":90,
  "핫초코":200,
  "미숫가루(1잔)":250,
  "식혜(캔)":130,
  "햄버거":500,
  "치즈버거":560,
  "불고기버거":480,
  "새우버거":450,
  "빅버거":800,
  "햄버거세트":900,
  "감자튀김(중)":340,
  "치즈스틱(3개)":300,
  "양념감자":380,
  "피자(1조각)":280,
  "불고기피자(1조각)":300,
  "페퍼로니피자(1조각)":290,
  "고구마피자(1조각)":310,
  "포테이토피자(1조각)":300,
  "돈까스":650,
  "치즈돈까스":780,
  "등심돈까스":700,
  "함박스테이크":620,
  "스테이크(200g)":500,
  "그라탕":600,
  "리조또":550,
  "필라프":600,
  "샐러드(드레싱)":220,
  "시저샐러드":300,
  "닭가슴살샐러드":350,
  "포케볼":450,
  "부리토":700,
  "타코(1개)":250,
  "케밥":600,
  "마른안주(1접시)":200,
  "노가리(1마리)":80,
  "먹태(1마리)":100,
  "황태채":150,
  "나초(1접시)":400,
  "치즈플래터":450,
  "순대볶음":500,
  "닭똥집볶음":400,
  "오돌뼈":450,
  "감자튀김(안주)":400,
  "닭가슴살소시지(1개)":80,
  "닭가슴살볼(3개)":120,
  "고구마(1개)":130,
  "군고구마":160,
  "감자(1개)":110,
  "옥수수(1개)":150,
  "단호박(1/4개)":100,
  "오트밀(1그릇)":150,
  "그릭요거트":130,
  "요거트(1개)":120,
  "견과류(1줌)":180,
  "아몬드(20알)":140,
  "호두(5개)":130,
  "프로틴바(1개)":200,
  "프로틴쉐이크":180,
  "곤약(100g)":10,
  "곤약밥(1공기)":100,
  "두부면(1팩)":150,
  "브로콜리(1컵)":30,
  "양배추샐러드":80,
  "닭죽":350,
  "야채죽":250,
  "호박죽":200,
  "단팥죽":300,
  "잣죽":350,
  "선식(1잔)":250,
  "미역(국용)":20
};

/* ---------- 술 칼로리 DB (단위당 kcal) ---------- */
const ALCOHOL={
  "소주":{emoji:"🍶",units:{"잔":48,"병":380}},
  "맥주":{emoji:"🍺",units:{"잔":85,"캔":150,"병":210}},
  "막걸리":{emoji:"🥛",units:{"잔":92,"병":340}},
  "와인":{emoji:"🍷",units:{"잔":125,"병":600}},
  "위스키/양주":{emoji:"🥃",units:{"잔":95}},
  "하이볼":{emoji:"🥂",units:{"잔":150}},
  "사케":{emoji:"🍶",units:{"잔":230,"병":540}},
  "칵테일":{emoji:"🍹",units:{"잔":220}}
};

/* ---------- 운동 MET ---------- */
const EXERCISES=[
  {n:"빠르게 걷기",met:4.3,e:"🚶"},{n:"조깅·달리기",met:8.0,e:"🏃"},{n:"자전거",met:7.5,e:"🚴"},
  {n:"수영",met:6.0,e:"🏊"},{n:"등산",met:7.0,e:"🥾"},{n:"줄넘기",met:11.0,e:"🪢"},
  {n:"웨이트 트레이닝",met:5.0,e:"🏋️"},{n:"요가",met:3.0,e:"🧘"},{n:"필라테스",met:3.5,e:"🤸"},
  {n:"홈트(맨몸운동)",met:5.5,e:"💪"},{n:"축구",met:7.0,e:"⚽"},{n:"농구",met:6.5,e:"🏀"},
  {n:"배드민턴",met:5.5,e:"🏸"},{n:"테니스",met:7.3,e:"🎾"},{n:"골프",met:4.5,e:"⛳"},
  {n:"댄스·에어로빅",met:6.5,e:"💃"},{n:"클라이밍",met:8.0,e:"🧗"},{n:"기타(직접입력)",met:5.0,e:"➕",custom:true}
];

const MEALS=[
  {id:"breakfast",name:"아침",emoji:"🌅",color:"#f59e0b",bg:"#fffbeb"},
  {id:"lunch",name:"점심",emoji:"☀️",color:"#f97316",bg:"#fff7ed"},
  {id:"dinner",name:"저녁",emoji:"🌙",color:"#6366f1",bg:"#eef2ff"},
  {id:"snack",name:"야식",emoji:"🌃",color:"#a855f7",bg:"#faf5ff"}
];

/* ---------- 목표별 추천 상품 (쿠팡 파트너스 자리) ---------- */
const PRODUCTS={
  lose:[
    {emo:"🍗",name:"닭가슴살",why:"고단백·저지방, 다이어트 식단 필수템"},
    {emo:"⚖️",name:"디지털 주방저울",why:"정확한 칼로리 계산의 시작"},
    {emo:"🥗",name:"저칼로리 곤약·샐러드",why:"포만감은 채우고 칼로리는 낮게"}
  ],
  keep:[
    {emo:"👟",name:"러닝화",why:"꾸준한 유산소를 위한 기본템"},
    {emo:"🧘",name:"요가매트",why:"홈트·스트레칭 루틴 유지"},
    {emo:"🍱",name:"식단 도시락 용기",why:"균형 잡힌 식사 관리"}
  ],
  gain:[
    {emo:"💪",name:"프로틴 보충제",why:"근육 증량을 위한 단백질 보충"},
    {emo:"🍗",name:"닭가슴살 대용량",why:"벌크업 식단의 핵심"},
    {emo:"🏋️",name:"덤벨·홈짐 세트",why:"근력 운동 강도 높이기"}
  ]
};

const WALK_COEF=0.55, BIKE_COEF=0.28, KCAL_PER_KG=7700;
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const todayStr=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const fmt=n=>Math.round(n).toLocaleString('ko-KR');
const dateLabel=s=>{const p=s.split('-');return `${+p[1]}/${+p[2]}`;};

/* ===================== 편집 상태 ===================== */
function emptyDay(){
  return {
    bedTime:"23:30", wakeTime:"07:00",
    meals:{breakfast:{skipped:false,foods:[]},lunch:{skipped:false,foods:[]},dinner:{skipped:false,foods:[]},snack:{skipped:false,foods:[]}},
    drink:{status:"none",drinks:[],snacks:[]},
    walkKm:0,bikeKm:0, exercises:[]
  };
}
let cur=emptyDay(), selectedEx=null;

/* ===================== 커스텀 자동완성 ===================== */
const AC_LISTS=[];                       // 열린 목록 추적용
let AC_OPEN=null;                        // 현재 위치 재계산 대상
function attachAutocomplete(input, onPick){
  // 목록을 카드 밖(body)에 fixed로 띄워 .meal의 overflow:hidden에 잘리지 않게 함
  const list=document.createElement('div'); list.className='ac-list ac-fixed';
  document.body.appendChild(list); AC_LISTS.push(list);
  let items=[], active=-1;

  function position(){
    const r=input.getBoundingClientRect();
    const W=Math.max(r.width, 300);                     // 넉넉한 너비
    let left=r.left;
    if(left+W > window.innerWidth-10) left=Math.max(10, window.innerWidth-10-W);
    list.style.left=left+'px';
    list.style.width=W+'px';
    const listH=Math.min(list.scrollHeight, 360);
    const spaceBelow=window.innerHeight-r.bottom;
    if(spaceBelow < listH+14 && r.top > spaceBelow){    // 아래 공간 부족 → 위로
      list.style.top='auto';
      list.style.bottom=(window.innerHeight - r.top + 6)+'px';
    }else{
      list.style.bottom='auto';
      list.style.top=(r.bottom + 6)+'px';
    }
  }
  function render(){
    const q=input.value.trim().toLowerCase();
    if(!q){ hide(); return; }
    items=Object.keys(FOODS).filter(n=>n.toLowerCase().includes(q)).slice(0,8);
    if(!items.length){ hide(); return; }
    active=-1;
    AC_LISTS.forEach(l=>{ if(l!==list) l.classList.remove('show'); });   // 다른 목록 닫기
    list.innerHTML=items.map((n,i)=>`<div class="ac-item" data-i="${i}"><span>${n}</span><b>${FOODS[n]} kcal</b></div>`).join('');
    list.classList.add('show'); AC_OPEN=position; position();
    list.querySelectorAll('.ac-item').forEach(el=>el.addEventListener('mousedown',e=>{ e.preventDefault(); choose(+el.dataset.i); }));
  }
  function hide(){ list.classList.remove('show'); list.innerHTML=''; active=-1; if(AC_OPEN===position) AC_OPEN=null; }
  function choose(i){ const n=items[i]; input.value=n; onPick(n,FOODS[n]); hide(); }
  function hi(){ list.querySelectorAll('.ac-item').forEach((el,i)=>el.classList.toggle('on',i===active)); position(); }
  input.addEventListener('input',render);
  input.addEventListener('focus',()=>{ if(input.value.trim()) render(); });
  input.addEventListener('blur',()=>setTimeout(hide,150));
  input.addEventListener('keydown',e=>{
    if(!list.classList.contains('show')) return;
    if(e.key==='ArrowDown'){ e.preventDefault(); active=Math.min(active+1,items.length-1); hi(); }
    else if(e.key==='ArrowUp'){ e.preventDefault(); active=Math.max(active-1,0); hi(); }
    else if(e.key==='Enter'){ if(active>=0){ e.preventDefault(); choose(active); } }
    else if(e.key==='Escape'){ hide(); }
  });
}
// 스크롤/리사이즈 시 열린 목록 위치 재계산 (잘림 없이 따라다님)
window.addEventListener('scroll',()=>{ if(AC_OPEN) AC_OPEN(); }, true);
window.addEventListener('resize',()=>{ if(AC_OPEN) AC_OPEN(); });

/* ===================== 랜딩 / 시작 ===================== */
function startApp(){
  $('#landing').classList.add('hidden');
  $('#appHeader').classList.remove('hidden');
  $('#appWrap').classList.remove('hidden');
}
$('#startBtn').addEventListener('click',()=>{ startApp(); window.scrollTo(0,0); });

/* ===================== 탭 / 네비 ===================== */
function goTab(name){
  $$('nav.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  $$('.page').forEach(p=>p.classList.remove('active'));
  $('#page-'+name).classList.add('active');
  if(name==='daily') checkProfile();
  if(name==='stats') renderStats();
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('nav.tabs button').forEach(b=>b.addEventListener('click',()=>goTab(b.dataset.tab)));
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>goTab(b.dataset.go)));

/* ===================== PAGE 1 : BMR ===================== */
function bmiInfo(bmi){
  if(bmi<18.5) return {tag:"저체중",pos:9};
  if(bmi<23)   return {tag:"정상",pos:36};
  if(bmi<25)   return {tag:"과체중",pos:57};
  if(bmi<30)   return {tag:"비만",pos:78};
  return {tag:"고도비만",pos:95};
}
function calcBMR(){
  const gender=$('input[name=gender]:checked').value;
  const goal=$('input[name=goal]:checked').value;
  const age=+$('#age').value,h=+$('#height').value,w=+$('#weight').value,act=+$('#activity').value;
  if(!age||!h||!w){ alert('나이·키·몸무게를 모두 입력해 주세요.'); return; }
  let bmr=10*w+6.25*h-5*age+(gender==='male'?5:-161);
  const tdee=bmr*act, bmi=w/Math.pow(h/100,2), ideal=22*Math.pow(h/100,2), info=bmiInfo(bmi);
  $('#bmrVal').textContent=fmt(bmr); $('#tdeeVal').textContent=fmt(tdee);
  $('#bmiVal').textContent=bmi.toFixed(1); $('#idealVal').textContent=ideal.toFixed(1);
  $('#bmiTag').textContent=info.tag; $('#bmiKnob').style.left=info.pos+'%';
  $('#resultHero').classList.add('show');
  DB.profile={gender,goal,age,h,w,act,bmr:Math.round(bmr),tdee:Math.round(tdee),bmi:+bmi.toFixed(1)};
  saveDB(DB); checkProfile(); renderDaySummary();
}
$('#calcBtn').addEventListener('click',calcBMR);
function fillProfileForm(){
  const p=DB.profile; if(!p) return;
  $('#'+(p.gender==='male'?'g-male':'g-female')).checked=true;
  $('#goal-'+(p.goal||'lose')).checked=true;
  $('#age').value=p.age; $('#height').value=p.h; $('#weight').value=p.w; $('#activity').value=p.act;
  $('#bmrVal').textContent=fmt(p.bmr); $('#tdeeVal').textContent=fmt(p.tdee);
  $('#bmiVal').textContent=p.bmi.toFixed(1); $('#idealVal').textContent=(22*Math.pow(p.h/100,2)).toFixed(1);
  const info=bmiInfo(p.bmi); $('#bmiTag').textContent=info.tag; $('#bmiKnob').style.left=info.pos+'%';
  $('#resultHero').classList.add('show');
}

/* ===================== PAGE 2 : DAILY ===================== */
function checkProfile(){ $('#profileWarn').style.display=DB.profile?'none':'flex'; }

/* 수면 */
function sleepText(bed,wake){
  if(!bed||!wake) return '–';
  const b=bed.split(':').map(Number), w=wake.split(':').map(Number);
  let diff=(w[0]*60+w[1])-(b[0]*60+b[1]); if(diff<=0) diff+=1440;
  return `${Math.floor(diff/60)}시간 ${diff%60}분`;
}
function updateSleep(){ $('#sleepHrs').textContent=sleepText($('#bedTime').value,$('#wakeTime').value); }
$('#bedTime').addEventListener('input',updateSleep);
$('#wakeTime').addEventListener('input',updateSleep);

/* 끼니 */
function initMeals(){
  const wrap=$('#mealsWrap');
  wrap.innerHTML=MEALS.map(m=>`
    <div class="meal" id="meal-${m.id}" style="--mc:${m.color};--mc-bg:${m.bg}">
      <div class="meal-head">
        <span class="meal-title"><span class="me">${m.emoji}</span>${m.name}</span>
        <span class="meal-kcal" id="mkcal-${m.id}">0 kcal</span>
        <label class="skip" id="skiplbl-${m.id}"><input type="checkbox" class="skipChk" data-m="${m.id}"> 안 먹음</label>
      </div>
      <div class="meal-body">
        <div class="row-add labeled">
          <label class="fld grow"><span class="fl">🍴 음식</span>
            <input type="text" class="mName" data-m="${m.id}" placeholder="${m.name} 음식 (예: 김치찌개)" autocomplete="off"></label>
          <label class="fld" style="width:104px;flex:none"><span class="fl">🔥 칼로리</span>
            <input type="number" class="mKcal" data-m="${m.id}" placeholder="kcal" min="0"></label>
          <label class="fld" style="width:78px;flex:none"><span class="fl">🍚 인분</span>
            <input type="number" class="mQty" data-m="${m.id}" value="1" min="0.5" step="0.5"></label>
          <button class="btn btn-add mAdd" data-m="${m.id}" style="background:${m.color}">추가</button>
        </div>
        <div class="list mList" id="mlist-${m.id}"></div>
      </div>
    </div>`).join('');
  wrap.querySelectorAll('.mName').forEach(inp=>{
    const id=inp.dataset.m;
    attachAutocomplete(inp,(n,k)=>{ wrap.querySelector('.mKcal[data-m="'+id+'"]').value=k; });
  });
  wrap.querySelectorAll('.mAdd').forEach(btn=>btn.addEventListener('click',()=>addMealFood(btn.dataset.m)));
  wrap.querySelectorAll('.mKcal').forEach(inp=>inp.addEventListener('keydown',e=>{ if(e.key==='Enter') addMealFood(inp.dataset.m); }));
  wrap.querySelectorAll('.skipChk').forEach(chk=>chk.addEventListener('change',()=>{
    const id=chk.dataset.m; cur.meals[id].skipped=chk.checked;
    $('#meal-'+id).classList.toggle('skipped',chk.checked);
    $('#skiplbl-'+id).classList.toggle('on',chk.checked);
    renderMeal(id); renderDaySummary();
  }));
}
function addMealFood(id){
  const wrap=$('#mealsWrap');
  const name=wrap.querySelector('.mName[data-m="'+id+'"]').value.trim();
  const kcalI=wrap.querySelector('.mKcal[data-m="'+id+'"]'), qtyI=wrap.querySelector('.mQty[data-m="'+id+'"]');
  const kcal=+kcalI.value, qty=+qtyI.value||1;
  if(!name){ alert('음식 이름을 입력하세요.'); return; }
  if(!kcal||kcal<=0){ alert('칼로리를 입력하세요. (목록에 없으면 직접 입력)'); return; }
  cur.meals[id].foods.push({name,kcal:Math.round(kcal*qty),qty});
  wrap.querySelector('.mName[data-m="'+id+'"]').value=''; kcalI.value=''; qtyI.value=1;
  renderMeal(id); renderDaySummary();
}
function renderMeal(id){
  const m=MEALS.find(x=>x.id===id), box=$('#mlist-'+id), foods=cur.meals[id].foods;
  $('#mkcal-'+id).textContent=fmt(foods.reduce((s,f)=>s+f.kcal,0))+' kcal';
  if(!foods.length){ box.innerHTML='<div class="empty">아직 추가한 음식이 없어요.</div>'; return; }
  box.innerHTML=foods.map((f,i)=>`
    <div class="item"><div class="ic">${m.emoji}</div>
      <div class="meta"><div class="nm">${f.name}</div><div class="ds">${f.qty}인분</div></div>
      <div class="kcal intake">${fmt(f.kcal)} kcal</div>
      <button class="del" data-i="${i}" title="삭제">×</button></div>`).join('');
  box.querySelectorAll('.del').forEach(b=>b.addEventListener('click',()=>{ foods.splice(+b.dataset.i,1); renderMeal(id); renderDaySummary(); }));
}

/* 음주 */
$$('input[name=drinkStatus]').forEach(r=>r.addEventListener('change',()=>{
  const st=$('input[name=drinkStatus]:checked').value;
  cur.drink.status=st;
  $('#drinkBody').style.display=st==='none'?'none':'block';
  $('#planNote').style.display=st==='plan'?'block':'none';
  renderDaySummary();
}));
function initAlcohol(){
  $('#alcType').innerHTML=Object.keys(ALCOHOL).map(t=>`<option value="${t}">${ALCOHOL[t].emoji} ${t}</option>`).join('');
  fillAlcUnits();
  $('#alcType').addEventListener('change',fillAlcUnits);
}
function fillAlcUnits(){
  const units=ALCOHOL[$('#alcType').value].units;
  $('#alcUnit').innerHTML=Object.keys(units).map(u=>`<option value="${u}">${u}</option>`).join('');
}
$('#addAlc').addEventListener('click',()=>{
  const t=$('#alcType').value,u=$('#alcUnit').value,c=+$('#alcCount').value||1;
  cur.drink.drinks.push({type:t,emoji:ALCOHOL[t].emoji,unit:u,count:c,kcal:Math.round(ALCOHOL[t].units[u]*c)});
  $('#alcCount').value=1; renderAlc(); renderDaySummary();
});
function renderAlc(){
  const box=$('#alcList'),d=cur.drink.drinks;
  if(!d.length){ box.innerHTML='<div class="empty">마신/마실 술을 추가하세요.</div>'; return; }
  box.innerHTML=d.map((x,i)=>`
    <div class="item"><div class="ic">${x.emoji}</div>
      <div class="meta"><div class="nm">${x.type}</div><div class="ds">${x.count}${x.unit}</div></div>
      <div class="kcal intake">${fmt(x.kcal)} kcal</div>
      <button class="del" data-i="${i}" title="삭제">×</button></div>`).join('');
  box.querySelectorAll('.del').forEach(b=>b.addEventListener('click',()=>{ d.splice(+b.dataset.i,1); renderAlc(); renderDaySummary(); }));
}
$('#addAnju').addEventListener('click',()=>{
  const name=$('#anjuName').value.trim(), kcal=+$('#anjuKcal').value;
  if(!name){ alert('안주 이름을 입력하세요.'); return; }
  if(!kcal||kcal<=0){ alert('칼로리를 입력하세요.'); return; }
  cur.drink.snacks.push({name,kcal:Math.round(kcal)});
  $('#anjuName').value=''; $('#anjuKcal').value=''; renderAnju(); renderDaySummary();
});
function renderAnju(){
  const box=$('#anjuList'),s=cur.drink.snacks;
  if(!s.length){ box.innerHTML='<div class="empty">안주를 추가하세요.</div>'; return; }
  box.innerHTML=s.map((f,i)=>`
    <div class="item"><div class="ic">🥜</div>
      <div class="meta"><div class="nm">${f.name}</div><div class="ds">안주</div></div>
      <div class="kcal intake">${fmt(f.kcal)} kcal</div>
      <button class="del" data-i="${i}" title="삭제">×</button></div>`).join('');
  box.querySelectorAll('.del').forEach(b=>b.addEventListener('click',()=>{ s.splice(+b.dataset.i,1); renderAnju(); renderDaySummary(); }));
}

/* 운동 */
function initExChips(){
  const wrap=$('#exChips');
  wrap.innerHTML=EXERCISES.map((x,i)=>`<button class="chip" data-i="${i}">${x.e} ${x.n}</button>`).join('');
  wrap.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{
    wrap.querySelectorAll('.chip').forEach(z=>z.classList.remove('on')); c.classList.add('on');
    selectedEx=EXERCISES[+c.dataset.i];
    $('#exInputRow').style.display='flex';
    const cu=!!selectedEx.custom;
    $('#exNameWrap').style.display=cu?'block':'none';
    $('#exPicked').style.display=cu?'none':'flex';
    $('#exInten').style.display=cu?'block':'none';
    $('#exPicked').textContent=selectedEx.e+' '+selectedEx.n;
    $('#exMin').focus();
  }));
}
$('#addEx').addEventListener('click',()=>{
  if(!selectedEx){ alert('운동을 선택하세요.'); return; }
  const min=+$('#exMin').value; if(!min||min<=0){ alert('운동 시간(분)을 입력하세요.'); return; }
  const w=DB.profile?DB.profile.w:65;
  let met=selectedEx.met,name=selectedEx.n,emoji=selectedEx.e;
  if(selectedEx.custom){ const cn=$('#exCustom').value.trim(); if(!cn){ alert('어떤 운동을 했는지 입력하세요.'); return; } name=cn; met=+$('#exInten').value; }
  cur.exercises.push({name,emoji,min,kcal:Math.round(met*w*(min/60))});
  $('#exMin').value=''; $('#exCustom').value='';
  $('#exChips').querySelectorAll('.chip').forEach(z=>z.classList.remove('on'));
  $('#exInputRow').style.display='none'; selectedEx=null;
  renderExItems(); renderDaySummary();
});
function renderExItems(){
  const box=$('#exItems');
  if(!cur.exercises.length){ box.innerHTML='<div class="empty">아직 추가한 운동이 없어요.</div>'; return; }
  box.innerHTML=cur.exercises.map((x,i)=>`
    <div class="item"><div class="ic">${x.emoji||'🏃'}</div>
      <div class="meta"><div class="nm">${x.name}</div><div class="ds">${x.min}분</div></div>
      <div class="kcal burn">-${fmt(x.kcal)} kcal</div>
      <button class="del" data-i="${i}" title="삭제">×</button></div>`).join('');
  box.querySelectorAll('.del').forEach(b=>b.addEventListener('click',()=>{ cur.exercises.splice(+b.dataset.i,1); renderExItems(); renderDaySummary(); }));
}

/* 이동 */
$('#walkKm').addEventListener('input',renderDaySummary);
$('#bikeKm').addEventListener('input',renderDaySummary);

/* 하루 계산 */
function computeDay(){
  const w=DB.profile?DB.profile.w:65, bmr=DB.profile?DB.profile.bmr:0;
  let intake=0;
  MEALS.forEach(m=>{ if(!cur.meals[m.id].skipped) intake+=cur.meals[m.id].foods.reduce((s,f)=>s+f.kcal,0); });
  if(cur.drink.status!=='none'){
    intake+=cur.drink.drinks.reduce((s,x)=>s+x.kcal,0);
    intake+=cur.drink.snacks.reduce((s,x)=>s+x.kcal,0);
  }
  const exKcal=cur.exercises.reduce((s,x)=>s+x.kcal,0);
  const walk=(+$('#walkKm').value||0)*WALK_COEF*w, bike=(+$('#bikeKm').value||0)*BIKE_COEF*w;
  const burn=bmr+exKcal+walk+bike, net=burn-intake;
  return {intake,exKcal,move:walk+bike,burn,net,bmr};
}
function renderDaySummary(){
  const c=computeDay();
  $('#sumIntake').textContent=fmt(c.intake);
  $('#sumBurn').textContent=fmt(c.burn);
  const box=$('#balanceBox'),big=$('#balanceBig'),txt=$('#balanceTxt'),ic=$('#balanceIc');
  box.classList.remove('loss','gain','even');
  const planTxt=cur.drink.status==='plan'?' <span style="opacity:.85">(음주 예정 포함)</span>':'';
  const kg=Math.abs(c.net)/KCAL_PER_KG;
  if(!DB.profile){ box.classList.add('even'); big.textContent='기초대사량 필요'; txt.textContent='‘기초대사량’ 탭에서 내 정보를 먼저 입력하세요.'; ic.textContent='ℹ️'; return; }
  if(c.intake===0&&c.exKcal===0&&c.move===0){ box.classList.add('even'); big.textContent='±0 kcal'; txt.textContent='음식·운동·이동을 기록하면 결과가 표시됩니다.'; ic.textContent='📊'; return; }
  if(c.net>0){ box.classList.add('loss'); big.textContent='-'+fmt(c.net)+' kcal 적자'; txt.innerHTML='소모가 섭취보다 많아요! 약 <b>'+(kg*1000).toFixed(0)+'g</b> 감량 효과'+planTxt; ic.textContent='📉'; }
  else if(c.net<0){ box.classList.add('gain'); big.textContent='+'+fmt(-c.net)+' kcal 초과'; txt.innerHTML='섭취가 소모보다 많아요. 약 <b>'+(kg*1000).toFixed(0)+'g</b> 증가 가능성'+planTxt; ic.textContent='📈'; }
  else { box.classList.add('even'); big.textContent='±0 kcal'; txt.innerHTML='섭취와 소모가 균형을 이뤘어요.'+planTxt; ic.textContent='⚖️'; }
}

/* 날짜별 로드/저장 */
function renderDaily(){
  const date=$('#logDate').value||todayStr(); $('#logDate').value=date;
  const log=DB.logs[date], base=emptyDay();
  if(log){
    let drink=log.drink||base.drink;
    if(drink.status===undefined) drink={status:drink.did?'done':'none',drinks:drink.drinks||[],snacks:drink.snacks||[]}; // 구버전 호환
    cur=JSON.parse(JSON.stringify({
      bedTime:log.bedTime||base.bedTime, wakeTime:log.wakeTime||base.wakeTime,
      meals:log.meals||base.meals, drink:drink,
      walkKm:log.walkKm||0, bikeKm:log.bikeKm||0, exercises:log.exercises||[]
    }));
  } else cur=emptyDay();
  $('#bedTime').value=cur.bedTime; $('#wakeTime').value=cur.wakeTime; updateSleep();
  $('#walkKm').value=cur.walkKm||''; $('#bikeKm').value=cur.bikeKm||'';
  $('#dk-'+cur.drink.status).checked=true;
  $('#drinkBody').style.display=cur.drink.status==='none'?'none':'block';
  $('#planNote').style.display=cur.drink.status==='plan'?'block':'none';
  MEALS.forEach(m=>{
    const chk=$('.skipChk[data-m="'+m.id+'"]'); chk.checked=cur.meals[m.id].skipped;
    $('#meal-'+m.id).classList.toggle('skipped',cur.meals[m.id].skipped);
    $('#skiplbl-'+m.id).classList.toggle('on',cur.meals[m.id].skipped);
    renderMeal(m.id);
  });
  renderAlc(); renderAnju(); renderExItems(); renderDaySummary();
}
$('#logDate').addEventListener('change',renderDaily);

$('#saveDay').addEventListener('click',()=>{
  if(!DB.profile){ alert('먼저 기초대사량 탭에서 내 정보를 입력하세요.'); goTab('profile'); return; }
  const date=$('#logDate').value||todayStr(), c=computeDay();
  cur.bedTime=$('#bedTime').value; cur.wakeTime=$('#wakeTime').value;
  cur.walkKm=+$('#walkKm').value||0; cur.bikeKm=+$('#bikeKm').value||0;
  DB.logs[date]=Object.assign({date},JSON.parse(JSON.stringify(cur)),{intake:c.intake,burn:c.burn,net:c.net,bmr:c.bmr,sleep:sleepText(cur.bedTime,cur.wakeTime)});
  saveDB(DB);
  const t=$('#todayPill'); t.textContent='저장 완료 ✓'; t.style.background='var(--green-bg)'; t.style.color='var(--green)'; t.style.borderColor='#bbf7d0';
  setTimeout(updateTodayPill,1600);
});

/* ===================== PAGE 3 : STATS ===================== */
let curRange=7;
$$('#rangeToggle button').forEach(b=>b.addEventListener('click',()=>{
  $$('#rangeToggle button').forEach(z=>z.classList.remove('active')); b.classList.add('active'); curRange=+b.dataset.range; renderStats();
}));
function lastNDates(n){ const a=[],d=new Date(); for(let i=n-1;i>=0;i--){const t=new Date(d);t.setDate(d.getDate()-i);
  a.push(`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`);} return a; }

function renderStats(){
  const dates=lastNDates(curRange);
  const data=dates.map(dt=>{const l=DB.logs[dt];return {date:dt,intake:l?l.intake:0,burn:l?l.burn:0,net:l?l.net:0,has:!!l};});
  drawChart(data);
  const logged=data.filter(d=>d.has), days=logged.length;
  const totNet=logged.reduce((s,d)=>s+d.net,0);
  const avgIntake=days?logged.reduce((s,d)=>s+d.intake,0)/days:0;
  const avgNet=days?totNet/days:0, kgTotal=totNet/KCAL_PER_KG;
  $('#statSummary').innerHTML=`
    <div class="mini"><div class="k">기록한 날</div><div class="v">${days}<small style="font-size:13px">일</small></div></div>
    <div class="mini"><div class="k">일 평균 섭취</div><div class="v">${fmt(avgIntake)}</div></div>
    <div class="mini"><div class="k">예상 체중변화</div><div class="v" style="color:${kgTotal>=0?'var(--emerald-600)':'var(--coral-600)'}">${kgTotal>=0?'-':'+'}${Math.abs(kgTotal).toFixed(2)}<small style="font-size:13px">kg</small></div></div>`;
  renderAdvice(days,avgNet,kgTotal,logged);
  renderProducts();
}
function drawChart(data){
  const W=Math.max(data.length*46+40,320),H=220,pad=28;
  const maxV=Math.max(1000,...data.map(d=>Math.max(d.intake,d.burn)));
  const bw=(W-pad*2)/data.length; let bars='',labels='';
  data.forEach((d,i)=>{
    const x=pad+i*bw+bw/2, base=H-24;
    const inH=(d.intake/maxV)*(H-pad-24), buH=(d.burn/maxV)*(H-pad-24), w2=Math.min(13,bw/2-3);
    bars+=`<rect x="${x-w2-1}" y="${base-inH}" width="${w2}" height="${inH}" rx="3" fill="#fb5573" class="bar" data-t="${dateLabel(d.date)} · 섭취 ${fmt(d.intake)}kcal"></rect>`;
    bars+=`<rect x="${x+1}" y="${base-buH}" width="${w2}" height="${buH}" rx="3" fill="#10b981" class="bar" data-t="${dateLabel(d.date)} · 소모 ${fmt(d.burn)}kcal"></rect>`;
    if(data.length<=10||i%Math.ceil(data.length/10)===0) labels+=`<text x="${x}" y="${H-6}" text-anchor="middle" font-size="10" fill="#94a3b8">${dateLabel(d.date)}</text>`;
  });
  let grid=''; for(let g=0;g<=2;g++){const y=24+(g*(H-pad-24)/2),val=Math.round(maxV*(2-g)/2);
    grid+=`<line x1="${pad-6}" y1="${y}" x2="${W-6}" y2="${y}" stroke="#eef2f7"/><text x="${pad-9}" y="${y+3}" text-anchor="end" font-size="9" fill="#cbd5e1">${val}</text>`;}
  $('#chart').innerHTML=`<svg width="${W}" height="${H}" style="max-width:100%;font-family:Pretendard">${grid}${bars}${labels}</svg>`;
  const tip=$('#tooltip');
  $('#chart').querySelectorAll('.bar').forEach(r=>{
    r.style.cursor='pointer';
    r.addEventListener('mousemove',e=>{tip.textContent=r.dataset.t;tip.style.opacity=1;tip.style.left=(e.clientX+12)+'px';tip.style.top=(e.clientY-10)+'px';});
    r.addEventListener('mouseleave',()=>tip.style.opacity=0);
  });
}
function renderProducts(){
  const goal=DB.profile?(DB.profile.goal||'lose'):'lose';
  const list=PRODUCTS[goal]||PRODUCTS.lose;
  // ↓↓↓ 배포 후 쿠팡 파트너스 링크 연결: data-href에 발급받은 링크를 넣고 prod 클릭 시 window.open(p.href) 처리 ↓↓↓
  $('#prodGrid').innerHTML=list.map(p=>`
    <div class="prod" title="배포 후 쿠팡 파트너스 링크가 연결됩니다">
      <div class="prod-emo">${p.emo}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-why">${p.why}</div>
      <div class="prod-cta">보러가기 →</div>
    </div>`).join('');
}
function renderAdvice(days,avgNet,kgTotal,logged){
  const wrap=$('#adviceWrap');
  if(days===0){ wrap.innerHTML='<div class="empty" style="padding:26px 0">아직 기록이 없어요.<br>‘오늘 기록’에서 식단·운동을 저장하면<br>여기에 추세 분석과 목표 맞춤 추천이 표시됩니다.</div>'; return; }
  const goal=DB.profile?(DB.profile.goal||'lose'):'lose';
  const foodTotals={};
  logged.forEach(d=>{const l=DB.logs[d.date]; if(!l.meals) return;
    Object.values(l.meals).forEach(mm=>{ if(!mm.skipped)(mm.foods||[]).forEach(f=>foodTotals[f.name]=(foodTotals[f.name]||0)+f.kcal); });
    if(l.drink&&l.drink.status&&l.drink.status!=='none'){ (l.drink.snacks||[]).forEach(f=>foodTotals[f.name]=(foodTotals[f.name]||0)+f.kcal); }
  });
  const topFoods=Object.entries(foodTotals).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const a=goalAdvice(goal,avgNet,kgTotal,topFoods);
  let meal='';
  if(a.showMeal){
    meal='<div style="margin-top:16px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:16px">'+
      '<div style="font-weight:900;font-size:14px;margin-bottom:10px;color:var(--blue-700)">'+a.mealTitle+'</div>'+
      '<div style="font-size:13px;color:var(--slate-700);line-height:1.9">'+a.mealBody+'</div></div>';
  }
  wrap.innerHTML='<div class="advice '+a.cls+'"><h3>'+a.emoji+' '+a.title+'</h3><p>'+a.msg+'</p>'+
    (a.tips.length?'<ul>'+a.tips.map(t=>'<li>'+t+'</li>').join('')+'</ul>':'')+meal+'</div>';
}

/* 목표 맞춤 조언 */
function goalAdvice(goal,avgNet,kgTotal,topFoods){
  const N=fmt(Math.abs(avgNet)), KG=Math.abs(kgTotal).toFixed(2);
  const cutFoods=topFoods.length?topFoods.map(p=>'<b>'+p[0]+'</b> (누적 '+fmt(p[1])+'kcal) 섭취 빈도/양을 줄여보세요.'):[];
  const loseMeal={mealTitle:'🥗 추천 저칼로리 하루 식단 (약 1,300kcal)',
    mealBody:'<b>🌅 아침</b> · 그릭요거트 + 바나나 + 아몬드 (약 330kcal)<br><b>☀️ 점심</b> · 현미밥 半공기 + 닭가슴살 + 샐러드 (약 480kcal)<br><b>🌙 저녁</b> · 두부 + 계란 + 나물 / 가벼운 국 (약 400kcal)<br><b>🌃 야식</b> · 방울토마토·블루베리 또는 삶은계란 (약 90kcal)'};
  const gainMeal={mealTitle:'🍗 추천 증량(벌크업) 하루 식단 (약 2,600kcal)',
    mealBody:'<b>🌅 아침</b> · 잡곡밥 + 계란 3개 + 닭가슴살 (약 650kcal)<br><b>☀️ 점심</b> · 소고기덮밥 + 우유 (약 800kcal)<br><b>🌙 저녁</b> · 현미밥 + 연어/닭다리 + 채소 (약 750kcal)<br><b>🏋️ 운동 후</b> · 프로틴 쉐이크 + 바나나 (약 400kcal)'};

  if(goal==='lose'){
    if(avgNet>=1100) return {cls:'warn',emoji:'⚠️',title:'감량 중이지만 너무 적게 먹고 있어요',
      msg:'하루 평균 <b>'+N+'kcal 적자</b>예요. 과한 결핍은 근손실·요요·기초대사량 저하를 부를 수 있어요. 하루 적자는 <b>300~600kcal</b>가 건강해요.',
      tips:['단백질을 충분히 챙겨 근육을 지키세요.','극단적 단식보다 규칙적인 세 끼를 권장해요.','어지럼·피로가 있다면 섭취를 늘리세요.'],showMeal:false};
    if(avgNet>=300) return {cls:'good',emoji:'🎉',title:'완벽해요! 이대로 유지하세요',
      msg:'하루 평균 <b>'+N+'kcal 적자</b>로 이상적인 감량 페이스예요. 이 기간 약 <b>'+KG+'kg</b> 감량 효과가 예상돼요. 지금 습관을 그대로 이어가세요!',
      tips:['지금의 식사·운동 루틴을 꾸준히 유지하세요.','주 2회 이상 근력운동을 더하면 효과가 좋아져요.','하루 1.5~2L 수분 섭취도 잊지 마세요.'],showMeal:false};
    if(avgNet>=0) return {cls:'warn',emoji:'💪',title:'아직 유지 중 — 감량하려면 조금만 더!',
      msg:'섭취와 소모가 거의 균형(<b>일 평균 '+N+'kcal</b>)이에요. 감량이 목표라면 하루 <b>300~500kcal</b>를 더 줄이거나 더 움직여 보세요.',
      tips:['저녁 탄수화물을 한 끼 줄여보세요.','하루 30분 빠르게 걷기만 더해도 적자가 생겨요.','음료·간식·야식·술 칼로리부터 점검하세요.'],showMeal:true,...loseMeal};
    return {cls:'bad',emoji:'🍩',title:'감량 목표인데 섭취가 많아요',
      msg:'하루 평균 <b>'+N+'kcal 초과</b>로, 이대로면 약 <b>'+KG+'kg</b> 증가가 예상돼요. 아래 추천대로 줄여보세요.',
      tips:cutFoods.concat(['튀김·면·단 음료·야식·술을 줄이고 같은 메뉴면 양을 1인분으로.','하루 30~40분 유산소(빠른 걷기·자전거)를 추가하세요.']),showMeal:true,...loseMeal};
  }
  if(goal==='keep'){
    if(Math.abs(avgNet)<=200) return {cls:'good',emoji:'🎯',title:'체중 유지 완벽! 균형이 잘 맞아요',
      msg:'섭취와 소모가 거의 균형(<b>일 평균 '+(avgNet>=0?'-':'+')+N+'kcal</b>)이에요. 유지 목표에 딱 맞는 페이스예요. 지금처럼만 하세요!',
      tips:['규칙적인 식사 시간을 지켜 컨디션을 유지하세요.','주 3회 운동으로 근육량을 지키세요.','주말 과식·과음만 주의하면 충분해요.'],showMeal:false};
    if(avgNet>200) return {cls:'warn',emoji:'📉',title:'유지 목표인데 살이 빠지고 있어요',
      msg:'하루 평균 <b>'+N+'kcal 적자</b>로 체중이 줄어드는 추세예요. 유지가 목표라면 끼니를 조금 더 챙겨 균형을 맞추세요.',
      tips:['단백질·복합탄수를 한 끼 더 추가하세요.','과한 유산소는 살짝 줄여도 좋아요.','체중·컨디션을 함께 체크하세요.'],showMeal:false};
    return {cls:'bad',emoji:'📈',title:'유지 목표인데 체중이 늘 수 있어요',
      msg:'하루 평균 <b>'+N+'kcal 초과</b>로 이대로면 약 <b>'+KG+'kg</b> 증가가 예상돼요. 균형을 위해 조금 줄여보세요.',
      tips:cutFoods.concat(['야식·음주 빈도를 줄여보세요.','평소보다 10~20분 더 걸어 균형을 맞추세요.']),showMeal:false};
  }
  /* gain */
  if(avgNet<=-200) return {cls:'good',emoji:'💪',title:'증량 페이스 좋아요!',
    msg:'하루 평균 <b>'+N+'kcal 잉여</b>로 근육 증량에 적합한 페이스예요. 충분한 단백질과 근력운동을 병행하면 효과가 좋아요.',
    tips:['체중 1kg당 단백질 1.6~2g을 목표로 하세요.','주 3~4회 점진적 과부하 근력운동을 하세요.','잉여 칼로리는 양질의 탄수·단백질로 채우세요.'],showMeal:false};
  if(avgNet<=200) return {cls:'warn',emoji:'🍚',title:'증량하려면 조금 더 먹어야 해요',
    msg:'섭취와 소모가 거의 균형(<b>일 평균 '+(avgNet>=0?'-':'+')+N+'kcal</b>)이라 증량 속도가 더뎌요. 하루 <b>300~500kcal</b>를 더 채워보세요.',
    tips:['끼니마다 단백질·탄수를 한 줌씩 더하세요.','운동 후 프로틴·바나나로 보충하세요.','잦은 유산소는 살짝 줄여도 좋아요.'],showMeal:true,...gainMeal};
  return {cls:'bad',emoji:'⚠️',title:'증량 목표인데 칼로리가 부족해요',
    msg:'하루 평균 <b>'+N+'kcal 적자</b> 상태로는 근육이 늘기 어려워요. 섭취를 늘려 잉여 상태를 만들어야 해요.',
    tips:['끼니를 거르지 말고 간식·보충제를 추가하세요.','유산소보다 근력운동 비중을 높이세요.','자기 전 단백질 간식도 도움이 돼요.'],showMeal:true,...gainMeal};
}

/* ===================== 공유 ===================== */
function baseURL(){ return location.origin && location.origin!=='null' ? (location.origin+location.pathname) : location.href.split('#')[0]; }
function shareToast(msg){
  const t=$('#shareToast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('show'),2600);
}
async function doShare(title,text,url){
  const full=text+'\n'+url;
  // 1) 네이티브 공유 시트 (모바일/지원 브라우저)
  if(navigator.share){
    try{ await navigator.share({title,text,url}); return; }catch(e){ if(e&&e.name==='AbortError') return; }
  }
  // 2) 클립보드 복사
  try{ await navigator.clipboard.writeText(full); shareToast('📋 링크가 복사됐어요! 카톡·문자에 붙여넣어 보내세요'); return; }catch(e){}
  // 3) 폴백: 선택 복사
  try{
    const ta=document.createElement('textarea'); ta.value=full; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    shareToast('📋 링크가 복사됐어요!'); return;
  }catch(e){}
  prompt('아래 내용을 복사해 공유하세요:', full);
}
function shareMyResult(){
  const url=baseURL()+'#stats';
  let text;
  if(DB.profile){
    const c=computeDay();
    const goalTxt={lose:'감량',keep:'유지',gain:'증량'}[DB.profile.goal||'lose'];
    const net=c.net>0?('오늘 -'+fmt(c.net)+'kcal 적자 📉'):(c.net<0?('오늘 +'+fmt(-c.net)+'kcal 초과 📈'):'오늘 균형 ⚖️');
    text='🔥 칼로리데이 - 나의 기록\n'
        +'· 기초대사량 '+fmt(DB.profile.bmr)+'kcal · BMI '+DB.profile.bmi.toFixed(1)+' ('+goalTxt+' 목표)\n'
        +'· 섭취 '+fmt(c.intake)+'kcal / 소모 '+fmt(c.burn)+'kcal → '+net+'\n'
        +'나도 칼로리 기록하러 가기 👇';
  }else{
    text='🔥 칼로리데이로 내 기초대사량과 칼로리 수지를 기록 중이에요!\n나도 확인하러 가기 👇';
  }
  doShare('칼로리데이 - 내 결과','📊 내 칼로리 결과 공유!\n'+text,url);
}
function shareToFriend(){
  const url=baseURL(); // 메인(시작) 화면으로
  const text='🔥 칼로리데이\n기초대사량부터 끼니별 식단·운동·수면·음주까지\n하루 1분이면 칼로리 수지를 한눈에! 다이어트 같이 해보자 💪\n👇 지금 시작하기';
  doShare('칼로리데이 추천',text,url);
}
$('#shareResult').addEventListener('click',shareMyResult);
$('#shareFriend').addEventListener('click',shareToFriend);

/* 오늘 날짜 */
function updateTodayPill(){
  const d=new Date(),w=['일','월','화','수','목','금','토'][d.getDay()];
  const t=$('#todayPill'); t.textContent=(d.getMonth()+1)+'월 '+d.getDate()+'일 ('+w+')';
  t.style.background='var(--blue-50)'; t.style.color='var(--blue-700)'; t.style.borderColor='var(--blue-100)';
}

/* ===================== INIT ===================== */
(function init(){
  updateTodayPill(); initMeals(); initAlcohol(); initExChips();
  attachAutocomplete($('#anjuName'),(n,k)=>{ $('#anjuKcal').value=k; });
  $('#logDate').value=todayStr();
  if(DB.profile) fillProfileForm();
  checkProfile(); renderDaily();
  // 공유 링크로 진입 시: 결과(#stats/#result)면 시작화면 건너뛰고 통계로
  const h=(location.hash||'').toLowerCase();
  if(h==='#stats'||h==='#result'){ startApp(); goTab('stats'); }
})();
