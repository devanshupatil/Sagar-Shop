const express = require('express');
const router = express.Router();
const { saveUserShippingDetails, getUserShippingDetails, updateUserShippingDetails, getUserById } = require('../controller/user-controller');
const verifyToken  = require('../middleware/auth');


router.use(verifyToken);

router.post('/users/shipping-details', saveUserShippingDetails);
router.get('/users/shipping-details/:userId', getUserShippingDetails);
router.put('/users/shipping-details/:userId', updateUserShippingDetails);
router.get('/user/:userId', getUserById);


module.exports = router;