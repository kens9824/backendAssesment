import { Response } from 'express';
import { Contact } from '../entity/contact';
import { AuthRequest } from '../middlewares/AuthRequestContext';
import { InternalServerError } from '../response/InternalServerErrorResponse';



export const getAllContact = async (req: AuthRequest, res: Response) => {
    try {

        const contact = await Contact.find();
        return res.status(200).json(contact);

    } catch (error) {
        return InternalServerError(res, error);
    }
}