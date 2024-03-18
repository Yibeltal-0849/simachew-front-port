import { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaHtml5, FaCss3, FaReact, FaBootstrap, FaPhp, FaNodeJs, FaGit, FaJava } from 'react-icons/fa'; // Import additional icons
import { useAuthContext } from '../hooks/useAuthContext';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ title: '', iconUrl: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("http://192.168.0.146:10000/sime/api/", {
        headers: { Authorization:`Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }
      const data = await response.json();
      const skills = await data.skills;
      setSkills(skills);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      const response = await fetch(`http://192.168.0.146:10000/sime/api/deleteskill/${skillId}`, {
        method: 'DELETE',
        headers: { Authorization:`Bearer ${user.token}` },

      });
      if (!response.ok) {
        throw new Error('Failed to delete skill');
      }
      setSkills(skills.filter(skill => skill._id !== skillId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddSkill = async (e) => {
   e.preventDefault();
    try {
      const response = await fetch(`http://192.168.0.146:10000/sime/api/addskill`, {
        method: 'POST',
        headers: { Authorization:`Bearer ${user.token}` },
        body: JSON.stringify(newSkill)
      });
      if (!response.ok) {
        throw new Error('Failed to add skill');
      }
      const newSkillData = await response.json();
      setSkills([...skills, newSkillData]);
      setNewSkill({ title: '', iconUrl: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p className='text-center text-3xl'>Loading...</p>;
  if (error) return <p className='text-center text-3xl'>Error: {error}</p>;

  // Array of objects containing icon components and their corresponding names
  const iconOptions = [
    { value: "FaBootstrap", label: "Bootstrap", icon: <FaBootstrap /> },
    { value: "FaCss3", label: "CSS3", icon: <FaCss3 /> },
    { value: "FaHtml5", label: "HTML5", icon: <FaHtml5 /> },
    { value: "FaGit", label: "Git", icon: <FaGit /> },
    { value: "FaJava", label: "Java", icon: <FaJava /> },
    { value: "FaNodeJs", label: "Node.js", icon: <FaNodeJs /> },
    { value: "FaPhp", label: "PHP", icon: <FaPhp /> },
    { value: "FaReact", label: "React", icon: <FaReact /> },
  ];




  const renderIcon = (iconUrl) => {
    switch (iconUrl) {
        case "FaHtml5":
            return <FaHtml5 />;
        case "FaCss3":
            return <FaCss3 />;
        case "FaReact":
            return <FaReact />;
        case "FaBootstrap":
            return <FaBootstrap />;
        case "FaPhp":
            return <FaPhp />;
        case "FaNodeJs":
            return <FaNodeJs />;
        case "FaGit":
            return <FaGit />;
        case "FaJava":
            return <FaJava />;
        default:
            return null;
    }
};

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-24 pt-8">
      <h2 className="text-3xl text-center mb-8 text-blue-700 font-bold">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills && skills.map(skill => (
          <div key={skill._id} className="justify-between bg-slate-50 rounded-lg shadow-md p-6 flex items-center">
            {renderIcon(skill.iconUrl)}
            <p className="ml-5">{skill.title}</p>
            <button onClick={() => handleDeleteSkill(skill._id)} className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-3xl text-center mt-8 mb-4">Add New Skill</h2>
      <form onSubmit={handleAddSkill} className="max-w-3xl mx-auto p-24 border-8 mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={newSkill.title}
            onChange={(e) => setNewSkill({ ...newSkill, title: e.target.value })}
            className="pl-2 form-input mt-1 block w-full h-12"
            placeholder="Enter skill title" required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="iconUrl">
            Icon:
          </label>
          {/* Dropdown menu for selecting icon */}
          <Select
            id="iconUrl"
            value={iconOptions.find(option => option.value === newSkill.iconUrl)}
            onChange={(selectedOption) => setNewSkill({ ...newSkill, iconUrl: selectedOption.value })}
            options={iconOptions}
            getOptionLabel={(option) => (
              <div>
                {option.icon} {option.label}
              </div>
            )}
            getOptionValue={(option) => option.value}
            className="w-full" required
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default AdminSkills;
