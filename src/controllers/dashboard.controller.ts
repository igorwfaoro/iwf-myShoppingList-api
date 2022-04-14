import { NextFunction, Request, Response, Router } from "express";
import { ServicesCollection } from "../providers";
import { validateInput } from "../middlewares/validate-input";
import { checkApiKey } from "../middlewares/check-api-key";
import { DashboardService } from "../services/dashboard.service";
import { dashboardValidator } from "../validators/dashboard.validator";

const DashboardController = Router();

const dashboardService = ServicesCollection.resolve(DashboardService);

DashboardController.get('/statistics', [checkApiKey, validateInput(dashboardValidator.getStatistics)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const statistics = await dashboardService.getStatistics(req.query as any);
        res.json(statistics);
    } catch (error) {
        next(error);
    }
});

DashboardController.get('/prospect-customers-per-day', [checkApiKey, validateInput(dashboardValidator.getProspectCustomersPerDay)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prospectCustomersPerDay = await dashboardService.getProspectCustomersPerDay(req.query as any);
        res.json(prospectCustomersPerDay);
    } catch (error) {
        next(error);
    }
});

DashboardController.get('/sales-price-per-day', [checkApiKey, validateInput(dashboardValidator.getSalesPerDay)], async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salesPricePerDay = await dashboardService.getSalesPricePerDay(req.query as any);
        res.json(salesPricePerDay);
    } catch (error) {
        next(error);
    }
});

export { DashboardController };