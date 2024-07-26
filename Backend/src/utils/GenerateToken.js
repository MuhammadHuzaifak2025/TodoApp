import jwt from "jsonwebtoken";

const GenerateToken = (user) => {
  if (!user) return null;
  let token;
  console.log(user);
  return (token = jwt.sign(
    {
      username: user.username,
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  ));
};

export default GenerateToken;
