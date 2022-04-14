import { Router } from "express";
import { VERSION } from "../version";
import { CONSTANTS } from "./static/constants";
import { DashboardController } from "./controllers/dashboard.controller";
import { ProspectCustomersController } from "./controllers/prospect-customers.controller";
import { SalesController } from "./controllers/sales.controller";

const routes = Router();

routes.get(`/`, (req, res) => res.json({
    name: CONSTANTS.API_NAME,
    version: VERSION
}));

// routes.use(`/${CONSTANTS.API_V1}/prospect-customers`, ProspectCustomersController);

export { routes };