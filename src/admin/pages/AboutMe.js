

import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


import { FaPen } from 'react-icons/fa';

const AboutMe = () => {
  const [aboutMe, setAboutMe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editForms, setEditForms] = useState({});

  const { user } = useAuthContext();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch("http://192.168.0.146:10000/sime/api/", {
        headers: { Authorization:`Bearer ${user.token}` },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch about sections');
      }
      const data = await response.json();
      const abouts = await data.about;
      const about = abouts[0];
      setAboutMe(about);
      // Initialize editForms state
      const initialEditForms = {};
      Object.keys(about).forEach(key => {
        initialEditForms[key] = false;
      });
      setEditForms(initialEditForms);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleEditForm = (key) => {
    setEditForms(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const handleFormSubmit = async (key) => {
    try {
      const response = await fetch(`http://192.168.0.146:10000/sime/api/admin/updateabout`, {
        method: 'PATCH',
        headers: { Authorization:`Bearer ${user.token}` },
        body: JSON.stringify({ [key]: aboutMe[key] }),
      });
      if (!response.ok) {
        throw new Error('Failed to save data');
      }
      toggleEditForm(key);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <p className='text-center text-3xl'>Loading...</p>;
  if (error) return <p className='text-center text-3xl'>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-24 p-12">
      {Object.keys(aboutMe).map(key => (
        key !== '_id' && key !== '__v' && (
          <div key={key} className="bg-white rounded-lg overflow-hidden shadow-md mb-4 md:mx-auto md:w-2/3">
            <div className="px-6 py-4">
              <div className='flex justify-between mb-12'><h2 className="text-3xl text-center text-blue-700 font-bold">{key}</h2><i onClick={() => toggleEditForm(key)} className="hover:bg-blue-300 hover:cursor-pointer font-bold py-2 px-4 rounded">
                    <FaPen />
                  </i></div>
              {editForms[key] ? (
                <form className="text-center" onSubmit={(e) => { e.preventDefault(); handleFormSubmit(key); }}>
                  <textarea 
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" 
                    rows="5"
                    value={aboutMe[key]}
                    onChange={(e) => setAboutMe({...aboutMe, [key]: e.target.value})}
                  />
                  <div className="mt-4 flex justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      Save
                    </button>
                    <button type="button" onClick={() => toggleEditForm(key)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className=''>
                  <p className="lg:text-left text-gray-700 text-base mb-4">{aboutMe[key]}</p>
                </div>
              )}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default AboutMe;
