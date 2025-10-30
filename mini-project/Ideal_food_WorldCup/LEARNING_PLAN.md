# 🎓 음식 월드컵 프로젝트 학습 계획

> 이 프로젝트를 통해 JavaScript와 Firebase를 마스터하는 실전 가이드

---

## 📋 목차

1. [학습 로드맵](#학습-로드맵)
2. [1단계: 코드 읽고 이해하기](#1단계-코드-읽고-이해하기)
3. [2단계: 작은 수정 해보기](#2단계-작은-수정-해보기)
4. [3단계: 기능 추가하기](#3단계-기능-추가하기)
5. [4단계: 버그 찾기 & 수정하기](#4단계-버그-찾기--수정하기)
6. [5단계: 처음부터 다시 만들기](#5단계-처음부터-다시-만들기)
7. [6단계: 새로운 기술 적용](#6단계-새로운-기술-적용)
8. [학습 팁](#학습-팁)

---

## 학습 로드맵

| 주차 | 단계 | 시간 투자 | 목표 | 완료 |
|-----|------|---------|------|------|
| 1주차 | 1-2단계 | 1-2시간/일 | 코드 이해 + 작은 수정 | ⬜ |
| 2주차 | 3단계 | 1-2시간/일 | 기능 추가 (3개 중 1개) | ⬜ |
| 3주차 | 4단계 | 1-2시간/일 | 버그 찾기 & 수정 | ⬜ |
| 4주차 | 5단계 | 2-3시간/일 | 처음부터 다시 만들기 | ⬜ |
| 5주차+ | 6단계 | 자유 | React/TypeScript 도전 | ⬜ |

**예상 총 학습 시간**: 40-60시간 (5-8주)

---

## 1단계: 코드 읽고 이해하기

**목표**: 전체 흐름 파악
**소요 시간**: 1-2일 (2-4시간)
**난이도**: ⭐☆☆☆☆

### 📝 체크리스트

- [ ] 서버 실행하고 브라우저에서 게임 플레이
- [ ] 개발자 도구(F12) 열어서 Console 탭 확인
- [ ] 게임 플레이하면서 어떤 함수가 호출되는지 관찰
- [ ] `script.js`, `firebase-config.js`, `index.html` 읽어보기
- [ ] STUDY_GUIDE.md 읽으면서 코드 이해하기

### 🚀 실습: 서버 실행하기

```bash
# 프로젝트 폴더로 이동
cd /home/ssohn/studys/frontend_study/mini-project/Ideal_food_WorldCup

# Python 서버 실행
python3 -m http.server 8000

# 브라우저에서 열기
# http://localhost:8000
```

### 🔍 실습: console.log 추가하기

**목표**: 코드 실행 흐름을 눈으로 확인

#### 실습 1-1: loadFoods() 함수 추적

`script.js`를 열고 다음과 같이 수정:

```javascript
// script.js:18-32
async function loadFoods() {
	try {
		console.log('🍔 [1단계] loadFoods 시작');

		const foodsSnapshot = await getDocs(collection(db, 'foods'));
		console.log('🍔 [2단계] Firestore에서 받은 데이터:', foodsSnapshot);
		console.log('🍔 [2-1] 문서 개수:', foodsSnapshot.size);

		foods = [];
		foodsSnapshot.forEach((doc) => {
			console.log('🍔 [3단계] 음식 추가:', doc.data());
			foods.push(doc.data());
		});

		foods.sort((a, b) => a.id - b.id);
		console.log('🍔 [4단계] 정렬된 최종 foods 배열:', foods);
		console.log('🍔 [5단계] foods 배열 길이:', foods.length);

		return foods;
	} catch (error) {
		console.error('❌ 음식 데이터 로드 실패:', error);
		return getFallbackFoods();
	}
}
```

**확인 방법**:
1. 저장 후 브라우저 새로고침
2. F12 → Console 탭 열기
3. "시작하기" 버튼 클릭
4. Console에 `🍔` 이모지와 함께 로그가 순서대로 나오는지 확인

---

#### 실습 1-2: selectFood() 함수 추적

```javascript
// script.js:259-285
async function selectFood(side) {
	console.log('👆 음식 선택:', side);

	const selectedIndex = gameState.matchIndex * 2 + (side === 'left' ? 0 : 1);
	const selectedFood = gameState.currentRound[selectedIndex];

	console.log('✅ 선택된 음식:', selectedFood.name);
	console.log('📊 현재 gameState:', gameState);

	gameState.nextRound.push(selectedFood);
	incrementSelectCount(selectedFood.id);

	gameState.matchIndex++;
	console.log('➡️ 다음 매치 인덱스:', gameState.matchIndex);

	if (gameState.matchIndex < gameState.totalMatches) {
		console.log('🎮 같은 라운드의 다음 매치로 이동');
		displayMatch();
	} else {
		if (gameState.nextRound.length === 1) {
			console.log('🏆 우승자 결정!');
			await showWinner(gameState.nextRound[0]);
		} else {
			console.log('🔄 다음 라운드로 진행');
			nextRound();
		}
	}
}
```

**확인 방법**:
1. 게임 시작
2. 음식 선택할 때마다 Console에 로그 확인
3. 어떤 순서로 함수가 실행되는지 관찰

---

#### 실습 1-3: startGame() 함수 추적

```javascript
// script.js:216-231
async function startGame() {
	console.log('🎮 게임 시작!');

	if (foods.length === 0) {
		console.log('📥 음식 데이터 로드 필요');
		await loadFoods();
	} else {
		console.log('✅ 음식 데이터 이미 로드됨:', foods.length, '개');
	}

	gameState.currentRound = shuffle(foods);
	console.log('🔀 셔플된 음식:', gameState.currentRound.map(f => f.name));

	gameState.nextRound = [];
	gameState.matchIndex = 0;
	gameState.totalMatches = gameState.currentRound.length / 2;
	gameState.roundName = '16강';

	console.log('📊 초기 gameState:', gameState);

	showScreen('game-screen');
	displayMatch();
}
```

---

### 📖 읽어야 할 문서

완료 체크:
- [ ] `README.md` - 프로젝트 개요
- [ ] `Ideal_WorldCup_IdeaSchetch.md` - 기획 문서
- [ ] `STUDY_GUIDE.md` 섹션 1 - ES6 모듈 리팩토링
- [ ] `STUDY_GUIDE.md` 섹션 2 - Firebase 관련 코드
- [ ] `STUDY_GUIDE.md` 섹션 4 - JavaScript 기본 개념

---

### ✅ 1단계 완료 기준

- [ ] 서버 실행 성공
- [ ] 게임을 끝까지 플레이해봄
- [ ] console.log를 5개 이상 추가하고 결과 확인
- [ ] Chrome DevTools Console 사용법 익힘
- [ ] 주요 함수들의 역할 이해 (loadFoods, startGame, selectFood)
- [ ] ES6 모듈 import/export 개념 이해

---

## 2단계: 작은 수정 해보기

**목표**: 코드 변경의 결과를 직접 경험
**소요 시간**: 1-2일 (2-4시간)
**난이도**: ⭐⭐☆☆☆

### 실습 2-1: 음식 개수 바꾸기 (16강 → 8강)

**목표**: 배열 조작 연습

```javascript
// script.js - getFallbackFoods()
function getFallbackFoods() {
	return [
		{ id: 1, name: '돼지찌개', category: '한식', image: 'images/돼지찌개.webp' },
		{ id: 2, name: '국밥', category: '한식', image: 'images/국밥.webp' },
		{ id: 3, name: '짜장면', category: '중식', image: 'images/짜장면.webp' },
		{ id: 4, name: '갈비탕', category: '한식', image: 'images/갈비탕.webp' },
		{ id: 5, name: '찜닭', category: '한식', image: 'images/찜닭.webp' },
		{ id: 6, name: '브리또', category: '양식', image: 'images/브리또.webp' },
		{ id: 7, name: '샌드위치', category: '양식', image: 'images/샌드위치.webp' },
		{ id: 8, name: '삼겹살', category: '한식', image: 'images/삼겹살.webp' },
		// ✂️ 여기서 잘라서 8개만 남기기 (아래 주석 처리)
		// { id: 9, name: '돈까스', category: '일식', image: 'images/돈까스.webp' },
		// { id: 10, name: '치킨', category: '양식', image: 'images/치킨.webp' },
		// ... 나머지도 주석 처리
	];
}
```

**체크리스트**:
- [ ] 코드 수정
- [ ] 저장 후 브라우저 새로고침
- [ ] 게임 시작 시 "8강"부터 시작하는지 확인
- [ ] 4경기만 진행되는지 확인

---

### 실습 2-2: 게임 진행 속도 조절

**목표**: async/await 이해

```javascript
// script.js - selectFood() 함수 수정
async function selectFood(side) {
	const selectedIndex = gameState.matchIndex * 2 + (side === 'left' ? 0 : 1);
	const selectedFood = gameState.currentRound[selectedIndex];

	gameState.nextRound.push(selectedFood);
	incrementSelectCount(selectedFood.id);

	// ⏰ 여기에 2초 대기 추가
	console.log('⏰ 2초 대기 시작...');
	await new Promise(resolve => setTimeout(resolve, 2000));
	console.log('✅ 2초 대기 완료!');

	gameState.matchIndex++;

	if (gameState.matchIndex < gameState.totalMatches) {
		displayMatch();
	} else {
		if (gameState.nextRound.length === 1) {
			await showWinner(gameState.nextRound[0]);
		} else {
			nextRound();
		}
	}
}
```

**체크리스트**:
- [ ] 코드 수정
- [ ] 음식 선택 후 2초 뒤에 다음 매치로 넘어가는지 확인
- [ ] Console에 "⏰ 2초 대기 시작..." 로그 확인
- [ ] Promise와 setTimeout의 관계 이해

**추가 도전**:
- 대기 시간을 3초, 5초로 변경해보기
- 대기 중에 로딩 애니메이션 표시하기

---

### 실습 2-3: 스타일 변경

**목표**: CSS 효과 추가

#### 도전 A: 음식 카드 호버 효과

```css
/* style.css - .food-card 수정 */
.food-card {
	/* 기존 코드 유지 */

	/* ✨ 추가: 부드러운 전환 효과 */
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	cursor: pointer;
}

.food-card:hover {
	/* 크기 확대 + 회전 */
	transform: scale(1.1) rotate(5deg);

	/* 그림자 강조 */
	box-shadow: 0 10px 30px rgba(255, 107, 107, 0.5);

	/* 테두리 색상 변경 */
	border: 3px solid #ff6b6b;
}
```

**체크리스트**:
- [ ] CSS 수정
- [ ] 음식 카드에 마우스 올려서 효과 확인
- [ ] 회전 각도 변경해보기 (5deg → 10deg)
- [ ] 확대 비율 변경해보기 (1.1 → 1.2)

---

#### 도전 B: 버튼 색상 변경

```css
/* style.css - .btn-primary 수정 */
.btn-primary {
	/* 기존 코드 유지 */

	/* 🎨 배경색을 파란색으로 변경 */
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-primary:hover {
	/* 호버 시 더 진한 색 */
	background: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);
	transform: translateY(-2px);
	box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}
```

**체크리스트**:
- [ ] 버튼 색상 변경 확인
- [ ] 다른 색상 조합 시도해보기
- [ ] [Gradient Generator](https://cssgradient.io/) 사용해보기

---

#### 도전 C: 애니메이션 추가

```css
/* style.css - 맨 아래에 추가 */

/* 음식 카드 등장 애니메이션 */
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.food-card {
	/* 기존 코드 유지 */

	/* 애니메이션 적용 */
	animation: fadeInUp 0.6s ease-out;
}

/* 왼쪽 카드는 0.1초 지연 */
#food-left {
	animation-delay: 0.1s;
}

/* 오른쪽 카드는 0.2초 지연 */
#food-right {
	animation-delay: 0.2s;
}
```

**체크리스트**:
- [ ] 음식 카드가 아래에서 위로 올라오는 애니메이션 확인
- [ ] 애니메이션 시간 변경해보기 (0.6s → 1s)
- [ ] 다른 애니메이션 효과 시도 (회전, 확대 등)

---

### ✅ 2단계 완료 기준

- [ ] 음식 개수 변경 성공 (16강 → 8강)
- [ ] 게임 진행 속도 조절 성공
- [ ] CSS 효과 3가지 이상 추가
- [ ] Promise와 async/await 이해
- [ ] CSS transition과 animation 차이 이해

---

## 3단계: 기능 추가하기

**목표**: 새로운 기능을 직접 구현
**소요 시간**: 3-5일 (6-10시간)
**난이도**: ⭐⭐⭐☆☆

### 실습 3-1: "다시 시작" 버튼 추가

**목표**: 함수 작성 및 HTML 연동

#### Step 1: 함수 작성

```javascript
// script.js 맨 아래에 추가
function restartGame() {
	console.log('🔄 게임 재시작');

	// 게임 상태 초기화
	gameState = {
		currentRound: [],
		nextRound: [],
		matchIndex: 0,
		totalMatches: 0,
		roundName: '16강',
	};

	// 시작 화면으로 이동
	showScreen('start-screen');
}

// HTML에서 호출 가능하도록 window 객체에 추가
window.restartGame = restartGame;
```

#### Step 2: HTML 수정

```html
<!-- index.html - result-screen에 버튼 추가 -->
<div id="result-screen" class="screen">
	<h2>🏆 우승 메뉴 🏆</h2>
	<div class="winner-card">
		<img id="winner-img" src="" alt="" />
		<h3 id="winner-name"></h3>
	</div>

	<div class="restaurant-section">
		<h3>이 메뉴를 먹을 수 있는 식당</h3>
		<div id="restaurant-list"></div>
	</div>

	<button class="btn-primary" onclick="showStats()">통계 보기</button>
	<!-- ✨ 여기에 추가 -->
	<button class="btn-secondary" onclick="restartGame()">
		🔄 다시 시작
	</button>
</div>
```

#### Step 3: 테스트

**체크리스트**:
- [ ] 코드 작성
- [ ] 게임을 끝까지 플레이
- [ ] 결과 화면에서 "다시 시작" 버튼 확인
- [ ] 버튼 클릭 시 시작 화면으로 이동하는지 확인
- [ ] Console에 "🔄 게임 재시작" 로그 확인

---

### 실습 3-2: 현재 라운드 표시 개선

**목표**: 문자열 템플릿 활용

#### Before
```
16강
1/8
```

#### After
```
16강 (8경기 중 1경기째)
```

#### 코드 수정

```javascript
// script.js - displayMatch() 함수 수정
function displayMatch() {
	const leftFood = gameState.currentRound[gameState.matchIndex * 2];
	const rightFood = gameState.currentRound[gameState.matchIndex * 2 + 1];

	// 이미지와 이름 표시
	document.getElementById('food-left-img').src = leftFood.image;
	document.getElementById('food-left-img').alt = leftFood.name;
	document.getElementById('food-left-name').textContent = leftFood.name;

	document.getElementById('food-right-img').src = rightFood.image;
	document.getElementById('food-right-img').alt = rightFood.name;
	document.getElementById('food-right-name').textContent = rightFood.name;

	// 라운드 정보 업데이트 - ✨ 여기 수정
	document.getElementById('round-title').textContent =
		`${gameState.roundName} (${gameState.totalMatches}경기 중 ${gameState.matchIndex + 1}경기째)`;

	// match-info는 숨기거나 다른 용도로 사용
	document.getElementById('match-info').textContent = '';

	// 진행률 바 업데이트
	const progress = ((gameState.matchIndex + 1) / gameState.totalMatches) * 100;
	document.getElementById('progress').style.width = progress + '%';
}
```

**체크리스트**:
- [ ] 코드 수정
- [ ] 게임 플레이하면서 라운드 표시 확인
- [ ] "16강 (8경기 중 1경기째)" 형식으로 표시되는지 확인

---

### 실습 3-3: 음식 카테고리 필터 추가

**목표**: 배열 필터링 및 UI 연동

#### Step 1: 전역 변수 추가

```javascript
// script.js 상단에 추가
let selectedCategory = '전체';
```

#### Step 2: 카테고리 선택 함수

```javascript
// script.js에 추가
function setCategory(category) {
	selectedCategory = category;
	console.log('📂 선택된 카테고리:', category);

	// 버튼 활성화 표시 (선택사항)
	document.querySelectorAll('.category-btn').forEach(btn => {
		btn.classList.remove('active');
	});
	document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
}

window.setCategory = setCategory;
```

#### Step 3: startGame 수정

```javascript
// script.js - startGame() 함수 수정
async function startGame() {
	console.log('🎮 게임 시작!');

	if (foods.length === 0) {
		await loadFoods();
	}

	// ✨ 카테고리 필터링 추가
	let filteredFoods = foods;
	if (selectedCategory !== '전체') {
		filteredFoods = foods.filter(f => f.category === selectedCategory);
		console.log(`📂 ${selectedCategory} 필터링 결과:`, filteredFoods.length, '개');
	}

	// 최소 4개는 있어야 게임 가능 (4강)
	if (filteredFoods.length < 4) {
		alert(`${selectedCategory} 음식이 ${filteredFoods.length}개밖에 없어서 게임을 시작할 수 없습니다!`);
		return;
	}

	gameState.currentRound = shuffle(filteredFoods);
	gameState.nextRound = [];
	gameState.matchIndex = 0;
	gameState.totalMatches = gameState.currentRound.length / 2;

	// 라운드 이름 결정
	const count = filteredFoods.length;
	if (count >= 16) gameState.roundName = '16강';
	else if (count >= 8) gameState.roundName = '8강';
	else if (count >= 4) gameState.roundName = '4강';
	else gameState.roundName = '결승';

	showScreen('game-screen');
	displayMatch();
}
```

#### Step 4: HTML 수정

```html
<!-- index.html - start-screen에 버튼 추가 -->
<div id="start-screen" class="screen active">
	<h1>🍕 사식이 🍜</h1>
	<p>42 경산에서 가장 먹고 싶은 메뉴를 골라주세요!</p>
	<p class="participant-count">
		총 <span id="total-games">0</span>번의 게임이 진행되었습니다
	</p>

	<!-- ✨ 카테고리 선택 버튼 추가 -->
	<div class="category-buttons">
		<button class="category-btn active" data-category="전체" onclick="setCategory('전체')">
			전체
		</button>
		<button class="category-btn" data-category="한식" onclick="setCategory('한식')">
			🍚 한식
		</button>
		<button class="category-btn" data-category="중식" onclick="setCategory('중식')">
			🥟 중식
		</button>
		<button class="category-btn" data-category="일식" onclick="setCategory('일식')">
			🍱 일식
		</button>
		<button class="category-btn" data-category="양식" onclick="setCategory('양식')">
			🍕 양식
		</button>
	</div>

	<button class="btn-primary" onclick="startGame()">시작하기</button>
	<button class="btn-secondary" onclick="showStats()">통계 보기</button>
</div>
```

#### Step 5: CSS 추가

```css
/* style.css에 추가 */
.category-buttons {
	display: flex;
	gap: 10px;
	justify-content: center;
	margin: 20px 0;
	flex-wrap: wrap;
}

.category-btn {
	padding: 10px 20px;
	border: 2px solid #ddd;
	border-radius: 20px;
	background: white;
	cursor: pointer;
	font-size: 14px;
	transition: all 0.3s ease;
}

.category-btn:hover {
	border-color: #ff6b6b;
	transform: translateY(-2px);
}

.category-btn.active {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	border-color: #667eea;
}
```

**체크리스트**:
- [ ] 코드 작성
- [ ] 카테고리 버튼 5개 표시 확인
- [ ] 각 카테고리 클릭 시 필터링 동작 확인
- [ ] "한식"만 선택 시 한식만 나오는지 확인
- [ ] 선택된 버튼이 하이라이트되는지 확인

---

### ✅ 3단계 완료 기준

- [ ] 다시 시작 버튼 동작
- [ ] 라운드 표시 개선
- [ ] 카테고리 필터 동작
- [ ] 배열 filter() 메서드 이해
- [ ] DOM 조작 자신감 향상
- [ ] 3개 기능 모두 정상 동작

---

## 4단계: 버그 찾기 & 수정하기

**목표**: 디버깅 능력 키우기
**소요 시간**: 2-3일 (4-6시간)
**난이도**: ⭐⭐⭐⭐☆

### 실습 4-1: 의도적으로 버그 만들기

**목표**: 버그를 경험하고 해결하는 능력 키우기

#### 버그 1: 배열 초기화 누락

```javascript
// 🐛 버그 버전
async function loadFoods() {
	try {
		const foodsSnapshot = await getDocs(collection(db, 'foods'));
		// foods = [];  // ← 이 줄을 주석 처리하면?
		foodsSnapshot.forEach((doc) => {
			foods.push(doc.data());
		});
		foods.sort((a, b) => a.id - b.id);
		return foods;
	} catch (error) {
		console.error('음식 데이터 로드 실패:', error);
		return getFallbackFoods();
	}
}
```

**퀴즈**:
1. 어떤 문제가 생길까요?
2. 언제 문제가 발견될까요?
3. Console에 어떤 로그가 찍힐까요?

**해결 방법**:
<details>
<summary>정답 보기</summary>

**문제**: `foods` 배열을 초기화하지 않으면, 이전 데이터가 그대로 남아있어서 중복 데이터가 쌓입니다.

**증상**:
- 첫 번째 게임: 정상 (16개)
- 두 번째 게임: 32개 (16 + 16)
- 세 번째 게임: 48개 (32 + 16)

**해결**:
```javascript
foods = [];  // 항상 배열을 초기화해야 함
```

</details>

---

#### 버그 2: await 누락

```javascript
// 🐛 버그 버전
async function startGame() {
	if (foods.length === 0) {
		// await loadFoods();  // ← await를 빼면?
		loadFoods();
	}

	gameState.currentRound = shuffle(foods);  // foods가 비어있을 수 있음!
	gameState.nextRound = [];
	gameState.matchIndex = 0;
	gameState.totalMatches = gameState.currentRound.length / 2;
	gameState.roundName = '16강';

	showScreen('game-screen');
	displayMatch();
}
```

**퀴즈**:
1. 어떤 증상이 나타날까요?
2. 왜 이런 문제가 생길까요?
3. Chrome DevTools에서 어떻게 확인할 수 있을까요?

**해결 방법**:
<details>
<summary>정답 보기</summary>

**문제**: `await`를 빼면 `loadFoods()`가 완료되기 전에 다음 코드가 실행됩니다.

**증상**:
- `foods` 배열이 비어있음
- `shuffle(foods)` 결과도 빈 배열
- 게임 화면에 음식이 안 나옴
- Console 에러: "Cannot read property 'image' of undefined"

**해결**:
```javascript
await loadFoods();  // Promise가 완료될 때까지 대기
```

**디버깅 팁**:
```javascript
console.log('foods 길이:', foods.length);  // 0이 출력되면 문제!
```

</details>

---

#### 버그 3: 존재하지 않는 함수 호출

```javascript
// 🐛 버그 버전
window.startGame = startGame;
window.selectFood = selectFood;
window.showStats = showStats;
window.showScreen = showScreen;
// window.restartGame = restartGame;  // ← 이 줄을 주석 처리하면?
```

**HTML에서**:
```html
<button onclick="restartGame()">다시 시작</button>
```

**퀴즈**:
1. 버튼 클릭 시 어떤 일이 발생할까요?
2. Console에 어떤 에러가 나올까요?
3. 왜 ES6 모듈에서는 `window` 객체에 명시적으로 추가해야 할까요?

**해결 방법**:
<details>
<summary>정답 보기</summary>

**문제**: ES6 모듈은 스코프가 격리되어 있어서, HTML의 `onclick`에서 함수를 찾을 수 없습니다.

**증상**:
- Console 에러: "Uncaught ReferenceError: restartGame is not defined"
- 버튼 클릭해도 아무 동작 없음

**해결**:
```javascript
window.restartGame = restartGame;  // 전역 스코프에 추가
```

**ES6 모듈 특징**:
- 기본적으로 모든 변수/함수는 모듈 스코프
- HTML `onclick`은 전역 스코프(window)에서 함수를 찾음
- 따라서 명시적으로 `window.함수명 = 함수명` 필요

</details>

---

### 실습 4-2: 실제 버그 수정하기

**도전 과제**: 아래 버그를 직접 수정해보세요

#### 버그 A: 중복 클릭 방지

**문제**: 음식 카드를 빠르게 여러 번 클릭하면 중복 선택됨

**힌트**:
```javascript
let isSelecting = false;  // 선택 중인지 확인하는 플래그

async function selectFood(side) {
	// 이미 선택 중이면 무시
	if (isSelecting) {
		console.log('⚠️ 이미 선택 중입니다');
		return;
	}

	isSelecting = true;  // 선택 시작

	// ... 기존 코드

	isSelecting = false;  // 선택 완료
}
```

**체크리스트**:
- [ ] 코드 작성
- [ ] 빠르게 여러 번 클릭해도 한 번만 반응하는지 확인

---

#### 버그 B: 통계 데이터 없을 때 처리

**문제**: Firebase 연결 실패 시 통계 화면 오류

**힌트**:
```javascript
async function showStats() {
	const stats = await getStats();

	// stats가 없거나 foods가 비어있으면
	if (!stats || !stats.foods || Object.keys(stats.foods).length === 0) {
		document.getElementById('stats-total-games').textContent = '0';
		document.getElementById('winner-stats').innerHTML =
			'<p style="text-align: center; color: #999;">통계 데이터가 없습니다</p>';
		document.getElementById('selection-stats').innerHTML =
			'<p style="text-align: center; color: #999;">통계 데이터가 없습니다</p>';
		showScreen('stats-screen');
		return;
	}

	// ... 기존 코드
}
```

---

### ✅ 4단계 완료 기준

- [ ] 버그 3개 이상 경험하고 수정
- [ ] Chrome DevTools로 에러 추적 가능
- [ ] console.log를 활용한 디버깅 가능
- [ ] try-catch 에러 처리 이해
- [ ] 비동기 코드 디버깅 가능

---

## 5단계: 처음부터 다시 만들기

**목표**: 진짜 내 것으로 만들기
**소요 시간**: 5-7일 (10-15시간)
**난이도**: ⭐⭐⭐⭐⭐

### 방법 1: 같은 기능, 처음부터 작성

#### 준비

```bash
# 새 폴더 만들기
mkdir /home/ssohn/studys/frontend_study/mini-project/Ideal_food_WorldCup_v2
cd Ideal_food_WorldCup_v2

# 기본 파일 생성
touch index.html
touch style.css
touch script.js
touch firebase-config.js
```

#### 단계별 구현

**Day 1-2: HTML 구조와 CSS**
- [ ] 시작 화면 HTML/CSS
- [ ] 게임 화면 HTML/CSS
- [ ] 결과 화면 HTML/CSS
- [ ] 통계 화면 HTML/CSS
- [ ] 화면 전환 기능 (showScreen)

**Day 3: Firebase 연동**
- [ ] firebase-config.js 작성
- [ ] Firestore에서 데이터 읽기 (loadFoods)
- [ ] Fallback 데이터 준비

**Day 4-5: 게임 로직**
- [ ] 게임 상태 관리 (gameState)
- [ ] 배열 셔플 (Fisher-Yates)
- [ ] 토너먼트 진행 (selectFood, nextRound)
- [ ] 매치 표시 (displayMatch)

**Day 6: 통계 기능**
- [ ] 통계 읽기/쓰기
- [ ] 우승 카운트 증가
- [ ] 선택 카운트 증가
- [ ] 통계 화면 표시

**Day 7: 테스트 및 디버깅**
- [ ] 전체 게임 플레이 테스트
- [ ] 버그 수정
- [ ] 코드 정리 (리팩토링)

**체크리스트**:
- [ ] 원본 코드를 보지 않고 작성
- [ ] 막히면 STUDY_GUIDE.md만 참고
- [ ] 완성 후 원본 코드와 비교
- [ ] 나만의 개선 사항 추가

---

### 방법 2: 다른 주제로 변경

#### 예시 1: 영화 이상형 월드컵

**데이터 구조**:
```javascript
// firebase-config.js (동일)

// script.js
let movies = [];  // foods 대신

function getFallbackMovies() {
	return [
		{ id: 1, name: '인터스텔라', genre: 'SF', image: 'images/interstellar.webp' },
		{ id: 2, name: '기생충', genre: '드라마', image: 'images/parasite.webp' },
		{ id: 3, name: '어벤져스', genre: '액션', image: 'images/avengers.webp' },
		// ... 16개
	];
}

async function loadMovies() {
	const moviesSnapshot = await getDocs(collection(db, 'movies'));
	// ...
}
```

**Firestore 컬렉션**:
- `movies`: 영화 목록
- `streaming`: 볼 수 있는 스트리밍 서비스 (넷플릭스, 왓챠 등)
- `statistics`: 통계

**체크리스트**:
- [ ] 영화 데이터 16개 수집
- [ ] 영화 이미지 준비
- [ ] Firebase 컬렉션 구조 설계
- [ ] 코드 수정 (foods → movies)
- [ ] 스트리밍 서비스 정보 추가

---

#### 예시 2: 여행지 이상형 월드컵

**데이터 구조**:
```javascript
function getFallbackDestinations() {
	return [
		{ id: 1, name: '제주도', region: '국내', image: 'images/jeju.webp' },
		{ id: 2, name: '파리', region: '유럽', image: 'images/paris.webp' },
		// ...
	];
}
```

**추가 기능 아이디어**:
- [ ] 지역별 필터 (국내/해외)
- [ ] 예산별 필터 (50만원 이하, 100만원 이하 등)
- [ ] 여행 기간 필터 (1-2일, 3-5일 등)
- [ ] 우승 여행지의 관광명소 표시

---

### ✅ 5단계 완료 기준

- [ ] 처음부터 끝까지 혼자 작성
- [ ] 모든 기능이 정상 동작
- [ ] 원본 코드를 이해하고 설명 가능
- [ ] 나만의 기능 1개 이상 추가
- [ ] Git으로 버전 관리

---

## 6단계: 새로운 기술 적용

**목표**: 기술 스택 확장
**소요 시간**: 1-2주 (10-20시간)
**난이도**: ⭐⭐⭐⭐⭐

### 옵션 1: React로 변환

#### 프로젝트 생성

```bash
npx create-react-app food-worldcup-react
cd food-worldcup-react
npm install firebase
```

#### Firebase 설정

```javascript
// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	// ... 동일한 설정
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

#### 컴포넌트 구조

```
src/
├── App.jsx
├── components/
│   ├── StartScreen.jsx
│   ├── GameScreen.jsx
│   ├── ResultScreen.jsx
│   └── StatsScreen.jsx
├── hooks/
│   ├── useFoods.js
│   └── useStats.js
├── firebase-config.js
└── App.css
```

#### 예시 코드

```jsx
// src/hooks/useFoods.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

export function useFoods() {
	const [foods, setFoods] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadFoods() {
			const snapshot = await getDocs(collection(db, 'foods'));
			const data = snapshot.docs.map(doc => doc.data());
			data.sort((a, b) => a.id - b.id);
			setFoods(data);
			setLoading(false);
		}
		loadFoods();
	}, []);

	return { foods, loading };
}
```

```jsx
// src/components/GameScreen.jsx
import { useState, useEffect } from 'react';
import { useFoods } from '../hooks/useFoods';

function GameScreen({ onComplete }) {
	const { foods, loading } = useFoods();
	const [currentMatch, setCurrentMatch] = useState([]);
	const [gameState, setGameState] = useState({
		currentRound: [],
		nextRound: [],
		matchIndex: 0,
	});

	useEffect(() => {
		if (foods.length > 0) {
			// Fisher-Yates shuffle
			const shuffled = shuffle([...foods]);
			setGameState({
				currentRound: shuffled,
				nextRound: [],
				matchIndex: 0,
			});
		}
	}, [foods]);

	useEffect(() => {
		if (gameState.currentRound.length > 0) {
			const left = gameState.currentRound[gameState.matchIndex * 2];
			const right = gameState.currentRound[gameState.matchIndex * 2 + 1];
			setCurrentMatch([left, right]);
		}
	}, [gameState]);

	function selectFood(side) {
		// ... 로직
	}

	if (loading) return <div>로딩 중...</div>;

	return (
		<div className="game-screen">
			<div className="food-card" onClick={() => selectFood('left')}>
				<img src={currentMatch[0]?.image} alt={currentMatch[0]?.name} />
				<h3>{currentMatch[0]?.name}</h3>
			</div>
			<div className="vs">VS</div>
			<div className="food-card" onClick={() => selectFood('right')}>
				<img src={currentMatch[1]?.image} alt={currentMatch[1]?.name} />
				<h3>{currentMatch[1]?.name}</h3>
			</div>
		</div>
	);
}
```

**체크리스트**:
- [ ] React 프로젝트 생성
- [ ] 컴포넌트 분리 (StartScreen, GameScreen 등)
- [ ] Custom Hooks 작성 (useFoods, useStats)
- [ ] useState, useEffect 활용
- [ ] Firebase 연동
- [ ] 배포 (Vercel, Netlify)

---

### 옵션 2: TypeScript 추가

#### 프로젝트 설정

```bash
# 기존 프로젝트에 TypeScript 추가
npm install --save-dev typescript
npx tsc --init
```

#### 타입 정의

```typescript
// types.ts
export interface Food {
	id: number;
	name: string;
	category: '한식' | '중식' | '일식' | '양식';
	image: string;
}

export interface Restaurant {
	foodId: number;
	name: string;
	mapUrl: string;
}

export interface GameState {
	currentRound: Food[];
	nextRound: Food[];
	matchIndex: number;
	totalMatches: number;
	roundName: '16강' | '8강' | '4강' | '결승';
}

export interface Statistics {
	totalGames: number;
	foods: {
		[key: number]: {
			name: string;
			winCount: number;
			selectCount: number;
		};
	};
}
```

#### TypeScript로 변환

```typescript
// script.ts
import { db, collection, getDocs } from './firebase-config';
import type { Food, GameState, Statistics } from './types';

let foods: Food[] = [];
let restaurants: Restaurant[] = [];

let gameState: GameState = {
	currentRound: [],
	nextRound: [],
	matchIndex: 0,
	totalMatches: 0,
	roundName: '16강',
};

async function loadFoods(): Promise<Food[]> {
	try {
		const foodsSnapshot = await getDocs(collection(db, 'foods'));
		foods = [];
		foodsSnapshot.forEach((doc) => {
			foods.push(doc.data() as Food);
		});
		foods.sort((a, b) => a.id - b.id);
		return foods;
	} catch (error) {
		console.error('음식 데이터 로드 실패:', error);
		return getFallbackFoods();
	}
}

function shuffle<T>(array: T[]): T[] {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}
```

**체크리스트**:
- [ ] TypeScript 설정
- [ ] 인터페이스 정의
- [ ] 기존 코드를 TypeScript로 변환
- [ ] 타입 에러 해결
- [ ] 컴파일 성공

---

### 옵션 3: Vite + React + TypeScript

```bash
npm create vite@latest food-worldcup -- --template react-ts
cd food-worldcup
npm install
npm install firebase
```

**체크리스트**:
- [ ] Vite 프로젝트 생성
- [ ] React + TypeScript 조합
- [ ] Firebase 연동
- [ ] 빠른 개발 서버 경험
- [ ] 프로덕션 빌드

---

### ✅ 6단계 완료 기준

- [ ] React로 변환 성공
- [ ] TypeScript 적용 성공
- [ ] 배포 완료 (Vercel/Netlify)
- [ ] 포트폴리오에 추가
- [ ] GitHub README 작성

---

## 학습 팁

### ✅ 해야 할 것

#### 1. 매일 조금씩 학습

```
❌ 나쁜 예:
주말에 8시간 몰아서 공부

✅ 좋은 예:
평일 매일 1시간씩 공부 (월~금 5시간)
```

**이유**:
- 꾸준한 학습이 장기 기억으로 전환
- 뇌가 쉬는 동안 정보 정리
- 번아웃 방지

---

#### 2. 손으로 직접 타이핑

```javascript
// ❌ 나쁜 예: 복사/붙여넣기
// Ctrl+C → Ctrl+V

// ✅ 좋은 예: 직접 타이핑
async function loadFoods() {
	// 한 글자씩 타이핑하면서 이해
}
```

**이유**:
- 타이핑하면서 코드 구조 이해
- 오타를 고치면서 디버깅 연습
- 근육 기억 형성

---

#### 3. console.log 많이 찍기

```javascript
// ✅ 좋은 예: 중요한 지점마다 로그
async function loadFoods() {
	console.log('🔥 [1] 시작');

	const snapshot = await getDocs(collection(db, 'foods'));
	console.log('🔥 [2] 받은 데이터:', snapshot);

	const foods = snapshot.docs.map(doc => doc.data());
	console.log('🔥 [3] 변환된 데이터:', foods);

	return foods;
}
```

**이유**:
- 코드 실행 흐름 확인
- 변수 값 추적
- 버그 위치 파악

---

#### 4. Chrome DevTools 활용

**Console 탭**:
- 에러 메시지 확인
- console.log 출력 확인
- JavaScript 코드 직접 실행

**Network 탭**:
- Firebase API 호출 확인
- 요청/응답 데이터 확인
- 로딩 시간 측정

**Sources 탭**:
- 브레이크포인트 설정
- 한 줄씩 코드 실행
- 변수 값 실시간 확인

**단축키**:
- F12: DevTools 열기
- Ctrl+Shift+C: 요소 선택
- Ctrl+Shift+I: DevTools 열기

---

#### 5. 에러 메시지 읽기

```
❌ 나쁜 예:
에러가 나면 무시하고 넘어가기

✅ 좋은 예:
에러 메시지를 천천히 읽고 이해하기
```

**예시**:
```
Uncaught ReferenceError: restartGame is not defined
    at HTMLButtonElement.onclick (index.html:62:50)
```

**읽는 법**:
1. `ReferenceError`: 참조 에러 (변수/함수를 찾을 수 없음)
2. `restartGame is not defined`: restartGame 함수가 정의되지 않음
3. `index.html:62:50`: index.html 62번째 줄, 50번째 문자

**해결**:
- `window.restartGame = restartGame` 추가 확인
- `script.js`가 올바르게 로드되는지 확인

---

#### 6. 작은 단위로 테스트

```javascript
// ❌ 나쁜 예: 한 번에 100줄 작성 후 테스트
function bigFunction() {
	// ... 100줄의 코드
}

// ✅ 좋은 예: 10줄씩 작성 후 테스트
function step1() {
	console.log('step1 완료');
	return true;
}
// 테스트 → 성공 → 다음 단계

function step2() {
	console.log('step2 완료');
	return true;
}
// 테스트 → 성공 → 다음 단계
```

---

### ❌ 하지 말아야 할 것

#### 1. 처음부터 완벽하게 이해하려고 하기

```
❌ "이 코드를 100% 이해할 때까지 넘어가지 않겠어!"

✅ "80% 이해했으니 일단 넘어가고, 나중에 다시 보자"
```

**이유**:
- 완벽주의는 진도를 막음
- 반복 학습이 더 효과적
- 실습하면서 이해도 향상

---

#### 2. 에러를 무시하고 넘어가기

```
❌ "에러가 나는데... 일단 넘어가자"

✅ "에러가 났다! 원인을 찾아서 해결하자"
```

**이유**:
- 에러는 학습의 기회
- 해결하면서 실력 향상
- 같은 에러를 다시 안 만남

---

#### 3. 너무 많은 기능을 한 번에 추가

```
❌ 한 번에 5개 기능 추가:
- 다시 시작 버튼
- 카테고리 필터
- 애니메이션
- 소리 효과
- 공유 기능

✅ 하나씩 추가:
1. 다시 시작 버튼 → 테스트 → 성공
2. 카테고리 필터 → 테스트 → 성공
3. ...
```

**이유**:
- 버그 발생 시 원인 파악 어려움
- 성취감 없음
- 중도 포기 위험

---

## 📊 진행 상황 체크리스트

### 전체 진도

- [ ] 1단계: 코드 읽고 이해하기
- [ ] 2단계: 작은 수정 해보기
- [ ] 3단계: 기능 추가하기
- [ ] 4단계: 버그 찾기 & 수정하기
- [ ] 5단계: 처음부터 다시 만들기
- [ ] 6단계: 새로운 기술 적용

### 세부 목표

**JavaScript 이해도**:
- [ ] async/await 이해
- [ ] Promise 이해
- [ ] 배열 메서드 (map, filter, sort) 이해
- [ ] DOM 조작 이해
- [ ] 이벤트 리스너 이해
- [ ] ES6 모듈 (import/export) 이해

**Firebase 이해도**:
- [ ] Firebase 초기화
- [ ] Firestore 읽기 (getDoc, getDocs)
- [ ] Firestore 쓰기 (setDoc, updateDoc)
- [ ] increment() 이해
- [ ] Security Rules 이해

**개발 도구**:
- [ ] Chrome DevTools 활용
- [ ] Git 기본 사용법
- [ ] VS Code 단축키
- [ ] 터미널 명령어

**프로젝트 완성도**:
- [ ] 모든 기능 정상 동작
- [ ] 버그 없음
- [ ] 코드 정리 (리팩토링)
- [ ] README 작성
- [ ] Git 커밋 이력
- [ ] 배포 완료

---

## 🎯 다음 단계 추천

### 초급 → 중급

이 프로젝트를 완성했다면:

1. **React 배우기**
   - [React 공식 튜토리얼](https://react.dev/learn)
   - 음식 월드컵을 React로 변환
   - useState, useEffect 이해

2. **TypeScript 배우기**
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
   - 타입 시스템 이해
   - 인터페이스와 제네릭

3. **다른 프로젝트 도전**
   - Todo 앱 (CRUD 연습)
   - 날씨 앱 (API 호출 연습)
   - 채팅 앱 (실시간 통신 연습)

---

### 중급 → 고급

1. **상태 관리 라이브러리**
   - Redux
   - Zustand
   - Recoil

2. **테스트**
   - Jest (단위 테스트)
   - React Testing Library
   - Cypress (E2E 테스트)

3. **백엔드 개발**
   - Node.js + Express
   - RESTful API 설계
   - 데이터베이스 (PostgreSQL, MongoDB)

---

## 📚 추가 학습 자료

### 온라인 강의

**무료**:
- [freeCodeCamp](https://www.freecodecamp.org/) - 무료 풀스택 과정
- [생활코딩](https://opentutorials.org/) - 한국어 프로그래밍 강의
- [MDN Web Docs](https://developer.mozilla.org/ko/) - 웹 기술 문서

**유료**:
- [노마드코더](https://nomadcoders.co/) - 실전 프로젝트 중심
- [인프런](https://www.inflearn.com/) - 한국어 강의 다수
- [Udemy](https://www.udemy.com/) - 세일 기간에 저렴하게 구매

---

### 책

**JavaScript**:
- 모던 JavaScript 튜토리얼 (무료 온라인)
- You Don't Know JS (무료 온라인)
- JavaScript Deep Dive (한국어)

**React**:
- React 공식 문서 (무료 온라인)
- Learning React (O'Reilly)
- 리액트를 다루는 기술 (한국어)

---

### 연습 사이트

- [JavaScript30](https://javascript30.com/) - 30개 프로젝트
- [Codewars](https://www.codewars.com/) - 알고리즘 연습
- [LeetCode](https://leetcode.com/) - 코딩 테스트 준비
- [Frontend Mentor](https://www.frontendmentor.io/) - 실전 프로젝트

---

## 💬 도움 받기

### 질문하기 좋은 곳

**커뮤니티**:
- [Stack Overflow](https://stackoverflow.com/) - 영어 Q&A
- [OKKY](https://okky.kr/) - 한국 개발자 커뮤니티
- [생활코딩 Q&A](https://opentutorials.org/forum)

**실시간 질문**:
- Discord - 개발 서버들
- Slack - 커뮤니티 채널들
- 카카오톡 오픈채팅

**AI 도우미**:
- ChatGPT
- Claude
- GitHub Copilot

---

### 좋은 질문 방법

**❌ 나쁜 질문**:
```
"코드가 안 돼요. 도와주세요."
```

**✅ 좋은 질문**:
```
[문제]
음식 월드컵 게임에서 "시작하기" 버튼을 클릭하면
음식이 표시되지 않습니다.

[환경]
- 브라우저: Chrome 120
- OS: Windows 11
- Firebase: Firestore

[시도한 것]
1. Console에서 확인 → "Cannot read property 'image' of undefined" 에러
2. foods 배열을 console.log로 확인 → 빈 배열 []
3. loadFoods() 함수에 await를 추가했지만 여전히 안 됨

[코드]
async function startGame() {
    await loadFoods();
    console.log('foods:', foods);  // 여기서 빈 배열
    // ...
}

[질문]
왜 loadFoods()를 await했는데도 foods가 비어있을까요?
```

---

## 🎉 마치며

### 학습 여정

```
시작 ──────────────────────────────────────────> 완성
 │                                                  │
 │   막막함                                         │   자신감
 │   에러 투성이                                     │   문제 해결
 │   좌절                                           │   성취감
 │                                                  │
 └─────> 포기하지 않으면 반드시 도착합니다 <──────────┘
```

---

### 성공의 비결

1. **꾸준함**: 매일 조금씩
2. **인내심**: 에러는 자연스러운 것
3. **호기심**: "왜?"를 계속 물어보기
4. **실천**: 읽기만 하지 말고 직접 코딩
5. **공유**: 배운 것을 정리하고 공유

---

### 응원 메시지

> "완벽한 코드를 작성하려고 하지 마세요.
> 동작하는 코드를 작성하고, 점진적으로 개선하세요."

> "에러는 실패가 아니라 학습의 기회입니다."

> "오늘의 당신은 어제의 당신보다 더 나은 개발자입니다."

---

**행운을 빕니다! 🚀**

---

**작성일**: 2025-10-31
**프로젝트**: 음식 이상형 월드컵 (42 경산)
**기술 스택**: Vanilla JavaScript, Firebase Firestore, HTML/CSS
