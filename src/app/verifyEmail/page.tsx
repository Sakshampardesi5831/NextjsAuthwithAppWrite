"use client";
import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import axios from "axios";
const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">
          {token ? `${token}` : "no token"}
        </h2>
        {verified && (
          <div>
            <h2 className="text-2xl">Email Verified</h2>
            <Link href={"/login"}>Login</Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl bg-red-500 text-Black">ERROR</h2>
            <Link href={"/login"}>Login</Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default VerifyEmail;
