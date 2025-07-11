import Login from "../components/login"; // Adjust the path as necessary
import roomImage from "../assets/room2.png"; // or .svg if it's SVG

export default function LoginPage() {
  return (
      <div className="h-[100vh] w-[100vw] flex  bg-[#0b1e2d] overflow-hidden shadow-2xl">

        {/* Login Form Side */}
        <div className="w-full md:w-1/2 p-10 flex items-center justify-center">
          <Login />
        </div>

        {/* Image Side */}
        <div className="hidden md:flex w-1/2 bg-[#0b1e2d] items-center justify-center relative">
          <img
            src={roomImage}
            alt="Login Visual"
            className="w-[90%] drop-shadow-[0_0_60px_#2982cc] transition duration-500 animate-float"
          />
          {/* Optional glow or motion effect can go here */}
        </div>
      </div>
  );
}
