import { Router } from "express";
import { ServicesCollection } from "../providers";
import { UserService } from "../services/shopping-list.service";

const UsersController = Router();

const userService = ServicesCollection.resolve(UserService);

// UsersController.post('/multi', [checkApiKey, validateInput(saleValidator.createMulti)], async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const prospectCustomer = await saleService.createMulti(req.body);
//         res.json(prospectCustomer);
//     } catch (error) {
//         next(error);
//     }
// });

export { UsersController };