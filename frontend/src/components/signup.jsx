import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [res, setRes] = useState(null);
  const navigate = useNavigate();

  async function addUser(e) {
    e.preventDefault();

    if (!name || !lastname || !email || !password || !confirmPassword) {
      setRes({ msg: "Please fill in all fields" });
      return;
    }

    if (password !== confirmPassword) {
      setRes({ msg: "Passwords do not match" });
      return;
    }

    try {
      const data = await signup(name, lastname, email, password);
      setRes(data);
      if (data.msg === "User created successfully") {
        navigate("/login");
      }
    } catch (err) {
      console.error("Sign up failed:", err);
      setRes({ msg: "Something went wrong. Try again later." });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-[#0b1e2d] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-[#ffffff]">Sign Up</h1>
      {res && res.msg && res.msg !== "authentificated successfully" && (
          <p className="mt-4 text-sm text-red-400 text-center">{res.msg}</p>
        )}
      {res && res.msg && res.msg === "authentificated successfully" && (
        <p className="mt-4 text-sm text-green-400 text-center">{res.msg}</p>
      )}
      <form className="p-8 rounded-xl shadow-md w-96" onSubmit={addUser}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-[#224766] bg-[#132e42] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#2eaefb]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastname" className="block text-sm font-medium text-slate-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full px-3 py-2 border border-[#224766] bg-[#132e42] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#2eaefb]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-[#224766] bg-[#132e42] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#2eaefb]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-[#224766] bg-[#132e42] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#2eaefb]"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
            Repeat Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-[#224766] bg-[#132e42] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#2eaefb]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2eaefb] text-white py-2 rounded hover:bg-[#1c8edc] transition duration-200"
        >
          Sign Up
        </button>

        
      </form>

      <p className="mt-4 text-sm text-slate-300">
        Already have an account?{" "}
        <Link to="/login" className="text-[#2eaefb] hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
