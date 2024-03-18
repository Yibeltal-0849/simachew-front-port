

import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://192.168.0.146:10000/sime/api/", {
        headers: { Authorization:`Bearer ${user.token}` }}
      );
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      const messages = await data.messages;
      setMessages(messages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (messageId) => {
    try {
      const response = await fetch(`http://192.168.0.146:10000/sime/api/deletemessage/${messageId}`, {
        method: 'DELETE',
        headers: { Authorization:`Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      setMessages(messages.filter(message => message._id !== messageId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p className='text-center text-3xl'>Loading...</p>;
  if (error) return <p className='text-center text-3xl'>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-24 pt-8">
      <h2 className="text-3xl text-center mb-8 text-blue-700 font-bold">Messages</h2>
      <div className=" mx-auto md:w-2/3">
        {messages.map(message => (
          <div key={message._id} className="bg-white rounded-lg overflow-hidden shadow-lg mb-12">
            <div className="px-6 py-4">
                <div className='flex flex-row items-baseline'>
                    <h3 className="text-xl font-semibold mb-2">E-mail: </h3>
                    <p className=" inline text-gray-700 text-base mx-8">{message.email}</p>
                </div>
                <div className='flex flex-row items-baseline'>
                    <h3 className="text-xl font-semibold mb-2">Phone: </h3>
                    <p className=" inline text-gray-700 text-base mx-8">{message.phone}</p>
                </div>
                <div className='flex flex-row items-baseline'>
                    <h3 className="text-xl font-semibold mb-2">Subject: </h3>
                    <p className=" inline text-blue-700 font-extrabold text-base mx-8">{message.subject}</p>
                </div>
                <div className='flex flex-row items-baseline'>
                    <h3 className="text-xl font-semibold mb-2">Message: </h3>
                    <p className=" inline text-gray-700 text-base mx-8">{message.message}</p>
                </div>
            </div>
            <div className="px-6 py-4">
              <button onClick={() => handleDeleteProject(message._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
