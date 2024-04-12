insert into routes (name, slug, origin_id, destination_id, distance, duration)
values
    ('Victoria Falls to Harare', 'victoria-falls-to-harare', (select id from locations where name = 'Victoria Falls'), (select id from locations where name = 'Harare'), 708, '10:05:00'),
    ('Harare to Victoria Falls', 'harare-to-victoria-falls', (select id from locations where name = 'Harare'), (select id from locations where name = 'Victoria Falls'), 708, '10:05:00'),
    ('Harare to Masvingo', 'harare-to-masvingo', (select id from locations where name = 'Harare'), (select id from locations where name = 'Masvingo'), 230, '3:20:00'),
    ('Masvingo to Harare', 'masvingo-to-harare', (select id from locations where name = 'Masvingo'), ((select id from locations where name = 'Harare')), 230, '3:20:00'),
    ('Chimanimani to Harare', 'chimanimani-to-harare', (select id from locations where name = 'Chimanimani'), (select id from locations where name = 'Harare'), 250, '3:50:00'),
    ('Harare to Chimanimani', 'harare-to-chimanimani', (select id from locations where name = 'Harare'), (select id from locations where name = 'Chimanimani'), 250, '3:50:00');