import { serialize } from "cookie";

export default function handler(req, res) {
  const { cookies } = req;
  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    return res.json({ message: "You are already not logged in..." });
  } else {
    const serialised = serialize("OursiteJWT", null, {
      httpOnly: true,
      secure: process.env.PUBLIC_NEXT_NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Successfuly logged out!" });
  }
}
