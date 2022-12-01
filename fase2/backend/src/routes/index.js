const express = require("express");
const gamesRouter = require("./games.routes.js").gamesRouter;
const notifsRouter = require("./notifications.routes.js").notifsRouter;
const functionsRouter = require("./functions.routes.js").functionsRouter;

const router = express.Router();

router.use("/games", (req, res) => gamesRouter(req, res));
router.use("/notifications", (req, res) => notifsRouter(req, res));
router.use("/functions", (req, res) => functionsRouter(req, res));

module.exports = router;
