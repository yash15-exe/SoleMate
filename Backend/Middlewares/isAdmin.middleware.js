import { decodeToken } from "../Utilities/JwtUtility";

export const isAdminMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (typeof authHeader !== "undefined") {
    const token = authHeader.split(' ')[1];
   
    try {
      const user = await decodeToken(token);

      if (user) {
        // Ensure req.user is initialized

        if(user.email==process.env.AdminEmail){
            req.user = user;
            next();
        }
        
      } else {
        res.status(403).send("Forbidden entry");
      }
    } catch (error) {
      // Handle possible errors from decodeToken function
      res.status(401).send("Invalid token");
    }
  } else {
    res.status(401).send("Authorization header is missing");
  }
};
