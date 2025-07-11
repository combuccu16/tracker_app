import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [res , setRes] = useState(null);
  const navigate = useNavigate();

  async function checkUser(e) {
    e.preventDefault();
    if (!email || !password) return; 
    try {
      const data = await login(email, password);
      setRes(data);
      if(data.msg === "authentificated successfully") {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  }



    
  return (
    <div className="flex flex-col items-center justify-center bg-[#0b1e2d] ">
      <h1 className="text-4xl font-bold mb-6 text-[#ffffff]">Login</h1>

      <form className="p-8 rounded-xl shadow-md w-96">
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
            Email
          </label>
          {          res && res.msg  && (
            <p className="text-red-500 text-sm mb-2">{res.msg}</p>
          )}
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-[#224766] bg-[#132e42] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#2eaefb]"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-[#224766] bg-[#132e42] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#2eaefb]"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2eaefb] text-white py-2 rounded hover:bg-[#1c8edc] transition duration-200"
          onClick={(e) => checkUser(e)}
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-300">
        Don't have an account? <Link to="/signup" className="text-[#2eaefb] hover:underline">Sign Up</Link>
      </p>
    </div>
  );
}
