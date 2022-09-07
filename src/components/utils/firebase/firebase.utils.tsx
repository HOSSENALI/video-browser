import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvcE7EQozwOP1H9CGwzmIPNNt-8STT8cE",
  authDomain: "my-ecommerce-b0dd8.firebaseapp.com",
  projectId: "my-ecommerce-b0dd8",
  storageBucket: "my-ecommerce-b0dd8.appspot.com",
  messagingSenderId: "576378124915",
  appId: "1:576378124915:web:9cb4dd769dfa09518e8806",
};

 initializeApp(firebaseConfig);

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
// creating auth...............
export const createAuthUserWithEmailAndPassword = async (email:string,password:string,displayName:string)=> {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredentials) => {
      const user = userCredentials.user;
      console.log("user", user);
      updateProfile(user, { displayName: displayName})
        .then((s) => {
          window.location.href = "/auth";
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  );
};

// sing-in with email and function....................
export const signInAuthUserWithEmailAndPassword = async (
  email:string,
  password:string,
  redirectUrl :URLSearchParams,
) => {
  if (!email || !password) return;
  try {
    const loginResult = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("userData", JSON.stringify(loginResult));
console.log(redirectUrl.get("redirectTo"))
    if (redirectUrl.get("redirectTo") == "") {
      window.location.href = "/";
    } else {
      window.location.href = String(redirectUrl.get("redirectTo"));
    }
  } catch (err) {
    console.error(err);
    alert("Username and password does not match.");
  }
};

// sign-out..................
export const signOutUser = async () => {
  localStorage.removeItem("userData");
  window.location.href = "/auth";
};

