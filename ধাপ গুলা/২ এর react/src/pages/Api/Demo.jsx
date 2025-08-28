// src/pages/Api/Demo.jsx
import { useEffect, useState } from "react"; // 👉 React হুকস আনলাম
import apiClient from "../../utils/apiClient"; // 👉 আমাদের axios client আনলাম

export default function Demo() {
  const [data, setData] = useState(null); // 👉 response রাখার জন্য state
  const [error, setError] = useState(null); // 👉 এরর রাখার জন্য state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/test"); // 👉 backend API কল
        setData(res.data); // 👉 response data স্টেটে রাখলাম
      } catch (err) {
        console.error(err);
        setError("⚠️ API call failed"); // 👉 এরর হলে সেট করলাম
      }
    };

    fetchData(); // 👉 ফাংশন কল করলাম
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Frontend ↔ Backend Test</h1>
      {error && <p className="text-red-500">{error}</p>}
      {data ? (
        <p className="text-green-600">{data.message}</p>
      ) : (
        <p>⏳ Loading...</p>
      )}
    </div>
  );
}
