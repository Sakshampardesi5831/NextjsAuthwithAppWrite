"use client";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);



  
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Sign Up Success", response.data);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-white">{loading ? "Processing" : "SignUp"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          className="border-2 border-black py-1 px-1 mb-4 focus:outline-none
           focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black "
          name="username"
          id="username"
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="email">email</label>
        <input
          className="border-2 border-black py-1 px-1 mb-4 focus:outline-none
           focus:border-blue-500 focus:ring-1 focus:ring-blue-500  text-black  "
          name="email"
          id="email"
          type="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">password</label>
        <input
          className="border-2 border-black py-1 px-1 mb-4 focus:outline-none
           focus:border-blue-500 focus:ring-1 focus:ring-blue-500  text-black"
          name="password"
          id="password"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={onSignUp}
          className="py-2 px-4
       text-white border  border-gray-300 rounded-lg focus:outline-none"
        >
          {buttonDisabled ? "No Sign Up" : "Sign Up"}
        </button>
        <Link href={"/login"}>Visit Login Page</Link>
      </div>
    </Fragment>
  );
};

export default SignUp;
