const supabase = require('../config/database')

const CartOrder = {


    addToCart: async (id, product_id, stock_quantity) => {

        if(!id)
        {
            throw new Error('Invalid ID');
        }

        try{

            const { data, error } = await supabase
            .from('cart')
            .insert([
                {
                    user_id: id,
                    product_id: product_id,
                    quantity: stock_quantity
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

    getAllCart: async (user_id) => {

        if(!user_id)
        {
            throw new Error('Invalid ID');
        }

        try{
            const { data, error } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', user_id);
            if(error) throw error;
            return data;
        }
        catch(error)
        {
            console.error('Error getting cart:', error);
            throw new Error('Server Error: Unable to get cart');
        }
    },

    createOrder: async (user_id, product_id, product) => {

        try{
            const { data, error } = await supabase
            .from('orders')
            .insert([
                { 
                    user_id: user_id,
                    product_id: product_id,
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

    getOrdersById: async (user_id) => {
        if(!user_id)
        {
            throw new Error('Invalid ID');
        }

        try{
            const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user_id)
            .single();

            if(error) throw error;
            return data;
        }
        catch(error)
        {
            console.error('Error fetching order:', error);
            throw new Error('Server Error: Unable to retrieve order');
        }

    }
}

module.exports = CartOrder