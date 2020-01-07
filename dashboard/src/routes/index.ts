// @ts-ignore
import Express, {Application} from "express";

export default function (app: Application, express: typeof Express) {
    const router = express.Router();

    /* GET home page. */
    router.get("/", function (req, res, next) {
        res.render("index", {title: "Express"});
    });

    app.use("/", router);
}
