const supabase = require('../config/database')


const User = {

    saveShippingDetails : async (userId, address, city, state, pincode, country) => {
        try {
            const { data, error } = await supabase
            .from('user_addresses')
            .insert({
                user_id: userId,
                address_line: address,
                city: city,
                state: state,
                postal_code: pincode,
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
            .from('user_addresses')
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
            .from('user_addresses')
            .update({
                address_line: address,
                city: city,
                state: state,
                postal_code: pincode,
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
    }

}

module.exports = User