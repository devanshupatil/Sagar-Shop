// products.sql

CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


// Cart.sql

CREATE TABLE Cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

// users.sql

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


// user_addresses.sql

CREATE TABLE user_addresses (
    address_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    address_line VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100)
);

// orders.sql

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    product_id INT REFERENCES products(product_id),
    items_bought INT,
    total_price DECIMAL(10,2),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// Payment_Transactions.sql

CREATE TYPE payment_status_enum AS ENUM ('Pending', 'Completed', 'Failed');

CREATE TABLE Payment_Transactions (
    transaction_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    amount DECIMAL(10,2) NOT NULL,
    payment_status payment_status_enum DEFAULT 'Pending',
    payment_method VARCHAR(50),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
