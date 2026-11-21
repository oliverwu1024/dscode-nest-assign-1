
CREATE OR REPLACE FUNCTION get_user_total_amount()
RETURNS TABLE (user_id UUID, user_name TEXT, total_amount NUMERIC)
LANGUAGE sql AS $$
  SELECT u.id, u.first_name || ' ' || u.last_name, COALESCE(SUM(p.amount), 0)
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  LEFT JOIN payments p ON o.id = p.order_id AND p.payment_status = 'succeeded'
  GROUP BY u.id, u.first_name, u.last_name;
$$;


CREATE OR REPLACE FUNCTION get_user_total_orders()
RETURNS TABLE (user_id UUID, user_name TEXT, total_orders BIGINT)
LANGUAGE sql AS $$
  SELECT u.id, u.first_name || ' ' || u.last_name, COUNT(o.id)
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  GROUP BY u.id, u.first_name, u.last_name
  ORDER BY COUNT(o.id) DESC;
$$;


CREATE OR REPLACE FUNCTION get_user_payment_failure_ratio()
RETURNS TABLE (user_id UUID, user_name TEXT, total_succeeded BIGINT, total_failed BIGINT, ratio NUMERIC)
LANGUAGE sql AS $$
  SELECT
    u.id,
    u.first_name || ' ' || u.last_name,
    COUNT(p.id) FILTER (WHERE p.payment_status = 'succeeded'),
    COUNT(p.id) FILTER (WHERE p.payment_status = 'failed'),
    ROUND(
      COUNT(p.id) FILTER (WHERE p.payment_status = 'failed')::numeric
        / NULLIF(COUNT(p.id) FILTER (WHERE p.payment_status IN ('succeeded', 'failed')), 0),
      2)
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  LEFT JOIN payments p ON o.id = p.order_id
  GROUP BY u.id, u.first_name, u.last_name;
$$;