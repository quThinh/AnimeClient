import React from "react";
import { AiFillFacebook, AiFillGithub } from "react-icons/ai";
import { BsFilm } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import Image from "../components/Image";

const Footer = () => {
  return (
    <footer className="footer p-4 w-full bg-background-brown">
      <div className="w-full flex items-center justify-between">
        {/* <Image src="logo.png" alt="footer logo" /> */}
        <BsFilm color="red" size={20} />

        {/* <div className="text-white flex items-center space-x-2">
            <AiFillGithub size={20} />
            <AiFillFacebook size={20} />

          <div className="flex items-center space-x-1">
            <FaDiscord size={20} />
            <p className="text-sm font-medium text-gray-300"></p>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
