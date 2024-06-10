import {  Response } from 'express';
import { RequestFailed } from '../response/RequestFailedResponse';
import { AuthRequest } from '../middlewares/AuthRequestContext';
import { Spam } from '../entity/spam';
import { User } from '../entity/user';
import { Contact } from '../entity/contact';
import { InternalServerError } from '../response/InternalServerErrorResponse';



export const createSpam = async (req: AuthRequest, res: Response) => {
    try {
        const {
            name,
            phone,
        } = req.body;

        if (!phone || !phone.trim().length) {
            return RequestFailed(res, 400, "Please Enter phone");
        }
        
        if (phone.trim().length != 10) {
            return RequestFailed(res, 400, "Please Enter Valid phone");
        }

        const oldSpamUser = await Spam.findOne({
            where: { phone: phone }
        });
        const registeredUser = await User.findOne({
            where: { phone: phone }
        });
        const contactUser = await Contact.findOne({
            where: { phone: phone }
        });
        if (oldSpamUser) {
            oldSpamUser.count += 1 
            await oldSpamUser.save()
            return res.status(200).json(oldSpamUser);
        }
        else{
            const spamUser = new Spam();
            if(name){
            }
            spamUser.isRegistered = registeredUser ? true : false;
            spamUser.isContact = contactUser ? true : false;

            if(spamUser.isRegistered){
                spamUser.user = registeredUser
            }
            if(spamUser.isContact){
                spamUser.contact = contactUser
            }
            if(!spamUser.isRegistered && !spamUser.isContact){
                spamUser.name  = name
                spamUser.phone = phone
            }
            await spamUser.save();
            return res.status(200).json(spamUser);

        }

    } catch (error) {
        return InternalServerError(res, error);

    }
}

export const getAllSpam = async (req: AuthRequest, res: Response) => {
    try {

        const spam = await Spam.find();
        return res.status(200).json(spam);

    } catch (error) {
        return InternalServerError(res, error);

    }
}