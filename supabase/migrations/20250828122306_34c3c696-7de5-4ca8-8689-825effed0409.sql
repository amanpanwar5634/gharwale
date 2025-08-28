-- Update the three PG listings with your uploaded images
UPDATE public.pgs 
SET images = ARRAY['/lovable-uploads/6f3939f4-dc08-4a0f-ba4a-09c14efa5858.png']
WHERE name = 'BLISS COED MANAYATA';

UPDATE public.pgs 
SET images = ARRAY['/lovable-uploads/1cd6bd50-f871-4a67-acf1-0a917ba47c11.png']
WHERE name = 'COOL COED MANYATA';

UPDATE public.pgs 
SET images = ARRAY['/lovable-uploads/9d143ba3-5f47-4405-9175-8e088176288a.png']
WHERE name = 'CIA COED MANYATA';