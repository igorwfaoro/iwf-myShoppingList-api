import { NextFunction, Request, Response, Router } from "express";
import { ServicesCollection } from "../providers";
import { ProspectCustomerService } from "../services/prospect-customer.service";
import { validateInput } from "../middlewares/validate-input";
import { prospectCustomerValidator } from "../validators/prospect-customer.validator";
import { checkApiKey } from "../middlewares/check-api-key";

const ProspectCustomersController = Router();

const prospectCustomerService = ServicesCollection.resolve(ProspectCustomerService);

ProspectCustomersController.post('/', [checkApiKey, validateInput(prospectCustomerValidator.create)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prospectCustomer = await prospectCustomerService.create(req.body);
        res.json(prospectCustomer);
    } catch (error) {
        next(error);
    }
});

ProspectCustomersController.put('/', [checkApiKey, validateInput(prospectCustomerValidator.update)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prospectCustomer = await prospectCustomerService.update(req.body);
        res.json(prospectCustomer);
    } catch (error) {
        next(error);
    }
});

ProspectCustomersController.get('/:id', [checkApiKey, validateInput(prospectCustomerValidator.getById)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prospectCustomer = await prospectCustomerService.getById(Number(req.params.id));
        res.json(prospectCustomer);
    } catch (error) {
        next(error);
    }
});

ProspectCustomersController.get('/', [checkApiKey, validateInput(prospectCustomerValidator.getAll)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prospectCustomers = await prospectCustomerService.getAll(req.query);
        res.json(prospectCustomers);
    } catch (error) {
        next(error);
    }
});

ProspectCustomersController.delete('/:id', [checkApiKey, validateInput(prospectCustomerValidator.delete)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        await prospectCustomerService.delete(Number(req.params.id));
        res.json({ ok: true });
    } catch (error) {
        next(error);
    }
});

export { ProspectCustomersController };