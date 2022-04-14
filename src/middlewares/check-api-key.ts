import { Request, Response, NextFunction } from "express";
import { AuthException } from "../common/exceptions/auth.exception";
import { ApiKey } from "../models/entities/api-keys";

export async function checkApiKey(req: Request, res: Response, next: NextFunction) {

    const key = <string>req.query.key;

    if (!key) {
        next(new AuthException('Chave de API é obrigatória'));
        return;
    }

    try {
        const apiKey = await ApiKey.findOne({
            where: { key }
        });

        if (!apiKey) {
            next(new AuthException('Chave de API inválida'));
            return;
        }

    } catch (error) {
        next(new AuthException('Chave de API inválida'));
        return;
    }

    next();
};