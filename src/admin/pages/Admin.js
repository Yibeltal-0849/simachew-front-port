import { useState, useEffect } from 'react';
import profilePic from '../../img/profile.jpg';
import { FaPen } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogin } from '../hooks/useLogin';

const AdminDashboard = () => {
  const [totalData, setTotalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passworderror, setPasswordError] = useState(null);
  const [passwordsuccess, setPasswordSuccess] = useState(null);
  // const [showProfileForm, setProfileForm] = useState(false);
  const [showPasswordForm, setPasswordForm] = useState(false);
  // const [newProfilePic, setNewProfilePic] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const { login } = useLogin();


  const { user } = useAuthContext();

  const countData = async () => {
    try {
      const response = await fetch("http://192.168.0.146:10000/sime/api/", {
        headers: { Authorization:`Bearer ${user.token}` },
    });
      if (response.ok) {
        const data = await response.json();
        setTotalData(data);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    countData();
  }, []);

  const handleEditProfile = () => {
    // setProfileForm(!showProfileForm);
    setPasswordForm(!showPasswordForm);
  };

  // const handleEditPassword = () => {
  //   setPasswordForm(!showPasswordForm);
  //   setProfileForm(false);
  // };

  // const handleProfilePicChange = (e) => {
  //   setNewProfilePic(e.target.files[0]);
  // };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  // const handleSubmitProfile = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formDataToSend = new FormData();
  //     formDataToSend.append('newProfilePic', newProfilePic);

  //     const response = await fetch("http://localhost:10000/sime/api/profile/picture", {
  //       method: 'PUT',
  //       body: formDataToSend
  //     });
  //     if (response.ok) {
  //       console.log("Profile picture saved successfully!");
  //     } else {
  //       setError("Failed to save profile picture");
  //     }
  //   } catch (error) {
  //     setError("Failed to save profile picture:::::>>>>>>>" + error);
  //   }
  // };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const email = user.email;
      const response = await fetch("http://192.168.0.146:10000/sime/api/admin/changepassword", {
        method: 'PATCH',
        headers: { Authorization:`Bearer ${user.token}`,
                  'Content-Type': 'application/json' },
        body: JSON.stringify({ email, oldPassword, newPassword })
      });

      const json = await response.json();

      if (response.ok) {
        setPasswordSuccess(json.Success);
        await login(email, newPassword);
      } else {
        setPasswordError(json.Error);
      }
    } catch (error) {
      setPasswordError("Failed to save password");
    }

    setNewPassword('');
    setOldPassword('');

  };

  if (loading) return <p className='text-center text-3xl'>Loading...</p>;
  if(error) return <div className='flex mx-auto border-2 border-red-900 max-w-fit p-2 mt-8 rounded-lg'><p className='text-red-600 text-3xl'>{error}</p></div>

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-8">
        <div className="ml-60">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome, Admin!</p>
        </div>
        <div className="flex flex-col items-center mr-32">
          <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full mr-4" />
          <button onClick={handleEditProfile} className="hover:bg-slate-300 py-2 px-4 rounded-md">
            <FaPen />
          </button>
          {/* {showProfileForm && (
            <form onSubmit={handleSubmitProfile}>
              <div className="mb-4">
                <label htmlFor="newProfilePic" className="block text-gray-700 font-bold mb-2">Profile Picture</label>
                <input type="file" id="newProfilePic" name="newProfilePic" accept="image/*" onChange={handleProfilePicChange} className="border rounded-lg px-3 py-2 w-full" />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save Profile Picture
              </button>            <span className='ml-4 border-blue-700 border-2 rounded p-1 cursor-pointer hover:bg-slate-200' onClick={handleEditPassword}>Change Password</span>
            </form>
          )} */}
          {showPasswordForm && (
            <form onSubmit={handleSubmitPassword}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">Old Password</label>
                <input type="password" id="oldPassword" name="newPassword" value={oldPassword} onChange={handleOldPasswordChange} required className="border rounded-lg px-3 py-2 w-full" />
                <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">New Password</label>
                <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={handlePasswordChange} required className="border rounded-lg px-3 py-2 w-full" />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save Password
              </button>
              {passworderror && <p className='text-center text-2xl p-2 mt-1 rounded text-red-500 border-2 border-red-500'>{passworderror}<span className='ml-5 hover:cursor-pointer hover:text-red-800 p-2 border-l-2 rounded border-red-400' onClick={()=>{ setPasswordError(null); }}>X</span></p>}
              {passwordsuccess && <p className='text-center p-2 mt-1 rounded text-green-500 border-2 border-green-500'>{passwordsuccess}<span className='ml-5 hover:cursor-pointer text-red-500 hover:text-red-800 p-2 border-l-2 rounded border-red-500' onClick={()=>{ setPasswordSuccess(null); }}>X</span></p>}
            </form>
          )}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Total Projects</h2>
            <p className="text-xl">{totalData.projects.length}</p>
          </div>
          <div className="bg-green-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Total Skills</h2>
            <p className="text-xl">{totalData.skills.length}</p>
          </div>
          <div className="bg-yellow-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Total Messages</h2>
            <p className="text-xl">{totalData.messages.length}</p>
          </div>
          <div className="bg-pink-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">About Me</h2>
            <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
