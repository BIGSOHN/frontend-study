# 🍕 사식이 - 42 경산 음식 월드컵

> 42 경산 근처에서 가장 먹고 싶은 메뉴를 골라주세요!

16종류의 음식 중 토너먼트 방식으로 당신이 진짜 먹고 싶은 메뉴를 찾아드립니다.

## 📌 프로젝트 소개

### 문제 정의

매번 밥 먹을 때마다 메뉴 정하기가 곤란하지 않으셨나요?

### 솔루션

토너먼트 방식으로 16개 음식 중 하나를 선택하고, 우승한 메뉴의 주변 식당까지 추천해드립니다!

### 주 사용층

42 경산 클러스터 학생들

---

## 🎯 주요 기능

### 1. 음식 월드컵 게임

- **16강 토너먼트 방식**: 2개 음식 중 1개를 선택하여 진행
- **자동 진행**: 선택 시 다음 매치로 자동 전환
- **진행률 표시**: 현재 라운드와 매치 정보 실시간 표시
- **반응형 UI**: 클릭/터치 인터페이스 지원

### 2. 식당 추천

- **우승 메뉴 기반 추천**: 게임 종료 시 해당 메뉴를 먹을 수 있는 식당 표시
- **네이버 지도 연동**: 각 식당의 지도보기 버튼 제공
- **실시간 데이터**: Firebase Firestore에서 최신 식당 정보 제공

### 3. 통계 기능

- **우승 횟수 순위**: 가장 많이 우승한 음식 TOP 5
- **선택 횟수 순위**: 가장 많이 선택된 음식 TOP 5
- **총 게임 수**: 전체 사용자의 참여 횟수 표시
- **실시간 업데이트**: Firebase를 통한 실시간 통계 수집

---

## 🛠 기술 스택

### Frontend

- **Vanilla JavaScript (ES6+)**: 순수 JavaScript로 구현
  - ES6 모듈 시스템 (import/export) ⭐ NEW!
  - async/await 비동기 처리
  - 배열 메서드 활용
- **HTML5 / CSS3**: 시맨틱 마크업 및 반응형 디자인

### Backend & Database

- **Firebase Firestore**: NoSQL 실시간 데이터베이스
  - 음식 데이터 관리
  - 식당 정보 관리
  - 통계 데이터 수집 및 저장

### Architecture

- **모듈 패턴**: firebase-config.js로 설정 분리 ⭐ NEW!
- **관심사 분리**: Firebase 로직과 게임 로직 분리
- **CDN 방식**: Firebase SDK를 CDN으로 로드

---

## 📂 프로젝트 구조

```
Ideal_food_WorldCup/
├── index.html              # 메인 HTML 파일 (ES6 모듈 로드)
├── firebase-config.js      # Firebase 초기화 및 설정 (ES6 모듈)
├── script.js               # 게임 로직 (ES6 모듈)
├── style.css               # 스타일시트
├── images/                 # 음식 이미지 (WebP)
│   ├── 돼지찌개.webp
│   ├── 국밥.webp
│   └── ...
├── README.md               # 프로젝트 문서
├── STUDY_GUIDE.md          # 학습 가이드 (코드 상세 설명)
├── LEARNING_PLAN.md        # 학습 계획 (단계별 실습 가이드)
└── Ideal_WorldCup_IdeaSchetch.md  # 기획 문서
```

---

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/BIGSOHN/Ideal_food_WorldCup.git
cd Ideal_food_WorldCup
```

### 2. 로컬에서 실행

```bash
# Live Server 사용 (VS Code 확장)
# 또는 Python 간단 서버
python -m http.server 8000

# 브라우저에서 열기
open http://localhost:8000
```

### 3. Firebase 설정 (선택사항)

자신의 Firebase 프로젝트를 사용하려면:

1. [Firebase Console](https://console.firebase.google.com/)에서 프로젝트 생성
2. Firestore Database 활성화
3. `firebase-config.js`의 `firebaseConfig` 수정
4. Firestore에 데이터 추가 ([STUDY_GUIDE.md](./STUDY_GUIDE.md) 참고)

---

## 🎮 사용 방법

### 1. 게임 시작

- **[시작하기]** 버튼 클릭
- 총 게임 수 확인 가능

### 2. 게임 진행

- **16강**: 8경기 진행
- **8강**: 4경기 진행
- **4강**: 2경기 진행
- **결승**: 1경기 진행
- 각 매치에서 더 먹고 싶은 음식을 클릭

### 3. 결과 확인

- **우승 메뉴** 확인
- **근처 식당** 목록 확인
- **지도보기** 버튼으로 네이버 지도 열기

### 4. 통계 보기

- **우승 횟수 TOP 5**: 가장 인기 있는 메뉴
- **선택 횟수 TOP 5**: 가장 많이 선택된 메뉴

---

## 📊 데이터 구조

### 음식 (foods 컬렉션)

```javascript
{
  id: 1,
  name: "돼지찌개",
  category: "한식",
  image: "images/돼지찌개.webp"
}
```

### 식당 (restaurants 컬렉션)

```javascript
{
  foodId: 1,
  name: "육천 돼지찌개",
  mapUrl: "https://map.naver.com/..."
}
```

### 통계 (statistics 컬렉션)

```javascript
{
  totalGames: 100,
  foods: {
    1: {
      name: "돼지찌개",
      winCount: 15,
      selectCount: 45
    }
  }
}
```

---

## 🍽️ 음식 목록 (16종)

| 한식       | 중식   | 일식   | 양식     |
| ---------- | ------ | ------ | -------- |
| 돼지찌개   | 짜장면 | 돈까스 | 브리또   |
| 국밥       |        | 덮밥   | 샌드위치 |
| 갈비탕     |        | 우동   | 치킨     |
| 찜닭       |        |        | 햄버거   |
| 삼겹살     |        |        | 파스타   |
| 석쇠불고기 |        |        |          |
| 닭갈비     |        |        |          |

---

## 💡 배운 점

### JavaScript

- **ES6 모듈**: import/export로 코드 분리 및 재사용 ⭐ NEW!
- **async/await**: 비동기 처리의 핵심
- **DOM 조작**: querySelector, classList 활용
- **배열 메서드**: map, filter, sort, slice
- **이벤트 처리**: DOMContentLoaded, click 이벤트

### Firebase

- **모듈 패턴**: firebase-config.js로 설정 분리 ⭐ NEW!
- **Firestore CRUD**: getDoc, getDocs, updateDoc
- **실시간 데이터**: 통계 실시간 업데이트
- **increment()**: 원자적 카운터 증가
- **Security Rules**: 읽기/쓰기 권한 제어

### 알고리즘

- **Fisher-Yates Shuffle**: 공정한 랜덤 셔플
- **토너먼트 구조**: 16강 → 8강 → 4강 → 결승

### 개발 방법론

- **모듈 시스템**: 관심사 분리 (Separation of Concerns) ⭐ NEW!
- **페어 프로그래밍**: Claude Code와 협업
- **리팩토링**: window 객체 제거, ES6 모듈로 개선 ⭐ NEW!
- **문서화**: 학습 가이드 및 학습 계획 작성
- **Git 커밋**: 의미 있는 커밋 메시지

---

## 🔐 보안

### Firebase API 키 공개

이 프로젝트의 Firebase API 키는 **공개용 식별자**로, GitHub에 공개해도 안전합니다.

실제 보안은 **Firestore Security Rules**로 제어됩니다:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 읽기는 누구나, 쓰기는 제한
    match /foods/{foodId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

자세한 내용: [STUDY_GUIDE.md - Firebase 보안](./STUDY_GUIDE.md#2-firebase-보안-api-키)

---

## 📚 문서

- **[학습 가이드](./STUDY_GUIDE.md)**: 코드 상세 설명 및 학습 자료
  - ES6 모듈 리팩토링 과정
  - Firebase 관련 코드 설명
  - JavaScript 기본 개념
  - 학습 우선순위
- **[학습 계획](./LEARNING_PLAN.md)**: 단계별 실습 가이드 ⭐ NEW!
  - 1단계: 코드 읽고 이해하기
  - 2단계: 작은 수정 해보기
  - 3단계: 기능 추가하기
  - 4단계: 버그 찾기 & 수정하기
  - 5단계: 처음부터 다시 만들기
  - 6단계: 새로운 기술 적용 (React, TypeScript)
- **[기획 문서](./Ideal_WorldCup_IdeaSchetch.md)**: 프로젝트 기획 및 요구사항
- **[Firebase 공식문서](https://firebase.google.com/docs)**: Firebase 사용법

---

## 📄 라이선스

MIT License

---
