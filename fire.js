const firebaseConfig = {
	apiKey: "AIzaSyDMz1aFRLkCcRH9y5LCaxhEw9uS85TH3UU",
	authDomain: "estrella-inventario.firebaseapp.com",
	projectId: "estrella-inventario",
	storageBucket: "estrella-inventario.appspot.com",
	messagingSenderId: "233065909833",
	appId: "1:233065909833:web:0d0328265fb21cf214f998",
	measurementId: "G-XELZ2QNR1R",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// db.settings({
// 	timestampsInSnapshots: true,
// });

const insumos$ = db.collection("insumos");
const proveedores$ = db.collection("proveedores");