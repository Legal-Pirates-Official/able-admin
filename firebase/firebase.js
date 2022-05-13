// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWWzPO-KKhgnqPxYK0BubeJT-Dw_FjE0o",
    authDomain: "drrajeshfernando-5f1d7.firebaseapp.com",
    projectId: "drrajeshfernando-5f1d7",
    storageBucket: "drrajeshfernando-5f1d7.appspot.com",
    messagingSenderId: "943177010574",
    appId: "1:943177010574:web:2249282e629ef8bfbd68df",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export {auth};
