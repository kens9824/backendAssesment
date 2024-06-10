import { Request } from "express";
import { User } from "../entity/user";

export type AuthRequest = Request & { userId?: number; user?: User };
