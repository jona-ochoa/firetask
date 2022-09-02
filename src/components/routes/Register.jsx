import React, { useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { AppContext } from "../../App";

const auth = getAuth();

const Register = () => {
  const { setRoute, setUser } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const creaUsuario = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        toast(`Usuario ${email} registrado correctamente!`);
        //   setEmail("")
        //   setPassword("")
        setUser(user);
        setRoute("home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    creaUsuario();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-sky-700  font-semibold text-center">
        Registrate para tener acceso a la app...!
      </h1>
      <form className="flex gap-2 flex-col max-w-md" onSubmit={handleSubmit}>
        <input
          className="border border-gray-600 rounded-sm px-2 py-1 outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-600 rounded-sm px-2 py-1 outline-none"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-sky-400 py-1 text-white font-extrabold rounded-sm shadow">
          Registrarte
        </button>
      </form>
    </div>
  );
};

export default Register;
