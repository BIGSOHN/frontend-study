# 📚 음식 월드컵 프로젝트 학습 가이드

## 목차
1. [ES6 모듈로 리팩토링 (2025-10-31)](#1-es6-모듈로-리팩토링-2025-10-31)
2. [Firebase 관련 코드](#2-firebase-관련-코드)
3. [Firebase 보안 (API 키)](#3-firebase-보안-api-키)
4. [JavaScript 기본 개념](#4-javascript-기본-개념)
5. [LocalStorage](#5-localstorage)
6. [게임 로직](#6-게임-로직)
7. [에러 핸들링](#7-에러-핸들링)
8. [학습 우선순위](#8-학습-우선순위)

---

## 1. ES6 모듈로 리팩토링 (2025-10-31)

### 🎯 왜 리팩토링 했나?

#### Before: window 객체 브릿지 패턴 (구버전)

초기 코드는 ES6 모듈과 일반 스크립트를 혼합해서 사용했습니다:

```html
<!-- index.html -->
<script type="module">
    // ES6 모듈: Firebase 초기화
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

    // window 객체를 통한 브릿지
    window.db = db;
    window.firestoreFunctions = { collection, doc, getDoc, ... };
</script>

<!-- 일반 스크립트 -->
<script src="script.js"></script>
```

```javascript
// script.js (일반 스크립트)
// window 객체에서 함수 가져오기
const { collection, getDocs } = window.firestoreFunctions;
const foodsSnapshot = await getDocs(collection(window.db, 'foods'));
```

**문제점**:
- ❌ ES6 모듈과 일반 스크립트 혼재
- ❌ window 객체 오염 (전역 스코프 사용)
- ❌ 코드 중복 (index.html에 Firebase 초기화 코드 40줄)
- ❌ 유지보수 어려움

---

#### After: 순수 ES6 모듈 (현재 버전)

모든 스크립트를 ES6 모듈로 통일:

```javascript
// firebase-config.js (NEW!)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, ... } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = { ... };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ES6 export
export { db, collection, doc, getDoc, getDocs, setDoc, updateDoc, increment };
```

```javascript
// script.js (ES6 모듈)
// 직접 import
import { db, collection, getDocs } from './firebase-config.js';

// 깔끔하게 사용
const foodsSnapshot = await getDocs(collection(db, 'foods'));
```

```html
<!-- index.html (단순해짐!) -->
<script type="module" src="script.js"></script>
```

**개선점**:
- ✅ 모든 코드가 ES6 모듈로 통일
- ✅ window 객체 사용 안 함 (깔끔한 스코프)
- ✅ Firebase 설정을 별도 파일로 분리 (관심사 분리)
- ✅ index.html이 간결해짐 (40줄 → 1줄)
- ✅ 유지보수 쉬움

---

### 📁 파일 구조 변경

#### Before
```
Ideal_food_WorldCup/
├── index.html     # Firebase 초기화 코드 40줄 포함
├── script.js      # 일반 스크립트 (window 객체 사용)
└── style.css
```

#### After
```
Ideal_food_WorldCup/
├── firebase-config.js  # NEW! Firebase 설정만 담당
├── script.js           # ES6 모듈로 변경
├── index.html          # 간소화 (1줄만 필요)
└── style.css
```

---

### 🔍 코드 비교

#### 1. Firebase 초기화

**Before (index.html)**:
```javascript
<script type="module">
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

    const firebaseConfig = {
        apiKey: 'AIzaSyBHQAFiTUNFAk6XEDPo164isKbcqyrN_ls',
        authDomain: 'foodidealworldcup.firebaseapp.com',
        projectId: 'foodidealworldcup',
        storageBucket: 'foodidealworldcup.firebasestorage.app',
        messagingSenderId: '393852437251',
        appId: '1:393852437251:web:5f9145604d0d63062a5f36',
        measurementId: 'G-0SEHRJXXS1',
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // 🔴 window 객체 오염
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
</script>
```

**After (firebase-config.js)**:
```javascript
// ES6 import
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

// ✅ 깔끔한 ES6 export
export { db, collection, doc, getDoc, getDocs, setDoc, updateDoc, increment };
```

---

#### 2. script.js에서 Firebase 사용

**Before (일반 스크립트)**:
```javascript
// 🔴 window 객체에서 가져오기
async function loadFoods() {
    const { collection, getDocs } = window.firestoreFunctions;
    const foodsSnapshot = await getDocs(collection(window.db, 'foods'));
    // ...
}

async function getStats() {
    const { doc, getDoc } = window.firestoreFunctions;
    const statsRef = doc(window.db, 'statistics', 'global');
    // ...
}

async function incrementSelectCount(foodId) {
    const { doc, updateDoc, increment } = window.firestoreFunctions;
    const statsRef = doc(window.db, 'statistics', 'global');
    // ...
}
```

**After (ES6 모듈)**:
```javascript
// ✅ 최상단에서 한 번만 import
import {
    db,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    increment,
} from './firebase-config.js';

// 깔끔하게 사용
async function loadFoods() {
    const foodsSnapshot = await getDocs(collection(db, 'foods'));
    // ...
}

async function getStats() {
    const statsRef = doc(db, 'statistics', 'global');
    const statsDoc = await getDoc(statsRef);
    // ...
}

async function incrementSelectCount(foodId) {
    const statsRef = doc(db, 'statistics', 'global');
    await updateDoc(statsRef, {
        [`foods.${foodId}.selectCount`]: increment(1),
    });
}
```

**차이점**:
- Before: 매 함수마다 `window.firestoreFunctions`에서 꺼내옴
- After: 파일 최상단에서 한 번만 import, 모든 함수에서 바로 사용

---

#### 3. HTML 파일 로드

**Before**:
```html
<!-- 40줄의 Firebase 초기화 코드 -->
<script type="module">
    // ... Firebase imports
    // ... Firebase config
    // ... window 객체 export
</script>

<!-- 일반 스크립트 로드 -->
<script src="script.js"></script>
```

**After**:
```html
<!-- 단 1줄! -->
<script type="module" src="script.js"></script>
```

---

#### 4. 전역 함수 노출 (HTML onclick 속성용)

ES6 모듈은 기본적으로 스코프가 격리되어 있어서, HTML의 `onclick="startGame()"`이 작동하지 않습니다.

**해결 방법**: script.js 맨 아래에 추가

```javascript
// HTML에서 호출할 수 있도록 전역 함수로 export
window.startGame = startGame;
window.selectFood = selectFood;
window.showStats = showStats;
window.showScreen = showScreen;
```

**HTML에서 사용**:
```html
<button onclick="startGame()">시작하기</button>
<button onclick="showStats()">통계 보기</button>
<div onclick="selectFood('left')">...</div>
```

---

### 📚 ES6 모듈 vs 일반 스크립트

#### 일반 스크립트 (`<script src="script.js">`)

```html
<script src="script.js"></script>
```

**특징**:
- ❌ `import/export` 사용 불가
- ✅ 모든 변수가 전역 스코프 (window 객체에 자동 추가)
- ✅ HTML `onclick` 속성에서 함수 바로 호출 가능
- ❌ 이름 충돌 위험
- ❌ 의존성 관리 어려움

**예시**:
```javascript
// script.js (일반 스크립트)
function startGame() { ... }  // 자동으로 window.startGame이 됨
const db = ...;  // 전역 변수
```

```html
<button onclick="startGame()">시작</button>  <!-- 작동함 -->
```

---

#### ES6 모듈 (`<script type="module">`)

```html
<script type="module" src="script.js"></script>
```

**특징**:
- ✅ `import/export` 사용 가능
- ✅ 각 모듈은 독립적인 스코프 (격리됨)
- ❌ HTML `onclick`에서 함수 직접 호출 불가
- ✅ 이름 충돌 방지
- ✅ 의존성 관리 명확
- ✅ 현대 JavaScript 표준

**예시**:
```javascript
// script.js (ES6 모듈)
import { db } from './firebase-config.js';

function startGame() { ... }  // 전역에 노출 안 됨

// 명시적으로 전역에 노출
window.startGame = startGame;
```

```html
<button onclick="startGame()">시작</button>  <!-- window.startGame 덕분에 작동 -->
```

---

### 🔍 왜 window 객체가 필요했나?

#### 문제: ES6 모듈과 일반 스크립트 간 데이터 공유

```html
<!-- index.html -->
<script type="module">
    import { getFirestore } from '...';
    const db = getFirestore();

    // 🤔 이 db를 script.js에서 어떻게 사용할까?
</script>

<script src="script.js"></script>  <!-- type="module" 없음 -->
```

#### 해결: window 객체 브릿지

```javascript
// index.html의 ES6 모듈
window.db = db;  // window 객체에 저장
```

```javascript
// script.js (일반 스크립트)
const db = window.db;  // window에서 꺼내 사용
```

#### 근본 해결: 모두 ES6 모듈로

```javascript
// firebase-config.js
export const db = getFirestore();
```

```javascript
// script.js
import { db } from './firebase-config.js';
```

→ **window 객체 없이 깔끔하게 데이터 공유!**

---

### 💡 왜 ES6 모듈이 더 좋은가?

#### 1. 명확한 의존성

**일반 스크립트**:
```html
<!-- 순서가 중요함! -->
<script src="firebase-init.js"></script>
<script src="script.js"></script>  <!-- firebase-init.js가 먼저 실행되어야 함 -->
```

**ES6 모듈**:
```javascript
// 의존성이 코드에 명시됨
import { db } from './firebase-config.js';  // 자동으로 먼저 로드됨
```

---

#### 2. 네임스페이스 오염 방지

**일반 스크립트**:
```javascript
// script1.js
var data = [1, 2, 3];  // 전역 변수

// script2.js
var data = [4, 5, 6];  // 🔴 충돌! script1의 data가 덮어써짐
```

**ES6 모듈**:
```javascript
// script1.js
const data = [1, 2, 3];  // 모듈 스코프

// script2.js
const data = [4, 5, 6];  // ✅ 충돌 없음! 각자 독립된 스코프
```

---

#### 3. 코드 재사용성

**일반 스크립트**:
```javascript
// 다른 프로젝트에서 사용하려면?
// → 전체 HTML 파일을 복사해야 함
```

**ES6 모듈**:
```javascript
// firebase-config.js는 어떤 프로젝트에서나 재사용 가능
import { db } from './firebase-config.js';
```

---

#### 4. 트리 쉐이킹 (Tree Shaking)

빌드 도구(Webpack, Vite)는 ES6 모듈에서 **사용하지 않는 코드를 자동 제거**합니다.

**ES6 모듈**:
```javascript
// firebase-config.js
export { db, collection, doc, getDoc, getDocs, setDoc, updateDoc, increment };

// script.js
import { db, collection, getDocs } from './firebase-config.js';
// → setDoc, updateDoc, increment는 빌드 시 제거됨 (사용 안 함)
```

**일반 스크립트**: 트리 쉐이킹 불가

---

### 📖 학습 포인트

#### 1. ES6 모듈의 스코프

```javascript
// module1.js
const secret = 'password123';  // 외부에서 접근 불가
export const public = 'hello';  // export해야 외부에서 사용 가능

// module2.js
import { public } from './module1.js';
console.log(public);   // ✅ 'hello'
console.log(secret);   // ❌ ReferenceError
```

---

#### 2. export 방식

**Named Export (우리가 사용)**:
```javascript
// firebase-config.js
export const db = getFirestore();
export const collection = ...;

// script.js
import { db, collection } from './firebase-config.js';
```

**Default Export**:
```javascript
// firebase-config.js
const db = getFirestore();
export default db;

// script.js
import db from './firebase-config.js';  // 이름은 자유롭게
```

**언제 사용?**
- Named Export: 여러 개 export (우리 경우: db, collection, doc, ...)
- Default Export: 하나만 export (예: React 컴포넌트)

---

#### 3. 상대 경로 vs 절대 경로

```javascript
// ✅ 상대 경로 (우리가 사용)
import { db } from './firebase-config.js';  // 같은 폴더

// ✅ 상대 경로
import { db } from '../config/firebase-config.js';  // 상위 폴더

// ✅ CDN (절대 경로)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

// ❌ 잘못된 경로 (npm 패키지처럼 보임)
import { db } from 'firebase-config.js';  // 오류!
```

**규칙**:
- 같은 프로젝트 파일: `./` 또는 `../` 필수
- CDN: `https://` 전체 URL
- npm 패키지: 패키지명만 (예: `import React from 'react'`)

---

### 🎯 리팩토링 체크리스트

#### ✅ 완료한 것

1. **firebase-config.js 생성**
   - Firebase 초기화 코드 분리
   - `db` 및 Firestore 함수 export

2. **script.js ES6 모듈로 변경**
   - 최상단에 `import` 추가
   - 모든 `window.firestoreFunctions` 제거
   - 모든 `window.db` → `db`로 변경

3. **index.html 간소화**
   - 40줄 Firebase 코드 제거
   - `<script type="module" src="script.js"></script>` 한 줄만 남김

4. **전역 함수 노출**
   - HTML `onclick` 속성을 위해 `window.startGame` 등 추가

---

### 🚀 다음 단계 (선택사항)

#### 1. 더 세분화된 모듈

```javascript
// firebase/config.js
export { db };

// firebase/foods.js
import { db } from './config.js';
export async function loadFoods() { ... }

// firebase/stats.js
import { db } from './config.js';
export async function getStats() { ... }

// script.js
import { loadFoods } from './firebase/foods.js';
import { getStats } from './firebase/stats.js';
```

---

#### 2. TypeScript로 변환

```typescript
// firebase-config.ts
import { Firestore } from 'firebase/firestore';

export const db: Firestore = getFirestore(app);
```

---

#### 3. 빌드 도구 사용 (Vite, Webpack)

```bash
# npm으로 Firebase 설치
npm install firebase

# CDN URL 대신 npm 패키지 사용
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
```

---

### 📚 참고 자료

- [MDN - JavaScript modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
- [MDN - import](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import)
- [MDN - export](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/export)
- [JavaScript.info - Modules](https://ko.javascript.info/modules-intro)

---

## 2. Firebase 관련 코드

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

### 🔧 Firebase 설정 방법 (npm vs CDN vs 구성)

Firebase 공식문서에는 3가지 설정 방법이 있습니다:

```
[ npm ]  [ CDN ]  [ 구성 ]
```

#### 1. npm (Node Package Manager)
**React, Vue, Next.js 등 번들러 사용하는 프로젝트**

```bash
# 터미널에서 설치
npm install firebase
```

```javascript
// JavaScript 파일에서 import
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
```

**특징**:
- ✅ 번들러가 필요한 코드만 포함 (Tree-shaking)
- ✅ 최종 파일 크기 작음
- ✅ TypeScript 지원 좋음
- ❌ 빌드 과정 필요 (webpack, vite 등)

**언제 사용?**
- React, Vue, Angular 프로젝트
- 프로덕션 배포용

---

#### 2. CDN (Content Delivery Network) ← **우리가 사용하는 방식**
**HTML 파일에 직접 import, 번들러 없이 사용**

```html
<script type="module">
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
</script>
```

**특징**:
- ✅ 설치 없이 바로 사용
- ✅ 빌드 과정 불필요
- ✅ HTML 파일만으로 동작
- ❌ 전체 라이브러리를 로드 (번들 크기 큼)

**언제 사용?** ← **우리 프로젝트**
- Vanilla JavaScript 프로젝트
- 빠른 프로토타입
- 학습/연습용

---

#### 3. 구성 (Hosting에서 자동 설정)
**Firebase Hosting에 배포할 때 자동으로 설정**

```html
<!-- Firebase Hosting이 자동으로 주입 -->
<script src="/__/firebase/10.7.1/firebase-app-compat.js"></script>
<script src="/__/firebase/10.7.1/firebase-firestore-compat.js"></script>
<script src="/__/firebase/init.js"></script>
```

**특징**:
- ✅ Firebase Hosting 전용
- ✅ 설정이 자동으로 주입됨
- ❌ Firebase Hosting에서만 동작
- ❌ 로컬에서 테스트 어려움

**언제 사용?**
- Firebase Hosting에 배포할 때만

---

#### 비교표

| 방법 | 설치 필요 | 빌드 필요 | 파일 크기 | 우리 프로젝트 |
|------|----------|----------|----------|-------------|
| **npm** | ✅ `npm install` | ✅ webpack/vite | 작음 | ❌ |
| **CDN** | ❌ | ❌ | 큼 | ✅ 사용 중 |
| **구성** | ❌ | ❌ | 중간 | ❌ |

---

#### 우리 프로젝트는 CDN 방식!

**이유**:
1. ✅ Vanilla JavaScript 프로젝트
2. ✅ 빌드 과정 불필요
3. ✅ HTML 파일 열면 바로 동작
4. ✅ 학습하기 좋음

**공식문서 볼 때**: "CDN" 탭을 선택하세요!

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

## 3. Firebase 보안 (API 키)

### 🔐 Firebase API 키는 공개해도 괜찮습니다!

이 프로젝트의 `index.html`에는 Firebase 설정이 포함되어 있습니다:

```javascript
const firebaseConfig = {
    apiKey: 'AIzaSyBHQAFiTUNFAk6XEDPo164isKbcqyrN_ls',
    authDomain: 'foodidealworldcup.firebaseapp.com',
    projectId: 'foodidealworldcup',
    storageBucket: 'foodidealworldcup.firebasestorage.app',
    messagingSenderId: '393852437251',
    appId: '1:393852437251:web:5f9145604d0d63062a5f36',
    measurementId: 'G-0SEHRJXXS1',
};
```

**이것은 의도된 것이며 안전합니다.** ✅

---

### 왜 공개해도 괜찮을까?

#### 1. Firebase Web API 키 = 공개용 식별자

Firebase Web API 키는:
- ✅ **공개용 식별자**입니다 (비밀 키가 아님)
- ✅ 브라우저에서 사용하도록 설계됨
- ✅ GitHub, 블로그에 공개해도 괜찮음
- ✅ Firebase 공식 문서에서도 인정한 방식

#### 2. 어차피 브라우저에서 보임

사용자의 브라우저에서 다 보입니다:
```bash
# Chrome DevTools → Network 탭
# Firebase API 호출 URL에 모두 노출됨
https://firestore.googleapis.com/v1/projects/foodidealworldcup/databases/(default)/documents/foods
```

→ **숨길 방법이 없습니다!**

#### 3. Firebase의 설계 철학

```
❌ 전통적인 방식:
[브라우저] → [백엔드 서버 + 비밀키] → [데이터베이스]

✅ Firebase 방식:
[브라우저 + 공개키] → [Firebase + Security Rules] → [데이터베이스]
```

Firebase는 **클라이언트에서 직접 연결**하도록 설계되었습니다.

---

### 각 필드 설명

| 필드 | 공개 가능? | 설명 |
|------|----------|------|
| `apiKey` | ✅ | Firebase 프로젝트 식별자 |
| `authDomain` | ✅ | 인증 도메인 (공개 URL) |
| `projectId` | ✅ | 프로젝트 ID (공개 정보) |
| `storageBucket` | ✅ | 스토리지 버킷 (공개 URL) |
| `messagingSenderId` | ✅ | 푸시 알림 발신자 ID |
| `appId` | ✅ | 앱 식별자 |
| `measurementId` | ✅ | Google Analytics ID |

**결론: 전부 공개해도 괜찮습니다!** ✅

---

### 🛡️ 진짜 보안은 어디서?

#### Firestore Security Rules

실제 보안은 **Firestore Security Rules**로 제어합니다:

```javascript
// Firebase Console → Firestore Database → 규칙(Rules)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 음식 데이터: 모두 읽기 가능, 쓰기 불가
    match /foods/{foodId} {
      allow read: if true;           // 누구나 읽기 가능
      allow write: if false;          // 아무도 수정 못함
    }

    // 식당 데이터: 모두 읽기 가능, 쓰기 불가
    match /restaurants/{restaurantId} {
      allow read: if true;
      allow write: if false;
    }

    // 통계 데이터: 읽기/쓰기 허용
    match /statistics/{statId} {
      allow read: if true;
      allow update: if true;
      allow create: if true;
    }
  }
}
```

#### Firebase Authentication (필요시)

로그인 기능 추가 시:
```javascript
// 로그인한 사용자만 접근
allow write: if request.auth != null;

// 본인 데이터만 수정
allow write: if request.auth.uid == userId;
```

#### Firebase App Check (선택사항)

봇 차단 및 앱 검증:
```javascript
// 등록된 앱에서만 접근 허용
```

---

### ❌ 절대 공개하면 안 되는 것

#### Service Account 키 (서버용 비밀 키)

```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",  // ❌ 절대 공개 금지!
  "client_email": "...",
  ...
}
```

#### Database Secret (Realtime Database)

```javascript
const databaseURL = "https://...firebaseio.com/?auth=SECRET_KEY"  // ❌ 절대 공개 금지!
```

#### Admin SDK 키

```javascript
// 서버에서만 사용, 절대 클라이언트에 노출 금지
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');  // ❌ 비밀!
```

---

### 📊 실제 사례

유명한 Firebase 사용 사이트들도 API 키가 공개되어 있습니다:

**예시**: GitHub에서 "firebase config" 검색
- 수천 개의 오픈소스 프로젝트가 API 키를 그대로 공개
- Google, Airbnb 등 대기업도 Web API 키는 공개

---

### 🎯 보안 체크리스트

#### ✅ 우리가 한 것 (안전함)
- Firebase Web API 키 공개
- `firebaseConfig` 객체 공개
- GitHub 퍼블릭 레포에 업로드

#### ⚠️ 확인해야 할 것
- [ ] Firestore Security Rules 설정했나요?
- [ ] 쓰기 권한을 적절히 제한했나요?
- [ ] 사용량 모니터링하고 있나요?

#### ❌ 하면 안 되는 것
- Service Account 키를 Git에 커밋
- Database Secret을 코드에 하드코딩
- Admin SDK 키를 클라이언트에 노출

---

### 📚 참고 자료

**Firebase 공식 문서**:
- [API Keys for Firebase](https://firebase.google.com/docs/projects/api-keys)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

**핵심 메시지**:
> "Web API keys for Firebase are different from typical API secrets. They don't need to be hidden and can be publicly accessible."

---

## 4. JavaScript 기본 개념

### ✅ 반드시 이해해야 할 부분

#### 3.1 async/await - 비동기 처리
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

#### 3.2 배열 셔플 (Fisher-Yates 알고리즘)
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

#### 3.3 DOM 조작 - 화면 전환
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

#### 3.4 이벤트 리스너 - 페이지 로드 시 실행
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

#### 3.5 배열 메서드 - 객체 변환 및 정렬
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

#### 3.6 배열 메서드 체이닝 - 정렬 및 슬라이스
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

#### 3.7 동적 HTML 생성
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

#### 3.8 조건(삼항) 연산자
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

## 5. LocalStorage

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

## 6. 게임 로직

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

## 7. 에러 핸들링

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

## 8. 학습 우선순위

### 🔴 필수 (반드시 이해)

1. **ES6 모듈** - 현대 JavaScript의 기본 ⭐ NEW!
   - `import/export` 문법
   - 모듈 스코프와 격리
   - Named vs Default Export
   - 상대/절대 경로

2. **async/await** - 비동기 처리의 핵심
   - 모든 Firebase 함수가 비동기
   - 순서가 중요한 작업 처리

3. **DOM 조작** - 프론트엔드의 기본
   - `querySelector`, `getElementById`
   - `classList`, `innerHTML`, `textContent`
   - `addEventListener`

4. **배열 메서드** - 데이터 처리
   - `map`, `filter`, `sort`, `slice`
   - `forEach`, `push`, `pop`

5. **이벤트 리스너** - 사용자 상호작용
   - `DOMContentLoaded`
   - `onclick`, `addEventListener`

---

### 🟡 중요 (Firebase 사용 시)

6. **Firestore CRUD** - 데이터베이스 조작
   - Create: `setDoc()`
   - Read: `getDoc()`, `getDocs()`
   - Update: `updateDoc()`, `increment()`
   - Delete: (이 프로젝트에서는 미사용)

7. **Firebase 초기화** - 설정 및 연결
   - `initializeApp()`
   - `getFirestore()`
   - firebase-config.js 모듈 패턴

---

### 🟢 선택 (심화)

8. **에러 핸들링** - 안정성 향상
   - `try-catch`
   - Fallback 전략

9. **LocalStorage** - 브라우저 저장소
   - `getItem()`, `setItem()`
   - `JSON.stringify()`, `JSON.parse()`

10. **알고리즘** - 로직 구현
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
1. **ES6 모듈 연습** ⭐ NEW!
   - `firebase-config.js`에 `console.log('Firebase 초기화')` 추가
   - `script.js`에서 import하는 함수 순서 바꿔보기
   - Named Export를 Default Export로 변경해보기

2. **Firebase 없이 동작**
   - `loadFoods()`에서 항상 `getFallbackFoods()` 반환
   - Firestore 호출 주석 처리

3. **데이터 변경**
   - `getFallbackFoods()`의 음식 목록 수정
   - 이미지 URL 변경

4. **스타일 변경**
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
1. **ES6 모듈 더 세분화** ⭐ NEW!
   - `game.js`: 게임 로직만 분리
   - `ui.js`: DOM 조작만 분리
   - `firebase/foods.js`, `firebase/stats.js`: Firebase 함수 분리

2. **컴포넌트화**
   - 식당 카드를 함수로 분리
   ```javascript
   function createRestaurantCard(restaurant) {
       const item = document.createElement('div');
       item.className = 'restaurant-item';
       item.innerHTML = `...`;
       return item;
   }
   ```

3. **상태 관리 개선**
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
