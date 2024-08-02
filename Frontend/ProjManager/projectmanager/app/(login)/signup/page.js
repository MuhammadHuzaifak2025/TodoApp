import React from "react";
import Image from "next/image";

const AuthPage = ({ isLogin }) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center text-white bg-[#0d141b]">
        <div className="w-3/4 max-w-md ">
          <div className="p-3">
            <div className=" ml-7 flex items-center mb-10">
              <Image
                src="/tasks.png"
                width={100}
                height={100}
                alt="Picture of the author"
                className="pr-5"
              />
              <h1 className="font-extrabold text-3xl">Project Manager</h1>
            </div>
            <form className="space-y-6">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 font-semibold text-white"
                >
                  Username or email
                </label>
                <input
                  id="email"
                  type="email"
                  required={true}
                  className="bg-gray-100 p-3 rounded border text-black focus:outline-none focus:border-[#3d91fb] focus:border-2"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="Name"
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
                  />
                  <span className="m-auto">and</span>
                  <input
                    id="lastName"
                    type="text"
                    required={true}
                    className="w-48 bg-gray-100 p-3 rounded border text-black focus:outline-none focus:border-[#3d91fb] focus:border-2"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="Age"
                  className="mb-2 font-semibold text-white  focus:border-[#3d91fb] focus:border-2"
                >
                  Age
                </label>
                <input
                  id="Age"
                  required={true}
                  type="number"
                  className="bg-gray-100 p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-black	"
                  placeholder="Enter your Age"
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
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-200 hover:bg-blue-700"
              >
                {isLogin ? "Singup" : "Singup"}
              </button>
              <p className="text-center mt-4">
                {isLogin ? "Register now" : "Already have an account?"}{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  {isLogin ? "Singup" : "Login"}
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
