// @ts-ignore
import body_parser from "body-parser";
// @ts-ignore
import Express, { Application } from "express";
// @ts-ignore
import HTTP_STATUS_CODES from "http-status-codes";
import {DashboardController} from '../controller/dashboardController';

export default function(app: Application, express: typeof  Express) {
    const router = express.Router();

    router.get("/dashboard", (req, res) => {
            const today = new Date();
            const current_time = today.getHours() + ":" + today.getMinutes();
            const stop = "North Station";
            const type = "schedule";
            const hostname ='api-v3.mbta.com';

            const options = {
                hostname: hostname,
                type: type,
                stop: stop,
                time: current_time,
            };

            const dashboardController  = new DashboardController(options);
            const path: string = dashboardController.constructPath();
            console.log(path);
            const response = dashboardController.callMBTA(path);
            // const data = dashboardController.extractData(response);
            const data = [
                {
                "data": "data",
                "data2": "data2",
                "data3": "data3",
                },
                {
                    "data": "data",
                    "data2": "data2",
                    "data3": "data3",
                }
            ];

            console.log(data);
            res.send(data);
    });

    app.use(body_parser.json());
    app.use("/", router);
}
