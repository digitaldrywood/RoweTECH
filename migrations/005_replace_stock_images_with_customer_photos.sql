-- +goose Up
UPDATE page_images
SET image_url = '/static/images/customer/laser-marking-foba.jpg',
    alt_text = 'Laser marking equipment at RoweTech'
WHERE page_name = 'home' AND image_key = 'hero';

UPDATE page_images
SET image_url = '/static/images/customer/cmm-inspection-room.jpg',
    alt_text = 'Coordinate measuring machine at RoweTech'
WHERE page_name = 'home' AND image_key = 'cta';

UPDATE page_images
SET image_url = '/static/images/customer/cmm-inspection-room.jpg',
    alt_text = 'Coordinate measuring machine inspection area'
WHERE page_name = 'about' AND image_key = 'hero';

UPDATE page_images
SET image_url = '/static/images/customer/mold-repair-workstation.jpg',
    alt_text = 'Mold repair workstation'
WHERE page_name = 'about' AND image_key = 'story';

UPDATE page_images
SET image_url = '/static/images/customer/machined-cavity-detail.jpg',
    alt_text = 'Precision-machined mold cavity'
WHERE page_name = 'services' AND image_key = 'hero';

UPDATE page_images
SET image_url = '/static/images/customer/mold-repair-bench.jpg',
    alt_text = 'Plastic injection mold repair bench'
WHERE page_name = 'services' AND image_key = 'mold-repair';

UPDATE page_images
SET image_url = '/static/images/customer/machined-cavity-detail.jpg',
    alt_text = 'Precision-machined mold cavity'
WHERE page_name = 'services' AND image_key = 'cnc';

UPDATE page_images
SET image_url = '/static/images/customer/mold-repair-bench.jpg',
    alt_text = 'Mold repair and maintenance workstation'
WHERE page_name = 'home' AND image_key = 'service-mold-repair';

UPDATE page_images
SET image_url = '/static/images/customer/cmm-inspection-room.jpg',
    alt_text = 'Inspection and fixture setup area'
WHERE page_name = 'home' AND image_key = 'service-fixtures';

UPDATE page_images
SET image_url = '/static/images/customer/mold-repair-microscope.jpg',
    alt_text = 'Microscope inspection workstation'
WHERE page_name = 'home' AND image_key = 'service-fixtures';

UPDATE page_images
SET image_url = '/static/images/customer/laser-marking-foba.jpg',
    alt_text = 'Advanced equipment at RoweTech'
WHERE page_name = 'home' AND image_key = 'service-eoat';

UPDATE page_images
SET image_url = '/static/images/customer/machined-cavity-detail.jpg',
    alt_text = 'Precision-machined mold cavity'
WHERE page_name = 'home' AND image_key = 'service-cnc';

UPDATE page_images
SET image_url = '/static/images/customer/cmm-inspection-room.jpg',
    alt_text = 'CMM inspection equipment'
WHERE page_name = 'home' AND image_key = 'why-us-1';

UPDATE page_images
SET image_url = '/static/images/customer/mold-repair-workstation.jpg',
    alt_text = 'Mold repair workstation'
WHERE page_name = 'home' AND image_key = 'why-us-2';

UPDATE page_images
SET image_url = '/static/images/customer/cmm-inspection-room.jpg',
    alt_text = 'Inspection and fixture setup area'
WHERE page_name = 'services' AND image_key = 'fixtures';

UPDATE page_images
SET image_url = '/static/images/customer/mold-repair-microscope.jpg',
    alt_text = 'Microscope inspection workstation'
WHERE page_name = 'services' AND image_key = 'fixtures';

UPDATE page_images
SET image_url = '/static/images/customer/laser-marking-foba.jpg',
    alt_text = 'Advanced equipment at RoweTech'
WHERE page_name = 'services' AND image_key = 'eoat';

UPDATE page_images
SET image_url = '/static/images/customer/cmm-inspection-room.jpg',
    alt_text = 'CMM inspection equipment'
WHERE page_name = 'capabilities' AND image_key = 'hero';

UPDATE page_images
SET image_url = '/static/images/customer/laser-marking-foba.jpg',
    alt_text = 'Laser marking workstation'
WHERE page_name = 'gallery' AND image_key = 'hero';

UPDATE page_images
SET image_url = '/static/images/customer/mold-repair-workstation.jpg',
    alt_text = 'Mold repair workstation at RoweTech'
WHERE page_name = 'contact' AND image_key = 'hero';

UPDATE gallery_items
SET image_url = '/static/images/customer/machined-cavity-detail.jpg'
WHERE id IN (1, 5, 9, 10, 12, 19, 23, 24, 25, 26);

UPDATE gallery_items
SET image_url = '/static/images/customer/laser-marking-foba.jpg'
WHERE id IN (2, 8, 11, 20, 21, 22);

UPDATE gallery_items
SET image_url = '/static/images/customer/mold-repair-workstation.jpg'
WHERE id IN (3, 6, 7, 14, 17, 28);

UPDATE gallery_items
SET image_url = '/static/images/customer/mold-repair-workstation.jpg'
WHERE id = 13;

UPDATE gallery_items
SET image_url = '/static/images/customer/mold-repair-bench.jpg'
WHERE id = 15;

UPDATE gallery_items
SET image_url = '/static/images/customer/cmm-inspection-room.jpg'
WHERE id IN (16, 18, 27, 29);

UPDATE gallery_items
SET image_url = '/static/images/customer/mold-repair-microscope.jpg'
WHERE id IN (4, 16, 18);

UPDATE gallery_items
SET image_url = '/static/images/customer/cmm-inspection-room.jpg'
WHERE id = 27;

UPDATE gallery_items
SET image_url = '/static/images/customer/sinker-edm-closeup.jpg'
WHERE id = 30;

-- +goose Down
UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt_text = 'Industrial manufacturing'
WHERE page_name = 'home' AND image_key = 'hero';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt_text = 'Industrial background'
WHERE page_name = 'home' AND image_key = 'cta';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80',
    alt_text = 'Manufacturing'
WHERE page_name = 'about' AND image_key = 'hero';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    alt_text = 'CNC Workshop'
WHERE page_name = 'about' AND image_key = 'story';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80',
    alt_text = 'CNC Machining'
WHERE page_name = 'services' AND image_key = 'hero';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    alt_text = 'Plastic Injection Mold Repair'
WHERE page_name = 'services' AND image_key = 'mold-repair';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    alt_text = 'CNC Machining Services'
WHERE page_name = 'services' AND image_key = 'cnc';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    alt_text = 'Mold repair and maintenance'
WHERE page_name = 'home' AND image_key = 'service-mold-repair';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    alt_text = 'Custom fixtures and tooling'
WHERE page_name = 'home' AND image_key = 'service-fixtures';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    alt_text = 'End-of-arm tooling'
WHERE page_name = 'home' AND image_key = 'service-eoat';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    alt_text = 'CNC machining equipment'
WHERE page_name = 'home' AND image_key = 'service-cnc';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
    alt_text = 'CNC Machining'
WHERE page_name = 'home' AND image_key = 'why-us-1';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
    alt_text = 'Manufacturing'
WHERE page_name = 'home' AND image_key = 'why-us-2';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    alt_text = 'Custom Fixtures and Tooling'
WHERE page_name = 'services' AND image_key = 'fixtures';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    alt_text = 'EOAT Manufacturing'
WHERE page_name = 'services' AND image_key = 'eoat';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80',
    alt_text = 'CNC Equipment'
WHERE page_name = 'capabilities' AND image_key = 'hero';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt_text = 'Workshop'
WHERE page_name = 'gallery' AND image_key = 'hero';

UPDATE page_images
SET image_url = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80',
    alt_text = 'Manufacturing'
WHERE page_name = 'contact' AND image_key = 'hero';

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80'
WHERE id IN (1, 5, 19, 23, 24);

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
WHERE id IN (2, 11, 30);

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'
WHERE id = 3;

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80'
WHERE id IN (12, 26);

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80'
WHERE id IN (6, 7, 17, 28);

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
WHERE id IN (8, 22, 29);

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80'
WHERE id IN (9, 10, 18, 25);

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80'
WHERE id = 13;

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
WHERE id = 14;

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80'
WHERE id = 15;

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'
WHERE id IN (16, 27);

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80'
WHERE id = 20;

UPDATE gallery_items
SET image_url = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
WHERE id = 21;
