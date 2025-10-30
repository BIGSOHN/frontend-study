// Firebase 설정 및 초기화
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

// Export Firebase 인스턴스 및 함수들
export { db, collection, doc, getDoc, getDocs, setDoc, updateDoc, increment };
