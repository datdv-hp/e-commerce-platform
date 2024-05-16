const express = require('express');
const {
  RequiredApiKey,
  RequiredPermission,
  RequiredAuth,
} = require('../utils/auth.utils');
const { Permissions } = require('../models/apiKey.model');
const router = express.Router();

// check API key
router.use(RequiredApiKey);

// check permissions
router.use(RequiredPermission({ permission: Permissions.STANDARD }));

router.use('/access', require('./access'));

router.use(RequiredAuth);
router.use('/shop', require('./shop'));
router.use('/product', require('./product'));

module.exports = router;
