const supabase = require('../config/database')

const Product = {

  getAll: async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
  },

  getById: async (productId) => {

    if (!productId) {
      throw new Error('Invalid ID');
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_id', productId);

      if (error) throw error;
      return data[0];

    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Server Error: Unable to retrieve product');
    }
  },

  checkProductStock: async (productId) => {

    if (!productId) {
      throw new Error('Invalid ID');
    }
    try {

      const { data, error } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('product_id', productId)
        .single();
      if (error) throw error;

      return data.stock_quantity;

    } catch (error) {

      console.error('Error checking stock:', error);
      throw new Error('Server Error: Unable to check stock');

    }
  },

  createProduct: async (name, description, price, stockQuantity, image, type, heading, mrp, inFrontpage) => {

    try {

      const { data, error } = await supabase.from('products')
        .insert([
          {
            product_name: name,
            product_type: type,
            heading: heading,
            image: image,
            description: description,
            price: price,
            mrp: mrp,
            inFrontpage: inFrontpage,
            stock_quantity: stockQuantity,
          }
        ]);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Server Error: Unable to create product');
    }
  }
};

module.exports = Product;