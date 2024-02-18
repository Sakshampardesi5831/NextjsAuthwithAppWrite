"use client";
import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState("nothing");
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  const getUserDetails = async () => {
    const { data } = await axios.get("/api/users/me");
    console.log(data);
    setUser(data.result._id);
  };
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <h2 className="p-1 rounded bg-green-800 text-xl" >
          {user === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${user}`}>User</Link>
          )}
        </h2>
        <hr />
        <button
          onClick={logout}
          className="py-2 px-4
            text-white border  border-gray-300 rounded-lg focus:outline-none mt-4"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="py-2 px-4
            text-white border bg-green-700  border-gray-300 rounded-lg focus:outline-none mt-4"
        >
          Get User Details
        </button>
      </div>
    </Fragment>
  );
};

export default ProfilePage;
