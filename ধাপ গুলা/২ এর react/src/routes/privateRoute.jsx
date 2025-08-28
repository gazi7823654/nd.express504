
//4.3
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // 👉 কনটেক্সট থেকে ইউজার

  if (loading) return <p>⏳ লোড হচ্ছে...</p>; // 👉 লোডিং UI

  return user ? children : <Navigate to="/login" />; 
  // 👉 যদি ইউজার থাকে তাহলে পেজে ঢুকতে দেবে
  // 👉 না থাকলে Login এ পাঠাবে
};

export default PrivateRoute;
