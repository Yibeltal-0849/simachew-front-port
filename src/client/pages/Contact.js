

import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // If the field is 'phone', remove non-numeric characters
        const numericValue = name === 'phone' ? value.replace(/\D/g, '') : value;
    
        setFormData({ ...formData, [name]: numericValue });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://192.168.0.146:10000/sime/api/postmessage`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
            if (!response.ok) {
              throw new Error('Failed to save data');
            }
            alert('Message sent successfully!');
            setFormData({
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
          } catch (error) {
            alert('Failed to send message. Please try again later.');
          }
    }

    return (
        <div className="container mx-auto py-8" id='contact'>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-12">
                <h2 className="text-2xl font-bold mb-4 text-center">Contact Me</h2>
                <p className="text-center">You can send me a message here:</p>
                <form onSubmit={handleSubmit} className="mt-4 md:w-3/5 mx-auto">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                        placeholder="Your Email"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                        placeholder="Your Phone Number"
                    />
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                        placeholder="Subject"
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                        placeholder="Type your message here..."
                        rows="5"
                        required
                    ></textarea>
                    <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
