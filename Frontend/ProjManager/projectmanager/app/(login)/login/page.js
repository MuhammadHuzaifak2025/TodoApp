"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const AuthPage = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IncorrectPass, SetIncorrectPass] = useState(false);
  const [isLogin, SetisLogin] = useState(false);
  const [errormessage, SetError] = useState("");
  const RemoveError = () => {
    SetIncorrectPass(false);
  };
  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login/",
        {
          username: email,
          password: password,
        },
        { withCredentials: true }
      );
      SetisLogin(true);
      const token = response.data.data.token;
      // document.cookie = `auth-token=${token}; path=/;`;
    } catch (error) {
      SetIncorrectPass(true);
      setEmail("");
      setPassword("");
      SetError(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    if (isLogin) {
      redirect("home");
    }
  }, [isLogin]);

  return (
    <div className="relative h-screen w-screen">
      <Image
        src="/signup.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full md:w-1/2 lg:w-1/3 bg-[#0d141b] bg-opacity-75 p-6 mb-7 rounded-lg shadow-lg z-10 text-white">
          <div className="flex items-center justify-center">
            <Image
              src="/tasks.png"
              width={100}
              height={100}
              alt="Project Manager Logo"
              className="pr-5 -mt-16"
            />
          </div>
          <h1 className="font-extrabold text-3xl flex items-center justify-center mb-5 mt-5">
            Project Manager
          </h1>
          <div
            className={`${
              IncorrectPass ? "flex items-center justify-between" : "hidden"
            } `}
          >
            <h1 className="text-red-400 ml-auto mr-auto pl-6">
              {errormessage}
            </h1>
            <button onClick={RemoveError} className="mr-5">
              X
            </button>
          </div>
          <form className="space-y-6" onSubmit={loginUser}>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-semibold text-white">
                Username
              </label>
              <input
                id="email"
                type="text"
                required={true}
                className="bg-gray-100 p-3 rounded border focus:outline-none focus:border-blue-500 text-black"
                placeholder="Enter your Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-2 font-semibold text-white"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required={true}
                className="bg-gray-100 p-3 rounded border focus:outline-none focus:border-blue-500 text-black"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="h-4 w-4 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 text-sm text-white"
                >
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
              {isLogin ? "Sign in" : "Login"}
            </button>
            <p className="text-center mt-4">
              {isLogin ? "Don't have an account?" : "Don't have an account?"}{" "}
              <a
                href={isLogin ? "/login" : "/signup"}
                className="text-blue-600 hover:underline"
              >
                {isLogin ? "Login" : "Sign up"}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
