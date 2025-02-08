const user = require('../models/UsersModel');


const saveUserShippingDetails = async (req, res) => {

    try{
        const {user_id, address, city, state, pincode, country} = req.body;
        if(!user_id, !address, !city, !state, !pincode, !country)
        {
            throw new Error('Invalid ID');
        }
        const data = await user.saveShippingDetails(user_id, address, city, state, pincode, country);
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
        const {user_id} = req.params;
        if(!user_id)
        {
            throw new Error('Invalid ID');
        }
        const data = await user.getShippingDetails(user_id);
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
        const {user_id, address, city, state, pincode, country} = req.body;
        if(!user_id, !address, !city, !state, !pincode, !country)
        {
            throw new Error('Invalid ID');
        }
        const data = await user.updateShippingDetails(user_id, address, city, state, pincode, country);
        res.status(200).json(data);
    }
    catch(error)
    {
        console.error('Error updating shipping details:', error);
        throw new Error('Server Error: Unable to update shipping details');
    }
}

module.exports = {
    saveUserShippingDetails,
    getUserShippingDetails,
    updateUserShippingDetails
}