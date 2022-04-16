import { NextFunction, Request, Response, Router } from "express";
import { TokenHelper } from "../common/helpers/token.helper";
import { checkToken } from "../middlewares/check-token";
import { validateInput } from "../middlewares/validate-input";
import { ServicesCollection } from "../providers";
import { AuthService } from "../services/auth.service";
import { authValidator } from "../validators/auth.validator";

const AuthController = Router();

const authService = ServicesCollection.resolve(AuthService);

AuthController.post('/login', [validateInput(authValidator.login)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userToken = await authService.login(req.body);
        res.json(userToken);
    } catch (error) {
        next(error);
    }
});

AuthController.post('/refresh', [checkToken], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userToken = await authService.refresh(TokenHelper.getUserId(res));
        res.json(userToken);
    } catch (error) {
        next(error);
    }
});

export { AuthController };