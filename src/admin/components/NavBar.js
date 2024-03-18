
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const NavBar = () => {

    const { logout } = useLogout();

    const handleClick = ()=>{
      logout();
    }

    return (
        <nav className="bg-gray-800 p-4 mb-12 text-white">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <Link to="/admin" className="text-white font-bold text-lg">Admin</Link>
                    {/* Navigation links */}
                    <ul className={`lg:flex lg:items-center lg:w-auto `}>
                        <li>
                            <Link to="/admin" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-300 mr-4">Home</Link>
                        </li>
                        <li>
                            <Link to="/admin/projects" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-300 mr-4">Projects</Link>
                        </li>
                        <li>
                            <Link to="/admin/skills" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-300 mr-4">Skills</Link>
                        </li>
                        <li>
                            <Link to="/admin/about" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-300 mr-4">About Me</Link>
                        </li>
                        <li>
                            <Link to="/admin/messages" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-300">Messages</Link>
                        </li>
                        <li>
                            <button onClick={handleClick} className="rounded-lg block mt-4 ml-14 lg:inline-block lg:mt-0 text-red-500 border-red-600 border-2 p-1 mr-2 bg-white hover:text-red-700 hover:font-bold">Log out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
