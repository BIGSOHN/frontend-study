// 음식 데이터
const foods = [
	{ id: 1, name: '돼지찌개', category: '한식', image: 'images/돼지찌개.jpg' },
	{ id: 2, name: '국밥', category: '한식', image: 'images/국밥.jpg' },
	{ id: 3, name: '짜장면', category: '중식', image: 'images/짜장면.jpg' },
	{ id: 4, name: '갈비탕', category: '한식', image: 'images/갈비탕.jpg' },
	{ id: 5, name: '찜닭', category: '한식', image: 'images/찜닭.jpg' },
	{ id: 6, name: '브리또', category: '양식', image: 'images/브리또.jpg' },
	{ id: 7, name: '샌드위치', category: '양식', image: 'images/샌드위치.jpg' },
	{ id: 8, name: '삼겹살', category: '한식', image: 'images/삼겹살.jpg' },
	{ id: 9, name: '돈까스', category: '일식', image: 'images/돈까스.jpg' },
	{ id: 10, name: '치킨', category: '양식', image: 'images/치킨.jpg' },
	{ id: 11, name: '햄버거', category: '양식', image: 'images/햄버거.jpg' },
	{ id: 12, name: '파스타', category: '양식', image: 'images/파스타.jpg' },
	{ id: 13, name: '덮밥', category: '일식', image: 'images/덮밥.jpg' },
	{ id: 14, name: '우동', category: '일식', image: 'images/우동.jpg' },
	{
		id: 15,
		name: '석쇠불고기',
		category: '한식',
		image: 'images/석쇠불고기.jpg',
	},
	{ id: 16, name: '닭갈비', category: '한식', image: 'images/닭갈비.jpg' },
];

// 식당 데이터 (42 경산 근처)
const restaurants = {
	돼지찌개: [
		{
			name: '돼지찌개 전문점',
			mapUrl: 'https://map.naver.com/p/search/42경산%20돼지찌개',
		},
		{
			name: '한식당',
			mapUrl: 'https://map.naver.com/p/search/42경산%20한식당',
		},
	],
	국밥: [
		{ name: '국밥집', mapUrl: 'https://map.naver.com/p/search/42경산%20국밥' },
		{
			name: '24시 국밥',
			mapUrl: 'https://map.naver.com/p/search/42경산%2024시국밥',
		},
	],
	짜장면: [
		{
			name: '중국집',
			mapUrl: 'https://map.naver.com/p/search/42경산%20중국집',
		},
		{
			name: '짜장면 맛집',
			mapUrl: 'https://map.naver.com/p/search/42경산%20짜장면',
		},
	],
	갈비탕: [
		{
			name: '갈비탕집',
			mapUrl: 'https://map.naver.com/p/search/42경산%20갈비탕',
		},
		{
			name: '한식당',
			mapUrl: 'https://map.naver.com/p/search/42경산%20한식당',
		},
	],
	찜닭: [
		{ name: '찜닭집', mapUrl: 'https://map.naver.com/p/search/42경산%20찜닭' },
		{
			name: '안동찜닭',
			mapUrl: 'https://map.naver.com/p/search/42경산%20안동찜닭',
		},
	],
	브리또: [
		{
			name: '멕시칸 레스토랑',
			mapUrl: 'https://map.naver.com/p/search/42경산%20브리또',
		},
		{
			name: '타코벨',
			mapUrl: 'https://map.naver.com/p/search/42경산%20타코벨',
		},
	],
	샌드위치: [
		{
			name: '서브웨이',
			mapUrl: 'https://map.naver.com/p/search/42경산%20서브웨이',
		},
		{
			name: '샌드위치 카페',
			mapUrl: 'https://map.naver.com/p/search/42경산%20샌드위치',
		},
	],
	삼겹살: [
		{
			name: '삼겹살집',
			mapUrl: 'https://map.naver.com/p/search/42경산%20삼겹살',
		},
		{
			name: '고기집',
			mapUrl: 'https://map.naver.com/p/search/42경산%20고기집',
		},
	],
	돈까스: [
		{
			name: '돈까스 전문점',
			mapUrl: 'https://map.naver.com/p/search/42경산%20돈까스',
		},
		{
			name: '일식당',
			mapUrl: 'https://map.naver.com/p/search/42경산%20일식당',
		},
	],
	치킨: [
		{ name: '치킨집', mapUrl: 'https://map.naver.com/p/search/42경산%20치킨' },
		{ name: 'BBQ', mapUrl: 'https://map.naver.com/p/search/42경산%20BBQ' },
	],
	햄버거: [
		{
			name: '버거킹',
			mapUrl: 'https://map.naver.com/p/search/42경산%20버거킹',
		},
		{
			name: '맥도날드',
			mapUrl: 'https://map.naver.com/p/search/42경산%20맥도날드',
		},
	],
	파스타: [
		{
			name: '이탈리안 레스토랑',
			mapUrl: 'https://map.naver.com/p/search/42경산%20파스타',
		},
		{
			name: '스파게티 전문점',
			mapUrl: 'https://map.naver.com/p/search/42경산%20이탈리안',
		},
	],
	덮밥: [
		{ name: '덮밥집', mapUrl: 'https://map.naver.com/p/search/42경산%20덮밥' },
		{
			name: '일식당',
			mapUrl: 'https://map.naver.com/p/search/42경산%20일식당',
		},
	],
	우동: [
		{ name: '우동집', mapUrl: 'https://map.naver.com/p/search/42경산%20우동' },
		{
			name: '일식당',
			mapUrl: 'https://map.naver.com/p/search/42경산%20일식당',
		},
	],
	석쇠불고기: [
		{
			name: '불고기집',
			mapUrl: 'https://map.naver.com/p/search/42경산%20불고기',
		},
		{
			name: '한식당',
			mapUrl: 'https://map.naver.com/p/search/42경산%20한식당',
		},
	],
	닭갈비: [
		{
			name: '닭갈비집',
			mapUrl: 'https://map.naver.com/p/search/42경산%20닭갈비',
		},
		{
			name: '춘천닭갈비',
			mapUrl: 'https://map.naver.com/p/search/42경산%20춘천닭갈비',
		},
	],
};

// 게임 상태
let gameState = {
	currentRound: [],
	nextRound: [],
	matchIndex: 0,
	totalMatches: 0,
	roundName: '16강',
};

// Firestore에서 통계 가져오기
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
		// Firebase 오류 시 로컬스토리지 fallback
		return getStatsFromLocalStorage();
	}
}

// LocalStorage fallback
function getStatsFromLocalStorage() {
	const stats = localStorage.getItem('food_worldcup_stats');
	if (!stats) {
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
	return JSON.parse(stats);
}

// Firestore에 통계 저장
async function saveStats(stats) {
	try {
		const { doc, setDoc } = window.firestoreFunctions;
		const statsRef = doc(window.db, 'statistics', 'global');
		await setDoc(statsRef, stats);
		// 동시에 로컬스토리지에도 저장
		localStorage.setItem('food_worldcup_stats', JSON.stringify(stats));
	} catch (error) {
		console.error('통계 저장 실패:', error);
		// Firebase 오류 시 로컬스토리지에만 저장
		localStorage.setItem('food_worldcup_stats', JSON.stringify(stats));
	}
}

// 음식 선택 카운트 증가
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

// 우승 카운트 증가
async function incrementWinCount(foodId) {
	try {
		const { doc, updateDoc, increment } = window.firestoreFunctions;
		const statsRef = doc(window.db, 'statistics', 'global');
		await updateDoc(statsRef, {
			[`foods.${foodId}.winCount`]: increment(1),
			totalGames: increment(1),
		});
	} catch (error) {
		console.error('우승 카운트 증가 실패:', error);
	}
}

// 배열 셔플 함수
function shuffle(array) {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}

// 화면 전환
function showScreen(screenId) {
	document.querySelectorAll('.screen').forEach((screen) => {
		screen.classList.remove('active');
	});
	document.getElementById(screenId).classList.add('active');
}

// 페이지 로드 시 총 게임 수 표시
window.addEventListener('DOMContentLoaded', async () => {
	const stats = await getStats();
	document.getElementById('total-games').textContent = stats.totalGames;
});

// 게임 시작
function startGame() {
	// 음식 배열 셔플
	gameState.currentRound = shuffle(foods);
	gameState.nextRound = [];
	gameState.matchIndex = 0;
	gameState.totalMatches = gameState.currentRound.length / 2;
	gameState.roundName = '16강';

	showScreen('game-screen');
	displayMatch();
}

// 매치 표시
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

	// 라운드 정보 업데이트
	document.getElementById('round-title').textContent = gameState.roundName;
	document.getElementById('match-info').textContent = `${
		gameState.matchIndex + 1
	}/${gameState.totalMatches}`;

	// 진행률 바 업데이트
	const progress = ((gameState.matchIndex + 1) / gameState.totalMatches) * 100;
	document.getElementById('progress').style.width = progress + '%';
}

// 음식 선택
async function selectFood(side) {
	const selectedIndex = gameState.matchIndex * 2 + (side === 'left' ? 0 : 1);
	const selectedFood = gameState.currentRound[selectedIndex];

	// 선택된 음식을 다음 라운드에 추가
	gameState.nextRound.push(selectedFood);

	// Firebase에 선택 횟수 증가 (비동기로 실행)
	incrementSelectCount(selectedFood.id);

	// 다음 매치로
	gameState.matchIndex++;

	if (gameState.matchIndex < gameState.totalMatches) {
		// 같은 라운드의 다음 매치
		displayMatch();
	} else {
		// 라운드 종료
		if (gameState.nextRound.length === 1) {
			// 게임 종료 - 우승자 결정
			await showWinner(gameState.nextRound[0]);
		} else {
			// 다음 라운드로
			nextRound();
		}
	}
}

// 다음 라운드
function nextRound() {
	gameState.currentRound = gameState.nextRound;
	gameState.nextRound = [];
	gameState.matchIndex = 0;
	gameState.totalMatches = gameState.currentRound.length / 2;

	// 라운드 이름 업데이트
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

	displayMatch();
}

// 우승자 표시
async function showWinner(winner) {
	try {
		// 우승 화면 표시 먼저 (사용자 경험 개선)
		document.getElementById('winner-img').src = winner.image;
		document.getElementById('winner-img').alt = winner.name;
		document.getElementById('winner-name').textContent = winner.name;

		// 식당 목록 표시
		const restaurantList = document.getElementById('restaurant-list');
		restaurantList.innerHTML = '';

		const foodRestaurants = restaurants[winner.name] || [];

		if (foodRestaurants.length === 0) {
			restaurantList.innerHTML =
				'<p style="text-align: center; color: #999;">등록된 식당이 없습니다 😢</p>';
		} else {
			foodRestaurants.forEach((restaurant) => {
				const item = document.createElement('div');
				item.className = 'restaurant-item';
				item.innerHTML = `
                <span>${restaurant.name}</span>
                <button class="btn-map" onclick="window.open('${restaurant.mapUrl}', '_blank')">
                    지도보기
                </button>
            `;
				restaurantList.appendChild(item);
			});
		}

		// 화면 전환
		showScreen('result-screen');

		// Firebase에 우승 횟수 증가 (백그라운드에서 실행)
		await incrementWinCount(winner.id);
	} catch (error) {
		console.error('우승자 표시 중 오류:', error);
		// 오류가 발생해도 결과 화면은 표시
		showScreen('result-screen');
	}
}

// 통계 화면 표시
async function showStats() {
	const stats = await getStats();

	// 총 게임 수
	document.getElementById('stats-total-games').textContent = stats.totalGames;

	// 음식 배열 생성
	const foodsArray = Object.values(stats.foods);

	// 우승 횟수 TOP 5
	const winnerStats = document.getElementById('winner-stats');
	winnerStats.innerHTML = '';

	const topWinners = foodsArray
		.sort((a, b) => b.winCount - a.winCount)
		.slice(0, 5);

	topWinners.forEach((food, index) => {
		const item = document.createElement('div');
		item.className = 'stat-item';
		item.innerHTML = `
            <span class="stat-rank">${index + 1}</span>
            <span class="stat-name">${food.name}</span>
            <span class="stat-count">${food.winCount}회</span>
        `;
		winnerStats.appendChild(item);
	});

	// 선택 횟수 TOP 5
	const selectionStats = document.getElementById('selection-stats');
	selectionStats.innerHTML = '';

	const topSelections = foodsArray
		.sort((a, b) => b.selectCount - a.selectCount)
		.slice(0, 5);

	topSelections.forEach((food, index) => {
		const item = document.createElement('div');
		item.className = 'stat-item';
		item.innerHTML = `
            <span class="stat-rank">${index + 1}</span>
            <span class="stat-name">${food.name}</span>
            <span class="stat-count">${food.selectCount}회</span>
        `;
		selectionStats.appendChild(item);
	});

	showScreen('stats-screen');
}
