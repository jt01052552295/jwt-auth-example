import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
// import { authAtom, nameState } from "../atom/userAtom";

import { userService } from "../services";

export default function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [auth, setAuth] = useRecoilState(authAtom);
  const router = useRouter();

  const mainDivStyle = {
    padding: "1em",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "560px",
  };

  useEffect(() => {
    // console.log(window.localStorage === localStorage); // 👉️ true
    // console.log(localStorage);
    // redirect to home if already logged in
    // if (userService.userValue) {
    //   console.log("userService.userValue", userService.userValue);
    // }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };

      userService
        .login(username, password)
        .then((res) => {
          // get return url from query parameters or default to '/'
          const returnUrl = router.query.returnUrl || "/";
          router.push(returnUrl);
        })
        .catch((error) => {
          // setError("apiError", { message: error });
          console.error("userService", error);
        });

      // const user = await axios.post("/api/auth/login", credentials);

      // setAuth(true);

      // console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleGetUser = async () => {
  //   const user = await axios.get("/api/user");

  //   console.log(user.data.message);
  // };

  // const handleLogOut = async () => {
  //   const user = await axios.get("/api/auth/logout");

  //   console.log(user.data.message);
  // };

  return (
    <div style={mainDivStyle}>
      <form style={formStyle} onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            aria-describedby="emailHelp"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
