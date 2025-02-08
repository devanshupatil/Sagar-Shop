const supabase = require('../config/database')


const User = {

    saveShippingDetails : async (user_id, address, city, state, pincode, country) => {
        try {
            const { data, error } = await supabase
            .from('user_addresses')
            .insert({
                user_id: user_id,
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

    getShippingDetails : async (user_id) => {

        try {
            const { data, error } = await supabase
            .from('user_addresses')
            .select('*')
            .eq('user_id', user_id)
            .single();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error getting shipping details:', error);
            throw new Error('Server Error: Unable to get shipping details');
        }
    },

    updateShippingDetails : async (user_id, address, city, state, pincode, country) => {
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
            .eq('user_id', user_id)
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