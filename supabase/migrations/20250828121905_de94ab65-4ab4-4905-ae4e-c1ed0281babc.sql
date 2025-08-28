-- Update the three new PG listings with publicly accessible image URLs like the existing ones
UPDATE public.pgs 
SET images = ARRAY['https://images.unsplash.com/photo-1555854877-bab0e460b513?auto=format&fit=crop&w=800&q=80']
WHERE name = 'BLISS COED MANAYATA';

UPDATE public.pgs 
SET images = ARRAY['https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80']
WHERE name = 'COOL COED MANYATA';

UPDATE public.pgs 
SET images = ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80']
WHERE name = 'CIA COED MANYATA';