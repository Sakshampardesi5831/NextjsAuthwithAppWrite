"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>LoginPage</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input
          className="border-2 border-black py-1 px-1 mb-4 focus:outline-none
           focus:border-blue-500 focus:ring-1 focus:ring-blue-500  "
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
           focus:border-blue-500 focus:ring-1 focus:ring-blue-500  "
          name="password"
          id="password"
          type="text"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={onLogin}
          className="py-2 px-4
       text-white border  border-gray-300 rounded-lg focus:outline-none"
        >
          Create Account
        </button>
        <Link href={"/signup"}>Visit SignUp Page</Link>
      </div>
    </Fragment>
  );
};

export default LoginPage;
