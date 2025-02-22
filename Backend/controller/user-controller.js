const user = require('../models/users-model');


const saveUserShippingDetails = async (req, res) => {

    try{
        const {userId, address, city, state, pincode, country} = req.body;
        if(!userId || !address || !city || !state || !pincode || !country)
        {
            throw new Error('Invalid ID');
        }
        const data = await user.saveShippingDetails(userId, address, city, state, pincode, country);
        res.status(200).json(data);
    }
    catch(error)
    {
        console.error('Error saving shipping details:', error);
        throw new Error('Server Error: Unable to save shipping details');
    }
    
}

const getUserShippingDetails = async (req, res) => {

    try{
        const {userId} = req.params;
        if(!userId)
        {
            throw new Error('Invalid ID');
        }
        const data = await user.getShippingDetails(userId);
        res.status(200).json(data);
    }
    catch(error)
    {
        console.error('Error getting shipping details:', error);
        throw new Error('Server Error: Unable to get shipping details');
    }
}

const updateUserShippingDetails = async (req, res) => {

    try{
        const {userId, address, city, state, pincode, country} = req.body;
        if(!userId || !address || !city || !state || !pincode || !country)
        {
            throw new Error('Invalid ID');
        }
        const data = await user.updateShippingDetails(userId, address, city, state, pincode, country);
        res.status(200).json(data);
    }
    catch(error)
    {
        console.error('Error updating shipping details:', error);
        throw new Error('Server Error: Unable to update shipping details');
    }
}

const deleteUserShippingDetails = async (req, res) => {

    try{
        const {userId} = req.params;
        if(!userId)
        {
            throw new Error('Invalid ID');
        }
        const data = await user.deleteShippingDetails(userId);
        res.status(200).json(data);
    }
    catch(error)
    {
        console.error('Error deleting shipping details:', error);
        throw new Error('Server Error: Unable to delete shipping details');
    }
}

module.exports = {
    saveUserShippingDetails,
    getUserShippingDetails,
    updateUserShippingDetails,
    deleteUserShippingDetails
}