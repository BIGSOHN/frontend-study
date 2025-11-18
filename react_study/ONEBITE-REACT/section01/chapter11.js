// 함수
let area1 = getArea(10, 20);
getArea(30, 20);

// 호이스팅
// -> 끌어올리다 라는 뜻
function getArea(width, height) {
	let area = width * height;
	function another() {
		// 중첩 함수
		console.log('another');
	}
	another();
	return area;
}
