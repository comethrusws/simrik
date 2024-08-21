import { getApp,getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCtrYK4OqqLQFI_ix5-Vypz-ya4tSgnfHg",

  authDomain: "simrik-859ea.firebaseapp.com",

  projectId: "simrik-859ea",

  storageBucket: "simrik-859ea.appspot.com",

  messagingSenderId: "225339994341",

  appId: "1:225339994341:web:9deb64ff59136386f5a40c"

};

  
  const app = getApps().length ? getApp(): initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export { db };