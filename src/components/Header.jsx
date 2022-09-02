import React, { useContext } from "react";
import { FaFire } from "react-icons/fa";
import { AppContext } from "../App";
import { getAuth, signOut } from "firebase/auth";
import toast from "react-hot-toast";

const auth = getAuth();

const Header = () => {
  const { user, setRoute, setUser } = useContext(AppContext);
  const hazLogout = () => {
    signOut(auth).then(() => {
      setRoute("login");
      setUser(null)
      toast('Usuario ha hecho logout')
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div>
      <header className="h-20 font-thin px-6 w-full bg-gray-100 shadow-lg flex justify-between items-center fixed top-0">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setRoute("home")}
        >
          <FaFire className="text-2xl text-red-500" />
          <span className="text-xl font-extrabold text-red-500">
            FireShopping
          </span>
        </div>
        <div className=" flex gap-2">
          {user ? (
            <>
              <button
                onClick={hazLogout}
                className="bg-sky-500 font-mono text-white py-1 px-3 rounded-lg hover:bg-sky-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setRoute("login")}
                className="bg-sky-500 font-mono text-white py-1 px-3 rounded-lg hover:bg-sky-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => setRoute("register")}
                className="bg-sky-500 font-mono text-white py-1 px-3 rounded-lg hover:bg-sky-700 transition"
              >
                Registrate
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
