// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { auth, db, googleProvider, storage } from "../firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Custom hook for Firebase Auth state
function useAuthState() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  return { user, loading };
}

export default function Profile() {
  const { user, loading } = useAuthState();
  const [profile, setProfile] = useState({
    username: "",
    dob: "",
    gender: "",
    occupation: "",
    phone: "",
    location: "",
    photoURL: "",
  });
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [appLoading, setAppLoading] = useState(false);

  // Fetch profile data from Firestore
  useEffect(() => {
    async function fetchProfile(uid) {
      try {
        const docRef = doc(db, "users", uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) setProfile(snap.data());
        else setProfile({
          username: "",
          dob: "",
          gender: "",
          occupation: "",
          phone: "",
          location: "",
          photoURL: "",
        });
      } catch { }
    }
    if (user) fetchProfile(user.uid);
    else setProfile({
      username: "",
      dob: "",
      gender: "",
      occupation: "",
      phone: "",
      location: "",
      photoURL: "",
    });
  }, [user]);

  // Auth handlers
  const handleSignup = async (email, password) => {
    setAppLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setAppLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setAppLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setAppLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAppLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } finally {
      setAppLoading(false);
    }
  };

  const handleLogout = async () => {
    setAppLoading(true);
    await signOut(auth);
    setAppLoading(false);
  };

  // Upload profile picture
  async function uploadImage(uid) {
    if (!file) return profile.photoURL;
    const fileRef = ref(storage, `profilePics/${uid}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  }

  // Save profile to Firestore
  async function saveProfile() {
    if (!user) return;
    setAppLoading(true);
    try {
      const photoURL = await uploadImage(user.uid);
      const newProfile = { ...profile, photoURL, email: user.email };
      await setDoc(doc(db, "users", user.uid), newProfile, { merge: true });
      setProfile(newProfile);
      setIsEditing(false);
      alert("Profile saved ✅");
    } finally {
      setAppLoading(false);
    }
  }

  // Location fetch
  function fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const loc = `${pos.coords.latitude}, ${pos.coords.longitude}`;
        setProfile((prev) => ({ ...prev, location: loc }));
      });
    }
  }

  // Centralized loading spinner
  if (loading || appLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-600 border-opacity-75"></div>
        <span className="ml-5 text-lg text-green-600 font-semibold">Authenticating…</span>
      </div>
    );

  // Not logged in UI
  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="max-w-sm w-full p-7 rounded-2xl shadow-xl bg-white">
          <h1 className="text-3xl font-extrabold text-green-700 mb-3 text-center">Safal Fasal AI</h1>
          <p className="mb-4 text-gray-500 text-center">Login to continue</p>
          <button
            onClick={() => handleSignup("test@example.com", "password123")}
            className="w-full py-2 mb-3 rounded bg-green-500 hover:bg-green-700 text-white font-semibold"
          >Sign Up (Email)</button>
          <button
            onClick={() => handleLogin("test@example.com", "password123")}
            className="w-full py-2 mb-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >Sign In (Email)</button>
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
          >Login with Google</button>
        </div>
      </div>
    );

  // Profile UI
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-14">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-extrabold text-green-700 mb-7 text-center">My Profile</h1>
        {isEditing ? (
          <div className="space-y-4">
            <input
              className="border p-2 rounded w-full"
              type="text"
              placeholder="Username"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
            <input
              className="border p-2 rounded w-full"
              type="date"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
            <select
              className="border p-2 rounded w-full"
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              className="border p-2 rounded w-full"
              type="text"
              placeholder="Occupation"
              value={profile.occupation}
              onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
            />
            <input
              className="border p-2 rounded w-full"
              type="text"
              placeholder="Phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
            <input
              className="w-full"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              onClick={fetchLocation}
              className="w-full py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
            >Fetch Location</button>
            <button
              onClick={saveProfile}
              className="w-full py-2 rounded bg-green-700 hover:bg-green-900 text-white font-semibold"
            >Save Profile</button>
          </div>
        ) : (
          <div className="space-y-3 text-center">
            {profile.photoURL && (
              <img
                src={profile.photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-2"
              />
            )}
            <div className="text-gray-700">
              <div><b>Email:</b> {user.email}</div>
              <div><b>Username:</b> {profile.username}</div>
              <div><b>DOB:</b> {profile.dob}</div>
              <div><b>Gender:</b> {profile.gender}</div>
              <div><b>Occupation:</b> {profile.occupation}</div>
              <div><b>Phone:</b> {profile.phone}</div>
              <div><b>Location:</b> {profile.location}</div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white mt-4"
            >Edit Profile</button>
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded bg-red-600 hover:bg-red-700 text-white mt-3"
            >Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
