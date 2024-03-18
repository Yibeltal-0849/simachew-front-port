import React, { useEffect, useState } from 'react';
import profile from '../../img/profile.jpg';
import { FaGithub, FaLinkedinIn, FaBars, FaHome, FaAddressCard, FaCode, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("#home");

    useEffect(() => {
        function handleNavClick(e) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            const navbarHeight = getNavbarHeight();
            window.scrollTo({
                top: target.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
            setActiveLink(e.target.getAttribute('href'));
        }

        function getNavbarHeight() {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 768) {
                return 200; 
            } else {
                return -40;
            }
        }

        document.querySelectorAll('.navbar a').forEach(anchor => {
            anchor.addEventListener('click', handleNavClick);
        });

        return () => {
            document.querySelectorAll('.navbar a').forEach(anchor => {
                anchor.removeEventListener('click', handleNavClick);
            });
        };
    }, []); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        <header className="md:fixed w-full flex flex-row-reverse justify-between shadow-lg pt-5 bg-blue-950 md:justify-normal md:w-1/4 md:flex-col md:h-screen md:p-5  text-white">
            <div className="flex flex-col truncate ml-3 mr-5 md:mr-0">
                <img src={profile} alt="profile" className='profile mx-auto rounded-full border-solid border-black border-8 w-14 sm:w-24 md:w-40 transition duration-1000 ease-in-out transform hover:scale-110 hover:border-transparent hover:w-32 hover:md:w-auto hover:rounded-none hover:cursor-pointer' />
                <a href="#home" className=' font-semibold mx-auto mt-3'>Simachew Denekew</a>
                <div className="flex mt-0 justify-center md:mt-3">
                    <a href="https://www.linkedin.com/in/simachew-denekew-0073231a1/" className='mr-5' ><i className='text-lg'><FaLinkedinIn /></i></a>
                    <a href="https://github.com/SimachewD"><i className='text-lg'><FaGithub /></i></a>
                </div>
            </div>

            <nav className='navbar mt-3 grid grid-cols-4 md:flex md:text-lg font-semibold ml-5 mb-5 md:ml-0 md:justify-center md:mt-14'>
                <i className={`col-span-1 md:hidden ${isMenuOpen ? 'hidden' : ''} cursor-pointer`} onClick={toggleMenu}><FaBars /></i>
                <i className={`col-span-1 md:hidden ${isMenuOpen ? '' : 'hidden'} cursor-pointer`} onClick={toggleMenu}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></i>
                <ul className={`col-span-3 mt-4 md:block ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <li><a href="#home" className={`flex items-baseline ${activeLink === "#home" ? 'active' : ''}`}><i className='mr-2'><FaHome /></i>Home</a></li>
                    <li><a href="#about" className={`flex items-baseline ${activeLink === "#about" ? 'active' : ''}`}><i className='mr-2'><FaAddressCard /></i>About</a></li>
                    <li><a href="#skills" className={`flex items-baseline ${activeLink === "#skills" ? 'active' : ''}`}><i className='mr-2'><FaCode /></i>Skills</a></li>
                    <li><a href="#contact" className={`text-nowrap flex items-baseline ${activeLink === "#contact" ? 'active' : ''}`}><i className='mr-2'><FaEnvelope /></i>Contact us</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
