// src/pages/TestApi.jsx
import React, { useState, useEffect } from "react"; // React hook ইমপোর্ট
import API from "../utils/axious_api";            // axios instance ইমপোর্ট

const TestApi = () => {
  const [loading, setLoading] = useState(true);   // লোডিং state
  const [error, setError] = useState(null);       // এরর state
  const [data, setData] = useState([]);           // ডেটা state (array default)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users"); // axios দিয়ে backend call
        setData(res.data);                   // backend থেকে আসা ডেটা state এ সেট
        setLoading(false);                   // লোডিং false করা
      } catch (err) {
        console.error(err);                  // কনসোলে error লগ
        setError("Backend কানেকশন ফেইল্ড ❌"); 
        setLoading(false);
      }
    };

    fetchUsers(); // ফাংশন কল করা
  }, []);

  if (loading) return <p>⏳ লোডিং হচ্ছে...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>✅ Users from API (Axios)</h1>
      <ul>
        {data.map((user) => (
          <li key={user._id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestApi;
