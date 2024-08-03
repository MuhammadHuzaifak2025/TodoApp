"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect } from "react";
const AuthPage = ({ isLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errormessage, setErrorMessage] = useState(false);
  const [Message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user", {
        username: username,
        password: password,
        firstName: firstname,
        lastName: lastname,
        age: age,
        email: email,
      });
      console.log(response.data);
      setErrorMessage(true);
      setMessage("User Account Created");
    } catch (error) {
      setErrorMessage(true);
      console.error(error.message);
      if (error.response && error.response.status === 400) {
        setMessage("Registration failed: " + error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again later.");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (Message === "User Account Created") redirect("/login");
  }, [Message]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center text-white bg-[#0d141b]">
        <div className="w-3/4 max-w-md">
          <div className="p-2">
            <div className="ml-7 flex items-center mb-2 justify-center">
              {/* <Image
                src="/tasks.png"
                width={100}
                height={100}
                alt="Picture of the author"
                className="pr-5"
              /> */}
              <h1 className="font-extrabold text-3xl">Project Manager</h1>
            </div>
            <div
              className={`${errormessage ? "flex justify-center " : "hidden"}`}
            >
              <h1 className="text-red-400">{Message} </h1>
            </div>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 font-semibold text-white"
                >
                  Username
                </label>
                <input
                  id="email"
                  type="text"
                  required={true}
                  className="bg-gray-100 p-3 rounded border text-black focus:outline-none focus:border-[#3d91fb] focus:border-2"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 font-semibold text-white"
                >
                  email
                </label>
                <input
                  id="email"
                  type="email"
                  required={true}
                  className="bg-gray-100 p-3 rounded border text-black focus:outline-none focus:border-[#3d91fb] focus:border-2"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 font-semibold text-white  focus:border-[#3d91fb] focus:border-2"
                >
                  First and Last Name
                </label>
                <div className="flex flex-row">
                  <input
                    id="firstName"
                    type="text"
                    required={true}
                    className="w-48 bg-gray-100 p-3 rounded border text-black focus:outline-none focus:border-[#3d91fb] focus:border-2"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <span className="m-auto">and</span>
                  <input
                    id="lastName"
                    type="text"
                    required={true}
                    className="w-48 bg-gray-100 p-3 rounded border text-black focus:outline-none focus:border-[#3d91fb] focus:border-2"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="age"
                  className="mb-2 font-semibold text-white  focus:border-[#3d91fb] focus:border-2"
                >
                  Age
                </label>
                <input
                  id="age"
                  required={true}
                  type="number"
                  className="bg-gray-100 p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="mb-2 font-semibold text-white  focus:border-[#3d91fb] focus:border-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required={true}
                  className="bg-gray-100 p-3 rounded border text-black border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                {isLogin ? "Signup" : "Signup"}
              </button>
              <p className="text-center mt-4">
                {isLogin ? "Register now" : "Already have an account?"}{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  {isLogin ? "Signup" : "Login"}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen">
        <Image
          src={"/signup1.jpg"}
          height={800}
          width={800}
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthPage;
