import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/user";
// import { InternalServerError } from "../response/InternalServerErrorResponse";
import { RequestFailed } from "../response/RequestFailedResponse";
import { AuthRequest } from "./AuthRequestContext";

interface JWT_DECODE {
  id: number;
  firstname: string;
  iat: number;
  exp: number;
}

export const Auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {

      return RequestFailed(res, 404, "Unauthorized / no token found");
    } else {

      const data = jwt.verify(token, process.env.TOKEN_SECRET!) as JWT_DECODE;

      const user = await User.findOne({
        where: { id: data.id }
      });

      if (!user) {
        return RequestFailed(res, 401, "Unauthorized !");
      }
      // if (!user.isActive) {
      //   return RequestFailed(res, 401, "User disabled !");
      // }
      // if (user && !user.isLoggedIn) {
      //   return RequestFailed(res, 401, "User logged out !");
      // }
      req.userId = user.id;
      req.user = user;

      next();
    }
  } catch (error) {
    // return InternalServerError(res, error);
  }
};
