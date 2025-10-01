// 🔍 DOM 요소 선택하기 - getElementById
let $color = document.getElementById('color'); // id가 'color'인 요소 선택
console.log($color); // 선택된 요소 출력

// 🎯 CSS 선택자로 요소 선택하기 - querySelector
let $animalInfo = document.querySelector('div.animal-info'); // class가 'animal-info'인 div 요소 선택
let ageElement = document.querySelector('div#age'); // id가 'age'인 div 요소 선택

console.log($animalInfo); // 선택된 요소 출력
console.log(ageElement); // 선택된 요소 출력

// 📋 여러 요소 선택하기 - querySelectorAll
let $infoItem = document.querySelectorAll('info-item'); // 'info-item' 태그의 모든 요소 선택 (NodeList 반환)
console.log($infoItem);

// 🏷️ 태그명으로 요소 선택하기 - getElementsByTagName
let $infoItem2 = document.getElementsByTagName('div'); // 모든 div 요소 선택 (HTMLCollection 반환)
console.log($infoItem2);

// ✏️ className 속성 변경하기
let $name = document.getElementById('name'); // id가 'name'인 요소 선택
$name.className = 'dog-name'; // className을 'dog-name'으로 변경

console.log($name); // 변경된 요소 출력
console.log($name.className); // className 속성 출력

// 🆔 id 속성 변경하기
let $animalInfo2 = document.querySelector('div.animal-info');
$animalInfo2.id = 'animal'; // id를 'animal'로 변경

console.log($animalInfo2); // 변경된 요소 출력
console.log($animalInfo2.id); // id 속성 출력

// 🎨 classList를 사용한 클래스 관리
let $color2 = document.getElementById('color');
console.log($color2.classList); // 현재 클래스 목록 출력
$color2.classList.add('dog-color'); // 'dog-color' 클래스 추가
console.log($color2);

$color2.classList.remove('info-item'); // 'info-item' 클래스 제거
console.log($color2);

// 📝 textContent로 텍스트 내용 변경하기
let $age = document.getElementById('age');
$age.textContent = '5살'; // 텍스트 내용을 '5살'로 변경
console.log($age);

// 🎨 style 속성으로 CSS 스타일 직접 변경하기
let $color3 = document.getElementById('color');
$color3.style.color = 'blue'; // 텍스트 색상을 파란색으로 변경
$color3.style.fontSize = '30px'; // 폰트 크기를 30px로 변경

// 🏗️ 새로운 DOM 요소 생성하기 - createElement
let $type = document.createElement('div'); // 새로운 div 요소 생성
$type.className = 'info-item'; // 클래스명 설정
$type.id = 'type'; // id 설정
$type.textContent = '말티즈'; // 텍스트 내용 설정
console.log($type);

// 📄 텍스트 노드 생성하기 - createTextNode
let $typeText = document.createTextNode('말티즈'); // 텍스트 노드 생성
console.log($type);
console.log($typeText);

// ➕ appendChild - 부모 요소에 자식 요소 추가하기
let $animalInfo3 = document.querySelector('div.animal-info');
$animalInfo3.appendChild($type); // animal-info div에 type div 추가
$type.appendChild($typeText); // type div에 텍스트 노드 추가
console.log($type);
console.log($typeText);

// 🔘 버튼 요소 생성 및 이벤트 리스너 추가
let $button = document.createElement('button'); // 새로운 버튼 요소 생성
$button.id = 'new-button'; // id 설정
$button.classList.add('new-button'); // 클래스 추가
$button.textContent = '버튼'; // 버튼 텍스트 설정
$button.addEventListener('click', () => { // 클릭 이벤트 리스너 추가
	window.alert('클릭'); // 클릭 시 알림창 표시
});

let $animalInfo4 = document.querySelector('div.animal-info');
$animalInfo4.appendChild($button); // animal-info div에 버튼 추가

console.log($animalInfo4);

// ⚠️ innerHTML - 성능과 보안 문제가 있기에 주의해서 사용
let $animalInfo5 = document.querySelector('div.animal-info');
$animalInfo5.innerHTML = '<div id="name">고양이</div>'; // HTML 문자열로 내용 완전 교체
console.log($animalInfo5.innerHTML); // innerHTML 내용 출력
