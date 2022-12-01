const express = require("express");
const gamesRouter = require("./games.routes.js").gamesRouter;
const notifsRouter = require("./notifications.routes.js").notifsRouter;

const router = express.Router();

router.use("/games", (req, res) => gamesRouter(req, res));
router.use("/notifications", (req, res) => notifsRouter(req, res));

module.exports = router;
