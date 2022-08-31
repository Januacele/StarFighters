import { Request, Response } from "express";
import * as starService from '../services/starsService'

export async function battle(req: Request, res: Response){
    const { firstUser, secondUser } : { firstUser: string, secondUser: string} = req.body;

    if(!firstUser || !secondUser){
        return res.sendStatus(422);
    }
}