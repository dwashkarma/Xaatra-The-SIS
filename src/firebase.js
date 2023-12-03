import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5jtyolKIUFHuSVSdqhPKOrDtV1r8zu-w",

  authDomain: "dwaskarma.firebaseapp.com",

  projectId: "dwaskarma",

  storageBucket: "dwaskarma.appspot.com",

  messagingSenderId: "957033950782",

  appId: "1:957033950782:web:43480176eee2abbea3ab6f",

  measurementId: "G-V56RB9S92R",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyA7xJCvTbOnak3slfoXdER1wwiGbAwK5As",

//   authDomain: "xaatra-clz.firebaseapp.com",

//   projectId: "xaatra-clz",

//   storageBucket: "xaatra-clz.appspot.com",

//   messagingSenderId: "323041807867",

//   appId: "1:323041807867:web:792fcd5ab37df6dc19cf5e",
// };

const firebaseDB = firebase.initializeApp(firebaseConfig);

export default firebaseDB.database().ref();
