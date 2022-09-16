import { apiHandler } from "../../../helpers/api";

// users in JSON file for simplicity, store in a db for production applications
import users from "../../../data/users.json";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getUsers();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getUsers() {
    // return users without passwords in the response
    const response = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      //   console.log(userWithoutPassword);
      return userWithoutPassword;
    });
    return res.status(200).json(response);
  }
}
