-- Update the three Manyata PG listings with correct image URLs
UPDATE public.pgs 
SET images = ARRAY['https://oiytnbhljvcmpmlthhhg.supabase.co/storage/v1/object/public/pg-images/bliss-coed-manayata.jpg']
WHERE name = 'BLISS COED MANAYATA';

UPDATE public.pgs 
SET images = ARRAY['https://oiytnbhljvcmpmlthhhg.supabase.co/storage/v1/object/public/pg-images/cool-coed-manyata.jpg']
WHERE name = 'COOL COED MANYATA';

UPDATE public.pgs 
SET images = ARRAY['https://oiytnbhljvcmpmlthhhg.supabase.co/storage/v1/object/public/pg-images/cia-coed-manyata.jpg']
WHERE name = 'CIA COED MANYATA';