# 📚 음식 월드컵 프로젝트 학습 가이드

## 목차
1. [Firebase 관련 코드](#1-firebase-관련-코드)
2. [JavaScript 기본 개념](#2-javascript-기본-개념)
3. [LocalStorage](#3-localstorage)
4. [게임 로직](#4-게임-로직)
5. [에러 핸들링](#5-에러-핸들링)
6. [HTML 변경사항](#6-html-변경사항)
7. [학습 우선순위](#7-학습-우선순위)

---

## 1. Firebase 관련 코드

### 🔍 Firebase 공식문서 보는 법

Firebase 공식문서에는 여러 플랫폼별 탭이 있습니다:

```
[ Web modular API ] [ Web namespaced API ] [ Swift ] [ Objective-C ] [ Kotlin ] [ C++ ]
```

**중요**: 우리 프로젝트는 **"Web modular API"**를 사용합니다!
- **"JavaScript"라는 탭은 없습니다**
- **"Web modular API" = 최신 JavaScript (ES6 모듈 방식)**
- **"Web namespaced API" = 구버전 JavaScript (레거시)**

#### Web modular API vs Web namespaced API 비교

| 구분 | Web modular API (우리가 사용) | Web namespaced API (구버전) |
|------|------------------------------|----------------------------|
| 방식 | ES6 모듈 import | 전역 객체 방식 |
| 번들 크기 | 작음 (Tree-shaking 지원) | 큼 (전체 라이브러리) |
| 사용 연도 | 2020년 이후 | 2020년 이전 |
| 추천 여부 | ✅ 권장 (최신) | ⚠️ 레거시 (유지보수만) |

**예시 비교**:
```javascript
// ✅ Web modular API (우리가 사용하는 방식)
import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

// ⚠️ Web namespaced API (구버전)
db.collection("cities").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
});
```

**공식문서 링크**:
- [Firebase 공식문서 - Get Started](https://firebase.google.com/docs/web/setup)
- [Firestore Get Data](https://firebase.google.com/docs/firestore/query-data/get-data) - 상단의 "Web modular API" 탭 선택

---

### 📖 공식문서에서 복사한 부분

#### `index.html:88-100` - Firebase SDK Import
```javascript
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    increment,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
```

**📚 학습 자료**: [Firebase 공식문서 - Get Started](https://firebase.google.com/docs/web/setup)

**설명**:
- CDN을 통해 Firebase 모듈을 직접 import
- ES6 모듈 방식 사용

---

#### `index.html:102-127` - Firebase 초기화 및 Export
```javascript
// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBHQAFiTUNFAk6XEDPo164isKbcqyrN_ls',
    authDomain: 'foodidealworldcup.firebaseapp.com',
    projectId: 'foodidealworldcup',
    storageBucket: 'foodidealworldcup.firebasestorage.app',
    messagingSenderId: '393852437251',
    appId: '1:393852437251:web:5f9145604d0d63062a5f36',
    measurementId: 'G-0SEHRJXXS1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export to window for use in script.js
window.db = db;
window.firestoreFunctions = {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    increment,
};
```

**설명**:
- `firebaseConfig`: Firebase 콘솔에서 제공하는 설정
- `window` 객체에 export: `script.js`에서 사용하기 위함
- ES6 모듈과 일반 스크립트 간 데이터 공유 방법

---

#### `script.js:6-22` - Firestore에서 컬렉션 데이터 읽기
```javascript
async function loadFoods() {
    try {
        const { collection, getDocs } = window.firestoreFunctions;
        const foodsSnapshot = await getDocs(collection(window.db, 'foods'));
        foods = [];
        foodsSnapshot.forEach((doc) => {
            foods.push(doc.data());
        });
        foods.sort((a, b) => a.id - b.id); // ID 순으로 정렬
        console.log('음식 데이터 로드 완료:', foods.length);
        return foods;
    } catch (error) {
        console.error('음식 데이터 로드 실패:', error);
        return getFallbackFoods();
    }
}
```

**📚 학습 자료**: [Firestore 공식문서 - Get Data](https://firebase.google.com/docs/firestore/query-data/get-data)

**핵심 개념**:
- `collection(db, 'foods')`: `foods` 컬렉션 참조
- `getDocs()`: 컬렉션의 **모든 문서** 가져오기
- `doc.data()`: 문서 데이터 추출
- `foodsSnapshot.forEach()`: 각 문서 순회

---

#### `script.js:90-118` - Firestore에서 단일 문서 읽기
```javascript
async function getStats() {
    try {
        const { collection, doc, getDoc } = window.firestoreFunctions;
        const statsRef = doc(window.db, 'statistics', 'global');
        const statsDoc = await getDoc(statsRef);

        if (statsDoc.exists()) {
            return statsDoc.data();
        } else {
            // 초기 데이터 생성
            const initialStats = {
                totalGames: 0,
                foods: {},
            };
            foods.forEach((food) => {
                initialStats.foods[food.id] = {
                    name: food.name,
                    winCount: 0,
                    selectCount: 0,
                };
            });
            return initialStats;
        }
    } catch (error) {
        console.error('통계 가져오기 실패:', error);
        return getStatsFromLocalStorage();
    }
}
```

**핵심 개념**:
- `doc(db, 'statistics', 'global')`: 특정 문서 참조
- `getDoc()`: **단일 문서** 읽기
- `statsDoc.exists()`: 문서 존재 여부 확인
- Fallback 전략: Firebase 실패 시 LocalStorage 사용

---

#### `script.js:156-166` - Firestore 데이터 업데이트 (increment)
```javascript
async function incrementSelectCount(foodId) {
    try {
        const { doc, updateDoc, increment } = window.firestoreFunctions;
        const statsRef = doc(window.db, 'statistics', 'global');
        await updateDoc(statsRef, {
            [`foods.${foodId}.selectCount`]: increment(1),
        });
    } catch (error) {
        console.error('선택 카운트 증가 실패:', error);
    }
}
```

**📚 학습 자료**: [Firestore 공식문서 - Update Data](https://firebase.google.com/docs/firestore/manage-data/add-data#update-data)

**핵심 개념**:
- `updateDoc()`: 문서의 일부 필드만 업데이트
- `increment(1)`: 숫자 필드를 원자적으로 1 증가
- 템플릿 리터럴로 중첩 필드 접근: `foods.${foodId}.selectCount`
- 동시성 문제 해결: 여러 사용자가 동시에 접근해도 안전

---

#### `script.js:141-153` - Firestore 데이터 저장 (setDoc)
```javascript
async function saveStats(stats) {
    try {
        const { doc, setDoc } = window.firestoreFunctions;
        const statsRef = doc(window.db, 'statistics', 'global');
        await setDoc(statsRef, stats);
        // 동시에 로컬스토리지에도 저장
        localStorage.setItem('food_worldcup_stats', JSON.stringify(stats));
    } catch (error) {
        console.error('통계 저장 실패:', error);
        localStorage.setItem('food_worldcup_stats', JSON.stringify(stats));
    }
}
```

**핵심 개념**:
- `setDoc()`: 문서 전체를 덮어쓰기 (없으면 생성)
- `updateDoc()` vs `setDoc()`:
  - `updateDoc`: 일부 필드만 수정 (문서가 없으면 에러)
  - `setDoc`: 문서 전체 교체 (문서가 없으면 생성)

---

### Firebase 함수 요약

| 함수 | 용도 | 사용 위치 |
|------|------|-----------|
| `getDoc()` | 단일 문서 읽기 | `script.js:94` |
| `getDocs()` | 컬렉션 전체 읽기 | `script.js:9, 28` |
| `setDoc()` | 문서 생성/교체 | `script.js:145` |
| `updateDoc()` | 문서 일부 업데이트 | `script.js:160, 173` |
| `increment()` | 숫자 원자적 증가 | `script.js:161, 174` |
| `collection()` | 컬렉션 참조 | `script.js:9, 28` |
| `doc()` | 문서 참조 | `script.js:93, 144` |

---

## 2. JavaScript 기본 개념

### ✅ 반드시 이해해야 할 부분

#### 2.1 async/await - 비동기 처리
```javascript
// script.js:6
async function loadFoods() {
    const foodsSnapshot = await getDocs(...);
    return foods;
}
```

**📚 학습 자료**: [MDN - async/await](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

**핵심 개념**:
- `async`: 함수가 Promise를 반환함을 명시
- `await`: Promise가 완료될 때까지 대기
- 동기 코드처럼 작성하지만 비동기로 동작

**예시**:
```javascript
// ❌ 잘못된 방법 (await 없음)
function loadFoods() {
    const foodsSnapshot = getDocs(...); // Promise 객체가 반환됨
    console.log(foodsSnapshot); // Promise { <pending> }
}

// ✅ 올바른 방법
async function loadFoods() {
    const foodsSnapshot = await getDocs(...); // 실제 데이터 대기
    console.log(foodsSnapshot); // QuerySnapshot 객체
}
```

---

#### 2.2 배열 셔플 (Fisher-Yates 알고리즘)
```javascript
// script.js:183-190
function shuffle(array) {
    const newArray = [...array];  // 스프레드 연산자로 복사
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];  // 구조 분해 할당
    }
    return newArray;
}
```

**📚 학습 자료**:
- [MDN - Spread Syntax](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN - Destructuring](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Fisher-Yates 알고리즘 (Wikipedia)](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)

**핵심 개념**:
1. **스프레드 연산자** (`...`): 배열 복사 (원본 변경 방지)
2. **구조 분해 할당**: 변수 swap을 간결하게 표현
3. **랜덤 알고리즘**: 공정한 셔플 보장

**단계별 설명**:
```javascript
// 예시: [A, B, C, D] 셔플
const array = ['A', 'B', 'C', 'D'];

// 1단계: 배열 복사
const newArray = [...array]; // ['A', 'B', 'C', 'D']

// 2단계: i=3, j=랜덤(0~3), 예: j=1
// ['A', 'B', 'C', 'D'] → ['A', 'D', 'C', 'B']

// 3단계: i=2, j=랜덤(0~2), 예: j=0
// ['A', 'D', 'C', 'B'] → ['C', 'D', 'A', 'B']

// 4단계: i=1, j=랜덤(0~1), 예: j=1
// ['C', 'D', 'A', 'B'] → ['C', 'D', 'A', 'B']

// 결과: ['C', 'D', 'A', 'B']
```

---

#### 2.3 DOM 조작 - 화면 전환
```javascript
// script.js:193-198
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach((screen) => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}
```

**📚 학습 자료**: [MDN - DOM 조작](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model)

**핵심 개념**:
- `querySelectorAll('.screen')`: CSS 선택자로 **모든** `.screen` 요소 선택
- `forEach()`: NodeList 순회
- `classList.remove('active')`: 모든 화면에서 `active` 클래스 제거
- `getElementById()`: 특정 ID의 요소 선택
- `classList.add('active')`: 해당 화면에만 `active` 클래스 추가

**동작 원리**:
```html
<!-- 초기 상태 -->
<div id="start-screen" class="screen active">시작 화면</div>
<div id="game-screen" class="screen">게임 화면</div>

<!-- showScreen('game-screen') 호출 후 -->
<div id="start-screen" class="screen">시작 화면</div>
<div id="game-screen" class="screen active">게임 화면</div>
```

---

#### 2.4 이벤트 리스너 - 페이지 로드 시 실행
```javascript
// script.js:201-213
window.addEventListener('DOMContentLoaded', async () => {
    console.log('페이지 로드 시작...');

    // 음식 및 식당 데이터 로드
    await loadFoods();
    await loadRestaurants();

    // 통계 표시
    const stats = await getStats();
    document.getElementById('total-games').textContent = stats.totalGames;

    console.log('초기화 완료');
});
```

**📚 학습 자료**: [MDN - EventTarget.addEventListener()](https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener)

**핵심 개념**:
- `DOMContentLoaded`: HTML 파싱 완료 시 실행 (이미지 로드 전)
- `load` vs `DOMContentLoaded`:
  - `load`: 모든 리소스(이미지, CSS 등) 로드 완료 후
  - `DOMContentLoaded`: HTML만 파싱 완료되면 실행 (더 빠름)
- `await`로 순차 실행: 데이터 로드 → 통계 표시

---

#### 2.5 배열 메서드 - 객체 변환 및 정렬
```javascript
// script.js:362
const foodsArray = Object.values(stats.foods);
```

**📚 학습 자료**: [MDN - Object.values()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

**동작 예시**:
```javascript
// 원본 데이터
const stats = {
    foods: {
        1: { name: '돼지찌개', winCount: 5 },
        2: { name: '국밥', winCount: 3 }
    }
};

// Object.values() 사용
const foodsArray = Object.values(stats.foods);
// 결과: [
//   { name: '돼지찌개', winCount: 5 },
//   { name: '국밥', winCount: 3 }
// ]
```

---

#### 2.6 배열 메서드 체이닝 - 정렬 및 슬라이스
```javascript
// script.js:368-370
const topWinners = foodsArray
    .sort((a, b) => b.winCount - a.winCount)  // 내림차순 정렬
    .slice(0, 5);  // 상위 5개만
```

**📚 학습 자료**:
- [MDN - Array.prototype.sort()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [MDN - Array.prototype.slice()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

**핵심 개념**:
- **메서드 체이닝**: 여러 메서드를 연결해서 사용
- `sort((a, b) => b.winCount - a.winCount)`:
  - `b - a`: 내림차순 (큰 값부터)
  - `a - b`: 오름차순 (작은 값부터)
- `slice(0, 5)`: 인덱스 0~4 (5개) 추출

**예시**:
```javascript
const foods = [
    { name: '치킨', winCount: 3 },
    { name: '피자', winCount: 7 },
    { name: '햄버거', winCount: 5 }
];

const top2 = foods
    .sort((a, b) => b.winCount - a.winCount)
    .slice(0, 2);

// 결과: [
//   { name: '피자', winCount: 7 },
//   { name: '햄버거', winCount: 5 }
// ]
```

---

#### 2.7 동적 HTML 생성
```javascript
// script.js:330-338
const item = document.createElement('div');
item.className = 'restaurant-item';
item.innerHTML = `
    <span>${restaurant.name}</span>
    <button class="btn-map" onclick="window.open('${restaurant.mapUrl}', '_blank')">
        지도보기
    </button>
`;
restaurantList.appendChild(item);
```

**📚 학습 자료**: [MDN - createElement()](https://developer.mozilla.org/ko/docs/Web/API/Document/createElement)

**핵심 개념**:
- `createElement('div')`: 새 DOM 요소 생성
- `innerHTML`: HTML 문자열로 내용 설정
- **템플릿 리터럴** (백틱): 변수 삽입 가능
- `appendChild()`: 부모 요소에 자식 추가

**⚠️ 보안 주의**:
```javascript
// ❌ XSS 공격 취약
item.innerHTML = `<span>${userInput}</span>`;

// ✅ 안전한 방법
const span = document.createElement('span');
span.textContent = userInput;  // HTML 태그가 문자열로 처리됨
item.appendChild(span);
```

---

#### 2.8 조건(삼항) 연산자
```javascript
// script.js:260
const selectedIndex = gameState.matchIndex * 2 + (side === 'left' ? 0 : 1);
```

**📚 학습 자료**: [MDN - Conditional Operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_operator)

**동작 원리**:
```javascript
// 삼항 연산자: 조건 ? 참일때값 : 거짓일때값
side === 'left' ? 0 : 1

// 동일한 if-else
let offset;
if (side === 'left') {
    offset = 0;
} else {
    offset = 1;
}
```

---

## 3. LocalStorage

### 브라우저 저장소 사용
```javascript
// script.js:122
const stats = localStorage.getItem('food_worldcup_stats');
localStorage.setItem('food_worldcup_stats', JSON.stringify(stats));
```

**📚 학습 자료**: [MDN - Web Storage API](https://developer.mozilla.org/ko/docs/Web/API/Web_Storage_API)

**핵심 개념**:
- `localStorage`: 브라우저에 영구 저장 (삭제하지 않는 한 유지)
- `sessionStorage`: 탭을 닫으면 삭제
- **문자열만 저장 가능**: 객체는 `JSON.stringify()` 필요

**주요 메서드**:
```javascript
// 저장
localStorage.setItem('key', 'value');

// 읽기
const value = localStorage.getItem('key');

// 삭제
localStorage.removeItem('key');

// 전체 삭제
localStorage.clear();

// 객체 저장/읽기
const obj = { name: '치킨', count: 5 };
localStorage.setItem('data', JSON.stringify(obj));  // 저장
const savedObj = JSON.parse(localStorage.getItem('data'));  // 읽기
```

**사용 예시 (이 프로젝트)**:
```javascript
// script.js:121-138
function getStatsFromLocalStorage() {
    const stats = localStorage.getItem('food_worldcup_stats');
    if (!stats) {
        // 데이터가 없으면 초기값 생성
        const initialStats = {
            totalGames: 0,
            foods: {},
        };
        return initialStats;
    }
    return JSON.parse(stats);  // 문자열 → 객체 변환
}
```

---

## 4. 게임 로직

### 직접 설계한 부분 (비즈니스 로직)

#### 4.1 상태 관리
```javascript
// script.js:81-87
let gameState = {
    currentRound: [],    // 현재 라운드 참가자
    nextRound: [],       // 다음 라운드 진출자
    matchIndex: 0,       // 현재 매치 인덱스
    totalMatches: 0,     // 총 매치 수
    roundName: '16강',   // 라운드 이름
};
```

**핵심 개념**:
- **상태 관리**: 게임 진행 상황을 객체로 관리
- React에서는 `useState`로 관리
- 전역 변수로 선언하여 모든 함수에서 접근 가능

**동작 예시**:
```javascript
// 16강 시작
gameState.currentRound = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P];
gameState.totalMatches = 8;  // 16명 → 8경기

// 1경기: A vs B → A 승리
gameState.matchIndex = 0;
gameState.nextRound = [A];

// 2경기: C vs D → D 승리
gameState.matchIndex = 1;
gameState.nextRound = [A, D];

// ... 8경기 완료 후
gameState.currentRound = [A, D, E, H, I, K, N, P];  // 8명
gameState.nextRound = [];
gameState.matchIndex = 0;
gameState.roundName = '8강';
```

---

#### 4.2 토너먼트 진행 로직
```javascript
// script.js:259-285
async function selectFood(side) {
    // 1. 선택된 음식 찾기
    const selectedIndex = gameState.matchIndex * 2 + (side === 'left' ? 0 : 1);
    const selectedFood = gameState.currentRound[selectedIndex];

    // 2. 다음 라운드에 추가
    gameState.nextRound.push(selectedFood);

    // 3. Firebase에 통계 기록
    incrementSelectCount(selectedFood.id);

    // 4. 다음 매치로
    gameState.matchIndex++;

    // 5. 분기 처리
    if (gameState.matchIndex < gameState.totalMatches) {
        // 같은 라운드의 다음 매치
        displayMatch();
    } else {
        // 라운드 종료
        if (gameState.nextRound.length === 1) {
            // 우승자 결정
            await showWinner(gameState.nextRound[0]);
        } else {
            // 다음 라운드로
            nextRound();
        }
    }
}
```

**토너먼트 구조 이해**:
```
16강 (8경기)
├─ 매치 0: [0] vs [1]  → 승자 → nextRound[0]
├─ 매치 1: [2] vs [3]  → 승자 → nextRound[1]
├─ 매치 2: [4] vs [5]  → 승자 → nextRound[2]
...
└─ 매치 7: [14] vs [15] → 승자 → nextRound[7]

8강 (4경기)
├─ 매치 0: nextRound[0] vs nextRound[1]
├─ 매치 1: nextRound[2] vs nextRound[3]
...

4강 (2경기)
├─ 매치 0: ...
└─ 매치 1: ...

결승 (1경기)
└─ 매치 0: ... → 우승자
```

---

#### 4.3 라운드 전환 로직
```javascript
// script.js:288-308
function nextRound() {
    // 1. 다음 라운드 진출자를 현재 라운드로
    gameState.currentRound = gameState.nextRound;
    gameState.nextRound = [];
    gameState.matchIndex = 0;
    gameState.totalMatches = gameState.currentRound.length / 2;

    // 2. 라운드 이름 업데이트
    switch (gameState.currentRound.length) {
        case 8:
            gameState.roundName = '8강';
            break;
        case 4:
            gameState.roundName = '4강';
            break;
        case 2:
            gameState.roundName = '결승';
            break;
    }

    // 3. 첫 매치 표시
    displayMatch();
}
```

**핵심 로직**:
- `currentRound` ← `nextRound`: 진출자가 다음 라운드 참가자
- `nextRound` 초기화: 빈 배열로 리셋
- `totalMatches` 재계산: 참가자 수 / 2

---

## 5. 에러 핸들링

### try-catch와 Fallback 전략
```javascript
// script.js:6-22
async function loadFoods() {
    try {
        const { collection, getDocs } = window.firestoreFunctions;
        const foodsSnapshot = await getDocs(collection(window.db, 'foods'));
        foods = [];
        foodsSnapshot.forEach((doc) => {
            foods.push(doc.data());
        });
        foods.sort((a, b) => a.id - b.id);
        console.log('음식 데이터 로드 완료:', foods.length);
        return foods;
    } catch (error) {
        console.error('음식 데이터 로드 실패:', error);
        // Fallback: 기본 데이터 사용
        return getFallbackFoods();
    }
}
```

**📚 학습 자료**: [MDN - try...catch](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/try...catch)

**핵심 개념**:
- `try`: 에러가 발생할 수 있는 코드
- `catch`: 에러 발생 시 실행되는 코드
- **Fallback 전략**: Firebase 실패 시 로컬 데이터 사용

**Fallback 데이터**:
```javascript
// script.js:44-78
function getFallbackFoods() {
    return [
        { id: 1, name: '돼지찌개', category: '한식', image: 'images/돼지찌개.webp' },
        { id: 2, name: '국밥', category: '한식', image: 'images/국밥.webp' },
        // ...
    ];
}
```

**에러 발생 상황**:
- 네트워크 연결 끊김
- Firebase 프로젝트 삭제됨
- Firestore 규칙으로 접근 거부
- API 키 만료

---

## 6. HTML 변경사항

### `index.html` 수정 내역

#### 변경 1: Firebase import에 `getDocs` 추가
```diff
// index.html:91-100
import {
    getFirestore,
    collection,
    doc,
    getDoc,
+   getDocs,  // ← 추가
    setDoc,
    updateDoc,
    increment,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
```

#### 변경 2: window 객체에 `getDocs` export 추가
```diff
// index.html:119-127
window.firestoreFunctions = {
    collection,
    doc,
    getDoc,
+   getDocs,  // ← 추가
    setDoc,
    updateDoc,
    increment,
};
```

### 왜 추가했나?

`script.js`에서 `getDocs()`를 사용하기 때문입니다:
- `script.js:8` - `const { collection, getDocs } = window.firestoreFunctions;`
- `script.js:28` - `const { collection, getDocs } = window.firestoreFunctions;`

### `getDoc()` vs `getDocs()` 차이점

| 함수 | 용도 | 반환값 | 사용 위치 |
|------|------|--------|-----------|
| `getDoc()` | 단일 문서 읽기 | DocumentSnapshot | `script.js:94` (통계 문서) |
| `getDocs()` | 컬렉션 전체 읽기 | QuerySnapshot | `script.js:9` (음식 컬렉션) |

**예시**:
```javascript
// getDoc() - 단일 문서
const docRef = doc(db, 'statistics', 'global');
const docSnap = await getDoc(docRef);
console.log(docSnap.data());  // { totalGames: 100, foods: {...} }

// getDocs() - 컬렉션 전체
const colRef = collection(db, 'foods');
const querySnap = await getDocs(colRef);
querySnap.forEach((doc) => {
    console.log(doc.data());  // { id: 1, name: '돼지찌개', ... }
});
```

---

## 7. 학습 우선순위

### 🔴 필수 (반드시 이해)

1. **async/await** - 비동기 처리의 핵심
   - 모든 Firebase 함수가 비동기
   - 순서가 중요한 작업 처리

2. **DOM 조작** - 프론트엔드의 기본
   - `querySelector`, `getElementById`
   - `classList`, `innerHTML`, `textContent`
   - `addEventListener`

3. **배열 메서드** - 데이터 처리
   - `map`, `filter`, `sort`, `slice`
   - `forEach`, `push`, `pop`

4. **이벤트 리스너** - 사용자 상호작용
   - `DOMContentLoaded`
   - `onclick`, `addEventListener`

---

### 🟡 중요 (Firebase 사용 시)

5. **Firestore CRUD** - 데이터베이스 조작
   - Create: `setDoc()`
   - Read: `getDoc()`, `getDocs()`
   - Update: `updateDoc()`, `increment()`
   - Delete: (이 프로젝트에서는 미사용)

6. **Firebase 초기화** - 설정 및 연결
   - `initializeApp()`
   - `getFirestore()`
   - ES6 모듈 import

---

### 🟢 선택 (심화)

7. **에러 핸들링** - 안정성 향상
   - `try-catch`
   - Fallback 전략

8. **LocalStorage** - 브라우저 저장소
   - `getItem()`, `setItem()`
   - `JSON.stringify()`, `JSON.parse()`

9. **알고리즘** - 로직 구현
   - Fisher-Yates 셔플
   - 토너먼트 구조

---

## 📝 실습 추천

### 난이도 1: 코드 이해하기
1. **콘솔 로그 추가**: 각 함수의 동작 확인
   ```javascript
   async function loadFoods() {
       console.log('1. 데이터 로드 시작');
       const foodsSnapshot = await getDocs(...);
       console.log('2. Firestore 응답:', foodsSnapshot);
       // ...
   }
   ```

2. **변수 값 추적**: Chrome DevTools로 디버깅
   - Breakpoint 설정
   - 변수 값 확인

---

### 난이도 2: 간단한 수정
1. **Firebase 없이 동작**
   - `loadFoods()`에서 항상 `getFallbackFoods()` 반환
   - Firestore 호출 주석 처리

2. **데이터 변경**
   - `getFallbackFoods()`의 음식 목록 수정
   - 이미지 URL 변경

3. **스타일 변경**
   - `style.css`에서 색상, 폰트 변경
   - 버튼 디자인 커스터마이징

---

### 난이도 3: 기능 추가
1. **재대결 기능**
   - 결과 화면에 "재대결" 버튼 추가
   - 특정 두 음식으로 다시 대결

2. **즐겨찾기**
   - 음식 카드에 하트 버튼 추가
   - LocalStorage에 저장
   - 즐겨찾기 목록 표시

3. **카테고리 필터**
   - 시작 화면에 카테고리 선택 추가
   - 한식만, 일식만 등으로 필터링

---

### 난이도 4: 리팩토링
1. **컴포넌트화**
   - 식당 카드를 함수로 분리
   ```javascript
   function createRestaurantCard(restaurant) {
       const item = document.createElement('div');
       item.className = 'restaurant-item';
       item.innerHTML = `...`;
       return item;
   }
   ```

2. **상태 관리 개선**
   - `gameState`를 클래스로 관리
   ```javascript
   class GameState {
       constructor() {
           this.currentRound = [];
           this.nextRound = [];
       }
       nextMatch() { ... }
       nextRound() { ... }
   }
   ```

3. **모듈화**
   - 파일 분리: `firebase.js`, `game.js`, `ui.js`
   - ES6 모듈로 import/export

---

### 난이도 5: 완전히 다른 버전
1. **React로 재작성**
   - `useState`, `useEffect` 사용
   - 컴포넌트 기반 구조

2. **다른 주제**
   - 영화 이상형 월드컵
   - 노래 이상형 월드컵
   - 여행지 이상형 월드컵

3. **멀티플레이어**
   - Firebase Realtime Database 사용
   - 여러 사용자가 동시에 투표
   - 실시간 결과 업데이트

---

## 🎓 추가 학습 자료

### 공식 문서
- [MDN Web Docs](https://developer.mozilla.org/ko/) - JavaScript 기본
- [Firebase 공식문서](https://firebase.google.com/docs) - Firebase 전체
- [Firestore 가이드](https://firebase.google.com/docs/firestore) - 데이터베이스

### 추천 강의
- [모던 JavaScript 튜토리얼](https://ko.javascript.info/) - JavaScript 기초~고급
- [생활코딩 - JavaScript](https://opentutorials.org/course/743) - 무료 강의
- [노마드코더 - 바닐라 JS](https://nomadcoders.co/javascript-for-beginners) - 프로젝트 중심

### 연습 사이트
- [JavaScript30](https://javascript30.com/) - 30개 프로젝트
- [freeCodeCamp](https://www.freecodecamp.org/) - 무료 코딩 부트캠프
- [Codewars](https://www.codewars.com/) - 알고리즘 연습

---

## 💡 학습 팁

1. **코드를 직접 타이핑하세요**
   - 복사/붙여넣기 ❌
   - 손으로 타이핑하면서 이해 ✅

2. **에러를 두려워하지 마세요**
   - 에러 메시지를 읽고 이해하세요
   - Chrome DevTools의 Console 활용

3. **작은 단위로 테스트하세요**
   - 한 번에 모든 기능 구현 ❌
   - 기능 하나씩 완성하고 테스트 ✅

4. **공식 문서를 읽으세요**
   - MDN, Firebase 공식문서가 가장 정확
   - 블로그는 참고만, 공식문서가 정답

5. **커뮤니티를 활용하세요**
   - Stack Overflow - 질문/답변
   - GitHub Discussions - 오픈소스 커뮤니티
   - Discord - 실시간 질문

---

## 🚀 다음 단계

### 이 프로젝트를 마스터했다면?

1. **React로 리팩토링**
   - 컴포넌트 기반 구조
   - 상태 관리 라이브러리 (Redux, Zustand)

2. **백엔드 추가**
   - Node.js + Express
   - RESTful API 설계
   - 인증/인가 구현

3. **배포**
   - Firebase Hosting
   - Vercel, Netlify
   - 도메인 연결

4. **테스트**
   - Jest - 단위 테스트
   - Cypress - E2E 테스트

---

**작성일**: 2025-10-30
**프로젝트**: 음식 이상형 월드컵 (42 경산)
**기술 스택**: Vanilla JavaScript, Firebase Firestore, HTML/CSS
