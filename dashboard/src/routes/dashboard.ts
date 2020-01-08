// @ts-ignore
import body_parser from "body-parser";
// @ts-ignore
import Express, { Application } from "express";
// @ts-ignore
import HTTP_STATUS_CODES from "http-status-codes";
import {DashboardController} from '../controller/dashboardController';

export default function(app: Application, express: typeof  Express) {
    const router = express.Router();

    router.get("/dashboard", async (req, res) => {
            const today = new Date();
            const current_time = today.getHours() + ":" + today.getMinutes();
            const stop = "North Station";
            const type = "predictions";
            const hostname ='api-v3.mbta.com';
            const direction = "0";
            const include = "schedule";
            const route_type = "1,2";

            const options = {
                hostname: hostname,
                type: type,
                stop: stop,
                time: current_time,
                direction: direction,
                include: include,
                route_type: route_type
            };

            const dashboardController  = new DashboardController(options);
            const path: string = dashboardController.constructPath();
            console.log(path);
            const response = await dashboardController.callMBTA(path);
            const data = dashboardController.extractData(response);
            res.send(data);
    });

    app.use(body_parser.json());
    app.use("/", router);
}
