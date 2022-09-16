export default function handler(req, res) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    return res.json({ message: "Invalid token!" });
  }

  return res.json({ message: "Top secret data!" });
}
