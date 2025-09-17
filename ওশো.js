/**
 * কিছু কোড দিতাছি যা react এর সাথে express এর কানেক্ট করবে ধাপ ২ এর
 *1 // src/utils/axios_api.js
import axios from "axios";   // axios ইমপোর্ট

const API = axios.create({
  baseURL: "http://localhost:5000/api",  // Backend API এর baseURL
  withCredentials: true,                 // কুকি/টোকেন পাঠানোর জন্য
});

export default API;  // Export করা হলো

 * 2 
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
ধাপ ২ শেষ



আবার চাইলে এই ভাবেও করা যায় 2
import React, { useState, useEffect } from "react";
import API from "../utils/axious_api.js";

const TestApi = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/users");
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Users from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestApi;


// export default TestApi;








 









**/

