const jwt = require("jsonwebtoken");
import getConfig from "next/config";

import { apiHandler } from "../../../helpers/api";
import users from "../../../data/users.json";

const { serverRuntimeConfig } = getConfig();

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function authenticate() {
    const { username, password } = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) throw "Username or password is incorrect";

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, {
      expiresIn: "7d",
    });

    // return basic user details and token
    return res.status(200).json({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    });
  }
}
