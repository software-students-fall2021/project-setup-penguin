const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);

router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getUser
);

router.patch(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);

router.post("/login", userController.loginUser);

module.exports = router;
