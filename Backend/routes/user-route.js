const express = require('express');
const router = express.Router();
const { saveUserShippingDetails, getUserShippingDetails, updateUserShippingDetails, getUserById, updateUserProfile, createNewUser } = require('../controller/user-controller');
const verifyToken  = require('../middleware/auth');



router.post('/user', createNewUser);
router.use(verifyToken);
router.post('/users/shipping-details', saveUserShippingDetails);
router.get('/users/shipping-details/:userId', getUserShippingDetails);
router.put('/users/shipping-details/:userId', updateUserShippingDetails);
router.get('/user/:userId', getUserById);
router.put('/user/:userId', updateUserProfile);


module.exports = router;