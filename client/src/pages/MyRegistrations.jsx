import { useEffect, useState } from 'react';
import axios from 'axios';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const email = localStorage.getItem('userEmail'); // 👈 Get email from localStorage

      if (!email) {
        console.warn('User email not found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/");
        setRegistrations(response.data);
      } catch (error) {
        console.error('Failed to fetch registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Registered Exams</h2>

      {loading ? (
        <p>Loading your registrations...</p>
      ) : registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {registrations.map((reg) => (
            <div key={reg._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{reg.name}</h3>
              <p><strong>Date:</strong> {reg.date}</p>
              <p><strong>Time:</strong> {reg.time}</p>
              <p><strong>Venue:</strong> {reg.venue}</p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
