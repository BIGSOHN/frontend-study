import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
	return (
		// 부모 컴퍼넌트
		// 모든 부모 컴퍼넌트의 부모는 Root Component
		<>
			<Header />
			<Main />
			<Footer />
			<h1>안녕 리액트!</h1>
		</>
	);
}

export default App;
