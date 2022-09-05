import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvcE7EQozwOP1H9CGwzmIPNNt-8STT8cE",
  authDomain: "my-ecommerce-b0dd8.firebaseapp.com",
  projectId: "my-ecommerce-b0dd8",
  storageBucket: "my-ecommerce-b0dd8.appspot.com",
  messagingSenderId: "576378124915",
  appId: "1:576378124915:web:9cb4dd769dfa09518e8806",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

export const auth = getAuth();

export const signInWithGooglePopup = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      localStorage.setItem("userData", JSON.stringify(result));
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createAuthUserWithEmailAndPassword = async (
  email,
  password,
  displayName
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredentials) => {
      const user = userCredentials.user;
      console.log("user", user);
      updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then((s) => {
          window.location.href = "/auth";
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  );
};

export const signInAuthUserWithEmailAndPassword = async (
  email,
  password,
  redirectUrl = null
) => {
  if (!email || !password) return;
  try {
    const loginResult = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("userData", JSON.stringify(loginResult));
    if (redirectUrl == null) {
      window.location.href = "/";
    } else {
      window.location.href = redirectUrl;
    }
  } catch (err) {
    console.error(err);
    alert("Username and password does not match.");
  }
};

export const signOutUser = async () => {
  localStorage.removeItem("userData");
  window.location.href = "/auth";
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
