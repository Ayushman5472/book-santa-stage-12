import firebase from "firebase";


var firebaseConfig = {
  apiKey: "AIzaSyBULa1GvvvsdOtfqZ0LVFNSQC862Ok2ulQ",
  authDomain: "booksanta-3ad9a.firebaseapp.com",
  databaseURL: "https://booksanta-3ad9a.firebaseio.com",
  projectId: "booksanta-3ad9a",
  storageBucket: "booksanta-3ad9a.appspot.com",
  messagingSenderId: "912365928748",
  appId: "1:912365928748:web:3c7743f31ecafd42a2ec89"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
