const supabase = require('../config/database')

const PaymentGateway = {
    
    getAll: async () => {
      const { data, error } = await supabase.from('payment_gateway').select('*');
      if (error) throw error;
      return data;
    },

    getById: async (id) => {
      if (!id) {
        throw new Error('Invalid ID');
      }
      try {
        const { data, error } = await supabase
          .from('payment_gateway')
          .select('*')
          .eq('id', id);
        if (error) throw error;
        return data[0];
      } catch (error) {
        console.error('Error fetching payment gateway:', error);    
        throw new Error('Server Error: Unable to fetch payment gateway');
      }
    }
}

module.exports = PaymentGateway