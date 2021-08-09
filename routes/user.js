const router = require("express").Router();

const userController = require("../controllers/userController");
const { catchErrors } = require("../handlers/errorHandler");

router.post("/login", catchErrors(userController.login));
router.post("/register", catchErrors(userController.register));

module.exports = router;
