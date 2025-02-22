const supabase = require('../config/database')

const Wishlist = {

    getAllProducts: async (userId) => {

        try {
            const { data, error } = await supabase
                .from('wishlist')
                .select('*')
                .eq('user_id', userId);
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error getting wishlist:', error);
            throw new Error('Server Error: Unable to get wishlist');
        }
    },

    getById: async (userId, productId) => {

        try{
            const {data, error} = await supabase
                .from('wishlist')
                .select('*')
                .eq('user_id', userId)
                .eq('product_id', productId)
                .single();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error getting wishlist:', error);
            throw new Error('Server Error: Unable to get wishlist');
        }
    },

    addToWishlist: async (userId, productId) => {


        try {
            const { data, error } = await supabase
                .from('wishlist')
                .insert([
                    {
                        user_id: userId,
                        product_id: productId
                    },
                ])
                .select();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error adding to wishlist:', error);
            throw new Error('Server Error: Unable to add to wishlist');
        }
    },

    removeFromWishlist: async (userId, productId) => {

        try {


            const { data, error } = await supabase
                .from('wishlist')
                .delete()
                .eq('user_id', userId)
                .eq('product_id', productId)
                .select();
            if (error) throw error;
            return data;
        }
        catch (error) {
            console.error('Error removing from wishlist:', error);
            throw new Error('Server Error: Unable to remove from wishlist');
        }
    }
}

module.exports = Wishlist;