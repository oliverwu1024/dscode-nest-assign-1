INSERT INTO users (first_name, last_name, email, phone) VALUES
  ('John', 'Smith', 'john@example.com', '0400000001'),
  ('Joe',  'Brown', 'joe@example.com',  '0400000002'),
  ('Ann',  'Lee',   'ann@example.com',  '0400000003');

INSERT INTO orders (user_id, order_number, total_amount, status) VALUES
  ((SELECT id FROM users WHERE email = 'john@example.com'), 'ORD-001', 1200.00, 'completed'),
  ((SELECT id FROM users WHERE email = 'john@example.com'), 'ORD-002',   59.90, 'completed'),
  ((SELECT id FROM users WHERE email = 'john@example.com'), 'ORD-003',  300.00, 'pending'),
  ((SELECT id FROM users WHERE email = 'joe@example.com'),  'ORD-004',   89.50, 'completed'),
  ((SELECT id FROM users WHERE email = 'ann@example.com'),  'ORD-005',   45.00, 'cancelled');

INSERT INTO payments (order_id, payment_method, amount, payment_status, paid_at) VALUES
  ((SELECT id FROM orders WHERE order_number = 'ORD-001'), 'credit_card',   1200.00, 'succeeded', NOW()),
  ((SELECT id FROM orders WHERE order_number = 'ORD-002'), 'paypal',          59.90, 'succeeded', NOW()),
  ((SELECT id FROM orders WHERE order_number = 'ORD-003'), 'credit_card',    300.00, 'failed',    NULL),
  ((SELECT id FROM orders WHERE order_number = 'ORD-004'), 'bank_transfer',   89.50, 'succeeded', NOW()),
  ((SELECT id FROM orders WHERE order_number = 'ORD-005'), 'paypal',          45.00, 'failed',    NULL);