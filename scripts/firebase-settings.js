// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBR7dEq0-yYABpGOSutD6fUrvFi8FXB4E8",
    authDomain: "virtual-summit.firebaseapp.com",
    databaseURL: "https://virtual-summit.firebaseio.com",
    projectId: "virtual-summit",
    storageBucket: "virtual-summit.appspot.com",
    messagingSenderId: "1094924884923",
    appId: "1:1094924884923:web:9959078268c41d3b1e829e",
    measurementId: "G-NMNZQVKDXD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Make auth, db and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();