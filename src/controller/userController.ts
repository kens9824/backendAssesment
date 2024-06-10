import { Request, Response } from 'express';
import { compare, hash } from "bcryptjs";
import { RequestFailed } from '../response/RequestFailedResponse';
import { User } from '../entity/user';
import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';
import { InternalServerError } from '../response/InternalServerErrorResponse';



export const Register = async (req: Request, res: Response) => {
    try {
        const {
            name,
            phone,
            email,
            password
        } = req.body;

        if (!password || !password.trim().length) {
            return RequestFailed(res, 400, "Please Enter Password");
        }

        if (!name || !name.trim().length) {
            return RequestFailed(res, 400, "Please Enter name");
        }
        if (!phone || !phone.trim().length) {
            return RequestFailed(res, 400, "Please Enter phone");
        }

        if (phone.trim().length != 10) {
            return RequestFailed(res, 400, "Please Enter Valid phone");
        }


        const olduser = await User.findOne({
            where: { phone: phone }
        });

        if (olduser) {
            res.status(409).json({
                success: false,
                message: 'Your Phonenumber is Already Registered with us',
                timestmap: new Date()
            });
        } else {
            const user = new User();

            const hashPassword = await hash(password, 12);
            user.name = name;
            user.phone = phone;
            if(email){
                user.email = email;
            }
            user.password = hashPassword;

            await user.save();

            const data = {
                userId: user.id,
                user: user,
            };

            const token = jwt.sign(data, process.env.TOKEN_SECRET!, {
                expiresIn: '10d'
            });

            const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET!, {
                expiresIn: '30d'
            });

            const Data = {
                access_token: token,
                refresh_token: refreshToken,
                user: user
            };

            return res.status(200).json(Data);
        }

    } catch (error) {
        return InternalServerError(res, error);
    }
}

export const Login = async (req: Request, res: Response) => {
    try {

        const {
            email,
            password
        } = req.body;


        if (!password || !password.trim().length) {
            return RequestFailed(res, 400, "Please Enter Password");
        }

        if (!email || !email.trim().length) {
            return RequestFailed(res, 400, "Please Enter Password");
        }

        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.Email = :email', { email })
            .getOne();

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User Not Found',
                timestmap: new Date()
            });
        } else {

            const isValidPass = await compare(password, user.password);
            if (!isValidPass) {
                return RequestFailed(res, 401, "bad username/password");
            }


            const data = {
                id: user.id,
                username: user.name,
            };

            const token = jwt.sign(data, process.env.TOKEN_SECRET!, {
                expiresIn: '7d'
            });

            const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET!, {
                expiresIn: '30d'
            });

            const Data = {
                access_token: token,
                refresh_token: refreshToken,
                user: user
            };
            return res.status(200).json(Data);
        }
    } catch (error) {
        return InternalServerError(res, error);
    }

}


export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const user = await User.find();
        return res.status(200).json(user);

    } catch (error) {
        return InternalServerError(res, error);
    }

}