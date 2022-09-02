import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { AppContext } from "../../App";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const Login = () => {
  const {setRoute, setUser} = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hazLoginConEmail = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        toast(`Inicio de sesión de usuario ${user.email} válido!`);
        setRoute("home")
        setUser(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const hazLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user)
        // ...
       
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <h1 className="text-xl font-mono font-semibold text-sky-600 mb-8">
        Este es el Login
      </h1>
      <div className="flex flex-col items-center">
        <form
          className="flex gap-2 flex-col max-w-md "
          onSubmit={hazLoginConEmail}
        >
          <input
            className="border font-mono border-gray-600 rounded-sm px-2 py-1 outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border font-mono border-gray-600 rounded-sm px-2 py-1 outline-none"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-sky-500 font-mono text-white py-1 px-3 rounded hover:bg-sky-700 transition cursor-pointer"
            onClick={hazLoginConEmail}
          >
            Log In
          </button>
        </form>
        <button className="cursor-pointer font-mono  m-2 text-xs  transition font-semibold px-3 py-1 rounded" onClick={hazLoginGoogle}>
          ...Login con google
        </button>
        
      </div>
    </div>
  );
};

export default Login;
