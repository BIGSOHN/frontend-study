# 39장 DOM

- 브라우저의 렌더링 엔진은 HTML 문서를 파싱하여 브라우저가 이해할 수 있는 자료구조인 DOM을 생성한다.
- **DOM(Document Object Model)은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조다.**

## 39.1 노드

### 39.1.1 HTML 요소와 객체 노드

- HTML 요소는 HTML 문서를 구성하는 개별적인 요소를 의미한다.
- HTML 요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환된다. 이때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로, HTML 요소의 텍스트 콘텐츠는 텍스트 노드로 변환된다.
- HTML 문서는 HTML 요소들의 집합으로 이뤄지며, HTML 요소는 중첩 관계를 갖는다.
- HTML 요소 간에는 중첩 관계에 의해 계층적인 부자(parent-chile)관계가 형성된다.
- 이러한 HTML 요소 간의 부자 관계를 반영하여 HTML 문서의 구성 요소인 HTML 요소를 객체화한 모든 노드 객체들을 트리 자료 구조로 구성한다.

#### 트리 자료구조

- 트리 자료구조는 노드들의 계층 구조로 이뤄진다. 즉 트리 자료구조는 부모 노드와 자식 노드로 구성되어 노드 간의 계층적 구조(부자, 형제 관계)를 표현하는 비선형 자료구조를 말한다.
- **노드 객체들로 구성된 트리 자료구조를 DOM(Document Object Model)이라 한다.** 노드 객체의 트리로 구조화되어 있기 때문에 DOM을 **DOM 트리**라고 부르기도 한다.

### 39.1.2 노드 객체의 타입

- DOM은 노드 객체의 계층적인 구조로 구성된다. 노드 객체는 종류가 있고 상속 구조를 갖는다. 노드 객체는 총 12개의 종류(노드 타입)가 있다. 이 중에서 중요한 노드 타입은 다음과 같이 4가지다.

#### 문서 노드

- 문서 노드는 DOM 트리의 최상위에 존재하는 루트 노드로서 document 객체를 가리킨다.
- document 객체는 브라우저가 렌더링한 HTML 문서 전체를 가리키는 객체로서 전역 객체 window의 document 프로퍼티에 바인딩되어 있다.
- 브라우저 환경의 모든 자바스크립트 코드는 script 태그에 의해 분리되어 있어도 하나의 전역 객체 window를 공유한다. 따라서 모든 자바스크립트 코드는 전역 객체 window의 document 프로퍼티에 바인딩 되어 있는 하나의 document 객체를 바라본다. 즉 HTML 문서당 document 객체는 유일하다. 즉 HTML 문서당 document 객체는 유일하다.
- 문서 노드 즉 document 객체는 DOM 트리의 루트 노드이므로 DOM 트리의 노드들에 접근하기 위한 진입점 역할으 담당한다. 즉 요소, 어트리뷰트, 텍스트 노드에 접근하려면 문서 노드를 통해야 한다.

#### 요소 노드

- 요소 노드는 HTML 요소를 가리키는 객체다. 요소 노드는 HTML 요소 간의 중첩에 의해 부자 관계를 가지며, 이 부자 관계를 통해 정보를 구조화한다. 따라서 요소 노드는 문서의 구조를 표현한다고 할 수 있다.

#### 어트리뷰트 노드

- 어트리뷰트 노드는 HTML 요소의 어트리뷰트를 가리키는 객체다. 어트리뷰트 노드는 어트리뷰트가 지정된 HTML 요소의 요소 노드와 연결되어 있다. 단, 요소 노드는 부모 노드와 연결되어 있지만 어트리뷰트 노드는 부모 노드와 연결되어 있지 않고 요소 노드에만 연결되어 있다.
- 즉 어트리뷰트 노드는 부모 노드가 없으므로 요소 노드의 형제 노드는 아니다. 따라서 어트리뷰트 노드에 접근하여 어트리뷰트를 참조하거나 변경하려면 먼저 요소 노드에 접근해야 한다.

#### 텍스트 노드

- 텍스트 노드는 HTML 요소의 텍스트를 가리키는 객체다. 요소 노드가 문서의 구조를 표혀한다면 텍스트 노드는 문서의 정보를 표현한다고 할 수 있다. 텍스트 노드는 요소 노드의 자식 노드이며, 자식 노드를 가질 수 없는 리프 노드다.
- 즉 텍스트 노드는 DOM 트리의 최종단이다. 따라서 텍스트 노드에 접근하려면 먼저 부모 노드인 요소 노드에 접근해야 한다.

### 39.1.3 노드 객체의 상속 구조

- DOM은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API 즉 프로퍼티와 메서드를 제공하는 트리 자료구조라고 했다.
- 즉 DOM을 구성하는 노드 객체는 자신의 구조와 정보를 제어할 수 있는 DOM API를 사용할 수 있다. 이를 통해 노드 객체는 자신의 부모 형제 자식을 탐색할 수 있으며, 자신의 어트리뷰트와 텍스트를 조작할 수도 있다.
- DOM을 구성하는 노드 객체는 ECMAScript 사양에 정의된 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 호스트 객체다. 하지만 노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조를 갖는다.
- | input 요소 노드 객체의 특성                                                | 프로토타입을 제공하는 객체 |
  | -------------------------------------------------------------------------- | -------------------------- |
  | 객체                                                                       | Object                     |
  | 이벤트를 발생시키는 객체                                                   | EventTarget                |
  | 트리 자료구조의 노드 객체                                                  | Node                       |
  | 브라우저가 렌더링할 수 있는 웹 문서의 요소(HTML, XML, SVG)를 표현하는 객체 | Element                    |
  | 웹 문서의 요소 중에서 HTML 요소를 표현하는 객체                            | HTMLElement                |
  | HTML 요소 중에서 input 요소를 표현하는 객체                                | HTMLInputElement           |
- 노드 객체에는 노드 객체의 종류, 즉 노드 타입에 상관없이 모든 노드 객체가 공통으로 갖는 기능도 있고, 노드 타입에 따라 고유한 기능도 있다.
- 노드 객체는 공통된 기능일수록 프로토타입 체인의 상위에, 개별적인 고유 기능일수록 프로토타입 체인의 하위에 프로토타입 체인을 구축하여 노드 객체 필요한 기능, 즉 프로퍼티와 메서드를 제공하는 상속 구조를 갖는다.
- **DOM은 HTML 문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류, 즉 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API로 제공한다. 이 DOM API를 통해 HTML의 구조나 내용 또는 스타일 등을 동적으로 조작할 수 있다.**

## 39.2 요소 노드 취득

- HTML의 구조나 내용 또는 스타일 등을 동적으로 조작하려면 먼저 요소 노드를 취득해야 하다.
- 텍스트 노드는 요소 노드의 자식 노드이고, 어트리뷰트 노드는 요소 노드와 연결되어 있기 때문에 텍스트 노드나 어트리뷰트 노드를 조작ㅎ고자 할 때도 마찬가지다.

### 39.2.1 id를 이용한 요소 노드 취득

- Document.prototype.getElementById 메서드는 인수로 전달한 id 어트리뷰트 값(이하 id 값)을 갖는 하나의 요소 노드를 탐색하여 반환한다.
- getElementById 메서드는 Document.prototype의 프로퍼티다. 따라서 반드시 문서 노드인 document를 통해 호출해야 한다.
- id 값은 HTML 문서 내에서 유일한 값이어야 하며, class 어트리뷰트와는 달리 공백 문자로 구분하여 여러 개의 값을 가질 수 없다. 단 HTML 문서 내에 중복된 id 값을 갖는 HTML 요소가 여러 개 존재하더라도 어떠한 에러도 발생하지 않는다. 즉 HTML 문서 내에서 중복된 id 값을 갖는 요소가 여러 개 존재할 가능성이 있다.
- 이러한 경우 getElementById 메서드는 인수로 전달된 id 값을 갖는 첫 번째 요소 노드만 반환한다. 즉 getElementById 메서드는 언제나 단 하나의 요소 노드를 반환한다.

### 39.2.2 태그 이름을 이용한 요소 노드 취득

- Document.prototype/Element.prototype.getElementsByTagName 메서드는 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색하여 반환한다. getElementsByTagName 메서드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 HTMLCollection 객체를 반환한다.
- getElementsByTagName 메서드가 반환하는 DOM 컬렉션 객체인 HTMLCollection 객체는 유사 배열 객체이면서 이터러블이다.
- HTML 문서의 모든 요소 노드를 취득하려면 getElementsByTagName 메서드의 인수로 '\*'를 전달한다.
- Document.prototype.getElementsByTagName 메서드는 DOM의 루트 노드인 문서 노드 즉 document를 통해 호출하며 DOM 전체에서 요소 노드를 탐색하여 반환한다.
- Element.prototype.getElementsByTagName 메서드는 특정 요소 노드를 통해 호출하며, 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환한다.

### 39.2.3 class를 이용한 요소 노드 취득

- Document.prototype/Element.prototype.getElementsByClassName 메서드는 인수로 전달한 class 어트리뷰트 값(이하 class 값)을 갖는 모든 요소 노드들을 탐색하여 반환한다.
- 인수로 전달한 class 값은 공백으로 구분하여 여러 개의 class를 지정할 수 있다.
- getElementsByTagName 메서드와 마찬가지로 getElementsByClassName 메서드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 HTMLCollection 객체를 반환한다.
- Document.prototype.getElementsByClassName 메서드는 DOM의 루트 노드인 문서 노드, 즉 document를 토애 호출하며 DOM 전체에서 요소 노드를 탐색하여 반환한다.
- Element.prototype.getElementsByClassName 메서드는 특정 요소 노드를 통해 호출하며 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환한다.

### 39.2.4 CSS 선택자를 이용한 요소 노드 취득

- CSS 선택자는 스타일을 적용하고자 하는 HTML 요소를 특정할 때 사용하는 문법이다.
- Document.prototype/Element.prototype.querySelector 메서드는 인수로 전달한 CSS 선택자를 만족시키는 하나의 요소 노드를 탐색하여 반환한다.
  - 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가 여러 개인 경우 첫 번째 요소 노드만 반환한다.
  - 인수로 전달돈 CSS 선택자를 만족시키는 요소 노드가 존재하지 않는 경우 null을 반환한다.
  - 인수로 전달한 CSS 선택자가 문법에 맞지 않는 경우 DOMException 에러가 발생한다.
- Document.prototype/Element.prototype.querySelectorAll 메서드는 인수로 전달한 CSS 선택자를 만족시키는 모든 요소 노드를 탐색하여 반환한다.
  - 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가 여러 개인 경우 첫 번째 요소 노드만 반환한다.
  - 인수로 전달된 CSS 선택자를 만족시키는 요소 노드가 존재하지 않는 경우 null을 반환한다.
  - 인수로 전달한 CSS 선택자가 문법에 맞지 않는 경우 DOMExecption 에러가 발생한다.
- Document.prototype/Element.prototype.querySelectorAll 메서드는 인수로 전달한 CSS 선택자를 만족시키는 모든 요소 노드를 탐색하여 반환한다. querySelectorAll 메서드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 NodeList 객체를 반환한다. NodeList 객체는 유사 배열 객체이면서 이터러블이다.
- id 어트리뷰트가 있는 요소 노드를 취득하는 경우에는 getElementById 메서드를 사용하고 그 외의 경우에는 querySelector, querySelectorAll 메서드를 사용하는 것을 권장한다.

### 39.2.5 특정 요소 노드를 취득할 수 있는지 확인

- Element.prototype.matches 메서드는 인수로 전달한 CSS 선택자를 통해 특정 요소 노드를 취득할 수 있는지 확인한다.
- Element.prototype.matches 메서드는 이벤트 위임을 사용할 때 유용하다.

### 39.2.6 HTMLCollection과 NodeList

- DOM 컬렉션 객체인 HTMLCollection과 NodeList는 DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체다.
- 이 둘 모두 유사 배열 객체이면서 이터러블이다.
- 이 둘의 중요한 특징은 노드 객체의 상태 변화를 실시간으로 반영하는 **살아 있는 객체**라는 것이다.
- HTMLCollection은 언제나 live 객체로 동작한다.
- NodeList는 대부분의 경우 노드 객체의 상태 변화를 실시간으로 반영하지 않고 과거의 정적 상태를 유지하는 non-live 객체로 동작하지만 경우에 따라 live 객체로 동작할 때가 있다.

#### HTMLCollection

- HTMLCollection 객체는 노드 객체의 상태 변화를 실시간으로 반영하는 살아 있는 DOM 컬렉션 객체다. 따라서 HTMLCollection 객체를 살아 있는 객체라고 부르기도 한다.
- HTMLCollection 객체는 실시간으로 노드 객체의 상태 변경을 반영하여 요소를 제거할 수 있기 때문에 HTMLCollection 객체를 for 문으로 순회하면서 노드 객체의 상태를 변경해야할 때 주의해야 한다.
- 이 문제는 for 문을 역방향으로 순회하는 방법으로 회피할 수 있다.
- 또는 while 문을 사용하여 HTMLCollection 객체에 노드 객체가 남아 있지 않을 때까지 무한 반복하는 방법으로 회피할 수도 있다.
- 더 간단한 해결책은 HTMLCollection 객체를 사용하지 않는 것이다.
- 유사 배열 객체이면서 이터러블인 HTMLCollection 객체를 배열로 변환하면 부작용을 발생시키는 HTMLCollection 객체를 사용할 필요가 없고 유용한 배열의 고차 함수를 사용할 수 있다. 즉 배열로 써라

#### NodeList

- HTMLCollection 객체의 부작용을 해결하기 위해 querySelectorAll 메서드를 사용하는 방법도 있다.
- querySelectorAll 메서드는 DOM 컬렉션 객체인 NodeList 객체를 반환한다.
- 이때 NodeList 객체는 실시간으로 노드 객체의 상태 변경을 반영하지 않는 객체다.
- querySelectorAll이 반환하는 NodeList 객체는 NodeList.prototype.forEach 메서드를 상속받아 사용할 수 있다.
- NodeList 객체는 대부분의 경우 노드 객체의 상태 변경을 실시간으로 반영하지 않고 과거의 정적 상태를 유지하는 non-live 객체로 동작한다.
- 하지만 **chlindNodes 프로퍼티가 반환하는 NodeList 객체는 HTMLCollection 객체와 같이 실시간으로 노드 객체의 상태 변경을 반영하는 live 객체로 동작하므로 주의가 필요하다.**

- **노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 HTMLCollection이나 NodeList 객체를 배열로 변환하여 사용하는 것을 권장한다.**

## 39.3 노드 탐색

- 요소 노드를 취득한 다음, 취득한 요소 노드를 기점으로 DOM 트리의 노드를 옮겨 다니며 부모, 형제, 자식 노드 등을 탐색해야 할 때가 있다.
- DOM 트리 상의 노드를 탐색할 수 잇도록 Node, Element 인터페이스는 트리 탐색 프로퍼티를 제공한다.
- 노드 탐색 프로퍼티는 모두 접근자 프로퍼티다. 단 노드 탐색 프로퍼티는 setter 없이 getter만 존재하여 참조만 가능한 읽기 전용 접근자 프로퍼티다.
- 읽기 전용 접근자 프로퍼티에 값을 할당하면 아무런 에러 없이 무시된다.

### 39.3.1 공백 텍스트 노드

- HTML 요소 사이의 스페이스, 탭, 줄바꿈(개행)등의 공백 문자는 텍스트 노드를 생성한다. 이를 공백 텍스트 노드라 한다.
- 따라서 노드를 탐색할 때는 공백 문자가 생성한 공백 텍스트 노드에 주의해야 한다.

### 39.3.2 자식 노드 탐색

## DOM 탐색 프로퍼티 비교

| 프로퍼티                              | 설명                                                                                                                                                                                |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Node.prototype.childNodes`           | 자식 노드를 모두 탐색하여 DOM 컬렉션 객체인 NodeList에 담아 반환한다. `childNodes` 프로퍼티가 반환한 NodeList에는 **요소 노드뿐만 아니라 텍스트 노드도 포함**되어 있을 수 있다.     |
| `Element.prototype.children`          | 자식 노드 중에서 **요소 노드만 모두 탐색**하여 DOM 컬렉션 객체인 HTMLCollection에 담아 반환한다. `children` 프로퍼티가 반환한 HTMLCollection에는 **텍스트 노드가 포함되지 않는다**. |
| `Node.prototype.firstChild`           | 첫 번째 자식 노드를 반환한다. `firstChild` 프로퍼티가 반환한 노드는 **텍스트 노드이거나 요소 노드**다.                                                                              |
| `Node.prototype.lastChild`            | 마지막 자식 노드를 반환한다. `lastChild` 프로퍼티가 반환한 노드는 **텍스트 노드이거나 요소 노드**다.                                                                                |
| `Element.prototype.firstElementChild` | 첫 번째 자식 **요소 노드**를 반환한다. `firstElementChild` 프로퍼티는 **요소 노드만** 반환한다.                                                                                     |
| `Element.prototype.lastElementChild`  | 마지막 자식 **요소 노드**를 반환한다. `lastElementChild` 프로퍼티는 **요소 노드만** 반환한다.                                                                                       |

---

### 39.3.3 자식 노드 존재 확인

- 자식 노드가 존재하는지 확인하려면 Node.prototype.hasChildNodes 메서드를 사용한다.
- hasChildNodes 메서드는 childNodes 프로퍼티와 마찬가지로 텍스트 노드를 포함하여 자식 노드의 존재를 확인한다.
- 자식 노드 중에 텍스트 노드가 아닌 요소 노드가 존재하는지 확인하려면 hasChildNodes 메서드 대신 children.length 또는 Element 인터페이스의 chileElementCount 프로퍼티를 사용한다.

### 39.3.4 요소 노드의 텍스트 노드 탐색

- 요소 노드의 텍스트 노드는 요소 노드의 자식 노드다.
- 따라서 요소 노드의 텍스트 노드는 firstChild 프로퍼티로 접근할 수 있다.

### 39.3.5 부모 노드 탐색

- 부모 노드를 탐색하려면 Node.prototype.parentNode 프로퍼티를 사용한다. 텍스트 노드는 DOM 트리의 최종단 노드인 리프 노드이므로 부모 노드가 텍스트 노드인 경우는 없다.

### 39.3.6 형제 노드 탐색

- 부모 노드가 같은 형제 노드를 탐색하려면 다음과 같은 노드 탐색 프로퍼티를 사용한다.
- 단 어트리뷰트 노드는 요소 노드와 연결되어 있지만 부모 노드가 같은 형제 노드가 아니기 때문에 반환되지 않는다.
- 즉 아래 프로퍼티는 텍스트 노드 또는 요소 노드만 반환한다.

#### Node 탐색 프로퍼티

| 프로퍼티 | 설명 |
|---------|------|
| `Node.prototype.previousSibling` | 부모 노드가 같은 형제 노드 중에서 자신의 이전 형제 노드를 탐색하여 반환한다. `previousSibling` 프로퍼티가 반환하는 형제 노드는 요소 노드뿐만 아니라 텍스트 노드일 수도 있다. |
| `Node.prototype.nextSibling` | 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 노드를 탐색하여 반환한다. `nextSibling` 프로퍼티가 반환하는 형제 노드는 요소 노드뿐만 아니라 텍스트 노드일 수도 있다. |

#### Element 탐색 프로퍼티

| 프로퍼티 | 설명 |
|---------|------|
| `Element.prototype.previousElementSibling` | 부모 노드가 같은 형제 요소 노드 중에서 자신의 이전 형제 요소 노드를 탐색하여 반환한다. `previousElementSibling` 프로퍼티는 요소 노드만 반환한다. |
| `Element.prototype.nextElementSibling` | 부모 노드가 같은 형제 요소 노드 중에서 자신의 다음 형제 요소 노드를 탐색하여 반환한다. `nextElementSibling` 프로퍼티는 요소 노드만 반환한다. |

## 39.4 노드 정보 취득

- 노드 객체에 대한 정보를 취득하려면 다음과 같은 노드 정보 프로퍼티를 사용한다.
| 프로퍼티 | 설명 |
|---------|------|
| `Node.prototype.nodeType` | 노드 객체의 종류, 즉 노드 타입을 나타내는 상수를 반환한다. 노드 타입 상수는 Node에 정의되어 있다.<br>• `Node.ELEMENT_NODE`: 요소 노드 타입을 나타내는 상수 1을 반환<br>• `Node.TEXT_NODE`: 텍스트 노드 타입을 나타내는 상수 3을 반환<br>• `Node.DOCUMENT_NODE`: 문서 노드 타입을 나타내는 상수 9를 반환 |
| `Node.prototype.nodeName` | 노드의 이름을 문자열로 반환한다.<br>• 요소 노드: 대문자 문자열로 태그 이름("UL", "LI" 등)을 반환<br>• 텍스트 노드: 문자열 "#text"를 반환<br>• 문서 노드: 문자열 "#document"를 반환 |

## 39.5 요소 노드의 텍스트 조작

### 39.5.1 nodeValue

- Node.prototype.nodeValue 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티다.
- 따라서 nodeValue 프로퍼티는 참조와 할당 모두 가능하다.
- 노드 객체의 nodeValue 프로퍼티를 참조하면 노드 객체의 값을 반환한다.
- 노드 객체의 값이란 텍스트 노드의 텍스트다.
- 따라서 문서 노드나 요소노드의 nodeValue 프로퍼티를 참조하면 null을 반환한다.
- 텍스트 노드의 nodeValue 프로퍼티를 참조할 때만 텍스트 노드의 갓, 즉 텍스트를 반환한다.
- 텍스트 노드의 nodeValue 프로퍼티에 값을 할당하면 텍스트 노드의 값 즉 텍스트를 변경할 수 있다.
- 따라서 요소 노드의 텍스트를 변경하려면 다음과 같은 순서의 처리가 필요하다.
  1. 텍스트를 변경할 요소 노드를 취득한 다음, 취득한 요소 노드의 텍스트 노드를 탐색한다. 텍스트 노드는 요소 노드의 자식 노드이므로 firstChild 프로퍼티를 사용하여 탐색한다.
  2. 탐색한 텍스트 노드의 nodeValude 프로퍼티를 사용하여 텍스트 노드의 값을 변경한다.

### 39.5.2 textContent

- Node.prototype.textContent 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 텍스트와 모든 자손 노드의 텍스트를 모두 취득하거나 변경한다.
- 요소 노드의 textContent 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역(시작 태그와 종료 태그 사이) 내의 텍스트를 모두 반환한다.
- 요소 노드의 childNodes 프로퍼티가 반환한 모든 노드들의 텍스트 노드의 값, 즉 텍스트를 모두 반환한다.
- 이때 HTML 마크업은 무시된다.

## 39.6 DOM 조작

- DOM 조작은 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것을 말한다.
- DOM 조작에 의해 DOM에 새로운 노드가 추가되거나 삭제되면 리플로우와 리페인트가 발생하는 원인이 되므로 성능에 영향을 준다.

### 39.6.1 innerHTML

- Element.prototype.innerHTML 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 HTML 마크업을 취득하거나 변경한다.
- 요소 노드의 innerHTML 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역(시작 태그와 종료 태그 사이) 내에 포함된 모든 HTML 마크업을 문자열로 반환한다.
- innerHTML 프로퍼티는 HTML 마크업이 포함된 문자열을 그대로 반환한다.
- 요소 노드의 innerHTML 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열에 포함되어 있는 HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영된다.
- 사용자로부터 입력받은 데이터를 그대로 innerHTML 프로퍼티에 할당하는 것은 **크로스 사이트 스크립팅 공격**에 취약하므로 위험하다.
- HTML5는 innerHTML 프로퍼티로 삽입된 script 요소 내의 자바스크립트 코드를 실행하지 않는다.
- innerHTML 프로퍼티의 또 다른 단점은 요소 노드의 innerHTML 프로퍼티에 HTML 마크업 문자열을 할당하는 경우 요소 노드의 모든 자식 노드를 제거하고 할당한 HTML 마크업 문자열을 파싱하여 DOM을 변경한다는 것이다.

### 39.6.2 insertAdjacentHTML 메서드

- Element.prototype.insertAdjacentHTML(position, DOMString) 메서드는 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다.
- insertAdjacentHTML 메서드는 기존 요소에는 영향을 주지 않고 새롭게 삽입될 요소만을 파싱하여 자식 요소로 추가하므로 기존 자식 노드를 모두 제거하고 다시 처음부터 새롭게 자식 노드를 생성하여 자식 요소로 추가하는 innerHTML 프로퍼티보다 효율적이고 빠르다.
- 크로스 사이트 스크립트 공격에 취약하다.

### 39.6.3 노드 생성과 추가

- DOM은 노드를 직접 생성/삽입/삭제/치환하는 메서드도 제공한다.

#### 요소 노드 생성

- Document.prototype.createElement(tagName) 메서드는 요소 노드를 생성하여 반환한다.
- createElement 메서드의 매개 변수는 tagName에는 태그 이름을 나타내는 문자열을 인수로 전달한다.
- createElement 메서드는 요소 노드를 생성할 뿐 DOM에 추가하지 않는다. 따라서 이후에 생성된 요소 노드를 DOM에 추가하는 처리가 별도로 필요하다.
- createElement 메서드로 생성한 요소 노드는 아무런 자식 노드를 가지고 있지 않다.

#### 텍스트 노드 생성

- Document.prototype.createTextNode(text) 메서드는 텍스트 노드를 생성하여 반환한다.
- 문자열을 인수로 전달한다.
- 텍스트 노드는 요소 노드의 자식 노드다. 하지만 createTextNode 메서드로 생성한 텍스트 노드는 요소 노드의 자식 노드로 추가되지 않고 홀로 존재하는 상태다.
- 따라서 이후에 생성된 텍스트 노드를 요소 노드에 추가하는 처리가 별도로 필요하다.

#### 텍스트 노드를 요소 노드의 자식 노드로 추가

- Node.prototype.appendChild(childNode) 메서드는 매개 변수 childNode에게 인수로 전달한 노드를 appendChild 메서드를 호출한 노드의 마지막 자식 노드로 추가한다.
- appendChild 메서드의 인수로 createTextNode 메서드로 생성한 텍스트 노드를 전달하면 appendChild 메서드를 호출한 노드의 마지막 자식 노드로 텍스트 노드가 추가된다.
- 요소 노드에 자식 노드가 있는 경우 요소 노드의 textContent 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 텍스트로 추가되므로 주의해야 한다.

#### 요소 노드를 DOM에 추가

- Node.prototype.appendChild(childNode) 메서드를 사용하여 텍스트 노드와 부자 관계로 연결한 요소노드를 다른 요소 노드의 마지막 자식 요소로 추가한다.

### 39.6.4 복수의 노드 생성과 추가

- DOM을 여러 번 변경하는 문제를 회피하기 위해 컨테이너 요소를 사용해보자.

### 39.6.5 노드 삽입

#### 마지막 노드로 추가

- Node.prototype.appendChild 메서드는 인수로 전달받은 노드를 자신을 호출한 노드의 마지막 자식 노드로 DOM에 추가한다. 이때 노드를 추가할 위치를 지정할 수 없고 언제나 마지막 자식 노드로 추가한다.

#### 지정한 위치에 노드 삽입

- Node.prototype.insertBefore(newNode, childNode) 메서드는 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입한다.
- 두 번째 인수로 전달받은 노드는 반드시 insertBefore 메서드를 호출한 노드의 자식 노드이어야 한다. 그렇지 않으면 DOMException 에러가 발생한다.
- 두 번째 인수로 전달받은 노드가 null이면 첫 번째 인수로 전달받은 노드를 insertBefore 메서드를 호출한 노드의 마지막 자식 노드로 추가된다.

### 39.6.6 노드 이동

- DOM에 이미 존재하는 노드를 appendChild 또는 insertBefoe 메서드를 사용하여 DOM에 다시 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가한다. 즉 노드가 이동한다.

### 39.6.7 노드 복사

- Node.prototype.cloneNode([deep: true | false]) 메서드는 노드의 사본을 생성하여 반환한다.

### 39.6.8 노드 교체

- Node.prototype.replaceChild(newChild, oldChild) 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체한다.
- replaceChild 메서드는 자신을 호출한 노드의 자식 노드인 oldChild 노드를 newChld 노드를 교체한다. 이때 oldChild 노드는 DOM에서 제거된다.

### 39.6.9 노드 삭제

- Node.prototype.removeChild(child) 메서드는 child 매개변수에 인수로 전달한 노드를 DOM에서 삭제한다.
- 인수로 전달한 노드는 removeChild 메서드를 호출한 노드의 자식 노드이어야 한다.

## 39.7 어트리뷰트

### 39.7.1 어트리뷰트 노드와 attributes 프로퍼티

- 요소 노드의 모든 어트리뷰트 노드는 요소 노드의 Element.prototype.attributes 프로퍼티로 최득할 수 있다.
- attributes 프로퍼티는 getter만 존재하는 읽기 전용 접근자 프로퍼티이며, 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴 NamedNodeMap 객체를 반환한다.

### 39.7.2 HTML 어트리뷰트 조작

- Element.prototype.getAttribute/setAttribute 메서드를 사용하면 attributes 프로퍼티를 통하지 않고 요소 노드에서 메서드를 통해 직접 HTML 어트리뷰트 값을 취득하거나 변경할 수 있다.
- HTML 어트리뷰트 값을 참조하려면 Element.prototype.getAttribute(attributeName) 메서드를 사용한다.
- HTML 어트리뷰트 값을 변경하려면 Element.prototype.setAttribute(attributeName, attributeValue) 메서드를 사용한다.
- 특정 HTML 어트리뷰트가 존재하는지 확인하려면 Element.prototype.hasAttribute(attributeName) 메서드를 사용한다.
- 특정 HTML 어트리뷰트를 삭제하려면 Element.prototype.removeAttribute(attributeName) 메서드를 사용한다.

### 39.7.3 HTML 어트리뷰트 vs DOM 프로퍼티