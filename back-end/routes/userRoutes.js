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
    body(
      "password",
      "Password requires at least one upper case letter, one lower case letter, one number, one special character, and at least 4 characters long"
    ).matches(
      /^(?=.{4,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
      "i"
    ),
  ],
  userController.createUser
);

router.delete("/", authenticate, userController.deleteUser);

router.get("/", authenticate, userController.getUser);

router.get("/account", authenticate, userController.getUserAccount);

router.patch(
  "/",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Email is required").notEmpty(),
  ],
  authenticate,
  userController.updateUser
);

router.patch(
  "/password",
  [
    body("currentPassword", "Current password is required").notEmpty(),
    body("newPassword", "New password is required").notEmpty(),
    body(
      "newPassword",
      "Password requires at least one upper case letter, one lower case letter, one number, one special character, and at least 4 characters long"
    ).matches(
      /^(?=.{4,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
      "i"
    ),
  ],
  authenticate,
  userController.updatePassword
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
