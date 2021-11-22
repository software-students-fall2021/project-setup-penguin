const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const { authenticate } = require("../jwt-config");

router.post(
  "/",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Email is required").notEmpty(),
    body("password", "Password is required").notEmpty(),
  ],
  userController.createUser
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getUser
);

router.get(
  "/account",
  passport.authenticate("jwt", { session: false }),
  userController.getUserAccount
);

// TODO: update this to align with get request (get id from req.user not req.params)
// TODO: incorporate express-validator
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);

router.post(
  "/login",
  [
    body("email", "Email is required").notEmpty(),
    body("password", "Password is required").notEmpty(),
  ],
  userController.loginUser
);

module.exports = router;
