import { useState, useEffect } from "react";
import axios from "axios";
import NavLink from "./NavLink";
import PropTypes from "prop-types";

import { userService } from "../services";

Nav.propTypes = {
  auth: PropTypes.bool,
};

Nav.defaultProps = {
  auth: false,
};

export default function Nav({ auth }) {
  // const [user, setUser] = useState(null);
  useEffect(() => {
    // console.log("Nav", process.browser);
    // console.log("window", typeof window === "undefined");
  }, []);

  function logout() {
    userService.logout();
  }

  // const logout = async () => {
  //   const user = await axios.get("/api/auth/logout");
  //   console.log(user.data.message);
  // };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav">
        <NavLink href="/" exact className="nav-item nav-link">
          Home
        </NavLink>

        {auth && (
          <a onClick={logout} className="nav-item nav-link">
            Logout
          </a>
        )}
      </div>
    </nav>
  );
}
