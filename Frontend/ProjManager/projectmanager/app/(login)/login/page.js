import React from "react";
import Image from "next/image";

const AuthPage = ({ isLogin }) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center text-white bg-[#0d141b]">
        <div className="w-3/4 max-w-md ">
          <div className="p-3">
            <div className="ml-7 flex items-center mb-10">
              <Image
                src="/tasks.png"
                width={100}
                height={100}
                alt="Project Manager Logo"
                className="pr-5"
              />
              <h1 className="font-extrabold text-3xl">Project Manager</h1>
            </div>
            <form className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-semibold text-white">
                  Username or email
                </label>
                <input
                  id="email"
                  type="text"
                  className="bg-gray-100 p-3 rounded border focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-2 font-semibold text-white">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="bg-gray-100 p-3 rounded border focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="h-4 w-4 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 text-sm text-white">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
              <p className="text-center mt-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <a href={isLogin ? "/signup" : "/login"} className="text-blue-600 hover:underline">
                  {isLogin ? "Sign Up" : "Login"}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen">
        <Image src={"/signup.jpg"} height={800} width={800} className="h-full object-cover" />
      </div>
    </div>
  );
};

export default AuthPage;
