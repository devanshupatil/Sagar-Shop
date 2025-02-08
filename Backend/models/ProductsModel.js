const supabase = require('../config/database')

const Product = {

  getAll: async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
  },

  getById: async (id) => {
    if (!id) {
      throw new Error('Invalid ID');
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_id', id);
        
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Server Error: Unable to retrieve product');
    }
  },

  checkProductStock: async (id) => {

    if (!id) {
      throw new Error('Invalid ID');
    }
    try {

      const { data, error } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('product_id', id)
        .single();
      if (error) throw error;

      return data.stock_quantity;

    } catch (error) {

      console.error('Error checking stock:', error);
      throw new Error('Server Error: Unable to check stock');

    }
  }
};

module.exports = Product;