import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log("Fetched userId:", userId); // Debugging line
        if (!userId) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/user/${userId}`
        );
        setUserData(response.data);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.put(
        `http://localhost:8000/user/${userId}`,
        formData
      );
      setUserData(response.data);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update user data");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

        {/* Display Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={
              userData?.image
                ? `http://localhost:8000/${userData.image.replace(/\\/g, "/")}` // Replace backslashes if any
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <strong>Name:</strong>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded w-full mt-1"
              />
            ) : (
              <span> {userData.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <strong>Email:</strong>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded w-full mt-1"
              />
            ) : (
              <span> {userData.email}</span>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <strong>Phone:</strong>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded w-full mt-1"
              />
            ) : (
              <span> {userData.phone}</span>
            )}
          </div>

          {/* Address Field */}
          <div>
            <strong>Address:</strong>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="border p-2 rounded w-full mt-1 mb-2"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border p-2 rounded w-full mt-1 mb-2"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border p-2 rounded w-full mt-1 mb-2"
                />
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className="border p-2 rounded w-full mt-1"
                />
              </>
            ) : (
              <span>
                {userData.address}, {userData.city}, {userData.state}, {userData.zipCode}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
