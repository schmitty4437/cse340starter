INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES ('Tony'),
    ('Stark'),
    ('tony@startknet.com'),
    ('Iam1ronM@n');
UPDATE public.account
SET account_type = 'Admin'
WHERE id = 1;
DELETE FROM public.account
WHERE id = 1;
SELECT *
FROM public.account;
UPDATE public.inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM';
SELECT *
FROM public.inventory;
SELECT inv_make,
    inv_model,
    classification_name
FROM public.inventory pi
    INNER JOIN public.classification pc ON pi.classification_id = pc.classification_id;
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')
WHERE inv_image LIKE '/images/%'
    OR inv_thumbnail LIKE '/images/%';
SELECT *
FROM public.inventory;