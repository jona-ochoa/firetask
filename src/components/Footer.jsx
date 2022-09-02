import React, { useContext } from "react";
import { FaHome } from 'react-icons/fa'
import {BsCart4, BsList} from 'react-icons/bs'
import { AppContext } from "../App";

const Footer = () => {
    const { setRoute } = useContext(AppContext)
  return (
    <footer className="fixed h-16 w-full bg-sky-700 bottom-0 flex justify-evenly items-center">
      <div className="bg-red-500 hover:bg-sky-500 text-white rounded-full p-1 text-2xl cursor-pointer transition-all" onClick={() => setRoute('home')}>
        <FaHome />
      </div>
      <div className="bg-red-500 hover:bg-sky-500 text-white rounded-full p-1 text-2xl cursor-pointer transition-all" onClick={() => setRoute('shopping')}>
        <BsCart4 />
      </div>
      <div className="bg-red-500 hover:bg-sky-500 text-white rounded-full p-1 text-2xl cursor-pointer transition-all" onClick={() => setRoute('tasklist')}>
        <BsList/>
      </div>
    </footer>
  );
};

export default Footer;
