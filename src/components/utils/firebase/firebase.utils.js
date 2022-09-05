import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from "firebase/firestore";

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

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>{
    const response=signInWithPopup(auth, googleProvider);
    console.log("login with popup",response);
    localStorage.setItem("userData", JSON.stringify(response))
  
}
    

export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();


export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        // console.log(displayName);
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("user", user);
            updateProfile(auth.currentUser, {
                displayName: displayName
            }).then((s) => {
                window.location.href = "/"
            }).catch((error) => {
                alert(error.message);
            })
        });
};

export const signInAuthUserWithEmailAndPassword = async (email, password, redirectUrl = null) => {
    if (!email || !password) return;
    try {
        const loginResult = await signInWithEmailAndPassword(auth, email, password);
        console.log("login with email pass",loginResult);
        localStorage.setItem("userData", JSON.stringify(loginResult));
        if(redirectUrl == null){
            window.location.href = "/";
        }else {
            window.location.href = redirectUrl;
        }
    } catch (err) {
        console.error(err);
        alert("Username and password does not match.");
    }
};

export const signOutUser = async () => {
    const signOutResult = await signOut(auth);
    console.log(auth);
    localStorage.removeItem("userData");
    window.location.href = "/auth";
};

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);
