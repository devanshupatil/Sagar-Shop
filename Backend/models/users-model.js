const supabase = require('../config/database')


const User = {

    saveShippingDetails : async (userId, address, city, state, pincode, country) => {
        try {
            const { data, error } = await supabase
            .from('user_profiles')
            .insert({
                user_id: userId,
                address_line: address,
                city: city,
                state: state,
                pincode: pincode,
                country: country
            })
            .select();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error saving shipping details:', error);
            throw new Error('Server Error: Unable to save shipping details');
        }
    },

    getShippingDetails : async (userId) => {

        try {
            const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', userId)
            .single();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error getting shipping details:', error);
            throw new Error('Server Error: Unable to get shipping details');
        }
    },

    updateShippingDetails : async (userId, address, city, state, pincode, country) => {
        try {
            const { data, error } = await supabase
            .from('user_profiles')
            .update({
                address_line: address,
                city: city,
                state: state,
                pincode: pincode,
                country: country
            })
            .eq('user_id', userId)
            .select();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error updating shipping details:', error);
            throw new Error('Server Error: Unable to update shipping details');
        }
    },

    deleteShippingDetails : async (userId) => {
        try {
            const { data, error } = await supabase
            .from('user_profiles')
            .delete()
            .eq('user_id', userId)
            .select();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error deleting shipping details:', error);
            throw new Error('Server Error: Unable to delete shipping details');
        }
    },

    getUserById : async (userId) => {
        try {
            const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', userId)
            .single();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error getting user:', error);
            throw new Error('Server Error: Unable to get user');
        }
    },

    createNewUser : async (firstName, lastName, email, phoneNumber, userId) => {
        try {
            const { data, error } = await supabase
            .from('user_profiles')
            .insert({
                user_id: userId,
                first_name: firstName,
                last_name: lastName,
                user_email: email,
                phone_number: phoneNumber
            })
            .select();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error creating new user:', error);
            throw new Error('Server Error: Unable to create new user');
        }
    }

}

module.exports = User