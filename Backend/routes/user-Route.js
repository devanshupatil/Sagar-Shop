const express = require('express');
const router = express.Router();
const { saveUserShippingDetails, getUserShippingDetails, updateUserShippingDetails } = require('../controller/user-Controller');

router.post('/users/shipping-details', saveUserShippingDetails);
router.get('/users/shipping-details/:userId', getUserShippingDetails);
router.put('/users/shipping-details/:userId', updateUserShippingDetails);


module.exports = router;