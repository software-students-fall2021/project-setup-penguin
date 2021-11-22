
const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.deleteUser
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.getUser
);


router.get(
  '/account',
  passport.authenticate('jwt', { session: false }),
  userController.getUserAccount
);

router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
);

router.post('/login', userController.loginUser);

module.exports = router;
