import * as express from "express";
import * as viewController from "../controllers/view.controller";
export const router = express.Router();

router.get("/getAll", viewController.getAllProviders)

module.exports = router