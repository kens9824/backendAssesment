import {  Response } from 'express';
import { RequestFailed } from '../response/RequestFailedResponse';
import { Brackets, getConnection } from 'typeorm';
import { AuthRequest } from '../middlewares/AuthRequestContext';
import { Spam } from '../entity/spam';
import { User } from '../entity/user';
import { InternalServerError } from '../response/InternalServerErrorResponse';



export const searchByName = async (req: AuthRequest, res: Response) => {
    try {
        const name = req.body.name

        if (!name || !name.trim().length) {
            return RequestFailed(res, 400, "Please Enter name");
        }
        if (name) {

            // for getting spam record  

            const userSpam = await getConnection()
                .getRepository(Spam)
                .createQueryBuilder('spam')
                .leftJoinAndSelect('spam.user', 'user')
                .leftJoinAndSelect('spam.contact', 'contact')
                .where('spam.name like :name', { name: `${name}%` })
                .orWhere('user.name like :name', { name: `${name}%` })
                .orWhere('contact.name like :name', { name: `${name}%` })
                .orWhere('spam.name like :name', { name: `%${name}%` })
                .orWhere('user.name like :name', { name: `%${name}%` })
                .orWhere('contact.name like :name', { name: `%${name}%` })
                .getMany();

            userSpam.map(spam => (
                spam['isSpam'] = true
            ))

            // for getting spam without record  

            const records = await getConnection().getRepository(User)
                .createQueryBuilder('user')
                .leftJoin('user.spam', 'spam')
                .leftJoinAndSelect('user.contact', 'contact')
                .where('spam.id IS NULL')
                .andWhere(new Brackets(qb => {
                    qb.where('user.name LIKE :name', { name: `${name}%` })
                        .orWhere('user.name LIKE :name', { name: `%${name}%` })
                        .orWhere('contact.name LIKE :name', { name: `${name}%` })
                        .orWhere('contact.name LIKE :name', { name: `%${name}%` });
                }))
                .getMany();

            records.map(data => (
                data['isSpam'] = false
            ))

            const finalData = [...userSpam, ...records];
            return res.status(200).json(finalData);
        }

    } catch (error) {
        return InternalServerError(res, error);
    }
}

export const searchByPhone = async (req: AuthRequest, res: Response) => {
    try {
        const phone = req.body.phone

        if (!phone || !phone.trim().length) {
            return RequestFailed(res, 400, "Please Enter Phone Number");
        }

        if (phone) {
            // for getting spam record  

            const userSpam = await getConnection()
                .getRepository(Spam)
                .createQueryBuilder('spam')
                .leftJoinAndSelect('spam.user', 'user')
                .leftJoinAndSelect('spam.contact', 'contact')
                .where('spam.phone like :phone', { phone: `${phone}%` })
                .orWhere('user.phone like :phone', { phone: `${phone}%` })
                .orWhere('contact.phone like :phone', { phone: `${phone}%` })
                .orWhere('spam.phone like :phone', { phone: `%${phone}%` })
                .orWhere('user.phone like :phone', { phone: `%${phone}%` })
                .orWhere('contact.phone like :phone', { phone: `%${phone}%` })
                .getMany();

            userSpam.map(spam => (
                spam['isSpam'] = true
            ))

            // for getting without spam record  

            const records = await getConnection().getRepository(User)
                .createQueryBuilder('user')
                .leftJoin('user.spam', 'spam')
                .leftJoinAndSelect('user.contact', 'contact')
                .where('spam.id IS NULL')
                .andWhere(new Brackets(qb => {
                    qb.where('user.phone LIKE :phone', { phone: `${phone}%` })
                        .orWhere('user.phone LIKE :phone', { phone: `%${phone}%` })
                        .orWhere('contact.phone LIKE :phone', { phone: `${phone}%` })
                        .orWhere('contact.phone LIKE :phone', { phone: `%${phone}%` });
                }))
                .getMany();

            records.map(data => (
                data['isSpam'] = false
            ))

            const finalData = [...userSpam, ...records];
            return res.status(200).json(finalData);

        }

    } catch (error) {
        return InternalServerError(res, error);

    }
}