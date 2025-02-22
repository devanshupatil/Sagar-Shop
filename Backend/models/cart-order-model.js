const supabase = require('../config/database')

const CartOrder = {


    addToCart: async (userId, productId, stockQuantity) => {

        if(!userId)
        {
            throw new Error('Invalid ID');
        }

        try{

            const { data, error } = await supabase
            .from('cart')
            .insert([
                {
                    user_id: userId,
                    product_id: productId,
                    quantity: stockQuantity
                }
            ])
            .select();


            if(error) throw error;
            return data;
        }
        catch(error)
        {
            console.error('Error adding to cart:', error);
            throw new Error('Server Error: Unable to add to cart');
        }


    },

    getAllCart: async (userId) => {

        if(!userId)
        {
            throw new Error('Invalid ID');
        }

        try{
            const { data, error } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId);
            if(error) throw error;
            return data;
        }
        catch(error)
        {
            console.error('Error getting cart:', error);
            throw new Error('Server Error: Unable to get cart');
        }
    },

    updateCart: async (cartId, newQuantity) => {

        try{
            const { data, error } = await supabase
            .from('cart')
            .update({ quantity: newQuantity })
            .eq('cart_id', cartId)
            if(error) throw error;
            return data;
        }
        catch(error)
        {
            console.error('Error updating cart:', error);
            throw new Error('Server Error: Unable to update cart');
        }
    },

    createOrder: async (userId, productId, product) => {

        try{
            const { data, error } = await supabase
            .from('orders')
            .insert([
                { 
                    user_id: userId,
                    product_id: productId,
                    total_price: product.price
                },
            ])
            .select();
            if(error) throw error;
            return data;
        }
        catch(error)
        {
            console.error('Error creating order:', error);
            throw new Error('Server Error: Unable to create order');
        }
    },

    getOrdersById: async (userId) => {
        if(!userId)
        {
            throw new Error('Invalid ID');
        }

        try{
            const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .single();

            if(error) throw error;
            return data;
        }
        catch(error)
        {
            console.error('Error fetching order:', error);
            throw new Error('Server Error: Unable to retrieve order');
        }

    },

    removeProductById: async (userId, productId) =>
    {

        try{
            const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', userId)
            .eq('product_id', productId);
            if(error) throw error;
            return data;
        }
        catch(error)
        {
            console.error('Error removing product:', error);
            throw new Error('Server Error: Unable to remove product');
        }

    }
}

module.exports = CartOrder