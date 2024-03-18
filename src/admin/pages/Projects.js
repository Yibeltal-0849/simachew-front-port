

import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', imageFile: null });  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { user } = useAuthContext();

  useEffect(() => {
    fetchProjects();
  }, []);



  const handleFileChange = (event) => {
    setNewProject({
      ...newProject,
      imageFile: event.target.files[0], // Store the selected file in state
    });
  };





  const fetchProjects = async () => {
    try {
      const response = await fetch("http://192.168.0.146:10000/sime/api/",{
        headers: { Authorization:`Bearer ${user.token}` },
    });
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      const projects = await data.projects;
      setProjects(projects);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:10000/sime/api/deleteproject/${projectId}`, {
        method: 'DELETE',
        headers: { Authorization:`Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddProject = async (event) => {
    event.preventDefault();
  
    // Check if title and description are provided
    // if (!newProject.title || !newProject.description) {
    //   setError('Title and description are required');
    //   return;
    // }
  
    // // Check if an image file is provided
    // if (!newProject.imageFile) {
    //   setError('Please select an image file');
    //   return;
    // }
  
    // Create a new FormData object
    const formData = new FormData();
    formData.append('title', newProject.title);
    formData.append('description', newProject.description);
    formData.append('image', newProject.imageFile);
  
    try {
      const response = await fetch(`http://192.168.0.146:10000/sime/api/addproject`, {
        method: 'POST',
        body: formData,
        headers: { Authorization:`Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to add project');
      }
      const newProjectData = await response.json();
      setProjects([...projects, newProjectData]);
      setNewProject({ title: '', description: '', imageFile: null });
      // Clear the file input field
      document.getElementById('image').value = '';
      setSuccess('Project added successfully');
      setError(null); // Clear error state
    } catch (error) {
      setError(error.message);
    }
  };
  

  if (loading) return <p className='text-center text-3xl'>Loading...</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-24 pt-8">
      <h2 className="text-3xl text-center mb-8 text-blue-700 font-bold">Projects</h2>
      { error &&  <div className='flex mx-auto border-2 border-red-900 max-w-fit p-2 mt-8 rounded-lg'><p className='text-red-600 text-3xl'>{error}</p> <span className='ml-5 text-red-600 text-5xl hover:cursor-pointer' onClick={()=>setError(null)}>X</span></div> }
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <div key={project._id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <img className="w-full h-48 object-cover object-center" src={"http://localhost:10000/uploads/" + project.imageUrl} alt='project_image' />
            <div className="px-6 py-4">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-700 text-base">{project.description}</p>
            </div>
            <div className="px-6 py-4">
              <button onClick={() => handleDeleteProject(project._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      { success &&  <div className='flex mx-auto border-2 border-red-900 max-w-fit p-2 mt-8 rounded-lg'><p className='text-green-600 text-3xl'>{success}</p> <span className='ml-5 text-red-600 text-5xl hover:cursor-pointer' onClick={()=>setSuccess(null)}>X</span></div> }
      <h2 className="text-3xl text-center mt-8 mb-4">Add New Project</h2>
      <form onSubmit={handleAddProject} className="max-w-3xl mx-auto p-24 border-8 mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="form-input pl-2 mt-1 block w-full h-12"
            placeholder="Enter project title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="form-textarea pl-2 mt-1 block w-full"
            rows="3"
            placeholder="Enter project description"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image:
          </label>
          <input
            id="image"
            type="file"
            accept="image/*" // Only allow image files
            onChange={handleFileChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default Projects;
