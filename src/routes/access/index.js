const express = require('express');
const AccessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../middlewares/handler');
const { RequiredAuth } = require('../../utils/auth.utils');
const router = express.Router();

router.post('/signup', asyncHandler(AccessController.signup));
router.post('/login', asyncHandler(AccessController.login));

router.use(RequiredAuth);
router.post('/logout', asyncHandler(AccessController.logout));

module.exports = router;
