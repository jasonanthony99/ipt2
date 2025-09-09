import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Fetch all profiles from DB
  const fetchProfiles = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/profiles");
      setProfiles(res.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  // Load profiles on component mount
  useEffect(() => {
    fetchProfiles();
  }, []);

  // Save a new profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/profiles", {
        first_name: firstName,
        last_name: lastName,
      });

      // Add the new profile to the list immediately
      setProfiles((prev) => [...prev, res.data]);

      // Clear input fields
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profiles</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>

      {/* Display list of profiles */}
      <ul className="space-y-2">
        {profiles.map((p) => (
          <li key={p.id} className="border p-2 rounded bg-gray-100">
            <strong>{p.first_name}</strong> {p.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
