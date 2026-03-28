-- Add public read access for demo mode (no auth required)
-- Run this in the Supabase SQL Editor

CREATE POLICY "public_read_businesses" ON businesses FOR SELECT TO anon USING (true);
CREATE POLICY "public_read_machines" ON machines FOR SELECT TO anon USING (true);
CREATE POLICY "public_read_tasks" ON tasks FOR SELECT TO anon USING (true);
CREATE POLICY "public_read_tax_assessments" ON tax_assessments FOR SELECT TO anon USING (true);
CREATE POLICY "public_read_invoices" ON invoices FOR SELECT TO anon USING (true);
CREATE POLICY "public_read_invoice_line_items" ON invoice_line_items FOR SELECT TO anon USING (true);
CREATE POLICY "public_read_audit_log" ON audit_log FOR SELECT TO anon USING (true);

-- Also allow anonymous inserts/updates for demo CRUD
CREATE POLICY "public_insert_machines" ON machines FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public_update_machines" ON machines FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "public_insert_businesses" ON businesses FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public_update_businesses" ON businesses FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "public_insert_tasks" ON tasks FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public_insert_invoices" ON invoices FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public_update_invoices" ON invoices FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "public_insert_tax_assessments" ON tax_assessments FOR INSERT TO anon WITH CHECK (true);
