import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaMapMarkerAlt, FaEnvelope, FaPhone, FaEdit, FaSave, FaCamera } from 'react-icons/fa';

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    profilePicture: 'https://via.placeholder.com/150', // Placeholder image
  });
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('farmerProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
      setIsLoggedIn(true);
    }
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationData({ latitude, longitude });
          setProfile(prevProfile => ({
            ...prevProfile,
            location: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('farmerProfile', JSON.stringify(profile));
    alert('Profile saved successfully!');
    setIsEditing(false); // Switch to display mode after saving
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prevProfile => ({
          ...prevProfile,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full md:w-2/3 max-w-2xl">
        {/* Profile Header and Edit Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Farmer Profile 👨‍🌾</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 text-sm bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors duration-300"
          >
            {isEditing ? (
              <>
                <FaSave className="mr-2" /> Save
              </>
            ) : (
              <>
                <FaEdit className="mr-2" /> Edit
              </>
            )}
          </button>
        </div>

        {/* Profile Picture and Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img 
              src={profile.profilePicture} 
              alt="Profile" 
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 p-2 bg-green-500 text-white rounded-full cursor-pointer hover:bg-green-600 transition-colors duration-300">
                <FaCamera size={16} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePictureChange}
                />
              </label>
            )}
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">{profile.name || "Farmer's Name"}</h3>
        </div>

        {isEditing ? (
          /* Editable Form */
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaEnvelope size={24} className="text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={profile.email}
                onChange={handleChange}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone size={24} className="text-gray-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={profile.phone}
                onChange={handleChange}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt size={24} className="text-gray-400" />
              <input
                type="text"
                name="location"
                placeholder="Current Location"
                value={profile.location}
                readOnly
                className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="ml-2 px-4 py-2 text-sm bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Get Location
              </button>
            </div>
            {locationData && (
              <p className="mt-2 text-sm text-gray-500 text-center">
                Location acquired: Lat: {locationData.latitude.toFixed(4)}, Lon: {locationData.longitude.toFixed(4)}
              </p>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full md:w-auto py-3 px-8 flex items-center justify-center bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
              >
                <FaSave className="mr-2" /> Save Changes
              </button>
            </div>
          </form>
        ) : (
          /* Display View */
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaEnvelope size={24} className="text-gray-400" />
              <div className="flex-1">
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium text-gray-800">{profile.email || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone size={24} className="text-gray-400" />
              <div className="flex-1">
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-medium text-gray-800">{profile.phone || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt size={24} className="text-gray-400" />
              <div className="flex-1">
                <p className="text-gray-500 text-sm">Location</p>
                <p className="font-medium text-gray-800">{profile.location || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;