import { useEffect, useState } from 'react';

const Home = () => {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://192.168.0.146:10000/sime/api/");
            const json = await response.json();

            if (response.ok) {
                const projectsData = json.projects;
                setProjects(projectsData);
            } else {
                console.error("Failed to fetch projects:", json);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="container mx-auto rounded-lg shadow-lg sm:px-12 px-4 py-24 bg-white min-h-screen flex flex-col" id="home">
            <section className=" mb-32">
                <h1 className="text-4xl font-bold mb-4 ">Hi,</h1>
                <h1 className='text-6xl font-bold mb-4'>I am <span className='text-blue-700'>Simachew Denekew</span></h1>
                <p className="text-xl text-gray-700">a passionate FullStack developer ready to take on new challenges.</p>
                <i className=" ml-48">Graduated from <span className=' text-blue-700'>Bahir Dar Institute of Technology</span> - Software Engineering</i>
            </section>

            <h2 className="text-center text-2xl font-semibold mb-4 text-blue-700">My Projects</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {projects && (
                    projects.map(project => (
                        <div key={project._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img className="w-full h-48 object-cover object-center" src={"http://192.168.0.146:10000/uploads/" + project.imageUrl} alt='project_image' />
                            <div className='px-6 py-8'>
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-700">{project.description}</p>
                            </div>
                        </div>
                    ))
                )} 
            </section>

            { projects.length===0 ? (
                <h1 className="text-center mb-8 text-red-600">There are no projects at the moment</h1>
            ): null}


            <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-2">Contact Me</h2>
                <p className="text-gray-700">Feel free to get in touch with me.</p>
                <div className="mt-4">
                    <a href="#contact" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">Contact</a>
                </div>
            </section>
        </div>
    );
};

export default Home;
