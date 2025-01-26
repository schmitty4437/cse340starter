INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starknet.com',
        'Iam1ronM@n'
    );
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;
DELETE FROM public.account
WHERE account_id = 1;
UPDATE public.inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM';
SELECT inv_make,
    inv_model,
    classification_name
FROM public.inventory pi
    INNER JOIN public.classification pc ON pi.classification_id = pc.classification_id
WHERE classification_name = 'Sport';
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')
WHERE inv_image LIKE '/images/%'
    OR inv_thumbnail LIKE '/images/%';