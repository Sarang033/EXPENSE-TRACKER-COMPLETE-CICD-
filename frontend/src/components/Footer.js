import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex text-base justify-center bg-gray-800 shadow-lg backdrop-blur-md p-4">
      <div className="flex flex-col justify-evenly text-white text-lg">
        <div className="flex justify-center gap-4 mb-2">
          <a
            href="https://github.com/Sarang033"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="text-2xl transition transform hover:scale-110" />
          </a>
          <a
            href="https://www.instagram.com/_sarangsharma_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="text-2xl transition transform hover:scale-110" />
          </a>
        </div>
        <p>© 2024 Sarang Sharma. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
