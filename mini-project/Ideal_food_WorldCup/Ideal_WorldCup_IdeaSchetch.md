# 음식 이상형 월드컵 아이디어 스케치

## 프로젝트 개요

- 42 경산에서 가장 활용도가 많을 거 같은 음식 이상형 월드컵

### 서비스명

- 사식이 (42)

### 한 줄 소개

- 16 종류의 음식 중 당신이 먹고 싶은 그 메뉴를 골라주세요

### 문제 정의

- 매번 밥 먹을때마다 메뉴 정하기가 곤란함

### 주 사용층

- 42 경산 학생들

## 1. 기능 우선 순위 분류

### 핵심 기능

#### 음식 월드컵 게임

- 16개 음식 토너먼트 진행
  - 2개 음식 중 1개 선택
  - 선택 시 다음 매치로 자동 전환
- 게임 진행 상태 표시
- 음식 선택 인터페이스
  - 음식 이미지 표시
  - 음식 이름 표시
  - 클릭 / 터치로 선택

#### 결과 및 식당 추천

- 우승 음식 이미지 표시
- 우승 음식 카테고리 식당 필터링 표시

#### 전체 통계

- 통계 데이터 수집
  - 게임 종료 시 Firebase에 결과 저장
  - 우승 음식 카운트 증가
  - 선택된 음식 카운트 증가
- 통계 페이지
  - 우승 횟수 순위 표시
  - 선택 횟수 순위 표시
  - 총 게임 수 표시

## 2. 기능별 상세 명세

### 음식 월드컵 게임 진행

#### 입력

- 사용자의 음식 선택(클릭 / 터치)

#### 처리

1. 게임 시작 시 16개 음식을 랜덤 셔플
2. 8개의 16강 매치 생성 (2개씩 페어링)
3. 사용자가 선택하면 승자를 다음 라운드로 이동
4. 현재 라운드의 모든 매치가 끝나면 다음 라운드 생성
5. 최종 1개가 남을 때까지 반복

#### 출력

- 현재 매치의 2개 음식 표시
- 라운드 정보
- 진행률

#### 예외처리

- 게임 중 페이지 이탈 시

#### 성능 요구사항

- 선택 후 다음 화면 전환 : 속도 어느정도도?
- 확장자 webp

### 근처 식당 목록 표시

#### 입력

- 우승 음식 ID
- 사용자 위치는 고정 : 클러스터

#### 처리

1. Firebase에서 해당 음식 타입의 식당 쿼리
2. 식당 목록 반환

#### 출력

- 식당 이름
- 지도 링크 버튼
- 식당이 없을 때

#### 예외처리

- 식당 없음
- Firebase 연결 실패

## 화면 설계

### 시작 화면

- 서비스 로고 / 제목
- [시작하기] 버튼
- [통계 보기] 버튼
- 참여자 수 표시

### 게임 진행 화면

- 상단
  - 현재 라운드 (16강/8강/4강/결승)
  - 진행률 바(1/8, 2/8, ...)
- 중앙
  - 왼쪽 음식 카드 (이미지 + 이름)
  - 오른쪽 음식 카드 (이미지 + 이름)

### 결과 + 식당 목록 화면

- 우승 발표
  - 우승 음식 이미지
- 식당 목록
  - 식당 이름
  - [지도보기] 버튼
- [통계 보기] 버튼

### 통계 화면

- 페이지 제목
- 총 게임 수
- 우승 횟수 순위
- 선택 횟수 순위
- [돌아가기] 버튼

### 화면 흐름도

[시작] -> [게임] -> [결과 + 식당] -> [통계]

### 통계 화면

### 화면 흐름도

## 데이터 구조 설계

- 음식

  - 고유 ID
  - 이름
  - 이미지
  - 선택된 횟수
  - 우승 횟수
  - 카테고리

- 식당

  - 식당 이름
  - 어떤 음식
  - 카테고리
  - 지도 링크

- 관계

  - 음식 1개 : 식당 N개(1:N 관계)

### 음식 종류

- 돼지찌개, 국밥, 짜장면, 갈비탕
- 찜닭, 브리또, 샌드위치, 삼겹살
- 돈까스, 치킨, 햄버거, 파스타
- 덮밥, 우동, 석쇠불고기, 닭갈비

### 식당 종류

- 돼지찌개 : 육천 돼지찌개, 진량 돼지찌개
- 국밥 : 대호돼지국밥, 일품돼지국밥
- 짜장면 : 왕가네찬팅, 우당탕반점
- 갈비탕 : 청학골 한방 갈비탕
- 찜닭 : 쪼닭
- 브리또 : 엘브리또
- 샌드위치 : 서브웨이
- 삼겹살 : 무한폭식, 환도네
- 돈까스 : 카츠데이, 역전우동
- 치킨 : 맘스터치, 닭동가리
- 햄버거 : 맘스터치, 버거킹
- 파스타 : 미즈 컨테이너, 퀴다
- 덮밥 : 덮덮밥, 타이요
- 석쇠불고기 : 홍대불고기
- 닭갈비 : 일미 닭갈비
- 우동 : 삼동소바, 역전우동

### URL들 (네이버 지도)

- 육천 돼지찌개 <https://map.naver.com/p/entry/place/1866129911?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302223&locale=ko&svcName=map_pcv5>
- 진량 돼지찌개 <https://map.naver.com/p/entry/place/15207819?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302223&locale=ko&svcName=map_pcv5>
- 대호돼지국밥 <https://map.naver.com/p/entry/place/15219029?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302224&locale=ko&svcName=map_pcv5>
- 일품돼지국밥 <https://map.naver.com/p/entry/place/1553361584?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302224&locale=ko&svcName=map_pcv5>
- 왕가네찬팅 <https://map.naver.com/p/entry/place/13100598?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302224&locale=ko&svcName=map_pcv5>
- 우당탕반점 <https://map.naver.com/p/entry/place/15214401?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302224&locale=ko&svcName=map_pcv5>
- 청학골 한방 갈비탕 <https://map.naver.com/p/entry/place/15206391?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302224&locale=ko&svcName=map_pcv5>
- 쪼닭 <https://map.naver.com/p/entry/place/1098302881?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302224&locale=ko&svcName=map_pcv5>
- 엘브리또 <https://map.naver.com/p/entry/place/1411548640?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302225&locale=ko&svcName=map_pcv5>
- 서브웨이 <https://map.naver.com/p/entry/place/1078583378?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302225&locale=ko&svcName=map_pcv5>
- 무한폭식 <https://map.naver.com/p/entry/place/1123373941?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302225&locale=ko&svcName=map_pcv5>
- 환도네 <https://map.naver.com/p/entry/place/1527540489?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302225&locale=ko&svcName=map_pcv5>
- 카츠데이 <https://map.naver.com/p/entry/place/1002667908?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302225&locale=ko&svcName=map_pcv5>
- 역전우동 <https://map.naver.com/p/entry/place/2011185323?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302225&locale=ko&svcName=map_pcv5>
- 맘스터치 <https://map.naver.com/p/entry/place/1841379825?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302226&locale=ko&svcName=map_pcv5>
- 닭동가리 <https://map.naver.com/p/entry/place/1928792415?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302226&locale=ko&svcName=map_pcv5>
- 버거킹 <https://map.naver.com/p/entry/place/207887138?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302226&locale=ko&svcName=map_pcv5>
- 미즈컨테이너 <https://map.naver.com/p/entry/place/1718662630?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302226&locale=ko&svcName=map_pcv5>
- 퀴다 <https://map.naver.com/p/entry/place/1480660258?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302221&locale=ko&svcName=map_pcv5>
- 덮덮밥 <https://map.naver.com/p/entry/place/1643218077?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302226&locale=ko&svcName=map_pcv5>
- 타이요 <https://map.naver.com/p/entry/place/1957331368?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302227&locale=ko&svcName=map_pcv5>
- 홍대불고기 <https://map.naver.com/p/entry/place/38562994?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302227&locale=ko&svcName=map_pcv5>
- 일미 닭갈비 <https://map.naver.com/p/entry/place/1798439427?c=14.83,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302227&locale=ko&svcName=map_pcv5>
- 삼동소바 <https://map.naver.com/p/entry/place/1580626893?c=14.83,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202510302227&locale=ko&svcName=map_pcv5>
