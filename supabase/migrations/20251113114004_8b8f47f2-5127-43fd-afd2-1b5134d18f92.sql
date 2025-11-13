-- Drop existing admin update policy
DROP POLICY IF EXISTS "Admins can update products" ON products;

-- Recreate with proper WITH CHECK clause
CREATE POLICY "Admins can update products"
ON products
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));