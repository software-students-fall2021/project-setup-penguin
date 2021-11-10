const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);

router.delete("/:userId", userController.deleteUser);

router.get("/:userId", userController.getUser);

router.patch("/:userId", userController.updateUser);

router.post("/login", userController.loginUser);

module.exports = router;
