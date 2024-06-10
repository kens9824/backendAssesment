import { Request, Response } from 'express';
import { User } from '../entity/user';
import { getConnection } from 'typeorm';
import { Contact } from '../entity/contact';
import { Spam } from '../entity/spam';
import { InternalServerError } from '../response/InternalServerErrorResponse';


export const getAllRecords = async (req: Request, res: Response) => {
    try {
        
        let response = { user: [], spamUser: [] ,contact: []};
        const user = await getConnection().getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.contact', 'contact')
        .getMany()
        const contact = await Contact.find();

        const spamUser = await getConnection()
        .getRepository(Spam)
        .createQueryBuilder('spam')
        .leftJoinAndSelect('spam.user', 'user')
        .leftJoinAndSelect('spam.contact', 'contact')
        .getMany()

        response.contact = contact
        response.user = user
        response.spamUser = spamUser

        return res.status(200).json(response);

    } catch (error) {
        return InternalServerError(res, error);
    }





}