import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.PUBLIC_NEXT_SECRET;

export default function handler(req, res) {
  const { username, password } = req.body;

  //res.status(200).json({ name: username, password: password });

  if (username === "test" && password === "1111") {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        username: username,
      },
      secret
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.PUBLIC_NEXT_NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Success!" });
  } else {
    res.json({ message: "Invalid credentials!" });
  }
}
