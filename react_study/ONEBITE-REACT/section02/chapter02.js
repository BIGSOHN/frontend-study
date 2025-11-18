// 단락 평가 활용 사례

function printName(person) {
	// if (!person) {
	// 	return;
	// }
	const name = person && person.name;
	console.log(name || "person의 값이 없음");
}