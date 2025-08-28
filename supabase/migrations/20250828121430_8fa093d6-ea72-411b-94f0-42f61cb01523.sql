-- Update the three new PG listings with proper image paths
UPDATE public.pgs 
SET images = ARRAY['/src/assets/bliss-coed-manayata.jpg']
WHERE name = 'BLISS COED MANAYATA';

UPDATE public.pgs 
SET images = ARRAY['/src/assets/cool-coed-manyata.jpg']
WHERE name = 'COOL COED MANYATA';

UPDATE public.pgs 
SET images = ARRAY['/src/assets/cia-coed-manyata.jpg']
WHERE name = 'CIA COED MANYATA';