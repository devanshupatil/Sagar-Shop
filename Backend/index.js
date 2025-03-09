const express = require('express')
const app = express()
const dotenv = require('dotenv');
const supabase = require('./config/database');
const port = 4100;
const cors = require('cors');
const productRouter = require('./routes/product-route');
const cartOrderRouter = require('./routes/cart-order-route');
const userRouter = require('./routes/user-route');
const Wishlist = require('./routes/wishlist-routes');

// load environment variables from.env file
dotenv.config();


// Connect to Supabase
(async () => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    console.log('Successfully connected to Supabase');
  } catch (error) {
    console.error('Error connecting to Supabase:', error.message);
  }
})();


app.use(cors({
  origin: [
    'http://localhost:4000',  // Local development
    'http://localhost:5173',
    'https://wishlist-manager-app.netlify.app',  // Production frontend
    'https://wishlist-manager-application.onrender.com'  // If needed
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());




// // Middleware
app.use(express.json());

// // Routes
app.use('/api', productRouter);
app.use('/api', cartOrderRouter);
app.use('/api', userRouter);
app.use('/api', Wishlist);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
