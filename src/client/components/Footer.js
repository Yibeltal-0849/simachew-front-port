

import { FaGithub, FaLinkedinIn, FaStackOverflow, FaFreeCodeCamp, FaFacebook, FaInstagram, FaTelegram, FaEnvelope } from 'react-icons/fa';



const Footer = () => {
  return (
    <footer className=" border-t-4 bg-sky-900 text-white py-6 sm:py-24">
      <div className="container mx-auto px-4">          
          <div className="flex justify-center">
            <a href="https://www.linkedin.com/in/simachew-denekew-0073231a1/" className="px-4"><FaLinkedinIn /></a>
            <a href="https://github.com/SimachewD" className="px-4"><FaGithub/></a>
            <a href="https://stackoverflow.com/users/23381097/simachew" className="px-4"><FaStackOverflow /></a>
            <a href="#j" className="px-4"><FaFreeCodeCamp /></a>
          </div>

          <div className="flex justify-center mt-4">
            <p className="text-center">&copy; 2024 Simachew Denekew. All rights reserved.</p>
          </div>

          <div className="flex justify-center mt-4">
            <a href="https://www.facebook.com/simachew.denekew.5" className="px-4"><FaFacebook /></a>
            <a href="https://www.instagram.com/Simachew_dw/" className="px-4"><FaInstagram /></a>
            <a href="https://t.me/Simachew_dw" className="px-4"><FaTelegram /></a>
            <a href="#h" className="px-4"><FaEnvelope /></a>
          </div>          
      </div>
    </footer>
  );
};

export default Footer;
