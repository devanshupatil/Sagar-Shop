const express = require('express');
const router = express.Router();
const { saveUserShippingDetails, getUserShippingDetails } = require('../controller/userController');

router.post('/users/shipping-details', saveUserShippingDetails);
router.get('/users/shipping-details/:user_id', getUserShippingDetails);

module.exports = router;