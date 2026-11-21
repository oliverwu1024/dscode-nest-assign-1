CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  order_number VARCHAR(30) UNIQUE,
  total_amount DECIMAL(10, 2),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id),
  payment_method VARCHAR(30),
  amount DECIMAL(10, 2),
  payment_status VARCHAR(20),
  paid_at TIMESTAMP
);