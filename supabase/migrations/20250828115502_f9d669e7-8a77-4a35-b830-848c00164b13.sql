-- Create storage bucket for PG images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pg-images', 'pg-images', true);

-- Create storage policies for PG images
CREATE POLICY "Public can view PG images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pg-images');

CREATE POLICY "Authenticated users can upload PG images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pg-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update PG images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'pg-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete PG images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'pg-images' AND auth.role() = 'authenticated');